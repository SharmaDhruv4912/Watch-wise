import { headers } from "next/headers";
import { Webhook } from "svix";
import type { WebhookEvent } from "@clerk/nextjs/server";
import { prisma } from "@/lib/prisma";

export async function POST(request: Request) {
  const secret = process.env.CLERK_WEBHOOK_SECRET;

  if (!secret) {
    return Response.json({ error: "Missing CLERK_WEBHOOK_SECRET" }, { status: 500 });
  }

  const headerPayload = await headers();
  const svixId = headerPayload.get("svix-id");
  const svixTimestamp = headerPayload.get("svix-timestamp");
  const svixSignature = headerPayload.get("svix-signature");

  if (!svixId || !svixTimestamp || !svixSignature) {
    return Response.json({ error: "Missing Svix headers" }, { status: 400 });
  }

  const body = await request.text();
  const webhook = new Webhook(secret);

  let event: WebhookEvent;

  try {
    event = webhook.verify(body, {
      "svix-id": svixId,
      "svix-timestamp": svixTimestamp,
      "svix-signature": svixSignature,
    }) as WebhookEvent;
  } catch {
    return Response.json({ error: "Invalid webhook signature" }, { status: 400 });
  }

  if (event.type === "user.created" || event.type === "user.updated") {
    const email = event.data.email_addresses.find(
      (item) => item.id === event.data.primary_email_address_id,
    )?.email_address;

    if (email) {
      await prisma.user.upsert({
        where: { email },
        create: {
          clerkId: event.data.id,
          email,
          name: [event.data.first_name, event.data.last_name].filter(Boolean).join(" ") || null,
        },
        update: {
          clerkId: event.data.id,
          name: [event.data.first_name, event.data.last_name].filter(Boolean).join(" ") || null,
        },
      });
    }
  }

  if (event.type === "user.deleted" && event.data.id) {
    await prisma.user.updateMany({
      where: { clerkId: event.data.id },
      data: { clerkId: null },
    });
  }

  return Response.json({ received: true });
}
