import type { MetadataRoute } from "next";
import { articles } from "@/lib/data";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://watchwise.in";
  const staticRoutes = [
    "",
    "/finder",
    "/consultation",
    "/guides",
    "/compare",
    "/encyclopedia",
    "/community",
    "/about",
    "/contact",
    "/privacy",
    "/terms",
    "/refund",
    "/affiliate-disclosure",
  ];

  return [
    ...staticRoutes.map((route) => ({
      url: `${base}${route}`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: route === "" ? 1 : 0.8,
    })),
    ...articles.map((article) => ({
      url: `${base}/guides/${article.slug}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.9,
    })),
  ];
}
