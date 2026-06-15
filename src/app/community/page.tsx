import type { Metadata } from "next";
import { Heart, MessageCircle, UserRound } from "lucide-react";

export const metadata: Metadata = {
  title: "Community",
  description:
    "Watchwise community profiles, wrist shots, saved collections, comments and future forum architecture.",
};

const posts = [
  ["Aarav", "First automatic under Rs 35k. Tsuyosa or Presage?", "24 comments", "118 likes"],
  ["Meera", "36mm options that work with saris and office wear", "11 comments", "86 likes"],
  ["Kabir", "My dad's HMT restoration before and after", "39 comments", "241 likes"],
];

export default function CommunityPage() {
  return (
    <main className="mx-auto max-w-7xl px-4 py-28 sm:px-6 lg:px-8">
      <p className="text-xs uppercase text-[#d6b56d]">Community layer</p>
      <h1 className="editorial mt-4 max-w-4xl text-6xl leading-none text-white">
        Collections, wrist shots and real ownership notes.
      </h1>
      <div className="mt-12 grid gap-5 lg:grid-cols-3">
        {posts.map(([name, text, comments, likes]) => (
          <article key={text} className="noise-panel rounded-lg p-6">
            <div className="flex items-center gap-3">
              <div className="grid h-10 w-10 place-items-center rounded-full bg-white/10">
                <UserRound className="h-4 w-4 text-white/72" />
              </div>
              <p className="text-white">{name}</p>
            </div>
            <p className="editorial mt-8 text-3xl text-white">{text}</p>
            <div className="mt-8 flex gap-5 text-sm text-white/52">
              <span className="inline-flex items-center gap-2"><MessageCircle className="h-4 w-4" /> {comments}</span>
              <span className="inline-flex items-center gap-2"><Heart className="h-4 w-4" /> {likes}</span>
            </div>
          </article>
        ))}
      </div>
    </main>
  );
}
