import Link from "next/link";
import { ArrowRight, BadgeCheck, BookOpen, LineChart, ShieldCheck, Sparkles } from "lucide-react";
import { MagneticButton } from "@/components/magnetic-button";
import { Reveal } from "@/components/reveal";
import { WatchCard } from "@/components/watch-card";
import { WatchVisual } from "@/components/watch-visual";
import { articles, watches } from "@/lib/data";

const stats = [
  ["1,200+", "Indian price checks"],
  ["86", "buyer scenarios mapped"],
  ["34", "retailer signals"],
  ["9.4/10", "consultation satisfaction"],
];

export default function Home() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Watchwise India",
    url: "https://watchwise.in",
    sameAs: ["https://instagram.com/watchwiseindia"],
    areaServed: "IN",
  };

  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <section className="relative min-h-screen overflow-hidden px-4 pt-28 sm:px-6 lg:px-8">
        <div className="absolute inset-x-0 top-16 h-px bg-white/10" />
        <div className="mx-auto grid max-w-7xl items-center gap-12 lg:min-h-[calc(100vh-7rem)] lg:grid-cols-[1.05fr_.95fr]">
          <Reveal>
            <p className="mb-5 inline-flex rounded-full border border-[#d6b56d]/30 px-4 py-2 text-xs uppercase text-[#d6b56d]">
              Indian watch intelligence, editorially built
            </p>
            <h1 className="editorial max-w-4xl text-balance text-6xl leading-[0.98] text-[#f7f1e8] sm:text-7xl lg:text-8xl">
              Buy the right watch, not the loudest one.
            </h1>
            <p className="mt-7 max-w-2xl text-lg leading-8 text-white/64">
              Watchwise blends buying guides, data-led recommendations,
              concierge consultation, education and affiliate discovery for the
              Indian watch market.
            </p>
            <div className="mt-10 flex flex-wrap gap-3">
              <MagneticButton href="/finder">Find your perfect watch</MagneticButton>
              <MagneticButton href="/consultation" variant="ghost">
                Book consultation
              </MagneticButton>
            </div>
          </Reveal>
          <Reveal delay={0.12} className="relative">
            <div className="noise-panel rounded-lg p-6">
              <div className="flex items-center justify-between text-sm text-white/56">
                <span>Featured rotation</span>
                <span>Spring 2026 India</span>
              </div>
              <WatchVisual />
              <div className="grid gap-4 border-t border-white/10 pt-5 sm:grid-cols-3">
                {["Sapphire", "INR pricing", "Retailer fit"].map((item) => (
                  <div key={item} className="text-sm text-white/58">
                    <BadgeCheck className="mb-2 h-4 w-4 text-[#d6b56d]" />
                    {item}
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="border-y border-white/10 px-4 py-5 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map(([value, label]) => (
            <Reveal key={label} className="flex items-baseline justify-between border-white/10 py-4 lg:border-r lg:pr-8">
              <span className="editorial text-4xl text-white">{value}</span>
              <span className="max-w-[120px] text-right text-sm text-white/48">{label}</span>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
        <Reveal className="mb-10 flex flex-wrap items-end justify-between gap-5">
          <div>
            <p className="text-xs uppercase text-[#d6b56d]">Featured collections</p>
            <h2 className="editorial mt-3 text-5xl text-white">Curated for Indian wrists</h2>
          </div>
          <Link href="/finder" className="inline-flex items-center gap-2 text-sm text-white/70 hover:text-white">
            Explore finder <ArrowRight className="h-4 w-4" />
          </Link>
        </Reveal>
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {watches.slice(0, 3).map((watch, index) => (
            <Reveal key={watch.id} delay={index * 0.08}>
              <WatchCard watch={watch} index={index} />
            </Reveal>
          ))}
        </div>
      </section>

      <section className="bg-[#f4efe5] px-4 py-24 text-[#111111] sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[.85fr_1.15fr]">
          <Reveal>
            <p className="text-xs uppercase text-[#7e3037]">Editorial engine</p>
            <h2 className="editorial mt-3 text-5xl">SEO that still reads like a magazine.</h2>
            <p className="mt-5 text-base leading-7 text-black/62">
              Programmatic buying guides, comparison pages, retailer notes,
              FAQ schema and internal links are designed around real Indian
              search behaviour.
            </p>
          </Reveal>
          <div className="grid gap-4">
            {articles.map((article, index) => (
              <Reveal key={article.slug} delay={index * 0.06}>
                <Link
                  href={`/guides/${article.slug}`}
                  className="group grid gap-4 rounded-lg border border-black/10 bg-white/60 p-5 transition hover:bg-white sm:grid-cols-[1fr_auto]"
                >
                  <div>
                    <p className="text-xs uppercase text-black/45">{article.category} / {article.readTime}</p>
                    <h3 className="editorial mt-2 text-3xl">{article.title}</h3>
                    <p className="mt-3 text-sm leading-6 text-black/58">{article.excerpt}</p>
                  </div>
                  <ArrowRight className="h-5 w-5 transition group-hover:translate-x-1" />
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-8 px-4 py-24 sm:px-6 lg:grid-cols-3 lg:px-8">
        {[
          [ShieldCheck, "Buyer confidence", "Authenticity guides, AD vs grey-market education, invoice checks and service-cost context."],
          [Sparkles, "Concierge monetization", "Razorpay-ready consultation intake, style forms, wrist photo uploads and scheduled calls."],
          [LineChart, "Marketplace-ready", "Wishlist, ownership profiles, investment tracking and affiliate attribution are modelled from day one."],
        ].map(([Icon, title, body]) => (
          <Reveal key={title as string} className="noise-panel rounded-lg p-6">
            <Icon className="h-6 w-6 text-[#d6b56d]" />
            <h3 className="editorial mt-6 text-3xl text-white">{title as string}</h3>
            <p className="mt-4 text-sm leading-6 text-white/58">{body as string}</p>
          </Reveal>
        ))}
      </section>

      <section className="px-4 pb-24 sm:px-6 lg:px-8">
        <Reveal className="noise-panel mx-auto grid max-w-7xl gap-8 rounded-lg p-6 sm:p-10 lg:grid-cols-[1fr_auto]">
          <div>
            <BookOpen className="h-6 w-6 text-[#d6b56d]" />
            <h2 className="editorial mt-6 text-5xl text-white">Join the Indian watch letter.</h2>
            <p className="mt-4 max-w-2xl text-white/58">
              Weekly buying signals, price movement notes, collector essays and
              honest recommendations before festival-season chaos begins.
            </p>
          </div>
          <form className="flex min-w-0 max-w-xl flex-col gap-3 self-end sm:min-w-[420px] sm:flex-row">
            <input
              type="email"
              required
              placeholder="you@example.com"
              className="h-12 min-w-0 flex-1 rounded-full border border-white/12 bg-white/[0.04] px-5 text-white outline-none focus:border-[#d6b56d]"
            />
            <button className="h-12 rounded-full bg-[#f2dfb2] px-6 text-sm font-medium text-[#111111] transition hover:bg-white">
              Subscribe
            </button>
          </form>
        </Reveal>
      </section>
    </main>
  );
}
