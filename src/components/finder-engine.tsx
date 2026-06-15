"use client";

import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { SlidersHorizontal } from "lucide-react";
import { recommendWatches } from "@/lib/finder";
import { watches, formatINR } from "@/lib/data";
import { WatchCard } from "@/components/watch-card";

const styles = ["Any", "Dress", "Dive", "Field", "Everyday", "Chronograph", "Integrated"];
const movements = ["Any", "Automatic", "Quartz", "Solar", "Spring Drive"];
const straps = ["Any", "Bracelet", "Leather", "Rubber", "NATO"];
const occasions = ["Any", "Office", "Wedding", "College", "Travel", "First luxury", "Daily wear"];
const audiences = ["Any", "Beginner", "Professional", "Collector"];

export function FinderEngine() {
  const [budget, setBudget] = useState(80000);
  const [style, setStyle] = useState("Any");
  const [movement, setMovement] = useState("Automatic");
  const [strap, setStrap] = useState("Any");
  const [caseSize, setCaseSize] = useState(40);
  const [occasion, setOccasion] = useState("Any");
  const [audience, setAudience] = useState("Beginner");

  const recs = useMemo(
    () => recommendWatches({ budget, style, movement, strap, caseSize, occasion, audience }),
    [budget, style, movement, strap, caseSize, occasion, audience],
  );

  return (
    <section className="mx-auto grid max-w-7xl gap-8 px-4 py-24 sm:px-6 lg:grid-cols-[420px_1fr] lg:px-8">
      <aside className="noise-panel h-fit rounded-lg p-5 lg:sticky lg:top-24">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs uppercase text-[#d6b56d]">Recommendation engine</p>
            <h1 className="editorial mt-2 text-4xl text-white">Find your watch</h1>
          </div>
          <SlidersHorizontal className="h-5 w-5 text-white/64" />
        </div>

        <div className="mt-8 grid gap-6">
          <label className="grid gap-3">
            <span className="flex justify-between text-sm text-white/72">
              Budget <strong className="text-white">{formatINR(budget)}</strong>
            </span>
            <input
              type="range"
              min="5000"
              max="350000"
              step="5000"
              value={budget}
              onChange={(event) => setBudget(Number(event.target.value))}
              className="accent-[#d6b56d]"
            />
          </label>

          <label className="grid gap-2 text-sm text-white/72">
            Style
            <Select value={style} onChange={setStyle} options={styles} />
          </label>
          <label className="grid gap-2 text-sm text-white/72">
            Movement
            <Select value={movement} onChange={setMovement} options={movements} />
          </label>
          <label className="grid gap-2 text-sm text-white/72">
            Strap
            <Select value={strap} onChange={setStrap} options={straps} />
          </label>
          <label className="grid gap-3">
            <span className="flex justify-between text-sm text-white/72">
              Case size <strong className="text-white">{caseSize}mm</strong>
            </span>
            <input
              type="range"
              min="34"
              max="46"
              value={caseSize}
              onChange={(event) => setCaseSize(Number(event.target.value))}
              className="accent-[#d6b56d]"
            />
          </label>
          <label className="grid gap-2 text-sm text-white/72">
            Occasion
            <Select value={occasion} onChange={setOccasion} options={occasions} />
          </label>
          <label className="grid gap-2 text-sm text-white/72">
            Buyer profile
            <Select value={audience} onChange={setAudience} options={audiences} />
          </label>
        </div>
      </aside>

      <div>
        <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="text-sm uppercase text-white/44">{watches.length} curated watches indexed</p>
            <h2 className="editorial mt-2 text-4xl text-white">Your strongest matches</h2>
          </div>
          <p className="max-w-md text-sm leading-6 text-white/58">
            Scored on Indian pricing, wrist wearability, service confidence,
            movement value and occasion fit.
          </p>
        </div>
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {recs.map((watch, index) => (
            <motion.div
              key={watch.id}
              layout
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, delay: index * 0.05 }}
            >
              <WatchCard watch={watch} index={index} />
              <div className="mt-3 rounded-lg border border-white/10 bg-white/[0.03] p-4 text-sm leading-6 text-white/58">
                <strong className="text-[#f2dfb2]">Why it suits you:</strong> {watch.why}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Select({
  value,
  onChange,
  options,
}: {
  value: string;
  onChange: (value: string) => void;
  options: string[];
}) {
  return (
    <select
      value={value}
      onChange={(event) => onChange(event.target.value)}
      className="h-12 rounded-md border border-white/12 bg-[#111111] px-3 text-white outline-none transition focus:border-[#d6b56d]"
    >
      {options.map((option) => (
        <option key={option}>{option}</option>
      ))}
    </select>
  );
}
