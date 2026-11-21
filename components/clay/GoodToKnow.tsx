"use client";

import Image from "next/image";
import { useState } from "react";
import { HERO_PHOTO } from "@/app/content";
import { FAQ } from "@/lib/clay-content";
import { PRESENTATION, isPlaceholder } from "@/lib/flags";
import { Ph } from "@/components/ui";
import { Reveal, eyebrowClass } from "./ui";

export default function GoodToKnow() {
  const items = FAQ.filter((item) => !(PRESENTATION && isPlaceholder(item.a)));
  const [open, setOpen] = useState<number | null>(null);

  return (
    <section aria-labelledby="faq-title" className="border-t border-clay-line bg-clay-paper">
      <div className="grid gap-10 px-5 py-14 sm:px-8 sm:py-16 lg:grid-cols-12 lg:gap-12">
        <figure className="lg:col-span-6">
          <div className="relative aspect-[3/2] overflow-hidden bg-clay-line">
            <Image
              src={HERO_PHOTO}
              alt="Taste of Europe storefront at 11926 Providence Rd W, with a red Taste of Europe Parking Only sign by the door"
              fill
              className="object-cover object-[50%_70%]"
              sizes="(min-width: 1024px) 50vw, 100vw"
            />
          </div>
          <figcaption className="mt-3 text-[14px] text-clay-muted">The shop, Suite E2. Parking is right out front.</figcaption>
        </figure>

        <div className="lg:col-span-6">
          <Reveal>
            <h2 id="faq-title" className={eyebrowClass}>
              Good to know
            </h2>
          </Reveal>
          {items.length > 0 ? (
            <ul className="mt-4 divide-y divide-clay-line border-y border-clay-line">
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
          ) : null}
        </div>
      </div>
    </section>
  );
}
