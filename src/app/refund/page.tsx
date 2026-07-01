import type { Metadata } from "next";
import { TrustPage } from "@/components/trust-page";

export const metadata: Metadata = {
  title: "Refund Policy",
  description: "Refund and cancellation policy for Watchwise consultation services.",
};

export default function RefundPage() {
  return (
    <TrustPage
      eyebrow="Refunds"
      title="Refund and cancellation policy"
      intro="This policy keeps the consultation service fair for buyers while protecting scheduled expert time."
      sections={[
        {
          title: "Before consultation delivery",
          body: "If you paid by mistake or no longer need the service, contact us before a shortlist or call is delivered. Eligible refunds can be processed back through Razorpay.",
        },
        {
          title: "After delivery",
          body: "Once a call, shortlist or recommendation deliverable has been provided, the consultation fee is generally non-refundable unless there was a clear service failure.",
        },
        {
          title: "Rescheduling",
          body: "You can request rescheduling if you contact us before the planned call time. Missed calls without notice may need a new booking depending on availability.",
        },
        {
          title: "Processing time",
          body: "Approved refunds depend on Razorpay and bank processing timelines. We will share the payment or refund reference when available.",
        },
      ]}
    />
  );
}
