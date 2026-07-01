type TrustPageProps = {
  eyebrow: string;
  title: string;
  intro: string;
  sections: Array<{
    title: string;
    body: string;
  }>;
};

export function TrustPage({ eyebrow, title, intro, sections }: TrustPageProps) {
  return (
    <main className="px-4 py-28 sm:px-6 lg:px-8">
      <section className="mx-auto max-w-5xl">
        <p className="text-xs uppercase text-[#d6b56d]">{eyebrow}</p>
        <h1 className="editorial mt-4 max-w-4xl text-6xl leading-none text-white">
          {title}
        </h1>
        <p className="mt-6 max-w-3xl text-lg leading-8 text-white/62">{intro}</p>
        <div className="mt-12 grid gap-4">
          {sections.map((section) => (
            <article key={section.title} className="noise-panel rounded-lg p-6">
              <h2 className="editorial text-3xl text-white">{section.title}</h2>
              <p className="mt-4 text-sm leading-7 text-white/62">{section.body}</p>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
