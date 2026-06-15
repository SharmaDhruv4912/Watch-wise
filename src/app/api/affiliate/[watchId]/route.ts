import { NextResponse } from "next/server";
import { watches } from "@/lib/data";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ watchId: string }> },
) {
  const { watchId } = await params;
  const watch = watches.find((item) => item.id === watchId);

  if (!watch) {
    return NextResponse.json({ error: "Watch not found" }, { status: 404 });
  }

  return NextResponse.redirect(
    new URL(`/?affiliate=${watch.id}&retailer=${encodeURIComponent(watch.retailer)}`, "https://watchwise.in"),
  );
}
