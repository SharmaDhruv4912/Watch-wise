"use client";

import Link from "next/link";
import { Menu, Search, UserRound } from "lucide-react";
import { motion } from "framer-motion";
import {
  SignInButton,
  UserButton,
  useUser,
} from "@clerk/nextjs";

const nav = [
  ["Finder", "/finder"],
  ["Guides", "/guides"],
  ["Compare", "/compare"],
  ["Encyclopedia", "/encyclopedia"],
  ["Consult", "/consultation"],
];

export function SiteNav() {
  const { isSignedIn, isLoaded } = useUser();

  return (
    <motion.header
      initial={{ y: -28, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="fixed left-0 right-0 top-0 z-50 border-b border-white/10 bg-[#0d0d0d]/78 backdrop-blur-2xl"
    >
      <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" className="group flex items-center gap-3">
          <span className="grid h-8 w-8 place-items-center rounded-full border border-[#d7aaa4]/50 bg-[#d7aaa4]/10 text-xs text-[#ead7b0]">
            W
          </span>
          <span className="editorial text-xl text-[#f7f1e8]">Watchwise</span>
        </Link>
        <div className="hidden items-center gap-7 text-sm text-white/68 lg:flex">
          {nav.map(([label, href]) => (
            <Link key={href} href={href} className="transition hover:text-white">
              {label}
            </Link>
          ))}
        </div>
        <div className="flex items-center gap-2">
          <Link
            href="/guides"
            className="grid h-10 w-10 place-items-center rounded-full border border-white/10 text-white/72 transition hover:border-white/25 hover:text-white"
            aria-label="Search guides"
          >
            <Search className="h-4 w-4" />
          </Link>
          {isLoaded && isSignedIn ? (
            <Link
              href="/community"
              className="hidden h-10 items-center gap-2 rounded-full border border-white/10 px-4 text-sm text-white/76 transition hover:border-white/25 hover:text-white sm:inline-flex"
            >
              <UserRound className="h-4 w-4" />
              Community
            </Link>
          ) : null}
          {isLoaded && !isSignedIn ? (
            <SignInButton mode="modal">
              <button className="hidden h-10 items-center gap-2 rounded-full border border-white/10 px-4 text-sm text-white/76 transition hover:border-white/25 hover:text-white sm:inline-flex">
                <UserRound className="h-4 w-4" />
                Sign in
              </button>
            </SignInButton>
          ) : null}
          {isLoaded && isSignedIn ? (
            <UserButton
              appearance={{
                elements: {
                  avatarBox: "h-10 w-10 border border-white/15",
                },
              }}
            />
          ) : null}
          <Link
            href="/finder"
            className="hidden h-10 items-center rounded-full bg-[#ead7b0] px-4 text-sm font-medium text-[#111111] transition hover:bg-[#f4efe5] md:inline-flex"
          >
            Find a watch
          </Link>
          <Link
            href="/finder"
            className="grid h-10 w-10 place-items-center rounded-full border border-white/10 text-white/72 lg:hidden"
            aria-label="Open menu"
          >
            <Menu className="h-4 w-4" />
          </Link>
        </div>
      </nav>
    </motion.header>
  );
}
