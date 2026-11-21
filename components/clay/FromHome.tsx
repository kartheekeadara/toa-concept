import { BRANDS, FROM_HOME, LANGUAGES_LINE } from "@/lib/clay-content";

export default function FromHome() {
  const brands = `${BRANDS.slice(0, -1).join(", ")} and ${BRANDS[BRANDS.length - 1]}`;

  return (
    <section aria-labelledby="from-home-title" className="overflow-x-clip border-t border-clay-line bg-clay-paper">
      <div className="grid gap-12 px-5 py-16 sm:px-8 sm:py-24 lg:grid-cols-12 lg:gap-12 lg:px-12">
        <div className="lg:col-span-4">
          <div className="lg:sticky lg:top-28">
            <h2
              id="from-home-title"
              className="font-display text-[clamp(2.25rem,3.6vw,3.25rem)] font-light leading-[1.02] tracking-[-0.015em] text-clay-ink"
            >
              {FROM_HOME.title}
            </h2>
            <p className="mt-4 max-w-sm text-[17px] leading-relaxed text-clay-muted">{FROM_HOME.intro}</p>

            <div className="mt-10 border-t border-clay-line pt-6">
              <h3 className="text-[15px] font-medium text-clay-ink">Brands you&apos;ll find</h3>
              <p className="mt-2 max-w-sm font-display text-[24px] font-light leading-snug text-clay-ink">
                {brands}, among many others.
              </p>
            </div>
            {/* TODO(owner): confirm the staff languages before launch. */}
            <p data-draft className="mt-6 max-w-sm text-[16px] text-clay-muted">
              {LANGUAGES_LINE}
            </p>
          </div>
        </div>

        <ul className="lg:col-span-8">
          {FROM_HOME.rows.map((row) => (
            <li
              key={row.native}
              className="flex flex-col gap-1 border-b border-clay-line py-5 first:border-t sm:flex-row sm:items-baseline sm:justify-between sm:gap-8 sm:py-6"
            >
              <p
                lang={row.lang}
                className="min-w-0 break-words font-display text-[clamp(2.25rem,5.6vw,4.75rem)] font-light leading-[1.02] tracking-[-0.02em] text-clay-dark"
              >
                {row.native}
              </p>
              <p className="shrink-0 text-[15px] text-clay-muted sm:max-w-[16rem] sm:text-right">
                <span className="text-clay-ink">{row.english}</span>
                <span className="block" data-draft>
                  {row.items}
                </span>
              </p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
