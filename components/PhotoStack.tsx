"use client";

import { useState } from "react";
import Image from "next/image";
import { STORE_PHOTOS } from "@/app/content";
import { ArrowIcon } from "./ui";

/**
 * A small stack of store photos, one on top at a time, the next two peeking out behind.
 * Moves only when the visitor presses the arrows. Transitions are off under reduced motion.
 */
export default function PhotoStack() {
  const [i, setI] = useState(0);
  const n = STORE_PHOTOS.length;
  const go = (d: number) => setI((v) => (v + d + n) % n);

  // position of each photo relative to the top one: 0 = front, 1-2 = peeking behind, rest hidden
  const pos = (k: number) => (k - i + n) % n;
  const style = (p: number): React.CSSProperties =>
    p === 0
      ? { transform: "none", zIndex: 30, opacity: 1 }
      : p <= 2
        ? { transform: `translate(${p * 16}px, ${p * -10}px) rotate(${p * 3}deg)`, zIndex: 30 - p, opacity: 1 }
        : { transform: "translate(0,0) rotate(0deg)", zIndex: 0, opacity: 0 };

  return (
    <div>
      <div className="relative mr-8 aspect-[4/5] sm:mr-10 sm:aspect-[4/3] lg:aspect-[4/5]">
        {STORE_PHOTOS.map((ph, k) => {
          const p = pos(k);
          return (
            <div
              key={ph.photo}
              aria-hidden={p !== 0 || undefined}
              className="absolute inset-0 overflow-hidden rounded-[1.75rem] bg-cream-deep shadow-[0_24px_50px_-28px_rgba(58,58,58,0.7)] ring-1 ring-brand-ink/10 transition-[transform,opacity] duration-500 ease-out motion-reduce:transition-none"
              style={style(p)}
            >
              <Image src={ph.photo} alt={p === 0 ? ph.alt : ""} fill sizes="(min-width: 1024px) 45vw, 90vw" className="object-cover" />
            </div>
          );
        })}
      </div>
      <div className="mt-6 flex items-center gap-3">
        <button type="button" onClick={() => go(-1)} aria-label="Previous photo" className="grid h-11 w-11 place-items-center rounded-full border border-brand-ink/25 transition-colors hover:bg-brand-ink/5">
          <span className="rotate-180"><ArrowIcon /></span>
        </button>
        <button type="button" onClick={() => go(1)} aria-label="Next photo" className="grid h-11 w-11 place-items-center rounded-full border border-brand-ink/25 transition-colors hover:bg-brand-ink/5">
          <ArrowIcon />
        </button>
        <p className="ml-2 text-[14px] tabular-nums text-brand-ink-soft" aria-live="polite">
          {i + 1} / {n}
        </p>
      </div>
    </div>
  );
}
