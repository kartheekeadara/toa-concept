"use client";

import Image from "next/image";
import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { CLAY_HEADLINE, TABLE_IMAGES } from "@/lib/concept-content";
import StoreStatus from "@/components/StoreStatus";
import { ConceptTag, Reveal } from "./ui";

const SIZE_CLASS = {
  lg: "w-[min(92vw,720px)] aspect-[4/3]",
  md: "w-[min(72vw,480px)] aspect-[5/4] -mt-8 sm:-mt-16",
  sm: "w-[min(58vw,360px)] aspect-square",
};

function DriftImage({
  src,
  alt,
  size,
  drift,
}: {
  src: string;
  alt: string;
  size: keyof typeof SIZE_CLASS;
  drift: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], reduce ? [0, 0] : [drift, -drift]);

  return (
    <motion.div ref={ref} style={{ y }} className={`relative ${SIZE_CLASS[size]}`}>
      <ConceptTag />
      <Image src={src} alt={alt} fill className="object-cover" sizes="(max-width: 768px) 90vw, 40vw" />
    </motion.div>
  );
}

export default function HeroTable() {
  return (
    <section className="overflow-hidden bg-clay-paper pb-16 pt-10 sm:pb-24 sm:pt-14">
      <div className="px-5 sm:px-8">
        <Reveal>
          <p className="mb-4 text-[13px] text-clay-muted sm:mb-6">
            <StoreStatus className="!text-clay-muted text-[13px]" />
          </p>
        </Reveal>
        <Reveal>
          <h1 data-draft className="font-display text-[clamp(2.75rem,11vw,7.5rem)] leading-[0.92] tracking-[-0.045em] text-clay-ink">
            {CLAY_HEADLINE}
          </h1>
        </Reveal>
      </div>
      <div className="mt-10 flex flex-col items-center gap-6 px-5 sm:mt-14 sm:gap-10 sm:px-8">
        <DriftImage {...TABLE_IMAGES[0]} drift={48} />
        <DriftImage {...TABLE_IMAGES[1]} drift={72} />
        <DriftImage {...TABLE_IMAGES[2]} drift={36} />
      </div>
    </section>
  );
}