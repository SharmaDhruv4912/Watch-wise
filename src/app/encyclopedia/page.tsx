import type { Metadata } from "next";
import { terms } from "@/lib/data";

export const metadata: Metadata = {
  title: "Watch Encyclopedia",
  description:
    "Learn watch movements, complications, sizing, materials, brand history and watch terminology.",
};

export default function EncyclopediaPage() {
  return (
    <main className="px-4 py-28 sm:px-6 lg:px-8">
      <section className="mx-auto max-w-7xl">
        <p className="text-xs uppercase text-[#d6b56d]">Education</p>
        <h1 className="editorial mt-4 max-w-4xl text-6xl leading-none text-white">
          A watch encyclopedia for people who want clarity before confidence.
        </h1>
        <div className="mt-12 grid gap-5 md:grid-cols-2">
          {terms.map((term) => (
            <article key={term.title} className="noise-panel rounded-lg p-6">
              <p className="text-xs uppercase text-white/42">{term.type}</p>
              <h2 className="editorial mt-5 text-4xl text-white">{term.title}</h2>
              <p className="mt-4 text-sm leading-6 text-white/58">{term.body}</p>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
