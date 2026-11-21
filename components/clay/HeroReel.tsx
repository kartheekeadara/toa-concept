"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { CLAY_HEADLINE, REEL_PANELS } from "@/lib/concept-content";
import StoreStatus from "@/components/StoreStatus";
import { ConceptTag, MediaPanel, Reveal } from "./ui";

const INTERVAL_MS = 5200;

export default function HeroReel() {
  const reduce = useReducedMotion();
  const [index, setIndex] = useState(0);
  const panel = REEL_PANELS[index];

  useEffect(() => {
    if (reduce) return;
    const id = window.setInterval(() => setIndex((i) => (i + 1) % REEL_PANELS.length), INTERVAL_MS);
    return () => window.clearInterval(id);
  }, [reduce]);

  return (
    <section className="bg-clay-paper">
      <div className="px-5 pb-8 pt-10 sm:px-8 sm:pb-10 sm:pt-14 lg:pt-16">
        <Reveal>
          <p className="mb-4 text-[13px] text-clay-muted sm:mb-6">
            <StoreStatus className="!text-clay-muted text-[13px]" />
          </p>
          <h1 data-draft className="max-w-5xl font-display text-hero-clay text-clay-ink">
            {CLAY_HEADLINE}
          </h1>
        </Reveal>
      </div>
      <MediaPanel className="aspect-[4/5] sm:aspect-[16/10] lg:aspect-[21/9]" style={{ backgroundColor: panel.backdrop }}>
        <ConceptTag />
        <AnimatePresence mode="sync">
          <motion.div
            key={panel.src}
            className="absolute inset-0"
            initial={{ opacity: reduce ? 1 : 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: reduce ? 0 : 1.1, ease: "easeInOut" }}
          >
            <div className={`relative h-full w-full ${reduce ? "" : "motion-safe:animate-slowzoom"}`}>
              <Image src={panel.src} alt="" fill className="object-cover object-center" sizes="100vw" priority />
            </div>
          </motion.div>
        </AnimatePresence>
        <div className="pointer-events-none absolute inset-x-0 bottom-0 flex items-end justify-between bg-gradient-to-t from-clay-dark/50 to-transparent px-5 py-6 sm:px-8">
          <span className="text-[13px] font-medium uppercase tracking-[0.12em] text-clay-paper">{panel.label}</span>
          <span className="font-mono text-[11px] text-clay-paper/80">
            {index + 1} / {REEL_PANELS.length}
          </span>
        </div>
      </MediaPanel>
    </section>
  );
}