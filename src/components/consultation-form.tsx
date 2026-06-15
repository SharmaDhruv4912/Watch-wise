"use client";

import Script from "next/script";
import { useState } from "react";
import { CalendarDays, CreditCard, UploadCloud } from "lucide-react";

type PaymentResponse = {
  razorpay_order_id: string;
  razorpay_payment_id: string;
  razorpay_signature: string;
};

type RazorpayInstance = {
  open: () => void;
};

type RazorpayConstructor = new (options: Record<string, unknown>) => RazorpayInstance;

declare global {
  interface Window {
    Razorpay?: RazorpayConstructor;
  }
}

const plans = [
  ["essential", "Essential shortlist", "Rs 999"],
  ["premium", "Premium consultation", "Rs 2,499"],
  ["collector", "Collector desk", "Rs 4,999"],
] as const;

export function ConsultationForm() {
  const [status, setStatus] = useState<string | null>(null);
  const [isPaying, setIsPaying] = useState(false);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus(null);
    setIsPaying(true);

    const form = new FormData(event.currentTarget);
    const name = String(form.get("name") ?? "");
    const email = String(form.get("email") ?? "");
    const planId = String(form.get("planId") ?? "essential");

    try {
      const orderResponse = await fetch("/api/payments/razorpay/order", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          planId,
          customer: { name, email },
        }),
      });

      if (!orderResponse.ok) {
        throw new Error("Could not create Razorpay order");
      }

      const order = await orderResponse.json();

      if (!window.Razorpay) {
        throw new Error("Razorpay checkout script is still loading");
      }

      const checkout = new window.Razorpay({
        key: order.keyId,
        amount: order.amount,
        currency: order.currency,
        name: "Watchwise India",
        description: order.plan.label,
        order_id: order.orderId,
        prefill: {
          name,
          email,
        },
        theme: {
          color: "#111111",
        },
        handler: async (response: PaymentResponse) => {
          const verifyResponse = await fetch("/api/payments/razorpay/verify", {
            method: "POST",
            headers: { "content-type": "application/json" },
            body: JSON.stringify(response),
          });

          if (!verifyResponse.ok) {
            setStatus("Payment received, but verification failed. Please contact support with your payment ID.");
            return;
          }

          setStatus("Payment verified. Your consultation request is ready for scheduling.");
        },
        modal: {
          ondismiss: () => {
            setStatus("Checkout closed before payment. You can try again whenever you are ready.");
          },
        },
      });

      checkout.open();
    } catch (error) {
      setStatus(error instanceof Error ? error.message : "Payment setup failed");
    } finally {
      setIsPaying(false);
    }
  }

  return (
    <>
      <Script src="https://checkout.razorpay.com/v1/checkout.js" strategy="lazyOnload" />
      <form className="noise-panel rounded-lg p-5" onSubmit={handleSubmit}>
        <p className="text-xs uppercase text-[#d6b56d]">Concierge intake</p>
        <h2 className="editorial mt-2 text-4xl text-white">Book a guided shortlist</h2>
        <div className="mt-8 grid gap-4">
          <input
            name="name"
            placeholder="Name"
            required
            className="h-12 rounded-md border border-white/12 bg-[#101010] px-4 text-white outline-none focus:border-[#d6b56d]"
          />
          <input
            name="email"
            type="email"
            placeholder="Email"
            required
            className="h-12 rounded-md border border-white/12 bg-[#101010] px-4 text-white outline-none focus:border-[#d6b56d]"
          />
          <select
            name="budget"
            className="h-12 rounded-md border border-white/12 bg-[#101010] px-4 text-white outline-none focus:border-[#d6b56d]"
          >
            <option>Rs 5,000 - Rs 25,000</option>
            <option>Rs 25,000 - Rs 1,00,000</option>
            <option>Rs 1,00,000 - Rs 5,00,000</option>
            <option>Rs 5,00,000+</option>
          </select>
          <select
            name="planId"
            className="h-12 rounded-md border border-white/12 bg-[#101010] px-4 text-white outline-none focus:border-[#d6b56d]"
          >
            {plans.map(([id, label, price]) => (
              <option key={id} value={id}>
                {label} - {price}
              </option>
            ))}
          </select>
          <textarea
            name="notes"
            placeholder="Occasion, wrist size, brands you like, watches you are considering"
            rows={5}
            className="rounded-md border border-white/12 bg-[#101010] px-4 py-3 text-white outline-none focus:border-[#d6b56d]"
          />
          <label className="flex cursor-pointer items-center justify-between rounded-md border border-dashed border-white/18 bg-white/[0.03] p-4 text-sm text-white/64">
            Upload wrist photos
            <UploadCloud className="h-5 w-5" />
            <input type="file" accept="image/*" multiple className="sr-only" />
          </label>
        </div>
        <div className="mt-6 grid gap-3 sm:grid-cols-2">
          <a
            href="https://calendly.com/"
            target="_blank"
            rel="noreferrer"
            className="inline-flex h-12 items-center justify-center gap-2 rounded-full border border-white/12 text-sm text-white transition hover:border-[#d6b56d]/60"
          >
            <CalendarDays className="h-4 w-4" /> Calendly slot
          </a>
          <button
            disabled={isPaying}
            className="inline-flex h-12 items-center justify-center gap-2 rounded-full bg-[#f2dfb2] text-sm font-medium text-[#111111] transition hover:bg-white disabled:cursor-not-allowed disabled:opacity-60"
          >
            <CreditCard className="h-4 w-4" />
            {isPaying ? "Creating order" : "Pay with Razorpay"}
          </button>
        </div>
        {status ? (
          <p className="mt-5 rounded-md border border-[#6da18a]/40 bg-[#6da18a]/10 p-4 text-sm text-[#d6eadc]">
            {status}
          </p>
        ) : null}
      </form>
    </>
  );
}
