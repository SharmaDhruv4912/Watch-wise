import type { Metadata } from "next";
import { TrustPage } from "@/components/trust-page";

export const metadata: Metadata = {
  title: "Affiliate Disclosure",
  description: "Affiliate disclosure for Watchwise India.",
};

export default function AffiliateDisclosurePage() {
  return (
    <TrustPage
      eyebrow="Disclosure"
      title="Affiliate disclosure"
      intro="Watchwise may earn commission from some retailer links. This helps fund guides, tools and consultation infrastructure."
      sections={[
        {
          title: "How affiliate links work",
          body: "If you click a retailer link and buy a watch or related product, Watchwise may earn a commission at no extra cost to you.",
        },
        {
          title: "Editorial independence",
          body: "Affiliate potential does not automatically make a product recommended. We consider price, specs, fit, serviceability, retailer confidence and buyer use case.",
        },
        {
          title: "Sponsored content",
          body: "Sponsored reviews or paid placements should be labelled clearly. The long-term value of Watchwise depends on reader trust.",
        },
      ]}
    />
  );
}
