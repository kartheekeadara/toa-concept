"use client";

import { CALL_HREF, DIRECTIONS_URL, STORE } from "@/app/content";
import { btnGhost, btnPrimary, hairline } from "./ui";

export default function StickyBar() {
  return (
    <div aria-label="Quick actions" className={`fixed inset-x-0 bottom-0 z-40 bg-white md:hidden ${hairline}`}>
      <div className="grid grid-cols-2 gap-px bg-line">
        <a href={DIRECTIONS_URL} target="_blank" rel="noopener noreferrer" className={`${btnPrimary} min-h-14 rounded-none`}>
          Directions
        </a>
        <a href={CALL_HREF} className={`${btnGhost} min-h-14 bg-white rounded-none`}>
          {STORE.phone ? "Call" : "Visit"}
        </a>
      </div>
    </div>
  );
}