import Image from "next/image";
import { INSIDE, INSIDE_TILES } from "@/lib/clay-content";
import { Reveal, eyebrowClass } from "./ui";

export default function WhatsInside() {
  return (
    <section id="inside" aria-labelledby="inside-title" className="scroll-mt-16 bg-clay-paper">
      <div className="px-5 py-14 sm:px-8 sm:py-16">
        <Reveal>
          <p className={eyebrowClass}>{INSIDE.eyebrow}</p>
          <h2
            id="inside-title"
            data-draft
            className="mt-3 max-w-3xl font-display text-[clamp(2rem,4.5vw,3.5rem)] font-medium leading-[1.02] tracking-[-0.035em] text-clay-ink"
          >
            {INSIDE.title}
          </h2>
        </Reveal>
        <ul className="mt-10 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:mt-10 lg:gap-x-8">
          {INSIDE_TILES.map((tile) => (
            <li key={tile.name}>
              <div className="relative aspect-[16/10] overflow-hidden bg-clay-line lg:aspect-[2/1]">
                <Image src={tile.image} alt={tile.alt} fill className="object-cover" sizes="(min-width: 640px) 50vw, 100vw" />
              </div>
              <h3 className="mt-4 text-[20px] font-medium tracking-[-0.01em] text-clay-ink">{tile.name}</h3>
              <p data-draft className="mt-1 max-w-md text-[16px] leading-relaxed text-clay-muted">
                {tile.line}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
