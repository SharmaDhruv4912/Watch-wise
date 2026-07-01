import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";

function getAdminEmails() {
  return (process.env.ADMIN_EMAIL ?? "")
    .split(",")
    .map((email) => email.trim().toLowerCase())
    .filter(Boolean);
}

export async function requireAdmin() {
  const { userId } = await auth();

  if (!userId) {
    redirect("/");
  }

  const user = await prisma.user.findFirst({
    where: { clerkId: userId },
  });

  const adminEmails = getAdminEmails();
  const isAdmin =
    user?.role === "ADMIN" ||
    Boolean(user?.email && adminEmails.includes(user.email.toLowerCase()));

  if (!isAdmin) {
    redirect("/");
  }

  return user;
}

export function isAdminEmail(email: string) {
  return getAdminEmails().includes(email.trim().toLowerCase());
}
