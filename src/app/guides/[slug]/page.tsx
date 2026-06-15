import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { articles } from "@/lib/data";

export function generateStaticParams() {
  return articles.map((article) => ({ slug: article.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const article = articles.find((item) => item.slug === slug);
  return {
    title: article?.title ?? "Guide",
    description: article?.excerpt,
  };
}

export default async function ArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const article = articles.find((item) => item.slug === slug);
  if (!article) notFound();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.title,
    about: article.category,
    author: { "@type": "Organization", name: "Watchwise India" },
  };

  return (
    <main className="px-4 py-28 sm:px-6 lg:px-8">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <div className="fixed left-0 top-16 z-40 h-1 w-full bg-white/10">
        <div className="progress-bar h-full w-1/3 bg-[#d6b56d]" />
      </div>
      <article className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[260px_minmax(0,760px)_1fr]">
        <aside className="hidden lg:block">
          <div className="sticky top-28 text-sm text-white/52">
            <p className="mb-4 text-white">In this guide</p>
            <a href="#fit" className="block py-2 hover:text-white">Fit and wrist size</a>
            <a href="#movement" className="block py-2 hover:text-white">Movement choice</a>
            <a href="#retail" className="block py-2 hover:text-white">Indian retail</a>
            <a href="#faq" className="block py-2 hover:text-white">FAQ</a>
          </div>
        </aside>
        <div>
          <p className="text-xs uppercase text-[#d6b56d]">{article.category} / {article.readTime}</p>
          <h1 className="editorial mt-4 text-6xl leading-none text-white">{article.title}</h1>
          <p className="mt-6 text-xl leading-8 text-white/64">{article.excerpt}</p>
          <div className="prose prose-invert mt-12 max-w-none prose-headings:font-serif prose-headings:text-white prose-p:text-white/68">
            <h2 id="fit">Start with fit, not fame</h2>
            <p>
              Most bad purchases begin with an internet-famous watch that wears
              too large. For Indian wrists, lug-to-lug length, bracelet taper
              and case thickness decide comfort more than diameter alone.
            </p>
            <h2 id="movement">Choose the movement honestly</h2>
            <p>
              Automatic watches feel romantic and collectible. Quartz and solar
              watches are often better for students, travel and daily accuracy.
              The best choice is the one that matches your routine.
            </p>
            <h2 id="retail">Buy where the warranty story is clear</h2>
            <p>
              Compare authorized dealers, trusted Indian retailers, platform
              offers and import risk. A small discount is rarely worth uncertain
              authenticity or poor after-sales service.
            </p>
            <h2 id="faq">FAQ</h2>
            <h3>Should I buy online?</h3>
            <p>
              Yes, when the seller, warranty path, return policy and invoice are
              clear. Try the size offline whenever possible.
            </p>
          </div>
        </div>
        <aside className="hidden xl:block">
          <div className="noise-panel sticky top-28 rounded-lg p-5">
            <p className="text-sm text-white">Need a shortlist?</p>
            <p className="mt-3 text-sm leading-6 text-white/56">
              Upload wrist photos and get three recommendations with retailer
              notes, sizing confidence and alternatives.
            </p>
          </div>
        </aside>
      </article>
    </main>
  );
}
