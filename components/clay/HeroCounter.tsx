"use client";

import Image from "next/image";
import { CLAY_HEADLINE, COUNTER_HERO } from "@/lib/clay-content";
import StoreStatus from "@/components/StoreStatus";
import { ConceptTag, Reveal } from "./ui";

export default function HeroCounter() {
  return (
    <section aria-labelledby="hero-title" className="relative min-h-[calc(100svh-3.5rem)] sm:min-h-[calc(100svh-4rem)] bg-clay-dark">
      {COUNTER_HERO.concept ? <ConceptTag /> : null}
      <Image
        src={COUNTER_HERO.src}
        alt={COUNTER_HERO.alt}
        fill
        className="object-cover object-center"
        sizes="100vw"
        priority
      />
      <div className="absolute inset-0 bg-gradient-to-t from-clay-dark/75 via-clay-dark/20 to-clay-dark/10" />
      <div className="relative flex min-h-[calc(100svh-3.5rem)] sm:min-h-[calc(100svh-4rem)] flex-col justify-end px-5 pb-24 pt-8 sm:px-8 sm:pb-14">
        <Reveal className="max-w-5xl">
          <p className="mb-5 text-[14px]">
            <StoreStatus className="!text-clay-paper/80 text-[14px]" />
          </p>
          <h1 id="hero-title" data-draft className="font-display text-hero-clay text-clay-paper">
            {CLAY_HEADLINE}
          </h1>
        </Reveal>
      </div>
    </section>
  );
}