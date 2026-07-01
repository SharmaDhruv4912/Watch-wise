import type { Metadata } from "next";
import { TrustPage } from "@/components/trust-page";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "Privacy policy for Watchwise India.",
};

export default function PrivacyPage() {
  return (
    <TrustPage
      eyebrow="Privacy"
      title="Privacy policy"
      intro="This policy explains what information Watchwise collects and how it is used. It is a practical launch policy and should be reviewed by a lawyer before scale."
      sections={[
        {
          title: "Information we collect",
          body: "We may collect your name, email, consultation notes, budget range, payment status, account information and usage data. If you upload wrist photos in a future version, those files will be used only to provide sizing and recommendation guidance.",
        },
        {
          title: "How we use it",
          body: "We use your information to provide recommendations, process consultation payments, send confirmations, improve content, prevent abuse and communicate updates you requested.",
        },
        {
          title: "Payments and authentication",
          body: "Payments are processed through Razorpay. Authentication is handled through Clerk. We do not store card details on Watchwise servers.",
        },
        {
          title: "Data requests",
          body: "You can request correction or deletion of your data by contacting the Watchwise team from the contact page.",
        },
      ]}
    />
  );
}
