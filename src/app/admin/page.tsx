import type { Metadata } from "next";
import { adminMetrics } from "@/lib/data";

export const metadata: Metadata = {
  title: "Admin Dashboard",
  description:
    "Admin surface for watches, guides, consultations, users, analytics and affiliate management.",
};

const queues = [
  "Approve 12 consultation shortlists",
  "Refresh Amazon India affiliate prices",
  "Review sponsored Longines draft",
  "Moderate 8 community comments",
];

export default function AdminPage() {
  return (
    <main className="px-4 py-28 sm:px-6 lg:px-8">
      <section className="mx-auto max-w-7xl">
        <p className="text-xs uppercase text-[#d6b56d]">Operator cockpit</p>
        <h1 className="editorial mt-4 text-6xl leading-none text-white">Admin dashboard</h1>
        <div className="mt-10 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {adminMetrics.map((metric) => (
            <div key={metric.label} className="noise-panel rounded-lg p-5">
              <p className="text-sm text-white/52">{metric.label}</p>
              <div className="mt-6 flex items-end justify-between">
                <span className="editorial text-4xl text-white">{metric.value}</span>
                <span className="text-sm text-[#6da18a]">{metric.delta}</span>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-8 grid gap-5 lg:grid-cols-[1fr_420px]">
          <div className="noise-panel rounded-lg p-6">
            <h2 className="editorial text-4xl text-white">Content and commerce modules</h2>
            <div className="mt-8 grid gap-3 text-sm text-white/64">
              {["Watches CMS", "Blog editor", "Consultation CRM", "Users and collections", "Affiliate manager", "SEO programmatic pages"].map((item) => (
                <div key={item} className="rounded-md border border-white/10 bg-white/[0.03] p-4">{item}</div>
              ))}
            </div>
          </div>
          <div className="noise-panel rounded-lg p-6">
            <h2 className="editorial text-4xl text-white">Work queue</h2>
            <div className="mt-8 grid gap-3">
              {queues.map((item) => (
                <label key={item} className="flex items-center gap-3 rounded-md border border-white/10 p-4 text-sm text-white/64">
                  <input type="checkbox" className="accent-[#d6b56d]" />
                  {item}
                </label>
              ))}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
