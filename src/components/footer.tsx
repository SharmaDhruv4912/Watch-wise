import Link from "next/link";

const groups: Array<[string, string[]]> = [
  ["Platform", ["Finder", "Consultation", "Guides", "Compare", "Encyclopedia"]],
  ["India", ["Amazon India", "Ethos", "Helios", "Retailer map", "Authenticity"]],
  ["Business", ["Affiliate desk", "Sponsored reviews", "Marketplace", "Media kit", "Admin"]],
];

export function Footer() {
  return (
    <footer className="border-t border-white/10 bg-[#0a0a0a] px-4 py-14 sm:px-6 lg:px-8">
      <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[1.4fr_2fr]">
        <div>
          <p className="editorial text-4xl text-[#f7f1e8]">Watchwise</p>
          <p className="mt-4 max-w-md text-sm leading-6 text-white/58">
            Indian watch intelligence for practical buyers, collectors and the
            next generation of enthusiasts. Editorial first, commerce second,
            trust always.
          </p>
          <p className="mt-8 text-xs uppercase text-[#d6b56d]">Built for India. Ready for resale.</p>
        </div>
        <div className="grid gap-8 sm:grid-cols-3">
          {groups.map(([title, items]) => (
            <div key={title}>
              <p className="text-sm text-white">{title}</p>
              <div className="mt-4 grid gap-3 text-sm text-white/52">
                {(items as string[]).map((item) => (
                  <Link
                    key={item}
                    href={item === "Admin" ? "/admin" : "#"}
                    className="transition hover:text-white"
                  >
                    {item}
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </footer>
  );
}
