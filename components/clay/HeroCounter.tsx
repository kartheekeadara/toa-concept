"use client";

import Image from "next/image";
import { DIRECTIONS_URL, STORE } from "@/app/content";
import { CLAY_HEADLINE, COUNTER_HERO } from "@/lib/concept-content";
import StoreStatus from "@/components/StoreStatus";
import { ConceptTag, PillButton, Reveal } from "./ui";

export default function HeroCounter() {
  return (
    <section className="relative min-h-[100svh] bg-clay-dark">
      <ConceptTag />
      <Image
        src={COUNTER_HERO.src}
        alt={COUNTER_HERO.alt}
        fill
        className="object-cover object-center"
        sizes="100vw"
        priority
      />
      <div className="absolute inset-0 bg-gradient-to-b from-clay-dark/55 via-clay-dark/25 to-clay-dark/60" />
      <div className="relative flex min-h-[100svh] flex-col justify-between px-5 py-8 sm:px-8 sm:py-10">
        <Reveal className="max-w-4xl pt-6 sm:pt-10">
          <h1
            data-draft
            className="font-display text-hero-clay text-clay-paper drop-shadow-[0_2px_24px_rgba(0,0,0,0.35)]"
          >
            {CLAY_HEADLINE}
          </h1>
        </Reveal>
        <Reveal className="mb-20 w-full max-w-sm rounded-2xl border border-clay-paper/15 bg-clay-paper/92 p-5 shadow-xl backdrop-blur-sm sm:mb-24 sm:ml-auto sm:p-6">
          <p className="mb-3 text-[13px] text-clay-muted">
            <StoreStatus className="!text-clay-muted text-[13px]" />
          </p>
          <p className="mb-4 text-[15px] leading-snug text-clay-ink">
            {STORE.street}
            <br />
            {STORE.cityLine}
          </p>
          <PillButton href={DIRECTIONS_URL} external>
            Directions
          </PillButton>
        </Reveal>
      </div>
    </section>
  );
}