import type { Metadata } from "next";
import { watches, formatINR } from "@/lib/data";

export const metadata: Metadata = {
  title: "Watch Comparison",
  description:
    "Compare watches by movement, crystal, water resistance, price, value score and design rating.",
};

const rows = ["price", "movement", "crystal", "waterResistance", "caseSize", "valueScore", "designScore"] as const;

export default function ComparePage() {
  const selected = watches.slice(0, 3);

  return (
    <main className="px-4 py-28 sm:px-6 lg:px-8">
      <section className="mx-auto max-w-7xl">
        <p className="text-xs uppercase text-[#d6b56d]">Spec intelligence</p>
        <h1 className="editorial mt-4 max-w-4xl text-6xl leading-none text-white">
          Compare value, design and ownership tradeoffs.
        </h1>
        <div className="mt-12 overflow-x-auto rounded-lg border border-white/10">
          <table className="min-w-[860px] w-full border-collapse bg-[#101010] text-left">
            <thead>
              <tr>
                <th className="border-b border-white/10 p-5 text-sm text-white/52">Metric</th>
                {selected.map((watch) => (
                  <th key={watch.id} className="border-b border-white/10 p-5">
                    <span className="block text-sm text-[#d6b56d]">{watch.brand}</span>
                    <span className="editorial text-2xl text-white">{watch.name}</span>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.map((row) => (
                <tr key={row}>
                  <td className="border-b border-white/10 p-5 text-sm uppercase text-white/44">{label(row)}</td>
                  {selected.map((watch) => (
                    <td key={watch.id + row} className="border-b border-white/10 p-5 text-white/72">
                      {value(row, watch)}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </main>
  );
}

function label(row: (typeof rows)[number]) {
  return row.replace(/([A-Z])/g, " $1");
}

function value(row: (typeof rows)[number], watch: (typeof watches)[number]) {
  if (row === "price") return formatINR(watch.price);
  if (row === "caseSize") return `${watch.caseSize}mm`;
  if (row === "valueScore" || row === "designScore") return `${watch[row]}/100`;
  return watch[row];
}
