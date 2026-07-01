import type { Metadata } from "next";
import { TrustPage } from "@/components/trust-page";

export const metadata: Metadata = {
  title: "Terms",
  description: "Terms of use for Watchwise India.",
};

export default function TermsPage() {
  return (
    <TrustPage
      eyebrow="Terms"
      title="Terms of use"
      intro="By using Watchwise, you agree to use the site responsibly and understand that watch recommendations are guidance, not financial or investment advice."
      sections={[
        {
          title: "Editorial guidance",
          body: "Watchwise provides buying guidance, education and consultation based on available information. Prices, availability, service policies and retailer offers can change.",
        },
        {
          title: "Consultations",
          body: "Consultation outputs are personalised recommendations based on the information you provide. Final purchase decisions remain your responsibility.",
        },
        {
          title: "Affiliate links",
          body: "Some links may earn Watchwise a commission. We aim to disclose commercial relationships clearly and keep editorial judgment separate from compensation.",
        },
        {
          title: "No resale guarantee",
          body: "Any discussion of resale, market trends or investment potential is informational. Watch values can fall, and watches should not be treated as guaranteed investments.",
        },
      ]}
    />
  );
}
