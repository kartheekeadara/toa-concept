import Image from "next/image";
import { FROM_HOME } from "@/lib/clay-content";
import { MediaPanel, Reveal, eyebrowClass } from "./ui";

export default function FromHome() {
  return (
    <section aria-labelledby="from-home-title" className="overflow-x-clip bg-clay-section">
      <div className="px-5 py-16 sm:px-8 sm:py-24 lg:py-28">
        <Reveal>
          <p className={eyebrowClass}>{FROM_HOME.eyebrow}</p>
          <h2
            id="from-home-title"
            data-draft
            className="mt-4 max-w-4xl font-display text-[clamp(2.25rem,5.5vw,4.5rem)] font-medium leading-[1] tracking-[-0.035em] text-clay-ink"
          >
            {FROM_HOME.title}
          </h2>
        </Reveal>

        <div className="mt-12 grid gap-10 lg:mt-16 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <div className="lg:sticky lg:top-24">
              <MediaPanel className="aspect-[4/5] bg-clay-line">
                <Image src={FROM_HOME.image} alt={FROM_HOME.imageAlt} fill className="object-cover" sizes="(min-width: 1024px) 40vw, 100vw" />
              </MediaPanel>
              <p data-draft className="mt-5 max-w-sm text-[16px] leading-relaxed text-clay-muted">
                {FROM_HOME.line}
              </p>
            </div>
          </div>

          <ol className="min-w-0 border-t border-clay-ink/15 lg:col-span-7">
            {FROM_HOME.rows.map((row, i) => (
              <li key={row.native} className="border-b border-clay-ink/15">
                <Reveal className="flex gap-4 py-6 sm:gap-8 sm:py-8">
                  <span className="w-6 shrink-0 font-mono text-[12px] tabular-nums text-clay-muted">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div className="min-w-0 flex-1">
                    <p
                      lang={row.lang}
                      className="font-display text-[clamp(1.75rem,5vw,3.5rem)] font-medium leading-none tracking-[-0.03em] text-clay-ink"
                    >
                      {row.native}
                    </p>
                    <p data-draft className="mt-2 text-[14px] text-clay-muted">
                      {row.items}
                    </p>
                  </div>
                  <span className="hidden shrink-0 self-start pt-1 text-right text-[14px] text-clay-muted sm:block sm:text-[15px]">
                    {row.english}
                  </span>
                </Reveal>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}