import { NextResponse } from "next/server";
import { z } from "zod";
import { sendEmail } from "@/lib/email";

const newsletterSchema = z.object({
  email: z.email(),
  source: z.string().default("website"),
});

export async function POST(request: Request) {
  const parsed = newsletterSchema.safeParse(await request.json());

  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid email" }, { status: 400 });
  }

  await sendEmail({
    to: parsed.data.email,
    subject: "Welcome to the Watchwise letter",
    html: `
      <div style="font-family:Inter,Arial,sans-serif;background:#0d0d0d;color:#f7f1e8;padding:32px">
        <div style="max-width:560px;margin:0 auto;border:1px solid rgba(255,255,255,.12);border-radius:10px;padding:28px;background:#141414">
          <p style="color:#d6b56d;text-transform:uppercase;font-size:12px;letter-spacing:.08em">Watchwise India</p>
          <h1 style="font-family:Georgia,serif;font-weight:400;font-size:32px;line-height:1.08">You are on the list.</h1>
          <p style="line-height:1.7;color:#d6d0c7">Expect buying guides, price notes, collector essays and practical Indian watch recommendations.</p>
        </div>
      </div>
    `,
  });

  return NextResponse.json({
    subscribed: true,
    segment: "india_watch_letter",
  });
}
