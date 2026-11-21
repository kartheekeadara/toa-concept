"use client";

import { useEffect, useState } from "react";
import { FROM_HOME } from "@/lib/clay-content";

const STEP_MS = 2800;

/**
 * One country at a time, in its own script. It cycles on its own; choosing a country pins it.
 * Reduced motion: no cycling, the list still works.
 */
export default function FromHome() {
  const rows = FROM_HOME.rows;
  const [i, setI] = useState(0);
  const [pinned, setPinned] = useState(false);
  const [hovering, setHovering] = useState(false);

  useEffect(() => {
    if (pinned || hovering || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = window.setInterval(() => setI((n) => (n + 1) % rows.length), STEP_MS);
    return () => window.clearInterval(id);
  }, [pinned, hovering, rows.length]);

  const row = rows[i];

  return (
    <section
      aria-labelledby="from-home-title"
      className="overflow-x-clip border-t border-clay-line bg-clay-paper"
      onMouseEnter={() => setHovering(true)}
      onMouseLeave={() => setHovering(false)}
    >
      <div className="px-5 py-16 sm:px-8 sm:py-24 lg:px-12">
        <h2 id="from-home-title" className="text-[17px] text-clay-muted">
          {FROM_HOME.lead}
          <span className="sr-only"> {rows.map((r) => r.english).join(", ")}</span>
        </h2>

        {/* The moving part. Hidden from screen readers; the list below carries the same content. */}
        <div
          aria-hidden
          className="mt-2 flex h-[clamp(5.5rem,16.5vw,14.5rem)] items-end font-display font-light leading-[1.25] tracking-[-0.03em] text-clay-dark"
        >
          <span
            key={row.native}
            lang={row.lang}
            className="name-in block whitespace-nowrap"
            // Long names (საქართველო) step down so every name fits one line at any width.
            style={{ fontSize: `min(11.5rem, ${(13 * 7) / Math.max(7, [...row.native].length)}vw)` }}
          >
            {row.native}
          </span>
        </div>
        <p aria-hidden key={`${row.native}-meta`} className="name-in mt-3 text-[17px] text-clay-muted sm:text-[19px]">
          <span className="text-clay-ink">{row.english}.</span> {row.items[0].toUpperCase() + row.items.slice(1)}.
        </p>

        <ul className="mt-10 flex flex-wrap gap-x-1 gap-y-1 border-t border-clay-line pt-4">
          {rows.map((r, n) => {
            const on = n === i;
            return (
              <li key={r.native}>
                <button
                  type="button"
                  aria-pressed={on && pinned}
                  onClick={() => {
                    setI(n);
                    setPinned(true);
                  }}
                  onFocus={() => {
                    setI(n);
                    setPinned(true);
                  }}
                  className={`relative inline-flex min-h-11 items-center px-3 text-[15px] transition-colors first:pl-0 ${
                    on ? "text-clay-dark" : "text-clay-muted hover:text-clay-ink"
                  }`}
                >
                  {r.english}
                  <span
                    aria-hidden
                    className={`absolute bottom-1 left-3 right-3 h-px origin-left bg-clay-brass transition-transform duration-500 motion-reduce:transition-none [li:first-child_&]:left-0 ${
                      on ? "scale-x-100" : "scale-x-0"
                    }`}
                  />
                  <span className="sr-only">: {r.items}</span>
                </button>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
