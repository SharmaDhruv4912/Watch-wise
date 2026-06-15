import { NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/prisma";

const consultationSchema = z.object({
  name: z.string().min(2),
  email: z.email(),
  budget: z.string(),
  notes: z.string().optional(),
  wristSize: z.string().optional(),
});

export async function POST(request: Request) {
  const body = await request.json();
  const parsed = consultationSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid consultation intake" }, { status: 400 });
  }

  const consultation = await prisma.consultation.create({
    data: {
      name: parsed.data.name,
      email: parsed.data.email,
      budget: parsed.data.budget,
      notes: parsed.data.notes,
      wristSize: parsed.data.wristSize,
    },
  });

  return NextResponse.json({
    id: consultation.id,
    status: "lead_captured",
    next: ["create_razorpay_order", "sync_crm", "send_email_sequence", "reserve_calendly_slot"],
  });
}
