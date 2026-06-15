import type { Metadata } from "next";
import { CheckCircle2 } from "lucide-react";
import { ConsultationForm } from "@/components/consultation-form";

export const metadata: Metadata = {
  title: "Watch Consultation",
  description:
    "Book a premium watch consultation for India with style intake, wrist photos, buyer confidence checks and retailer guidance.",
};

const flow = [
  "Submit budget, wrist size, occasion and watch references",
  "Upload wrist photos for sizing and proportion guidance",
  "Pay consultation fee through Razorpay order flow",
  "Schedule call with Calendly and receive a shortlist dashboard",
];

export default function ConsultationPage() {
  return (
    <main className="mx-auto grid max-w-7xl gap-10 px-4 py-28 sm:px-6 lg:grid-cols-[.9fr_1.1fr] lg:px-8">
      <section>
        <p className="text-xs uppercase text-[#d6b56d]">Personal buying desk</p>
        <h1 className="editorial mt-4 text-6xl leading-none text-white">
          A calmer way to buy your first serious watch.
        </h1>
        <p className="mt-6 max-w-xl text-lg leading-8 text-white/62">
          Built for Indian buyers comparing AD pricing, online deals, import
          risk, resale value and the deceptively difficult question of whether a
          watch actually fits your wrist.
        </p>
        <div className="mt-10 grid gap-4">
          {flow.map((item) => (
            <div key={item} className="flex gap-3 text-sm leading-6 text-white/64">
              <CheckCircle2 className="mt-1 h-4 w-4 shrink-0 text-[#6da18a]" />
              {item}
            </div>
          ))}
        </div>
      </section>
      <ConsultationForm />
    </main>
  );
}
