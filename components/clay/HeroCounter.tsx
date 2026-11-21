"use client";

import Image from "next/image";
import { DIRECTIONS_URL, STORE } from "@/app/content";
import StoreStatus from "@/components/StoreStatus";
import { CLAY_HEADLINE, CLAY_SUBHEAD, COUNTER_HERO } from "@/lib/clay-content";
import { PillButton } from "./ui";

export default function HeroCounter() {
  return (
    <section aria-labelledby="hero-title" className="relative isolate min-h-[calc(100svh-3.5rem)] bg-clay-deep sm:min-h-[calc(100svh-4rem)]">
      <Image src={COUNTER_HERO.src} alt={COUNTER_HERO.alt} fill className="-z-10 object-cover object-center" sizes="100vw" priority />
      <div className="absolute inset-0 -z-10 bg-[linear-gradient(to_top,rgba(14,22,18,0.94)_0%,rgba(14,22,18,0.62)_38%,rgba(14,22,18,0.18)_75%,rgba(14,22,18,0.28)_100%)]" />
      <div className="flex min-h-[calc(100svh-3.5rem)] flex-col justify-end px-5 pb-24 pt-10 sm:min-h-[calc(100svh-4rem)] sm:px-8 sm:pb-14 lg:px-12">
        <h1
          id="hero-title"
          data-draft
          className="max-w-[14ch] font-display text-[clamp(2.9rem,7.4vw,7rem)] font-light leading-[0.96] tracking-[-0.02em] text-clay-ivory"
        >
          {CLAY_HEADLINE}
        </h1>
        <div className="mt-8 grid gap-8 border-t border-clay-ivory/20 pt-6 sm:mt-10 md:grid-cols-[1fr_auto] md:items-end">
          <div>
            <p data-draft className="max-w-xl text-[17px] leading-relaxed text-clay-ivory/90 sm:text-[19px]">
              {CLAY_SUBHEAD}
            </p>
            <p className="mt-3 flex flex-wrap items-center gap-x-5 gap-y-1 text-[15px] text-clay-ivory/80">
              <StoreStatus className="!text-[15px] !text-clay-ivory" />
              <span>{STORE.street}</span>
            </p>
          </div>
          <div>
            {/* Mobile: the sticky bar already has Directions + Call, so the hero leads into the page instead. */}
            <a
              href="#inside"
              className="inline-flex min-h-12 items-center rounded-pill bg-clay-ivory px-7 text-[15px] font-medium text-clay-dark md:hidden"
            >
              See what&apos;s inside
            </a>
            <span className="hidden md:inline-flex">
              <PillButton href={DIRECTIONS_URL} external variant="light">
                Get directions
              </PillButton>
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
