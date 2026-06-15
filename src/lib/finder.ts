import { watches, type Watch } from "@/lib/data";

export type FinderInput = {
  budget?: number;
  style?: string;
  brand?: string;
  movement?: string;
  strap?: string;
  caseSize?: number;
  occasion?: string;
  audience?: string;
};

export function recommendWatches(input: FinderInput): Watch[] {
  return [...watches]
    .map((watch) => {
      let score = watch.valueScore + watch.designScore;

      if (input.budget) {
        score += watch.price <= input.budget ? 38 : -Math.min(44, (watch.price - input.budget) / 5000);
      }

      if (input.style && input.style !== "Any" && watch.style === input.style) score += 26;
      if (input.brand && input.brand !== "Any" && watch.brand === input.brand) score += 18;
      if (input.movement && input.movement !== "Any" && watch.movement === input.movement) score += 24;
      if (input.strap && input.strap !== "Any" && watch.strap === input.strap) score += 14;
      if (input.caseSize) score -= Math.abs(watch.caseSize - input.caseSize) * 2.5;
      if (input.occasion && input.occasion !== "Any" && watch.occasion.includes(input.occasion)) score += 20;
      if (input.audience && input.audience !== "Any" && watch.audience === input.audience) score += 18;

      return { watch, score };
    })
    .sort((a, b) => b.score - a.score)
    .slice(0, 3)
    .map(({ watch }) => watch);
}
