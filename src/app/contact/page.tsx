import type { Metadata } from "next";
import Link from "next/link";
import { Mail, MessageSquareText } from "lucide-react";

export const metadata: Metadata = {
  title: "Contact",
  description: "Contact Watchwise India for consultations, partnerships, corrections and affiliate enquiries.",
};

export default function ContactPage() {
  return (
    <main className="px-4 py-28 sm:px-6 lg:px-8">
      <section className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-[1fr_420px]">
        <div>
          <p className="text-xs uppercase text-[#d6b56d]">Contact</p>
          <h1 className="editorial mt-4 text-6xl leading-none text-white">
            Questions, partnerships and corrections.
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-white/62">
            Reach out for watch consultation support, retailer partnerships,
            sponsored review enquiries, article corrections or affiliate
            collaboration.
          </p>
        </div>
        <div className="noise-panel rounded-lg p-6">
          <div className="grid gap-4">
            <Link
              href="mailto:intercourseinspector@gmail.com"
              className="flex items-center gap-4 rounded-md border border-white/10 p-4 text-white/72 transition hover:border-[#d7aaa4]/50 hover:text-white"
            >
              <Mail className="h-5 w-5 text-[#ead7b0]" />
              intercourseinspector@gmail.com
            </Link>
            <Link
              href="/consultation"
              className="flex items-center gap-4 rounded-md border border-white/10 p-4 text-white/72 transition hover:border-[#d7aaa4]/50 hover:text-white"
            >
              <MessageSquareText className="h-5 w-5 text-[#9eb7a6]" />
              Start a watch consultation
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
