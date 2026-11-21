"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { PRESENTATION } from "@/lib/flags";
import type { ReactNode } from "react";

export function PillButton({
  href,
  children,
  external,
}: {
  href: string;
  children: ReactNode;
  external?: boolean;
}) {
  const cls =
    "inline-flex min-h-11 items-center rounded-pill bg-clay-dark px-6 text-[14px] font-medium text-clay-paper transition-opacity hover:opacity-85";
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

export function ArrowLink({ href, children }: { href: string; children: ReactNode }) {
  return (
    <Link href={href} className="group inline-flex items-center gap-2 text-[15px] text-clay-ink underline-offset-4 hover:underline">
      {children}
      <span aria-hidden className="transition-transform group-hover:translate-x-0.5">
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

export function ConceptTag() {
  if (PRESENTATION) return null;
  return (
    <span className="pointer-events-none absolute left-3 top-3 z-10 rounded bg-clay-dark/80 px-2 py-0.5 font-mono text-[10px] uppercase tracking-wide text-clay-paper">
      Concept image
    </span>
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
      initial={{ scale: 1.02 }}
      whileInView={{ scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 1.2, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  );
}