import crypto from "node:crypto";
import Razorpay from "razorpay";

export const consultationPlans = {
  essential: {
    label: "Essential shortlist",
    amount: 99900,
    description: "Three watch recommendations with sizing and retailer notes.",
  },
  premium: {
    label: "Premium consultation",
    amount: 249900,
    description: "Video call, wrist sizing, shortlist and alternatives.",
  },
  collector: {
    label: "Collector desk",
    amount: 499900,
    description: "Luxury purchase planning, AD strategy and resale context.",
  },
} as const;

export type ConsultationPlanId = keyof typeof consultationPlans;

export function getRazorpayClient() {
  const keyId = process.env.RAZORPAY_KEY_ID;
  const keySecret = process.env.RAZORPAY_KEY_SECRET;

  if (!keyId || !keySecret) {
    throw new Error("Razorpay keys are not configured");
  }

  return new Razorpay({
    key_id: keyId,
    key_secret: keySecret,
  });
}

export function verifyRazorpaySignature({
  orderId,
  paymentId,
  signature,
}: {
  orderId: string;
  paymentId: string;
  signature: string;
}) {
  const secret = process.env.RAZORPAY_KEY_SECRET;

  if (!secret) {
    throw new Error("Razorpay secret is not configured");
  }

  const expected = crypto
    .createHmac("sha256", secret)
    .update(`${orderId}|${paymentId}`)
    .digest("hex");

  return crypto.timingSafeEqual(Buffer.from(expected), Buffer.from(signature));
}
