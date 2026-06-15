import Link from "next/link";
import { ExternalLink } from "lucide-react";
import { formatINR, type Watch } from "@/lib/data";
import { WatchVisual } from "@/components/watch-visual";

export function WatchCard({ watch, index = 0 }: { watch: Watch; index?: number }) {
  return (
    <article className="noise-panel group grid min-h-[440px] overflow-hidden rounded-lg p-5">
      <div className="flex items-start justify-between text-xs uppercase text-white/48">
        <span>{watch.brand}</span>
        <span>{watch.movement}</span>
      </div>
      <div className="my-3">
        <WatchVisual tone={index % 3 === 0 ? "champagne" : index % 3 === 1 ? "silver" : "jade"} />
      </div>
      <div className="mt-auto">
        <div className="flex items-end justify-between gap-4">
          <div>
            <h3 className="editorial text-2xl text-white">{watch.name}</h3>
            <p className="mt-1 text-sm text-white/58">{formatINR(watch.price)}</p>
          </div>
          <Link
            href={watch.affiliateUrl}
            className="grid h-11 w-11 place-items-center rounded-full border border-white/12 text-white/72 transition group-hover:border-[#d6b56d]/50 group-hover:text-[#d6b56d]"
            aria-label={`Buy ${watch.name}`}
          >
            <ExternalLink className="h-4 w-4" />
          </Link>
        </div>
        <p className="mt-4 text-sm leading-6 text-white/58">{watch.summary}</p>
      </div>
    </article>
  );
}
