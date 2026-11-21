"use client";

import Link from "next/link";
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
  variant?: "primary" | "dark" | "light" | "outline";
}) {
  const base = "inline-flex min-h-12 items-center justify-center rounded-pill px-7 text-[15px] font-medium transition-colors";
  const cls = {
    // on linen
    primary: `${base} bg-clay-dark text-clay-ivory hover:bg-clay-deep`,
    dark: `${base} bg-clay-dark text-clay-ivory hover:bg-clay-deep`,
    // on green or over photos
    light: `${base} bg-clay-ivory text-clay-dark hover:bg-white`,
    outline: `${base} border border-clay-ivory/35 text-clay-ivory hover:border-clay-ivory/70`,
  }[variant];
  if (href.startsWith("tel:") || href.startsWith("#")) {
    return (
      <a href={href} className={cls}>
        {children}
      </a>
    );
  }
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
    <a
      href={href}
      className={`mt-4 inline-flex min-h-11 items-center text-[15px] underline decoration-clay-brass decoration-1 underline-offset-[6px] hover:decoration-2 ${className}`}
    >
      {children}
    </a>
  );
}

/** Plain wrapper. Per-section entrance animations were removed on purpose. */
export function Reveal({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <div className={className}>{children}</div>;
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
    <div className={`relative isolate w-full overflow-hidden ${className}`} style={style}>
      {children}
    </div>
  );
}
