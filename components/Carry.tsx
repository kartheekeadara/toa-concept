import Image from "next/image";
import { CARRY_PHOTOS, CATEGORIES, COPY, COUNTRY_NATIVE } from "@/app/content";
import { PRESENTATION, isPlaceholder } from "@/lib/flags";
import { h2Class, hairline, Ph } from "./ui";

function visibleCategories() {
  return CATEGORIES.filter((c) => {
    if (!c.confirm) return true;
    if (PRESENTATION && isPlaceholder(c.line)) return false;
    return true;
  });
}

export default function Carry() {
  const rows = visibleCategories();

  return (
    <section id="carry" aria-labelledby="carry-title" className="bg-white">
      <div className="mx-auto max-w-page px-5 py-14 sm:px-8 sm:py-20">
        <h2 id="carry-title" data-draft className={h2Class}>
          {COPY.carryTitle}
        </h2>

        <div className="mt-10 grid gap-12 lg:grid-cols-[1fr_1.1fr] lg:gap-16">
          <ul className="divide-y divide-line border-y border-line">
            {rows.map((cat) => (
              <li key={cat.name} className="grid gap-1 py-4 sm:grid-cols-[10rem_1fr] sm:gap-8">
                <span className="text-[15px] font-medium text-ink">{cat.name}</span>
                <span data-draft className="text-[15px] leading-relaxed text-ink-muted">
                  {isPlaceholder(cat.line) ? <Ph>{cat.line}</Ph> : cat.line}
                </span>
                {cat.confirm && !PRESENTATION ? (
                  <span className="col-span-full font-mono text-[10px] uppercase tracking-wide text-ink-muted sm:col-span-2">CONFIRM</span>
                ) : null}
              </li>
            ))}
          </ul>

          <div className="flex flex-col gap-4">
            {CARRY_PHOTOS.map((ph) => (
              <div key={ph.src} className="relative aspect-[4/3] overflow-hidden rounded-photo bg-line">
                <Image src={ph.src} alt={ph.alt} fill sizes="(min-width: 1024px) 40vw, 100vw" className="object-cover" />
              </div>
            ))}
          </div>
        </div>

        <div className={`mt-14 pt-10 ${hairline}`}>
          <p className="text-[13px] text-ink-muted">{COPY.countriesLabel}</p>
          <p className="mt-3 flex flex-wrap gap-x-5 gap-y-2 text-[15px] text-ink">
            {COUNTRY_NATIVE.map((c) => (
              <span key={c.native} lang={c.lang}>
                {c.native}
              </span>
            ))}
          </p>
        </div>
      </div>
    </section>
  );
}