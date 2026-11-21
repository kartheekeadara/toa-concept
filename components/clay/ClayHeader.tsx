"use client";

import Image from "next/image";
import Link from "next/link";
import { DIRECTIONS_URL } from "@/app/content";
import StoreStatus from "@/components/StoreStatus";
import { PillButton } from "./ui";

export default function ClayHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-clay-line/80 bg-clay-paper/90 backdrop-blur-md">
      <div className="flex h-14 items-center justify-between gap-4 px-5 sm:h-16 sm:px-8">
        <Link href="/#top" className="relative block h-9 w-[120px] shrink-0 sm:h-10">
          <Image
            src="/photos/real/logo.png"
            alt="Taste of Europe Gourmet Foods"
            fill
            className="object-contain object-left"
            sizes="120px"
            priority
          />
        </Link>
        <div className="flex items-center gap-3 sm:gap-6">
          <StoreStatus compact className="!text-clay-muted shrink-0 text-[13px]" />
          <PillButton href={DIRECTIONS_URL} external variant="primary">
            Directions
          </PillButton>
        </div>
      </div>
    </header>
  );
}