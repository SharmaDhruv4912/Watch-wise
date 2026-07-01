"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { motion, useMotionValue, useSpring } from "framer-motion";

type Props = {
  href: string;
  children: React.ReactNode;
  variant?: "solid" | "ghost";
};

export function MagneticButton({ href, children, variant = "solid" }: Props) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 180, damping: 18 });
  const springY = useSpring(y, { stiffness: 180, damping: 18 });

  return (
    <motion.div
      style={{ x: springX, y: springY }}
      onMouseMove={(event) => {
        const rect = event.currentTarget.getBoundingClientRect();
        x.set((event.clientX - rect.left - rect.width / 2) * 0.16);
        y.set((event.clientY - rect.top - rect.height / 2) * 0.16);
      }}
      onMouseLeave={() => {
        x.set(0);
        y.set(0);
      }}
      className="inline-flex"
    >
      <Link
        href={href}
        className={
          variant === "solid"
            ? "group inline-flex min-h-12 items-center gap-3 rounded-full bg-[#ead7b0] px-5 text-sm font-medium text-[#111111] shadow-[0_12px_40px_rgba(214,181,109,.18)] transition hover:bg-[#f4efe5]"
            : "group inline-flex min-h-12 items-center gap-3 rounded-full border border-white/15 bg-white/[0.03] px-5 text-sm font-medium text-[#f7f1e8] transition hover:border-[#d7aaa4]/60 hover:text-white"
        }
      >
        <span>{children}</span>
        <ArrowUpRight
          aria-hidden="true"
          className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
        />
      </Link>
    </motion.div>
  );
}
