import type { Metadata } from "next";
import { requireAdmin } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export const metadata: Metadata = {
  title: "Admin Dashboard",
  description:
    "Admin surface for watches, guides, consultations, users, analytics and affiliate management.",
};

export default async function AdminPage() {
  await requireAdmin();

  const [consultations, paymentSummary, userCount, affiliateSummary] = await Promise.all([
    prisma.consultation.findMany({
      orderBy: { createdAt: "desc" },
      take: 12,
      include: {
        payments: {
          orderBy: { createdAt: "desc" },
          take: 1,
        },
      },
    }),
    prisma.payment.groupBy({
      by: ["status"],
      _sum: { amount: true },
      _count: { id: true },
    }),
    prisma.user.count(),
    prisma.affiliateLink.aggregate({
      _sum: { clicks: true },
      _count: { id: true },
    }),
  ]);

  const capturedRevenue =
    paymentSummary.find((item) => item.status === "CAPTURED")?._sum.amount ?? 0;
  const paidConsultations = consultations.filter((item) => item.status === "PAID").length;
  const openConsultations = consultations.filter((item) => item.status === "LEAD").length;

  const affiliateClicks = affiliateSummary._sum.clicks ?? 0;

  const metrics = [
    { label: "Captured revenue", value: formatPaise(capturedRevenue), delta: "Razorpay" },
    { label: "Affiliate clicks", value: String(affiliateClicks), delta: `${affiliateSummary._count.id} links` },
    { label: "Paid consults", value: String(paidConsultations), delta: `${openConsultations} open leads` },
    { label: "Users", value: String(userCount), delta: "Clerk sync" },
  ];

  return (
    <main className="px-4 py-28 sm:px-6 lg:px-8">
      <section className="mx-auto max-w-7xl">
        <p className="text-xs uppercase text-[#d6b56d]">Operator cockpit</p>
        <h1 className="editorial mt-4 text-6xl leading-none text-white">Admin dashboard</h1>
        <div className="mt-10 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {metrics.map((metric) => (
            <div key={metric.label} className="noise-panel rounded-lg p-5">
              <p className="text-sm text-white/52">{metric.label}</p>
              <div className="mt-6 flex items-end justify-between">
                <span className="editorial text-4xl text-white">{metric.value}</span>
                <span className="text-sm text-[#6da18a]">{metric.delta}</span>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8 grid gap-5 lg:grid-cols-[1fr_360px]">
          <div className="noise-panel overflow-hidden rounded-lg">
            <div className="border-b border-white/10 p-6">
              <h2 className="editorial text-4xl text-white">Consultation pipeline</h2>
              <p className="mt-2 text-sm text-white/52">
                New leads, payment state and buyer notes from the live site.
              </p>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-[860px] w-full text-left text-sm">
                <thead className="text-xs uppercase text-white/38">
                  <tr>
                    <th className="px-6 py-4">Buyer</th>
                    <th className="px-6 py-4">Budget</th>
                    <th className="px-6 py-4">Status</th>
                    <th className="px-6 py-4">Payment</th>
                    <th className="px-6 py-4">Created</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/10">
                  {consultations.map((consultation) => {
                    const payment = consultation.payments[0];

                    return (
                      <tr key={consultation.id} className="text-white/66">
                        <td className="px-6 py-4">
                          <span className="block text-white">{consultation.name}</span>
                          <span className="text-xs text-white/42">{consultation.email}</span>
                        </td>
                        <td className="px-6 py-4">{consultation.budget}</td>
                        <td className="px-6 py-4">{consultation.status}</td>
                        <td className="px-6 py-4">
                          {payment ? `${payment.status} / ${formatPaise(payment.amount)}` : "No order"}
                        </td>
                        <td className="px-6 py-4">
                          {new Intl.DateTimeFormat("en-IN", {
                            dateStyle: "medium",
                            timeStyle: "short",
                          }).format(consultation.createdAt)}
                        </td>
                      </tr>
                    );
                  })}
                  {consultations.length === 0 ? (
                    <tr>
                      <td colSpan={5} className="px-6 py-10 text-center text-white/46">
                        No consultation leads yet.
                      </td>
                    </tr>
                  ) : null}
                </tbody>
              </table>
            </div>
          </div>

          <div className="noise-panel rounded-lg p-6">
            <h2 className="editorial text-4xl text-white">Work queue</h2>
            <div className="mt-8 grid gap-3">
              {[
                "Call paid leads within 24 hours",
                "Send shortlist after consultation",
                "Review failed payment attempts",
                "Publish one buying guide this week",
              ].map((item) => (
                <label
                  key={item}
                  className="flex items-center gap-3 rounded-md border border-white/10 p-4 text-sm text-white/64"
                >
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

function formatPaise(value: number) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(value / 100);
}
