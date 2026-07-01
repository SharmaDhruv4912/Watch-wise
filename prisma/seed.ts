import { PrismaClient, MovementType, StrapType, WatchStyle } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import { watches } from "../src/lib/data";
import { getAffiliateDestination } from "../src/lib/affiliate";

const adapter = new PrismaPg(process.env.DATABASE_URL ?? "");
const prisma = new PrismaClient({ adapter });

const styleMap: Record<string, WatchStyle> = {
  Dress: "DRESS",
  Dive: "DIVE",
  Field: "FIELD",
  Everyday: "EVERYDAY",
  Chronograph: "CHRONOGRAPH",
  Integrated: "INTEGRATED",
};

const movementMap: Record<string, MovementType> = {
  Automatic: "AUTOMATIC",
  Quartz: "QUARTZ",
  Solar: "SOLAR",
  "Spring Drive": "SPRING_DRIVE",
};

const strapMap: Record<string, StrapType> = {
  Bracelet: "BRACELET",
  Leather: "LEATHER",
  Rubber: "RUBBER",
  NATO: "NATO",
};

async function main() {
  for (const watch of watches) {
    const brand = await prisma.brand.upsert({
      where: { slug: watch.brand.toLowerCase().replace(/\s+/g, "-") },
      create: {
        slug: watch.brand.toLowerCase().replace(/\s+/g, "-"),
        name: watch.brand,
        country: watch.brand === "Longines" || watch.brand === "Tissot" ? "Switzerland" : "Japan",
      },
      update: { name: watch.brand },
    });

    const savedWatch = await prisma.watch.upsert({
      where: { slug: watch.id },
      create: {
        slug: watch.id,
        name: watch.name,
        brandId: brand.id,
        priceInr: watch.price,
        style: styleMap[watch.style],
        movement: movementMap[watch.movement],
        strap: strapMap[watch.strap],
        caseSizeMm: watch.caseSize,
        crystal: watch.crystal,
        waterResistance: watch.waterResistance,
        valueScore: watch.valueScore,
        designScore: watch.designScore,
      },
      update: {
        name: watch.name,
        priceInr: watch.price,
        style: styleMap[watch.style],
        movement: movementMap[watch.movement],
        strap: strapMap[watch.strap],
        caseSizeMm: watch.caseSize,
        crystal: watch.crystal,
        waterResistance: watch.waterResistance,
        valueScore: watch.valueScore,
        designScore: watch.designScore,
      },
    });

    const destination = getAffiliateDestination(watch.id);
    if (destination) {
      const existingLink = await prisma.affiliateLink.findFirst({
        where: {
          watchId: savedWatch.id,
          retailer: destination.retailer,
        },
      });

      if (existingLink) {
        await prisma.affiliateLink.update({
          where: { id: existingLink.id },
          data: {
            url: destination.url,
            network: destination.network,
          },
        });
      } else {
        await prisma.affiliateLink.create({
          data: {
            watchId: savedWatch.id,
            retailer: destination.retailer,
            url: destination.url,
            network: destination.network,
          },
        });
      }
    }
  }

  console.log(`Seeded ${watches.length} watches with affiliate links.`);
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
