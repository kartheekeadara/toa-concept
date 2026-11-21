"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { PRESENTATION } from "@/lib/flags";

const LINKS = [
  { href: "/concepts/a", label: "A · Reel" },
  { href: "/concepts/b", label: "B · Counter" },
  { href: "/concepts/c", label: "C · Table" },
] as const;

export default function ConceptReviewNav() {
  const path = usePathname();
  if (PRESENTATION) return null;

  return (
    <nav
      aria-label="Hero concept options"
      className="fixed bottom-4 left-1/2 z-50 flex -translate-x-1/2 gap-1 rounded-pill border border-clay-line bg-clay-paper/95 px-2 py-1.5 shadow-lg backdrop-blur"
    >
      {LINKS.map(({ href, label }) => {
        const active = path === href;
        return (
          <Link
            key={href}
            href={href}
            className={`rounded-pill px-3 py-1.5 text-[12px] font-medium transition-colors ${
              active ? "bg-clay-dark text-clay-paper" : "text-clay-muted hover:text-clay-ink"
            }`}
          >
            {label}
          </Link>
        );
      })}
    </nav>
  );
}