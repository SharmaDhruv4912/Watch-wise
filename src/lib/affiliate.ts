import { watches } from "@/lib/data";

export type AffiliateDestination = {
  watchId: string;
  retailer: string;
  network: string;
  url: string;
};

const amazonTag = process.env.AMAZON_AFFILIATE_TAG?.trim();

function amazonSearch(query: string) {
  const params = new URLSearchParams({ k: query });
  if (amazonTag) {
    params.set("tag", amazonTag);
  }
  return `https://www.amazon.in/s?${params.toString()}`;
}

function ethosSearch(query: string) {
  return `https://www.ethoswatches.com/search?q=${encodeURIComponent(query)}`;
}

function heliosSearch(query: string) {
  return `https://www.helioswatchstore.com/search?q=${encodeURIComponent(query)}`;
}

const destinationMap: Record<string, Omit<AffiliateDestination, "watchId">> = {
  "seiko-presage-cocktail": {
    retailer: "Ethos / Seiko India",
    network: "ethos",
    url: ethosSearch("Seiko Presage Cocktail Time"),
  },
  "tissot-prx-powermatic": {
    retailer: "Helios / Tata CLiQ Luxury",
    network: "helios",
    url: heliosSearch("Tissot PRX Powermatic 80"),
  },
  "citizen-tsuyosa": {
    retailer: "Amazon India / Citizen",
    network: "amazon",
    url: amazonSearch("Citizen Tsuyosa Automatic"),
  },
  "orient-bambino": {
    retailer: "Amazon India",
    network: "amazon",
    url: amazonSearch("Orient Bambino 38"),
  },
  "gshock-2100": {
    retailer: "Casio India / Amazon India",
    network: "amazon",
    url: amazonSearch("Casio G-Shock GA-B2100 CasiOak"),
  },
  "longines-spirit": {
    retailer: "Ethos / Longines Boutique",
    network: "ethos",
    url: ethosSearch("Longines Spirit Zulu Time"),
  },
};

export function getAffiliateDestination(watchId: string): AffiliateDestination | null {
  const destination = destinationMap[watchId];
  if (!destination) {
    return null;
  }

  return { watchId, ...destination };
}

export function listAffiliateDestinations(): AffiliateDestination[] {
  return watches
    .map((watch) => getAffiliateDestination(watch.id))
    .filter((item): item is AffiliateDestination => item !== null);
}

export function buildAffiliateRedirectUrl(destination: AffiliateDestination) {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://watchwise.in";
  const redirect = new URL(destination.url);
  redirect.searchParams.set("utm_source", "watchwise");
  redirect.searchParams.set("utm_medium", "affiliate");
  redirect.searchParams.set("utm_campaign", destination.watchId);
  redirect.searchParams.set("utm_content", destination.network);
  redirect.searchParams.set("ref", siteUrl);
  return redirect.toString();
}
