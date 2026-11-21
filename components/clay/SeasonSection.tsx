import Image from "next/image";
import { isInSeasonWindow } from "@/lib/season";
import { SEASON_COPY, SEASON_PHOTOS } from "@/lib/clay-content";
import { ArrowLink } from "./ui";

export default function SeasonSection() {
  if (!isInSeasonWindow()) return null;

  return (
    <section aria-labelledby="season-title" className="bg-clay-dark text-clay-ivory">
      <div className="grid gap-12 px-5 py-16 sm:px-8 sm:py-20 lg:grid-cols-12 lg:gap-12 lg:px-12 lg:py-24">
        <div className="lg:col-span-4 lg:flex lg:flex-col lg:justify-between">
          <div>
            <h2 id="season-title" data-draft className="font-display text-[clamp(2.25rem,4vw,3.5rem)] font-light leading-[1.02] tracking-[-0.015em]">
              {SEASON_COPY.title}
            </h2>
            <p data-draft className="mt-4 max-w-sm text-[17px] leading-relaxed text-clay-ivory/75">
              {SEASON_COPY.line}
            </p>
          </div>
          <div className="mt-10 lg:mt-0">
            <dl className="divide-y divide-clay-brass/30 border-y border-clay-brass/30">
              {SEASON_COPY.dates.map((d) => (
                <div key={d.day} className="flex items-baseline justify-between gap-6 py-3 text-[16px]">
                  <dt className="text-clay-ivory">
                    {d.day}
                    <span className="block text-[14px] text-clay-ivory/60 sm:ml-2 sm:inline sm:text-[16px]">{d.note}</span>
                  </dt>
                  <dd className="shrink-0 whitespace-nowrap text-right text-clay-ivory/75">{d.hours}</dd>
                </div>
              ))}
            </dl>
            <ArrowLink href="#holiday-hours" className="text-clay-ivory">
              {SEASON_COPY.cta}
            </ArrowLink>
          </div>
        </div>
        <ul className="grid grid-cols-3 gap-3 sm:gap-5 lg:col-span-8">
          {SEASON_PHOTOS.map((ph, i) => (
            <li key={ph.src} className={i === 1 ? "lg:pt-16" : ""}>
              <div className="relative aspect-[3/4] overflow-hidden">
                <Image src={ph.src} alt={ph.alt} fill className="object-cover" sizes="(min-width: 1024px) 22vw, 33vw" />
              </div>
              <p className="mt-3 text-[13px] text-clay-ivory/70 sm:text-[15px]">{ph.caption}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
