export type Watch = {
  id: string;
  name: string;
  brand: string;
  price: number;
  style: "Dress" | "Dive" | "Field" | "Everyday" | "Chronograph" | "Integrated";
  movement: "Automatic" | "Quartz" | "Solar" | "Spring Drive";
  strap: "Bracelet" | "Leather" | "Rubber" | "NATO";
  caseSize: number;
  occasion: string[];
  audience: "Beginner" | "Collector" | "Professional";
  crystal: string;
  waterResistance: string;
  valueScore: number;
  designScore: number;
  retailer: string;
  affiliateUrl: string;
  summary: string;
  why: string;
};

export const watches: Watch[] = [
  {
    id: "seiko-presage-cocktail",
    name: "Presage Cocktail Time",
    brand: "Seiko",
    price: 42000,
    style: "Dress",
    movement: "Automatic",
    strap: "Leather",
    caseSize: 40,
    occasion: ["Office", "Wedding", "First luxury"],
    audience: "Beginner",
    crystal: "Hardlex",
    waterResistance: "50m",
    valueScore: 91,
    designScore: 94,
    retailer: "Ethos / Seiko India",
    affiliateUrl: "/api/affiliate/seiko-presage-cocktail",
    summary: "A polished entry into mechanical watchmaking with an expressive dial.",
    why: "It gives Indian first-time buyers ceremony, reliability and dress-watch presence without becoming fragile or loud.",
  },
  {
    id: "tissot-prx-powermatic",
    name: "PRX Powermatic 80",
    brand: "Tissot",
    price: 78000,
    style: "Integrated",
    movement: "Automatic",
    strap: "Bracelet",
    caseSize: 40,
    occasion: ["Office", "Smart casual", "Collector"],
    audience: "Professional",
    crystal: "Sapphire",
    waterResistance: "100m",
    valueScore: 89,
    designScore: 96,
    retailer: "Helios / Tata CLiQ Luxury",
    affiliateUrl: "/api/affiliate/tissot-prx-powermatic",
    summary: "Swiss integrated-bracelet design with a long power reserve.",
    why: "The PRX feels architectural on wrist and works beautifully for Indian professionals who want one watch to travel between boardroom and dinner.",
  },
  {
    id: "citizen-tsuyosa",
    name: "Tsuyosa Automatic",
    brand: "Citizen",
    price: 32900,
    style: "Everyday",
    movement: "Automatic",
    strap: "Bracelet",
    caseSize: 40,
    occasion: ["College", "Daily wear", "First automatic"],
    audience: "Beginner",
    crystal: "Sapphire",
    waterResistance: "50m",
    valueScore: 93,
    designScore: 88,
    retailer: "Amazon India / Citizen",
    affiliateUrl: "/api/affiliate/citizen-tsuyosa",
    summary: "A bright, approachable automatic with strong specs for its price.",
    why: "It has enough personality for college and weekend wear, while the sapphire crystal and bracelet keep it practical.",
  },
  {
    id: "orient-bambino",
    name: "Bambino 38",
    brand: "Orient",
    price: 25500,
    style: "Dress",
    movement: "Automatic",
    strap: "Leather",
    caseSize: 38,
    occasion: ["Formal", "Wedding", "Small wrist"],
    audience: "Beginner",
    crystal: "Mineral",
    waterResistance: "30m",
    valueScore: 90,
    designScore: 90,
    retailer: "Amazon India",
    affiliateUrl: "/api/affiliate/orient-bambino",
    summary: "Vintage proportion and domed crystal charm at an attainable price.",
    why: "The 38mm case is forgiving on Indian wrists and pairs naturally with formalwear.",
  },
  {
    id: "gshock-2100",
    name: "GA-B2100 CasiOak",
    brand: "Casio",
    price: 12995,
    style: "Everyday",
    movement: "Solar",
    strap: "Rubber",
    caseSize: 45,
    occasion: ["College", "Travel", "Gym"],
    audience: "Beginner",
    crystal: "Mineral",
    waterResistance: "200m",
    valueScore: 95,
    designScore: 86,
    retailer: "Casio India / Amazon India",
    affiliateUrl: "/api/affiliate/gshock-2100",
    summary: "Solar, Bluetooth and shock resistance in a slim octagonal case.",
    why: "It is the most abuse-proof recommendation for students and travellers who still care about design.",
  },
  {
    id: "longines-spirit",
    name: "Spirit Zulu Time",
    brand: "Longines",
    price: 305000,
    style: "Field",
    movement: "Automatic",
    strap: "Bracelet",
    caseSize: 39,
    occasion: ["Travel", "Collector", "Luxury daily"],
    audience: "Collector",
    crystal: "Sapphire",
    waterResistance: "100m",
    valueScore: 87,
    designScore: 95,
    retailer: "Ethos / Longines Boutique",
    affiliateUrl: "/api/affiliate/longines-spirit",
    summary: "A refined GMT for serious travel and long-term ownership.",
    why: "It brings true luxury finishing, practical travel functionality and a size that avoids the oversized trap.",
  },
];

export const articles = [
  {
    slug: "best-watches-under-5000-india",
    title: "Best Watches Under Rs 5,000 in India That Do Not Feel Disposable",
    category: "Buying Guides",
    readTime: "7 min",
    excerpt:
      "A sharp shortlist for students, first-job buyers and anyone who wants taste before logos.",
  },
  {
    slug: "seiko-vs-citizen-india",
    title: "Seiko vs Citizen: Which Japanese Watch Brand Makes Sense in India?",
    category: "Brand History",
    readTime: "9 min",
    excerpt:
      "A practical comparison of movements, service, design language and Indian retail availability.",
  },
  {
    slug: "first-luxury-watch-india",
    title: "How To Buy Your First Luxury Watch in India Without Regret",
    category: "Luxury Watches",
    readTime: "11 min",
    excerpt:
      "Budgeting, wrist size, authorized dealers, grey market risk and the watches worth trying on first.",
  },
];

export const terms = [
  {
    title: "Automatic Movement",
    type: "Movement",
    body: "A mechanical calibre wound by wrist motion. It rewards daily wear but still needs periodic service.",
  },
  {
    title: "Sapphire Crystal",
    type: "Material",
    body: "A highly scratch-resistant crystal used on better watches. It is one of the most useful upgrades for Indian daily wear.",
  },
  {
    title: "Lug-to-Lug",
    type: "Sizing",
    body: "The distance across the watch from top lug to bottom lug. This often matters more than case diameter for wrist comfort.",
  },
  {
    title: "Integrated Bracelet",
    type: "Design",
    body: "A bracelet that flows directly into the watch case, creating a single sculptural silhouette.",
  },
];

export const adminMetrics = [
  { label: "Qualified leads", value: "486", delta: "+18%" },
  { label: "Affiliate GMV", value: "Rs 18.4L", delta: "+31%" },
  { label: "Consultations", value: "72", delta: "+12%" },
  { label: "Organic clicks", value: "41.2K", delta: "+44%" },
];

export const formatINR = (value: number) =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(value);
