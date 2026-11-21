"use client";

import { CALL_HREF, DIRECTIONS_URL } from "@/app/content";
import { PhoneIcon, PinIcon } from "./ui";

/** Mobile-only bottom bar: Directions + Call. Hidden at md and up. */
export default function StickyBar() {
  return (
    <nav
      aria-label="Quick actions"
      className="fixed inset-x-0 bottom-0 z-50 border-t-2 border-brand-red bg-brand-ink px-4 pb-[max(0.75rem,env(safe-area-inset-bottom))] pt-3 md:hidden"
    >
      <div className="grid grid-cols-2 gap-3">
        <a
          href={DIRECTIONS_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex h-12 items-center justify-center gap-2 rounded-full bg-brand-red-deep text-[15px] font-medium text-white transition-transform active:scale-95 focus-visible:outline-white"
        >
          <PinIcon size={17} /> Directions
        </a>
        <a
          href={CALL_HREF}
          className="inline-flex h-12 items-center justify-center gap-2 rounded-full border-2 border-white/80 text-[15px] font-medium text-white transition-transform active:scale-95"
        >
          <PhoneIcon size={17} /> Call
        </a>
      </div>
    </nav>
  );
}
