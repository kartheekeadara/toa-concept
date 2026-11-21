import Image from "next/image";
import { isInSeasonWindow } from "@/lib/season";
import { SEASON_COPY, SEASON_PHOTOS } from "@/lib/clay-content";
import { ArrowLink, Reveal } from "./ui";

export default function SeasonSection() {
  if (!isInSeasonWindow()) return null;

  return (
    <section aria-labelledby="season-title" className="bg-clay-dark text-clay-paper">
      <div className="grid gap-10 px-5 py-14 sm:px-8 sm:py-16 lg:grid-cols-12 lg:items-end lg:gap-12">
        <Reveal className="lg:col-span-4">
          <p className="text-[14px] font-medium uppercase tracking-[0.14em] text-[#e85a5f]">Season</p>
          <h2 id="season-title" data-draft className="mt-3 font-display text-[clamp(2rem,4vw,3rem)] leading-[1.05] tracking-[-0.03em]">
            {SEASON_COPY.title}
          </h2>
          <p data-draft className="mt-3 max-w-md text-[17px] leading-relaxed text-clay-paper/80">
            {SEASON_COPY.line}
          </p>
          <ul className="mt-5 space-y-1 text-[16px] font-medium text-clay-paper">
            {SEASON_COPY.highlights.map((line) => (
              <li key={line}>{line}</li>
            ))}
          </ul>
          <ArrowLink href="#holiday-hours" className="text-clay-paper">
            {SEASON_COPY.cta}
          </ArrowLink>
        </Reveal>
        <ul className="grid grid-cols-3 gap-3 sm:gap-4 lg:col-span-8">
          {SEASON_PHOTOS.map((ph) => (
            <li key={ph.src}>
              <div className="relative aspect-[3/4] overflow-hidden">
                <Image src={ph.src} alt={ph.alt} fill className="object-cover" sizes="(min-width: 1024px) 22vw, 33vw" />
              </div>
              <p className="mt-2 text-[13px] text-clay-paper/75 sm:text-[14px]">{ph.caption}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
