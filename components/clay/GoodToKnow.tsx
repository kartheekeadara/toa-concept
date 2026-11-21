"use client";

import { useState } from "react";
import { FAQ } from "@/lib/clay-content";
import { PRESENTATION, isPlaceholder } from "@/lib/flags";
import { Ph } from "@/components/ui";
import { Reveal } from "./ui";

export default function GoodToKnow() {
  const items = FAQ.filter((item) => !(PRESENTATION && isPlaceholder(item.a)));
  const [open, setOpen] = useState<number | null>(null);

  if (items.length === 0) return null;

  return (
    <section aria-labelledby="faq-title" className="border-t border-clay-line bg-clay-paper">
      <div className="px-5 py-14 sm:px-8 sm:py-16">
        <Reveal>
          <h2 id="faq-title" className="text-[13px] font-medium uppercase tracking-[0.14em] text-clay-muted">
            Good to know
          </h2>
        </Reveal>
        <ul className="mt-6 divide-y divide-clay-line">
          {items.map((item, i) => {
            const expanded = open === i;
            return (
              <li key={item.q}>
                <button
                  type="button"
                  className="flex w-full items-center justify-between gap-4 py-4 text-left text-[17px] text-clay-ink"
                  aria-expanded={expanded}
                  onClick={() => setOpen(expanded ? null : i)}
                >
                  <span data-draft>{item.q}</span>
                  <span aria-hidden className="text-clay-muted">
                    {expanded ? "−" : "+"}
                  </span>
                </button>
                {expanded ? (
                  <p className="pb-4 text-[16px] leading-relaxed text-clay-muted">
                    {isPlaceholder(item.a) ? <Ph>{item.a}</Ph> : item.a}
                  </p>
                ) : null}
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}