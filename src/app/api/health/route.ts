import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const checks = {
    database: false,
    razorpay: Boolean(process.env.RAZORPAY_KEY_ID && process.env.RAZORPAY_KEY_SECRET),
    clerk: Boolean(process.env.CLERK_SECRET_KEY),
    email: Boolean(process.env.RESEND_API_KEY),
  };

  try {
    await prisma.$queryRaw`SELECT 1`;
    checks.database = true;
  } catch {
    checks.database = false;
  }

  const healthy = checks.database;

  return NextResponse.json(
    {
      status: healthy ? "ok" : "degraded",
      checks,
      timestamp: new Date().toISOString(),
    },
    { status: healthy ? 200 : 503 },
  );
}
