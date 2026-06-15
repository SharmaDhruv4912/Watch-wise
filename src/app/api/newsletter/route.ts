import { NextResponse } from "next/server";
import { z } from "zod";

const newsletterSchema = z.object({
  email: z.email(),
  source: z.string().default("website"),
});

export async function POST(request: Request) {
  const parsed = newsletterSchema.safeParse(await request.json());

  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid email" }, { status: 400 });
  }

  return NextResponse.json({
    subscribed: true,
    segment: "india_watch_letter",
  });
}
