import Image from "next/image";
import { CLAY_HEADLINE, CLAY_SUBHEAD, HERO_FRAMES } from "@/lib/clay-content";

// One photo: the store floor (wine-window mural, gift table, barrels). The ceiling is cropped
// away so the shop, not the tiles, fills the frame.
const HERO = HERO_FRAMES[3];

export default function HeroCounter() {
  const lines = CLAY_HEADLINE.split("|");

  return (
    <section aria-labelledby="hero-title" className="relative isolate min-h-[calc(100svh-3.5rem)] overflow-hidden bg-clay-deep sm:min-h-[calc(100svh-4rem)]">
      {/* Phones: zoom toward the floor so the frame isn't mostly wall and ceiling. */}
      <div className="absolute inset-0 -z-10 max-md:origin-[35%_100%] max-md:scale-[1.35]">
      <Image
        src={HERO.src}
        alt={HERO.alt}
        fill
        priority
        sizes="100vw"
        className="hero-settle object-cover object-[30%_78%] md:object-[50%_80%]"
      />
      </div>
      <div className="absolute inset-0 -z-10 bg-[linear-gradient(to_right,rgba(14,22,18,0.55)_0%,rgba(14,22,18,0)_70%)]" />
      <div className="absolute inset-0 -z-10 bg-[linear-gradient(to_top,rgba(14,22,18,0.92)_0%,rgba(14,22,18,0.55)_38%,rgba(14,22,18,0.1)_72%,rgba(14,22,18,0.25)_100%)]" />

      <div className="flex min-h-[calc(100svh-3.5rem)] flex-col justify-end px-5 pb-10 pt-10 sm:min-h-[calc(100svh-4rem)] sm:px-8 sm:pb-14 lg:px-12">
        <h1
          id="hero-title"
          data-draft
          className="font-display text-[clamp(2.9rem,7.6vw,7.25rem)] font-light leading-[0.98] tracking-[-0.02em] text-clay-ivory"
        >
          {lines.map((line, i) => (
            <span key={line} className="block overflow-hidden pb-[0.06em]">
              <span className="hero-rise block" style={{ animationDelay: `${120 + i * 110}ms` }}>
                {line}{" "}
              </span>
            </span>
          ))}
        </h1>
        <p
          data-draft
          className="hero-fade mt-8 max-w-md text-[17px] leading-relaxed text-clay-ivory/85 sm:mt-10 sm:text-[19px]"
          style={{ animationDelay: "560ms" }}
        >
          {CLAY_SUBHEAD}
        </p>
      </div>
    </section>
  );
}
