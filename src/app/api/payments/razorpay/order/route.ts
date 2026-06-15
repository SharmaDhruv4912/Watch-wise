import { NextResponse } from "next/server";
import { z } from "zod";
import {
  consultationPlans,
  getRazorpayClient,
  type ConsultationPlanId,
} from "@/lib/razorpay";

const orderSchema = z.object({
  planId: z.enum(["essential", "premium", "collector"]),
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

  const plan = consultationPlans[parsed.data.planId as ConsultationPlanId];
  const razorpay = getRazorpayClient();

  const order = await razorpay.orders.create({
    amount: plan.amount,
    currency: "INR",
    receipt: `watchwise_${Date.now()}`,
    notes: {
      planId: parsed.data.planId,
      plan: plan.label,
      customerName: parsed.data.customer.name,
      customerEmail: parsed.data.customer.email,
      environment: process.env.RAZORPAY_KEY_ID?.startsWith("rzp_test_") ? "test" : "live",
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
