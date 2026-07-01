import { NextResponse } from "next/server";
import { verifyRazorpayWebhookSignature } from "@/lib/razorpay";
import { prisma } from "@/lib/prisma";
import { sendPaymentCapturedEmails } from "@/lib/email";

type RazorpayWebhookPayload = {
  event?: string;
  payload?: {
    payment?: {
      entity?: {
        id?: string;
        order_id?: string;
        status?: string;
        amount?: number;
        currency?: string;
        notes?: {
          consultationId?: string;
          planId?: string;
          plan?: string;
          customerName?: string;
          customerEmail?: string;
        };
      };
    };
  };
};

export async function POST(request: Request) {
  const signature = request.headers.get("x-razorpay-signature");
  const body = await request.text();

  if (!signature) {
    return NextResponse.json({ error: "Missing Razorpay signature" }, { status: 400 });
  }

  const verified = verifyRazorpayWebhookSignature({ body, signature });

  if (!verified) {
    return NextResponse.json({ error: "Invalid Razorpay signature" }, { status: 400 });
  }

  const payload = JSON.parse(body) as RazorpayWebhookPayload;
  const rawPayload = JSON.parse(body);
  const paymentEntity = payload.payload?.payment?.entity;
  const orderId = paymentEntity?.order_id;

  if (!orderId) {
    return NextResponse.json({ received: true, ignored: "missing_order_id" });
  }

  const status = mapPaymentStatus(payload.event, paymentEntity.status);

  const payment = await prisma.payment.upsert({
    where: { orderId },
    create: {
      orderId,
      paymentId: paymentEntity.id,
      consultationId: paymentEntity.notes?.consultationId || undefined,
      planId: paymentEntity.notes?.planId || "unknown",
      planLabel: paymentEntity.notes?.plan || "Unknown plan",
      amount: paymentEntity.amount ?? 0,
      currency: paymentEntity.currency ?? "INR",
      customerName: paymentEntity.notes?.customerName || "Unknown customer",
      customerEmail: paymentEntity.notes?.customerEmail || "unknown@example.com",
      status,
      rawPayload,
    },
    update: {
      paymentId: paymentEntity.id,
      status,
      rawPayload,
    },
  });

  if (payment.consultationId && status === "CAPTURED") {
    await prisma.consultation.update({
      where: { id: payment.consultationId },
      data: {
        status: "PAID",
        paymentId: paymentEntity.id,
      },
    });
  }

  if (status === "CAPTURED") {
    await sendPaymentCapturedEmails({
      name: payment.customerName,
      email: payment.customerEmail,
      planLabel: payment.planLabel,
      amount: payment.amount,
      paymentId: paymentEntity.id,
      consultationId: payment.consultationId,
    });
  }

  return NextResponse.json({ received: true });
}

function mapPaymentStatus(event?: string, status?: string) {
  if (event === "payment.captured" || status === "captured") return "CAPTURED";
  if (event === "payment.authorized" || status === "authorized") return "AUTHORIZED";
  if (event === "payment.failed" || status === "failed") return "FAILED";
  if (event === "refund.processed") return "REFUNDED";

  return "CREATED";
}
