"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";

export const eyebrowClass = "text-[14px] font-medium uppercase tracking-[0.14em] text-brand-red-deep";

export function PillButton({
  href,
  children,
  external,
  variant = "primary",
}: {
  href: string;
  children: ReactNode;
  external?: boolean;
  variant?: "primary" | "dark";
}) {
  const cls =
    variant === "primary"
      ? "inline-flex min-h-12 items-center rounded-pill bg-brand-red-deep px-6 text-[14px] font-medium text-white transition-colors hover:bg-[#b0131a]"
      : "inline-flex min-h-11 items-center rounded-pill bg-clay-dark px-6 text-[14px] font-medium text-clay-paper transition-opacity hover:opacity-85";
  if (external) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={cls}>
        {children}
      </a>
    );
  }
  return (
    <Link href={href} className={cls}>
      {children}
    </Link>
  );
}

export function ArrowLink({
  href,
  children,
  className = "text-clay-ink",
}: {
  href: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <Link href={href} className={`group mt-6 inline-flex items-center gap-2 text-[15px] underline-offset-4 hover:underline ${className}`}>
      {children}
      <span aria-hidden className="text-brand-red-deep transition-transform group-hover:translate-x-0.5">
        →
      </span>
    </Link>
  );
}

export function Reveal({ children, className = "" }: { children: ReactNode; className?: string }) {
  const reduce = useReducedMotion();
  if (reduce) return <div className={className}>{children}</div>;
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-8%" }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

export function MediaPanel({
  children,
  className = "",
  style,
}: {
  children: ReactNode;
  className?: string;
  style?: React.CSSProperties;
}) {
  return (
    <motion.div
      className={`relative isolate w-full overflow-hidden ${className}`}
      style={style}
      initial={{ opacity: 0.94 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 1.0, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  );
}