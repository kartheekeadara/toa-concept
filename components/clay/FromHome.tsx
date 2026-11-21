import { BRANDS, FROM_HOME, LANGUAGES_LINE } from "@/lib/clay-content";
import { Reveal, eyebrowClass } from "./ui";

export default function FromHome() {
  return (
    <section aria-labelledby="from-home-title" className="overflow-x-clip border-t border-clay-line bg-clay-paper">
      <div className="px-5 py-14 sm:px-8 sm:py-16">
        <Reveal>
          <p className={eyebrowClass}>{FROM_HOME.eyebrow}</p>
          <h2
            id="from-home-title"
            data-draft
            className="mt-3 max-w-4xl font-display text-[clamp(2rem,4.5vw,3.5rem)] font-medium leading-[1.02] tracking-[-0.035em] text-clay-ink"
          >
            {FROM_HOME.title}
          </h2>
        </Reveal>

        <div className="mt-8">
          <h3 className="text-[15px] font-medium text-clay-ink">Brands you&apos;ll find</h3>
          <ul className="mt-3 flex flex-wrap gap-2">
            {BRANDS.map((b) => (
              <li
                key={b}
                lang={b === "Toruńskie" ? "pl" : undefined}
                className="rounded-pill border border-clay-ink/15 px-4 py-2 text-[15px] text-clay-ink"
              >
                {b}
              </li>
            ))}
          </ul>
          {/* TODO(owner): confirm the staff languages before launch. */}
          <p data-draft className="mt-4 text-[16px] text-clay-muted">
            {LANGUAGES_LINE}
          </p>
        </div>

        <ol className="mt-10 grid grid-cols-2 gap-x-4 border-t border-clay-ink/15 sm:gap-x-10 lg:grid-cols-3">
          {FROM_HOME.rows.map((row) => (
            <li key={row.native} className="min-w-0 border-b border-clay-ink/15 py-5">
              <p
                lang={row.lang}
                className="break-words font-display text-[clamp(1.375rem,3.2vw,2.5rem)] font-medium leading-none tracking-[-0.03em] text-clay-ink"
              >
                {row.native}
              </p>
              <p className="mt-2 text-[14px] leading-snug text-clay-muted">
                <span className="block text-clay-ink sm:inline">{row.english}</span>
                <span aria-hidden className="hidden sm:inline"> · </span>
                <span data-draft>{row.items}</span>
              </p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
