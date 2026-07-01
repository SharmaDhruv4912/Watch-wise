import { NextResponse } from "next/server";
import { z } from "zod";
import { verifyRazorpaySignature } from "@/lib/razorpay";
import { prisma } from "@/lib/prisma";
import { sendPaymentCapturedEmails } from "@/lib/email";

const verifySchema = z.object({
  razorpay_order_id: z.string().min(1),
  razorpay_payment_id: z.string().min(1),
  razorpay_signature: z.string().min(1),
});

export async function POST(request: Request) {
  const parsed = verifySchema.safeParse(await request.json());

  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid payment payload" }, { status: 400 });
  }

  const verified = verifyRazorpaySignature({
    orderId: parsed.data.razorpay_order_id,
    paymentId: parsed.data.razorpay_payment_id,
    signature: parsed.data.razorpay_signature,
  });

  if (!verified) {
    return NextResponse.json({ error: "Payment verification failed" }, { status: 400 });
  }

  const payment = await prisma.payment.update({
    where: { orderId: parsed.data.razorpay_order_id },
    data: {
      paymentId: parsed.data.razorpay_payment_id,
      signature: parsed.data.razorpay_signature,
      status: "CAPTURED",
    },
  });

  if (payment.consultationId) {
    await prisma.consultation.update({
      where: { id: payment.consultationId },
      data: {
        status: "PAID",
        paymentId: parsed.data.razorpay_payment_id,
      },
    });
  }

  await sendPaymentCapturedEmails({
    name: payment.customerName,
    email: payment.customerEmail,
    planLabel: payment.planLabel,
    amount: payment.amount,
    paymentId: parsed.data.razorpay_payment_id,
    consultationId: payment.consultationId,
  });

  return NextResponse.json({
    verified: true,
    status: "paid",
    consultationId: payment.consultationId,
  });
}
