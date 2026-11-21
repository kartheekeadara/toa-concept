"use client";

import Image from "next/image";
import { useState } from "react";
import { HERO_PHOTO } from "@/app/content";
import { FAQ } from "@/lib/clay-content";
import { PRESENTATION, isPlaceholder } from "@/lib/flags";
import { Ph } from "@/components/ui";

export default function GoodToKnow() {
  const items = FAQ.filter((item) => !(PRESENTATION && isPlaceholder(item.a)));
  const [open, setOpen] = useState<number | null>(null);

  return (
    <section aria-labelledby="faq-title" className="border-t border-clay-line bg-clay-paper">
      <div className="grid gap-10 px-5 py-16 sm:px-8 sm:py-24 lg:grid-cols-12 lg:items-center lg:gap-12 lg:px-12">
        <figure className="lg:col-span-7">

          <div className="relative aspect-[3/2] overflow-hidden bg-clay-line">
            <Image
              src={HERO_PHOTO}
              alt="Taste of Europe storefront at 11926 Providence Rd W, with a red Taste of Europe Parking Only sign by the door"
              fill
              className="object-cover object-[50%_48%]"
              sizes="(min-width: 1024px) 58vw, 100vw"
            />
          </div>
        </figure>

        <div className="lg:col-span-5">
          <h2 id="faq-title" className="font-display text-[clamp(2.25rem,3.6vw,3.25rem)] font-light leading-[1.02] tracking-[-0.015em] text-clay-ink">
            Good to know
          </h2>
          {items.length > 0 ? (
            <ul className="mt-8 divide-y divide-clay-line border-y border-clay-line">
              {items.map((item, i) => {
                const expanded = open === i;
                return (
                  <li key={item.q}>
                    <button
                      type="button"
                      className="flex min-h-14 w-full items-center justify-between gap-4 py-4 text-left text-[17px] text-clay-ink"
                      aria-expanded={expanded}
                      onClick={() => setOpen(expanded ? null : i)}
                    >
                      <span data-draft>{item.q}</span>
                      <span aria-hidden className="text-[22px] font-light text-clay-brass">
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
          ) : null}
        </div>
      </div>
    </section>
  );
}
