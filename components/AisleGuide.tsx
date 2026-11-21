"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { CATEGORIES } from "@/app/content";

/**
 * "What's inside" as an aisle guide.
 * Desktop: numbered list (vertical tabs) on the left; one large photo + one-liner on the right that swaps on hover, focus or click.
 * Mobile: swipeable row of tall photo cards.
 */
export default function AisleGuide() {
  const [active, setActive] = useState(0);
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);
  const n = CATEGORIES.length;
  const num = (i: number) => String(i + 1).padStart(2, "0");

  // arrow keys move between tabs (WAI-ARIA tabs pattern, automatic activation)
  const onKey = (e: React.KeyboardEvent, i: number) => {
    const next = e.key === "ArrowDown" ? (i + 1) % n : e.key === "ArrowUp" ? (i - 1 + n) % n : e.key === "Home" ? 0 : e.key === "End" ? n - 1 : null;
    if (next === null) return;
    e.preventDefault();
    setActive(next);
    tabs.current[next]?.focus();
  };

  const c = CATEGORIES[active];

  return (
    <>
      {/* desktop */}
      <div className="hidden gap-14 md:grid md:grid-cols-12">
        <div role="tablist" aria-orientation="vertical" aria-label="Aisles" className="md:col-span-5">
          {CATEGORIES.map((cat, i) => {
            const on = i === active;
            return (
              <button
                key={cat.name}
                ref={(el) => { tabs.current[i] = el; }}
                id={`aisle-tab-${i}`}
                type="button"
                role="tab"
                aria-selected={on}
                aria-controls="aisle-panel"
                tabIndex={on ? 0 : -1}
                onClick={() => setActive(i)}
                onMouseEnter={() => setActive(i)}
                onFocus={() => setActive(i)}
                onKeyDown={(e) => onKey(e, i)}
                className="group flex w-full items-baseline gap-5 border-b border-brand-ink/10 py-3.5 text-left focus-visible:outline-brand-ink"
              >
                <span className={`w-7 shrink-0 font-sans text-[13px] font-semibold tabular-nums ${on ? "text-brand-red-deep" : "text-brand-ink-soft"}`}>{num(i)}</span>
                <span className={`font-serif text-[2rem] font-medium leading-tight transition-colors duration-200 lg:text-[2.4rem] ${on ? "text-brand-ink" : "text-brand-ink/60 group-hover:text-brand-ink"}`}>
                  {cat.name}
                </span>
              </button>
            );
          })}
        </div>

        <div id="aisle-panel" role="tabpanel" aria-labelledby={`aisle-tab-${active}`} className="md:col-span-7">
          <div className="relative aspect-[4/3] overflow-hidden rounded-[1.75rem] bg-cream-deep">
            {CATEGORIES.map((cat, i) => (
              <Image
                key={cat.name}
                src={cat.photo}
                alt={i === active ? cat.alt : ""}
                aria-hidden={i !== active || undefined}
                fill
                sizes="(min-width: 768px) 55vw, 1px"
                className={`object-cover transition-opacity duration-500 motion-reduce:transition-none ${i === active ? "opacity-100" : "opacity-0"}`}
              />
            ))}
          </div>
          <p className="mt-5 text-[17px] text-brand-ink-soft">
            <span className="mr-3 font-serif text-[1.35rem] font-medium text-brand-ink">{c.name}</span>
            <span data-draft>{c.line}</span>
          </p>
        </div>
      </div>

      {/* mobile */}
      <ul aria-label="Aisles" className="-mx-6 flex snap-x snap-mandatory scroll-px-6 gap-4 overflow-x-auto px-6 py-1 [scrollbar-width:none] focus-visible:outline focus-visible:outline-2 focus-visible:outline-brand-ink md:hidden [&::-webkit-scrollbar]:hidden">
        {CATEGORIES.map((cat, i) => (
          <li key={cat.name} className="w-[72%] shrink-0 snap-start">
            <div className="relative aspect-[3/4] overflow-hidden rounded-2xl bg-cream-deep">
              <Image src={cat.photo} alt={cat.alt} fill sizes="72vw" className="object-cover" />
            </div>
            <p className="mt-3 text-[12px] font-semibold tabular-nums text-brand-red-deep">{num(i)}</p>
            <h3 className="font-serif text-[1.7rem] font-medium leading-tight">{cat.name}</h3>
            <p data-draft className="mt-1 text-[15px] leading-snug text-brand-ink-soft">{cat.line}</p>
          </li>
        ))}
      </ul>
    </>
  );
}
