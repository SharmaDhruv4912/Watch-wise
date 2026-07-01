"use client";

import { useState } from "react";

export function NewsletterForm() {
  const [status, setStatus] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsSubmitting(true);
    setStatus(null);

    const form = new FormData(event.currentTarget);
    const email = String(form.get("email") ?? "");

    try {
      const response = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ email, source: "homepage" }),
      });

      if (!response.ok) {
        throw new Error("Could not subscribe");
      }

      setStatus("Subscribed. The next letter will land quietly.");
      event.currentTarget.reset();
    } catch {
      setStatus("Subscription failed. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <form className="grid gap-3 sm:min-w-[420px]" onSubmit={handleSubmit}>
      <div className="flex min-w-0 max-w-xl flex-col gap-3 sm:flex-row">
        <input
          name="email"
          type="email"
          required
          placeholder="you@example.com"
          className="h-12 min-w-0 flex-1 rounded-full border border-white/12 bg-white/[0.04] px-5 text-white outline-none focus:border-[#d7aaa4]"
        />
        <button
          disabled={isSubmitting}
          className="h-12 rounded-full bg-[#ead7b0] px-6 text-sm font-medium text-[#111111] transition hover:bg-[#f4efe5] disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isSubmitting ? "Subscribing" : "Subscribe"}
        </button>
      </div>
      {status ? <p className="text-sm text-white/58">{status}</p> : null}
    </form>
  );
}
