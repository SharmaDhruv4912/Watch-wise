import type { Metadata } from "next";
import { FinderEngine } from "@/components/finder-engine";

export const metadata: Metadata = {
  title: "Watch Finder",
  description:
    "Use the Watchwise recommendation engine to find the best watches in India by budget, movement, style, strap and wrist size.",
};

export default function FinderPage() {
  return (
    <main className="pt-16">
      <FinderEngine />
    </main>
  );
}
