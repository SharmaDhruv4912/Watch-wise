import type { Metadata } from "next";
import Link from "next/link";
import { Search } from "lucide-react";
import { articles } from "@/lib/data";

export const metadata: Metadata = {
  title: "Watch Guide Blog",
  description:
    "SEO optimized Indian watch buying guides, brand histories, maintenance education and luxury watch explainers.",
};

const categories = [
  "Buying Guides",
  "Brand History",
  "Watch Education",
  "Affordable Watches",
  "Luxury Watches",
  "Automatic Watch Guides",
  "Maintenance",
  "Strap Guides",
];

export default function GuidesPage() {
  return (
    <main className="px-4 py-28 sm:px-6 lg:px-8">
      <section className="mx-auto max-w-7xl">
        <p className="text-xs uppercase text-[#d6b56d]">Editorial library</p>
        <div className="mt-4 grid gap-8 lg:grid-cols-[1fr_420px]">
          <h1 className="editorial text-6xl leading-none text-white">
            Buying guides with taste, specs and Indian retail context.
          </h1>
          <div className="noise-panel h-fit rounded-lg p-4">
            <label className="flex h-12 items-center gap-3 rounded-md border border-white/12 bg-[#101010] px-4 text-white/54">
              <Search className="h-4 w-4" />
              <input placeholder="Search guides, brands, terms" className="min-w-0 flex-1 bg-transparent text-white outline-none" />
            </label>
          </div>
        </div>
        <div className="mt-10 flex flex-wrap gap-2">
          {categories.map((category) => (
            <span key={category} className="rounded-full border border-white/12 px-4 py-2 text-sm text-white/58">
              {category}
            </span>
          ))}
        </div>
      </section>

      <section className="mx-auto mt-16 grid max-w-7xl gap-5 lg:grid-cols-3">
        {articles.map((article) => (
          <Link key={article.slug} href={`/guides/${article.slug}`} className="noise-panel group rounded-lg p-6 transition hover:border-[#d6b56d]/40">
            <p className="text-xs uppercase text-white/44">{article.category} / {article.readTime}</p>
            <h2 className="editorial mt-8 text-4xl text-white">{article.title}</h2>
            <p className="mt-5 text-sm leading-6 text-white/58">{article.excerpt}</p>
          </Link>
        ))}
      </section>
    </main>
  );
}
