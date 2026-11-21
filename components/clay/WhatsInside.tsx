"use client";

import Image from "next/image";
import { useState } from "react";
import { INSIDE, INSIDE_TILES } from "@/lib/clay-content";

/** Counter-by-counter: one large photo, and the list beside it decides which counter it shows. */
export default function WhatsInside() {
  const [active, setActive] = useState(0);

  return (
    <section id="inside" aria-labelledby="inside-title" className="scroll-mt-16 bg-clay-paper">
      <div className="px-5 py-16 sm:px-8 sm:py-24 lg:px-12">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <h2
            id="inside-title"
            className="font-display text-[clamp(2.5rem,5.2vw,4.5rem)] font-light leading-[1] tracking-[-0.02em] text-clay-ink"
          >
            {INSIDE.title}
          </h2>
          <p className="max-w-sm text-[17px] leading-relaxed text-clay-muted">{INSIDE.intro}</p>
        </div>

        <div className="mt-10 grid gap-8 lg:mt-14 lg:grid-cols-12 lg:gap-12">
          <div id="counter-photo" className="relative aspect-[4/3] overflow-hidden bg-clay-line lg:col-span-7 lg:aspect-[5/4]">
            {INSIDE_TILES.map((tile, i) => (
              <Image
                key={tile.name}
                src={tile.image}
                alt={i === active ? tile.alt : ""}
                aria-hidden={i !== active}
                fill
                sizes="(min-width: 1024px) 58vw, 100vw"
                className={`object-cover transition-opacity duration-500 motion-reduce:transition-none ${i === active ? "opacity-100" : "opacity-0"}`}
              />
            ))}
          </div>

          <ul className="border-t border-clay-line lg:col-span-5 lg:self-center">
            {INSIDE_TILES.map((tile, i) => {
              const on = i === active;
              return (
                <li key={tile.name} className="border-b border-clay-line">
                  <button
                    type="button"
                    aria-controls="counter-photo"
                    aria-pressed={on}
                    onClick={() => setActive(i)}
                    onMouseEnter={() => setActive(i)}
                    onFocus={() => setActive(i)}
                    className="group grid w-full grid-cols-[1.75rem_1fr] items-baseline gap-x-3 py-5 text-left sm:py-6"
                  >
                    <span
                      aria-hidden
                      className={`h-px translate-y-[-0.35em] self-center bg-clay-brass transition-all duration-300 motion-reduce:transition-none ${on ? "w-full" : "w-0 group-hover:w-3"}`}
                    />
                    <span>
                      <span
                        className={`block font-display text-[clamp(1.6rem,2.4vw,2.25rem)] font-light leading-tight tracking-[-0.01em] transition-colors ${on ? "text-clay-dark" : "text-clay-ink/70 group-hover:text-clay-ink"}`}
                      >
                        {tile.name}
                      </span>
                      <span data-draft className={`mt-1 block text-[15px] leading-relaxed sm:text-[16px] ${on ? "text-clay-muted" : "text-clay-muted/80"}`}>
                        {tile.line}
                      </span>
                    </span>
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </section>
  );
}
