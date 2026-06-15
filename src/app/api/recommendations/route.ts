import { NextResponse } from "next/server";
import { z } from "zod";
import { recommendWatches } from "@/lib/finder";

const schema = z.object({
  budget: z.number().optional(),
  style: z.string().optional(),
  brand: z.string().optional(),
  movement: z.string().optional(),
  strap: z.string().optional(),
  caseSize: z.number().optional(),
  occasion: z.string().optional(),
  audience: z.string().optional(),
});

export async function POST(request: Request) {
  const body = await request.json();
  const parsed = schema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid recommendation input" }, { status: 400 });
  }

  return NextResponse.json({
    recommendations: recommendWatches(parsed.data),
    generatedAt: new Date().toISOString(),
  });
}
