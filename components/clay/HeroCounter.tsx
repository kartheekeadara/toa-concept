"use client";

import Image from "next/image";
import { DIRECTIONS_URL } from "@/app/content";
import { CLAY_HEADLINE, COUNTER_HERO } from "@/lib/clay-content";
import { PillButton } from "./ui";

export default function HeroCounter() {
  return (
    <section aria-labelledby="hero-title" className="relative min-h-[calc(100svh-3.5rem)] sm:min-h-[calc(100svh-4rem)] bg-clay-dark">
      <Image
        src={COUNTER_HERO.src}
        alt={COUNTER_HERO.alt}
        fill
        className="object-cover object-center"
        sizes="100vw"
        priority
      />
      <div className="absolute inset-0 bg-gradient-to-t from-clay-dark/90 via-clay-dark/40 to-clay-dark/20" />
      <div className="relative flex min-h-[calc(100svh-3.5rem)] sm:min-h-[calc(100svh-4rem)] flex-col justify-end px-5 pb-20 pt-8 sm:px-8 sm:pb-10">
        <div className="max-w-5xl">
          <h1 id="hero-title" data-draft className="font-display text-hero-clay text-clay-paper">
            {CLAY_HEADLINE}
          </h1>
          <div className="mt-5 sm:mt-6">
            <PillButton href={DIRECTIONS_URL} external variant="primary">
              Get directions
            </PillButton>
          </div>
        </div>
      </div>
    </section>
  );
}