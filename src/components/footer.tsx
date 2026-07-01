import Link from "next/link";

const groups: Array<[string, Array<[string, string]>]> = [
  [
    "Platform",
    [
      ["Finder", "/finder"],
      ["Consultation", "/consultation"],
      ["Guides", "/guides"],
      ["Compare", "/compare"],
      ["Encyclopedia", "/encyclopedia"],
    ],
  ],
  [
    "Trust",
    [
      ["About", "/about"],
      ["Contact", "/contact"],
      ["Refund policy", "/refund"],
      ["Privacy", "/privacy"],
      ["Terms", "/terms"],
    ],
  ],
  [
    "Business",
    [
      ["Affiliate disclosure", "/affiliate-disclosure"],
      ["Sponsored reviews", "/contact"],
      ["Marketplace", "/community"],
      ["Media kit", "/contact"],
      ["Admin", "/admin"],
    ],
  ],
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
                {items.map(([item, href]) => (
                  <Link
                    key={item}
                    href={href}
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
