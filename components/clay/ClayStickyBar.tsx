"use client";

import { useEffect, useState } from "react";
import { CALL_HREF, DIRECTIONS_URL, STORE } from "@/app/content";

/** Mobile quick actions. Slides in once the hero has scrolled away, so the first screen stays clean. */
export default function ClayStickyBar() {
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const hero = document.getElementById("hero-title")?.closest("section");
    if (!hero) {
      setShown(true);
      return;
    }
    const io = new IntersectionObserver(([e]) => setShown(!e.isIntersecting), { rootMargin: "0px 0px -35% 0px" });
    io.observe(hero);
    return () => io.disconnect();
  }, []);

  return (
    <div
      aria-label="Quick actions"
      className={`fixed inset-x-0 bottom-0 z-40 border-t border-clay-line bg-clay-paper/95 backdrop-blur transition-transform duration-500 ease-out motion-reduce:transition-none md:hidden ${
        shown ? "translate-y-0" : "translate-y-full"
      }`}
    >
      <div className="grid grid-cols-2 pb-[env(safe-area-inset-bottom)]">
        <a
          href={DIRECTIONS_URL}
          target="_blank"
          rel="noopener noreferrer"
          tabIndex={shown ? 0 : -1}
          className="flex min-h-14 items-center justify-center bg-clay-dark text-[15px] font-medium text-clay-ivory"
        >
          Directions
        </a>
        <a
          href={CALL_HREF}
          tabIndex={shown ? 0 : -1}
          className="flex min-h-14 items-center justify-center text-[15px] font-medium text-clay-ink"
        >
          {STORE.phone ? "Call" : "Visit"}
        </a>
      </div>
    </div>
  );
}
