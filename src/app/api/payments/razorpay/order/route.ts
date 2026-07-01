import { NextResponse } from "next/server";
import { z } from "zod";
import {
  consultationPlans,
  getRazorpayClient,
  type ConsultationPlanId,
} from "@/lib/razorpay";
import { prisma } from "@/lib/prisma";

const orderSchema = z.object({
  planId: z.enum(["essential", "premium", "collector"]),
  consultationId: z.string().optional(),
  customer: z.object({
    name: z.string().min(2),
    email: z.email(),
  }),
});

export async function POST(request: Request) {
  const parsed = orderSchema.safeParse(await request.json());

  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid checkout request" }, { status: 400 });
  }

  let razorpay;
  try {
    razorpay = getRazorpayClient();
  } catch {
    return NextResponse.json(
      { error: "Payments are not configured yet. Contact support to complete booking." },
      { status: 503 },
    );
  }

  const plan = consultationPlans[parsed.data.planId as ConsultationPlanId];

  const order = await razorpay.orders.create({
    amount: plan.amount,
    currency: "INR",
    receipt: `watchwise_${Date.now()}`,
    notes: {
      consultationId: parsed.data.consultationId ?? "",
      planId: parsed.data.planId,
      plan: plan.label,
      customerName: parsed.data.customer.name,
      customerEmail: parsed.data.customer.email,
      environment: process.env.RAZORPAY_KEY_ID?.startsWith("rzp_test_") ? "test" : "live",
    },
  });

  await prisma.payment.upsert({
    where: { orderId: order.id },
    create: {
      consultationId: parsed.data.consultationId,
      orderId: order.id,
      planId: parsed.data.planId,
      planLabel: plan.label,
      amount: plan.amount,
      currency: "INR",
      customerName: parsed.data.customer.name,
      customerEmail: parsed.data.customer.email,
      status: "CREATED",
      rawPayload: JSON.parse(JSON.stringify(order)),
    },
    update: {
      consultationId: parsed.data.consultationId,
      rawPayload: JSON.parse(JSON.stringify(order)),
    },
  });

  return NextResponse.json({
    keyId: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
    orderId: order.id,
    amount: order.amount,
    currency: order.currency,
    plan,
  });
}
