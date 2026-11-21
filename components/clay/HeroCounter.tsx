"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { CLAY_HEADLINE, CLAY_SUBHEAD, HERO_FRAMES } from "@/lib/clay-content";

const FRAME_MS = 6500;

/**
 * Imagery first, one line of copy, nothing else. Status lives in the header, Directions in the
 * header (desktop) and the sticky bar (mobile), so the hero doesn't repeat them.
 */
export default function HeroCounter() {
  const [frame, setFrame] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = window.setInterval(() => setFrame((f) => (f + 1) % HERO_FRAMES.length), FRAME_MS);
    return () => window.clearInterval(id);
  }, [paused]);

  const lines = CLAY_HEADLINE.split("|");

  return (
    <section aria-labelledby="hero-title" className="relative isolate min-h-[calc(100svh-3.5rem)] overflow-hidden bg-clay-deep sm:min-h-[calc(100svh-4rem)]">
      <div aria-live="off" className="absolute inset-0 -z-10">
        {HERO_FRAMES.map((f, i) => (
          <Image
            key={f.src}
            src={f.src}
            alt={i === frame ? f.alt : ""}
            aria-hidden={i !== frame}
            fill
            priority={i === 0}
            sizes="100vw"
            style={{ objectPosition: f.pos }}
            className={`object-cover transition-opacity duration-[1600ms] ease-out motion-reduce:transition-none ${
              i === frame ? "hero-kenburns opacity-100" : "opacity-0"
            }`}
          />
        ))}
      </div>
      <div className="absolute inset-0 -z-10 bg-[linear-gradient(to_right,rgba(14,22,18,0.5)_0%,rgba(14,22,18,0)_65%)]" />
      <div className="absolute inset-0 -z-10 bg-[linear-gradient(to_top,rgba(14,22,18,0.92)_0%,rgba(14,22,18,0.55)_34%,rgba(14,22,18,0.12)_70%,rgba(14,22,18,0.3)_100%)]" />

      <div className="flex min-h-[calc(100svh-3.5rem)] flex-col justify-end px-5 pb-10 pt-10 sm:min-h-[calc(100svh-4rem)] sm:px-8 sm:pb-14 lg:px-12">
        <h1
          id="hero-title"
          data-draft
          className="font-display text-[clamp(2.9rem,7.6vw,7.25rem)] font-light leading-[0.98] tracking-[-0.02em] text-clay-ivory"
        >
          {lines.map((line, i) => (
            <span key={line} className="block overflow-hidden pb-[0.06em]">
              <span className="hero-rise block" style={{ animationDelay: `${120 + i * 110}ms` }}>
                {line}{" "}
              </span>
            </span>
          ))}
        </h1>

        <div className="hero-fade mt-8 flex items-end justify-between gap-6 sm:mt-10" style={{ animationDelay: "560ms" }}>
          <p data-draft className="max-w-md text-[17px] leading-relaxed text-clay-ivory/85 sm:text-[19px]">
            {CLAY_SUBHEAD}
          </p>

          <div className="hidden shrink-0 items-center gap-4 sm:flex">
            <div className="flex gap-2" aria-hidden>
              {HERO_FRAMES.map((f, i) => (
                <span key={f.src} className="relative h-px w-8 overflow-hidden bg-clay-ivory/25">
                  {i === frame ? (
                    <span
                      key={`${frame}-${paused}`}
                      className={`absolute inset-y-0 left-0 bg-clay-ivory ${paused ? "w-full" : "hero-progress"}`}
                      style={{ animationDuration: `${FRAME_MS}ms` }}
                    />
                  ) : null}
                </span>
              ))}
            </div>
            <button
              type="button"
              onClick={() => setPaused((p) => !p)}
              className="inline-flex min-h-11 items-center px-2 text-[14px] text-clay-ivory/75 underline-offset-[6px] hover:text-clay-ivory hover:underline"
            >
              {paused ? "Play" : "Pause"}
              <span className="sr-only"> background photos</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
