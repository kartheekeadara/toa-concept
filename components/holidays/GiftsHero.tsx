import Image from "next/image";
import { GIFTS_HERO } from "@/lib/holiday-content";

export default function GiftsHero() {
  return (
    <section aria-labelledby="hero-title" className="bg-clay-paper">
      <div className="grid lg:min-h-[calc(100svh-4rem)] lg:grid-cols-12">
        <div className="relative aspect-[4/3] lg:order-2 lg:col-span-7 lg:aspect-auto">
          <Image src={GIFTS_HERO.image} alt={GIFTS_HERO.alt} fill priority sizes="(min-width: 1024px) 58vw, 100vw" className="object-cover" />
        </div>
        <div className="flex flex-col justify-end px-5 pb-12 pt-10 sm:px-8 lg:col-span-5 lg:px-12 lg:pb-16">
          <h1
            id="hero-title"
            data-draft
            className="font-display text-[clamp(2.75rem,5.6vw,5.5rem)] font-light leading-[0.98] tracking-[-0.02em] text-clay-ink"
          >
            {GIFTS_HERO.title}
          </h1>
          <p data-draft className="mt-6 max-w-md text-[18px] leading-relaxed text-clay-muted">
            {GIFTS_HERO.line}
          </p>
        </div>
      </div>
    </section>
  );
}
