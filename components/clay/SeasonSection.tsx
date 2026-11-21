import Image from "next/image";
import { isInSeasonWindow } from "@/lib/season";
import { SEASON_COPY } from "@/lib/clay-content";
import { ArrowLink, Reveal } from "./ui";

const SEASON_PHOTOS = [
  { src: "/photos/real/gingerbread.jpg", alt: "Gingerbread and holiday sweets on display" },
  { src: "/photos/real/chocolates-basket.jpg", alt: "Basket of boxed chocolates" },
];

export default function SeasonSection() {
  if (!isInSeasonWindow()) return null;

  return (
    <section aria-labelledby="season-title" className="bg-clay-dark text-clay-paper">
      <div className="px-5 py-14 sm:px-8 sm:py-20 lg:py-24">
        <Reveal>
          <h2 id="season-title" data-draft className="font-display text-[clamp(2rem,5vw,3.5rem)] leading-[1.05] tracking-[-0.03em]">
            {SEASON_COPY.title}
          </h2>
          <p data-draft className="mt-4 max-w-xl text-[18px] leading-relaxed text-clay-paper/80">
            {SEASON_COPY.line}
          </p>
          <ArrowLink href="#holiday-hours" className="text-clay-paper">
            {SEASON_COPY.cta}
          </ArrowLink>
        </Reveal>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2">
        {SEASON_PHOTOS.map((ph) => (
          <div key={ph.src} className="relative aspect-[4/3] sm:aspect-[16/10]">
            <Image src={ph.src} alt={ph.alt} fill className="object-cover" sizes="50vw" />
          </div>
        ))}
      </div>
    </section>
  );
}