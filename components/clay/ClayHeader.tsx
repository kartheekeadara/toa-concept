"use client";

import Link from "next/link";
import { DIRECTIONS_URL } from "@/app/content";
import StoreStatus from "@/components/StoreStatus";
import { PillButton } from "./ui";

export default function ClayHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-clay-line/80 bg-clay-paper/90 backdrop-blur-md">
      <div className="flex h-14 items-center justify-between gap-4 px-5 sm:h-16 sm:px-8">
        <Link href="/concepts/a" className="font-display text-[15px] font-medium tracking-tight text-clay-ink sm:text-base">
          Taste of Europe
        </Link>
        <div className="flex items-center gap-4 sm:gap-6">
          <StoreStatus className="!text-clay-muted hidden text-[13px] sm:inline-flex" />
          <PillButton href={DIRECTIONS_URL} external>
            Directions
          </PillButton>
        </div>
      </div>
    </header>
  );
}