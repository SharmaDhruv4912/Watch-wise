import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import {
  buildAffiliateRedirectUrl,
  getAffiliateDestination,
} from "@/lib/affiliate";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ watchId: string }> },
) {
  const { watchId } = await params;
  const destination = getAffiliateDestination(watchId);

  if (!destination) {
    return NextResponse.json({ error: "Watch not found" }, { status: 404 });
  }

  try {
    const watch = await prisma.watch.findUnique({
      where: { slug: watchId },
      include: {
        affiliateLinks: {
          where: { retailer: destination.retailer },
          take: 1,
        },
      },
    });

    if (watch?.affiliateLinks[0]) {
      await prisma.affiliateLink.update({
        where: { id: watch.affiliateLinks[0].id },
        data: { clicks: { increment: 1 } },
      });
    } else if (watch) {
      await prisma.affiliateLink.create({
        data: {
          watchId: watch.id,
          retailer: destination.retailer,
          url: destination.url,
          network: destination.network,
          clicks: 1,
        },
      });
    }
  } catch (error) {
    console.error("Affiliate click tracking skipped", error);
  }

  return NextResponse.redirect(buildAffiliateRedirectUrl(destination), 302);
}
