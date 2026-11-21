"use client";

import { useState } from "react";
import { ANNOUNCEMENTS } from "@/app/content";
import { Val } from "./ui";

/**
 * Thin announcement bar under the nav. Lines come from data/store.json `announcements`
 * (examples: "Holiday candy baskets are in", "Fresh smoked fish this week").
 * Scrolls slowly; pauses on hover, keyboard focus or the pause button (WCAG 2.2.2).
 * Static and wrapped when prefers-reduced-motion is on (see globals.css). Not rendered when there are no lines.
 */
export default function Ticker() {
  const [paused, setPaused] = useState(false);
  if (ANNOUNCEMENTS.length === 0) return null;

  // Each copy is repeated so one copy is always wider than the screen; two copies make the -50% loop seamless.
  const reps = Math.max(2, Math.ceil(6 / ANNOUNCEMENTS.length));
  const lines = Array.from({ length: reps }, () => ANNOUNCEMENTS).flat();
  const renderSet = (dup: boolean) => (
    <ul aria-hidden={dup || undefined} className={`flex shrink-0 items-center ${dup ? "ticker-dup" : ""}`}>
      {lines.map((l, i) => (
        // after the first pass, repeats are visual only
        <li key={i} aria-hidden={(!dup && i >= ANNOUNCEMENTS.length) || undefined} className={`flex items-center whitespace-nowrap ${!dup && i >= ANNOUNCEMENTS.length ? "ticker-dup" : ""}`}>
          <span className="px-6"><Val v={l} onDark /></span>
          <span aria-hidden className="h-1.5 w-1.5 rotate-45 bg-brand-red" />
        </li>
      ))}
    </ul>
  );

  return (
    <div
      role="region"
      aria-label="Announcements"
      data-paused={paused}
      className="ticker relative flex items-center overflow-hidden bg-brand-ink text-[11px] font-semibold uppercase tracking-[0.2em] text-white"
    >
      <div className="ticker-track flex w-max animate-marquee py-2.5">
        {renderSet(false)}
        {renderSet(true)}
      </div>
      <button
        type="button"
        onClick={() => setPaused((p) => !p)}
        aria-label="Pause announcements"
        aria-pressed={paused}
        className="absolute right-0 top-0 grid h-full w-10 place-items-center bg-brand-ink text-white motion-reduce:hidden focus-visible:outline-offset-[-3px]"
      >
        {paused ? (
          <svg aria-hidden width="10" height="10" viewBox="0 0 10 10" fill="currentColor"><path d="M2 1l7 4-7 4z" /></svg>
        ) : (
          <svg aria-hidden width="10" height="10" viewBox="0 0 10 10" fill="currentColor"><path d="M2 1h2v8H2zM6 1h2v8H6z" /></svg>
        )}
      </button>
    </div>
  );
}
