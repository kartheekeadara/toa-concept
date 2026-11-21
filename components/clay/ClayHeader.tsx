"use client";

import Image from "next/image";
import Link from "next/link";
import { DIRECTIONS_URL } from "@/app/content";
import { isInSeasonWindow } from "@/lib/season";
import { PillButton } from "./ui";

export default function ClayHeader() {
  return (
    <header className="relative z-50 border-b border-clay-line bg-clay-paper">
      <div className="flex h-14 items-center justify-between gap-4 px-5 sm:h-16 sm:px-8 lg:px-12">
        <Link href="/#top" className="flex h-11 w-[120px] shrink-0 items-center">
          <span className="relative block h-9 w-full sm:h-10">
            <Image
              src="/photos/real/logo.png"
              alt="Taste of Europe Gourmet Foods"
              fill
              className="object-contain object-left"
              sizes="120px"
              priority
            />
          </span>
        </Link>
        <div className="flex items-center gap-3 sm:gap-6">
          {/* Directions + Call live in the bottom bar on mobile; the header carries Directions from md up. */}
          {isInSeasonWindow() ? (
            <Link
              href="/holidays"
              className="inline-flex min-h-11 items-center px-2 text-[15px] text-clay-ink underline-offset-[6px] hover:underline"
            >
              Holiday gifts
            </Link>
          ) : null}
          <span className="hidden md:inline-flex">
            <PillButton href={DIRECTIONS_URL} external variant="primary">
              Directions
            </PillButton>
          </span>
        </div>
      </div>
    </header>
  );
}