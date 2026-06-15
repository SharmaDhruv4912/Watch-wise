export function WatchVisual({ tone = "champagne" }: { tone?: "champagne" | "silver" | "jade" }) {
  const accent =
    tone === "silver" ? "#c8ccd2" : tone === "jade" ? "#6da18a" : "#d6b56d";

  return (
    <div className="watch-shadow relative mx-auto aspect-[3/4] w-full max-w-[360px]">
      <div className="absolute left-1/2 top-0 h-[31%] w-[34%] -translate-x-1/2 rounded-t-[32px] border border-white/15 bg-[#191919]" />
      <div className="absolute bottom-0 left-1/2 h-[31%] w-[34%] -translate-x-1/2 rounded-b-[32px] border border-white/15 bg-[#191919]" />
      <div className="absolute left-1/2 top-1/2 aspect-square w-[82%] -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/20 bg-[#0f0f0f] p-[6%]">
        <div
          className="relative h-full w-full rounded-full border bg-[#151515]"
          style={{
            borderColor: accent,
            boxShadow: `inset 0 0 44px rgba(255,255,255,.08), 0 0 0 12px rgba(255,255,255,.035), 0 0 90px ${accent}20`,
          }}
        >
          {Array.from({ length: 12 }).map((_, index) => (
            <span
              key={index}
              className="absolute left-1/2 top-1/2 h-[42%] w-px origin-bottom"
              style={{ transform: `translate(-50%, -100%) rotate(${index * 30}deg)` }}
            >
              <span
                className="block h-3 w-px rounded-full"
                style={{ background: index % 3 === 0 ? accent : "rgba(255,255,255,.36)" }}
              />
            </span>
          ))}
          <div className="absolute left-1/2 top-1/2 h-[3px] w-[31%] origin-left rounded-full bg-[#f7f1e8]" />
          <div
            className="absolute left-1/2 top-1/2 h-[3px] w-[24%] origin-left rounded-full"
            style={{ background: accent, transform: "rotate(128deg)" }}
          />
          <div className="absolute left-1/2 top-1/2 h-[39%] w-px origin-bottom rounded-full bg-white/70" />
          <div
            className="absolute left-1/2 top-1/2 h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full"
            style={{ background: accent }}
          />
          <div className="editorial absolute left-1/2 top-[28%] -translate-x-1/2 text-center text-[10px] uppercase text-white/64">
            Watchwise
          </div>
          <div className="absolute bottom-[25%] left-1/2 h-5 w-10 -translate-x-1/2 rounded-full border border-white/15 text-center text-[10px] leading-5 text-white/55">
            IN
          </div>
        </div>
      </div>
      <div
        className="absolute right-[5%] top-1/2 h-12 w-4 -translate-y-1/2 rounded-r-lg"
        style={{ background: accent }}
      />
    </div>
  );
}
