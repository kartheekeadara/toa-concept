"use client";

import { CALL_HREF, DIRECTIONS_URL, STORE } from "@/app/content";

export default function ClayStickyBar() {
  return (
    <div
      aria-label="Quick actions"
      className="fixed inset-x-0 bottom-0 z-40 border-t border-clay-line bg-clay-paper/95 backdrop-blur md:hidden"
    >
      <div className="grid grid-cols-2">
        <a
          href={DIRECTIONS_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="flex min-h-14 items-center justify-center bg-clay-dark text-[15px] font-medium text-clay-ivory"
        >
          Directions
        </a>
        <a href={CALL_HREF} className="flex min-h-14 items-center justify-center text-[15px] font-medium text-clay-ink">
          {STORE.phone ? "Call" : "Visit"}
        </a>
      </div>
    </div>
  );
}