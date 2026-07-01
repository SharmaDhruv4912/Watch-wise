import type { Metadata } from "next";
import { TrustPage } from "@/components/trust-page";

export const metadata: Metadata = {
  title: "About",
  description:
    "About Watchwise India, an editorial-first platform for watch buying guides, consultation and discovery.",
};

export default function AboutPage() {
  return (
    <TrustPage
      eyebrow="About Watchwise"
      title="A calmer watch guide for Indian buyers."
      intro="Watchwise is built for people who want taste, context and confidence before spending money on a watch. We combine editorial judgment, Indian pricing realities, retailer awareness and practical ownership advice."
      sections={[
        {
          title: "Editorial first",
          body: "Our recommendations are written for buyers, not brands. We prioritise fit, movement reliability, serviceability, value, authenticity and long-term ownership over hype.",
        },
        {
          title: "Built for India",
          body: "Indian watch buyers deal with changing online prices, authorised dealer availability, import risk, festival offers and uneven service access. Watchwise is designed around those realities.",
        },
        {
          title: "Revenue model",
          body: "Watchwise earns through consultation fees, affiliate links, sponsored placements that are clearly disclosed, and future premium tools. Commercial relationships do not remove the need for honest buyer guidance.",
        },
      ]}
    />
  );
}
