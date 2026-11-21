import Image from "next/image";
import { GIFTS } from "@/lib/holiday-content";

/** Uneven editorial gallery: one wide lead, then tall frames on a staggered baseline. */
export default function GiftGallery() {
  const [lead, ...rest] = GIFTS;
  return (
    <section aria-labelledby="gifts-title" className="border-t border-clay-line bg-clay-paper">
      <div className="px-5 py-16 sm:px-8 sm:py-24 lg:px-12">
        <h2 id="gifts-title" className="font-display text-[clamp(2.25rem,4.4vw,3.75rem)] font-light leading-[1] tracking-[-0.02em] text-clay-ink">
          What to give
        </h2>

        <figure className="mt-10 grid gap-6 lg:mt-14 lg:grid-cols-12 lg:items-end lg:gap-12">
          <div className="relative aspect-[3/2] overflow-hidden bg-clay-line lg:col-span-8">
            <Image src={lead.image} alt={lead.alt} fill sizes="(min-width: 1024px) 66vw, 100vw" className="object-cover" />
          </div>
          <figcaption className="lg:col-span-4 lg:pb-2">
            <span className="block font-display text-[clamp(1.75rem,2.6vw,2.5rem)] font-light leading-tight text-clay-dark">{lead.name}</span>
            <span data-draft className="mt-2 block max-w-sm text-[17px] leading-relaxed text-clay-muted">
              {lead.line}
            </span>
          </figcaption>
        </figure>

        <ul className="mt-14 grid grid-cols-2 gap-x-4 gap-y-10 sm:gap-x-6 lg:mt-20 lg:grid-cols-4 lg:gap-x-8">
          {rest.map((g, i) => (
            <li key={g.name} className={i % 2 === 1 ? "lg:pt-20" : ""}>
              <div className="relative aspect-[3/4] overflow-hidden bg-clay-line">
                <Image src={g.image} alt={g.alt} fill sizes="(min-width: 1024px) 25vw, 50vw" className="object-cover" />
              </div>
              <h3 className="mt-4 font-display text-[22px] font-light leading-tight text-clay-dark sm:text-[26px]">{g.name}</h3>
              <p data-draft className="mt-1 text-[15px] leading-relaxed text-clay-muted sm:text-[16px]">
                {g.line}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
