"use client";

import Image from "next/image";
import Link from "next/link";
import { DIRECTIONS_URL } from "@/app/content";
import StoreStatus from "./StoreStatus";
import { btnPrimary } from "./ui";

export default function Nav() {
  return (
    <header className="border-b border-line bg-white">
      <div className="mx-auto flex h-16 max-w-page items-center justify-between gap-4 px-5 sm:px-8">
        <Link href="/" className="shrink-0">
          <Image
            src="/photos/real/logo.png"
            alt="Taste of Europe Gourmet Foods, home"
            width={753}
            height={355}
            priority
            className="h-8 w-auto sm:h-9"
          />
        </Link>
        <div className="flex items-center gap-4 sm:gap-6">
          <StoreStatus className="hidden sm:inline-flex" />
          <a href={DIRECTIONS_URL} target="_blank" rel="noopener noreferrer" className={btnPrimary}>
            Directions
          </a>
        </div>
      </div>
    </header>
  );
}