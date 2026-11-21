import Image from "next/image";
import FadeIn from "@/components/FadeIn";
import ReviewMode from "@/components/ReviewMode";
import BoardBuilder from "@/components/BoardBuilder";
import StickyBar from "@/components/StickyBar";
import Ticker from "@/components/Ticker";
import CategoryList from "@/components/CategoryList";
import { Ph, Val, ReviewOnly, Eyebrow, btnBase, h2Class, PinIcon, PhoneIcon, InstagramIcon, ArrowIcon } from "@/components/ui";
import { PRESENTATION, isPlaceholder } from "@/lib/flags";
import { formatWeek, hoursConfigured } from "@/lib/hours";
import {
  STORE,
  COPY,
  HOLIDAY_ITEMS,
  HOLIDAY_HOURS,
  COUNTRIES,
  DIRECTIONS_URL,
  CALL_HREF,
  INSTAGRAM_URL,
  HOURS,
  SHOW_BUILDER,
} from "./content";

/** A headline that may still be a {{PLACEHOLDER}}: chip in review mode, nothing at all in presentation mode. */
function Headline({ v, className, id }: { v: string; className: string; id?: string }) {
  if (isPlaceholder(v)) {
    return PRESENTATION ? null : <h2 id={id} className={className}><Ph className="!whitespace-normal break-all !text-[1.25rem] sm:!text-3xl">{v}</Ph></h2>;
  }
  return <h2 id={id} data-draft className={className}>{v}</h2>;
}

/**
 * Section order: nav → ticker → hero → holidays → order ahead (or platter builder) → categories
 * → taste of home → visit → footer.
 * Not rendered any more (components/data kept): Just arrived (data/arrivals.json), Instagram grid, deli counter, map.
 */
export default function Home() {
  const hoursReady = hoursConfigured(HOURS);
  const countriesReady = COUNTRIES.some((c) => !isPlaceholder(c));
  const outlineWhite = `${btnBase} border-2 border-white text-white hover:bg-white/10 focus-visible:outline-white`;

  return (
    <>
      {/* NAV */}
      <header className="bg-cream">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6 sm:px-10">
          <a href="#top" className="rounded-md focus-visible:outline-brand-ink">
            <Image src="/photos/real/logo.png" alt="Taste of Europe Gourmet Foods, home" width={753} height={355} priority className="h-10 w-auto" />
          </a>
          <nav aria-label="Main">
            <a href="#visit" className="inline-flex h-11 items-center rounded-full px-4 text-[15px] font-medium text-brand-ink underline-offset-4 hover:underline">
              Visit us
            </a>
          </nav>
        </div>
      </header>

      <Ticker />

      <main id="top" className="overflow-x-clip">
        <ReviewMode />
        <StickyBar />

        {/* HERO */}
        <section className="relative isolate flex min-h-[calc(100svh-6.5rem)] items-end overflow-hidden bg-brand-ink text-cream">
          <Image
            src="/photos/real/sweets-display.jpg"
            alt="Wooden tables of chocolate bars and wicker baskets of sweets inside Taste of Europe"
            fill
            priority
            sizes="100vw"
            className="-z-10 animate-slowzoom object-cover"
          />
          {/* brand-ink gradient from the bottom-left corner (where the text sits) out to transparent.
              The second layer only adds extra density along the bottom on narrow screens, where the text spans the full width.
              Measured with scripts/contrast.mjs at 390px and 1440px. */}
          <div className="absolute inset-0 -z-10 bg-gradient-to-tr from-brand-ink from-25% via-brand-ink/85 via-55% to-transparent" />
          <div className="absolute inset-0 -z-10 bg-gradient-to-t from-brand-ink/90 via-brand-ink/40 via-50% to-transparent lg:hidden" />

          {/* extra bottom padding on mobile so the sticky bar never covers the hero buttons */}
          <div className="mx-auto w-full max-w-6xl px-6 pb-24 pt-32 sm:px-10 md:pb-16 lg:pb-24">
            <FadeIn>
              <Eyebrow light>{COPY.heroEyebrow}</Eyebrow>
              <h1 className="font-serif leading-[0.9]">
                <span className="block text-[4.25rem] font-medium sm:text-8xl lg:text-[9rem]">{STORE.name}</span>
                <span className="mt-2 block text-2xl italic text-cream sm:text-3xl lg:text-4xl">{STORE.nameSuffix}</span>
              </h1>
              <p data-draft className="mt-6 max-w-md text-lg leading-relaxed text-cream sm:text-xl">
                {COPY.heroTagline}
              </p>
            </FadeIn>

            <FadeIn delay={150} className="mt-9 flex flex-col gap-3 sm:flex-row">
              <a href={DIRECTIONS_URL} target="_blank" rel="noopener noreferrer" className={`${btnBase} bg-brand-red-deep text-white hover:bg-[#b0131a] focus-visible:outline-white`}>
                <PinIcon /> Get directions
              </a>
              <a href="#visit" className={`${btnBase} border-2 border-white bg-brand-ink/40 text-white hover:bg-white/15 focus-visible:outline-white`}>
                See holiday hours
              </a>
            </FadeIn>
          </div>
        </section>

        {/* HOLIDAYS */}
        <section aria-labelledby="holiday-eyebrow" className="px-3 py-14 sm:px-6 sm:py-20">
          <div className="mx-auto max-w-6xl rounded-[2rem] bg-brand-red-tint px-6 py-12 sm:px-10 sm:py-16 lg:px-14">
            <FadeIn className="max-w-2xl">
              <p id="holiday-eyebrow" data-draft className="mb-4 text-[11px] font-semibold uppercase tracking-[0.22em] text-brand-red-deep">
                {COPY.holidayEyebrow}
              </p>
              <Headline v={COPY.holidayTitle} className={h2Class} />
            </FadeIn>

            {/* mobile: horizontal snap row with the next card peeking in; desktop: 3 columns */}
            <ul className="-mx-6 mt-10 flex snap-x snap-mandatory scroll-px-6 gap-4 overflow-x-auto px-6 pb-2 [scrollbar-width:none] sm:-mx-10 sm:scroll-px-10 sm:px-10 md:mx-0 md:grid md:grid-cols-3 md:gap-6 md:overflow-visible md:px-0 md:pb-0 [&::-webkit-scrollbar]:hidden">
              {HOLIDAY_ITEMS.map((h, i) => (
                <li key={h.name} className="w-[78%] shrink-0 snap-start sm:w-[45%] md:w-auto">
                  <FadeIn delay={i * 90}>
                    <div className="relative aspect-[3/4] overflow-hidden rounded-2xl bg-cream">
                      <Image src={h.photo} alt={h.alt} fill sizes="(min-width: 768px) 33vw, 78vw" className="object-cover" />
                    </div>
                    <a href="#visit" data-draft className="group mt-4 inline-flex items-center gap-2 rounded text-[17px] font-medium text-brand-ink underline-offset-4 hover:underline">
                      {h.name}
                      <span className="text-brand-red-deep transition-transform duration-200 group-hover:translate-x-1 motion-reduce:transition-none"><ArrowIcon /></span>
                    </a>
                  </FadeIn>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* ORDER AHEAD (default) or the party platter builder when SHOW_BUILDER is true in content.ts */}
        {SHOW_BUILDER ? (
          <BoardBuilder />
        ) : (
          <section aria-labelledby="order-title" className="mx-auto max-w-6xl px-6 py-14 sm:px-10 sm:py-20">
            <div className="grid items-center gap-8 md:grid-cols-2 md:gap-14">
              <FadeIn>
                <div className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-cream-deep">
                  <Image src="/photos/real/deli-case-1.jpg" alt="The Taste of Europe deli case" fill sizes="(min-width: 768px) 50vw, 100vw" className="object-cover" />
                </div>
              </FadeIn>
              <FadeIn delay={100}>
                <h2 id="order-title" className={h2Class}>{COPY.orderTitle}</h2>
                {(!isPlaceholder(COPY.orderBody) || !PRESENTATION) && (
                  <p data-draft className="mt-5 max-w-md text-[17px] leading-relaxed text-brand-ink-soft"><Val v={COPY.orderBody} /></p>
                )}
                <div className="mt-8 flex flex-wrap items-center gap-3">
                  <a href={CALL_HREF} className={`${btnBase} w-full bg-brand-red-deep text-white hover:bg-[#b0131a] focus-visible:outline-brand-ink sm:w-auto`}>
                    <PhoneIcon /> Call the store
                  </a>
                  {!STORE.phone && <ReviewOnly><span className="text-sm">tel:<Ph>{"{{PHONE}}"}</Ph></span></ReviewOnly>}
                </div>
              </FadeIn>
            </div>
          </section>
        )}

        {/* CATEGORIES (typography list) */}
        <section aria-labelledby="inside-eyebrow" className="border-t border-brand-ink/10 py-16 sm:py-24">
          <div className="mx-auto max-w-6xl px-6 sm:px-10">
            <p id="inside-eyebrow" data-draft className="mb-10 text-center text-[11px] font-semibold uppercase tracking-[0.22em] text-brand-red-deep">
              {COPY.insideEyebrow}
            </p>
            <CategoryList />
          </div>
        </section>

        {/* TASTE OF HOME (shop by country). NEEDS OWNER INPUT: headline + countries.
            Hidden in presentation mode until at least one country is filled in. */}
        {(countriesReady || !PRESENTATION) && (
          <section aria-labelledby="country-eyebrow" className="bg-cream-deep">
            <div className="mx-auto max-w-6xl px-6 py-16 sm:px-10 sm:py-24">
              <FadeIn className="max-w-2xl">
                <p id="country-eyebrow" data-draft className="mb-4 text-[11px] font-semibold uppercase tracking-[0.22em] text-brand-red-deep">
                  {COPY.countryEyebrow}
                </p>
                <Headline v={COPY.insideTitle} className={h2Class} />
              </FadeIn>
              <ul className="mt-10 grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-3">
                {COUNTRIES.filter((c) => !(PRESENTATION && isPlaceholder(c))).map((c) => (
                  <li key={c} className="flex items-center rounded-2xl border border-brand-ink/15 bg-cream px-4 py-5 font-serif text-[1.35rem] font-medium sm:px-6 sm:py-7 sm:text-[1.7rem]">
                    <Val v={c} />
                  </li>
                ))}
              </ul>
            </div>
          </section>
        )}

        {/* VISIT US */}
        <section id="visit" aria-labelledby="visit-title" className="scroll-mt-4 bg-brand-red-deep text-white">
          <div className="mx-auto grid max-w-6xl items-center gap-12 px-6 py-16 sm:px-10 sm:py-24 lg:grid-cols-12">
            <FadeIn className="text-center lg:col-span-7">
              {/* logo red disappears on red, so it sits on a small off-white badge */}
              <span className="inline-block rounded-2xl bg-cream px-5 py-3">
                <Image src="/photos/real/logo.png" alt="Taste of Europe Gourmet Foods logo" width={753} height={355} className="h-auto w-[150px] sm:w-[180px]" />
              </span>
              <h2 id="visit-title" data-draft className="mt-8 text-[12px] font-semibold uppercase tracking-[0.22em]">{COPY.visitEyebrow}</h2>

              <address className="mt-4 font-serif text-3xl font-medium not-italic leading-tight sm:text-4xl">
                {STORE.street}
                <br />
                {STORE.cityLine}
              </address>

              <dl className="mx-auto mt-10 max-w-sm space-y-8 text-[17px]">
                {(hoursReady || !PRESENTATION) && (
                  <div>
                    <dt className="text-[12px] font-semibold uppercase tracking-[0.2em]">Hours</dt>
                    <dd className="mt-2">
                      {hoursReady ? (
                        <ul className="space-y-1">
                          {formatWeek(HOURS).map((r) => (
                            <li key={r.days} className="flex justify-between gap-6">
                              <span>{r.days}</span>
                              <span>{r.time}</span>
                            </li>
                          ))}
                        </ul>
                      ) : (
                        <Ph onDark>{"{{HOURS}}"}</Ph>
                      )}
                    </dd>
                  </div>
                )}
                {HOLIDAY_HOURS.length > 0 && (
                  <div className="rounded-2xl border border-white/40 px-5 py-4">
                    <dt className="text-[12px] font-semibold uppercase tracking-[0.2em]">Holiday hours</dt>
                    <dd className="mt-3">
                      <ul className="space-y-2">
                        {HOLIDAY_HOURS.map((r, i) => (
                          <li key={i} className="flex flex-wrap justify-between gap-x-6 gap-y-1">
                            <span><Val v={r.date} onDark /></span>
                            <span><Val v={r.hours} onDark /></span>
                          </li>
                        ))}
                      </ul>
                    </dd>
                  </div>
                )}
                {(STORE.phone || !PRESENTATION) && (
                  <div>
                    <dt className="text-[12px] font-semibold uppercase tracking-[0.2em]">Phone</dt>
                    <dd className="mt-2">
                      {STORE.phone ? <a href={CALL_HREF} className="underline underline-offset-4">{STORE.phone}</a> : <Ph onDark>{"{{PHONE}}"}</Ph>}
                    </dd>
                  </div>
                )}
                {(STORE.email || !PRESENTATION) && (
                  <div>
                    <dt className="text-[12px] font-semibold uppercase tracking-[0.2em]">Email</dt>
                    <dd className="mt-2">
                      {STORE.email ? <a href={`mailto:${STORE.email}`} className="underline underline-offset-4">{STORE.email}</a> : <Ph onDark>{"{{EMAIL}}"}</Ph>}
                    </dd>
                  </div>
                )}
              </dl>

              <div className="mt-10 flex flex-col justify-center gap-3 sm:flex-row">
                <a href={DIRECTIONS_URL} target="_blank" rel="noopener noreferrer" className={outlineWhite}>
                  <PinIcon /> Get directions
                </a>
                {/* with no phone yet, Call would only jump back to this section, so presentation mode hides it */}
                {(STORE.phone || !PRESENTATION) && (
                  <a href={CALL_HREF} className={outlineWhite}>
                    <PhoneIcon /> Call
                  </a>
                )}
              </div>
            </FadeIn>

            {/* desktop photo strip */}
            <div className="hidden gap-4 lg:col-span-5 lg:grid">
              <div className="relative aspect-[4/3] overflow-hidden rounded-2xl">
                <Image src="/photos/real/storefront-1.jpg" alt="The Taste of Europe storefront on Providence Rd W" fill sizes="35vw" className="object-cover" />
              </div>
              <div className="relative aspect-[4/3] overflow-hidden rounded-2xl">
                <Image src="/photos/real/interior-wide-1.jpg" alt="Inside the store: wide aisle with display tables" fill sizes="35vw" className="object-cover" />
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* FOOTER */}
      <footer className="bg-brand-ink pb-[76px] text-white md:pb-0">
        <div className="mx-auto flex max-w-6xl flex-col gap-8 px-6 py-14 sm:px-10 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="font-serif text-3xl">{STORE.name} <span className="italic text-white/85">{STORE.nameSuffix}</span></p>
            <p data-draft className="mt-2 max-w-sm text-sm text-white/85">{COPY.footerLine}</p>
            <p className="mt-4 text-sm text-white/85">{STORE.street}, {STORE.cityLine}</p>
          </div>
          <div className="flex flex-col gap-3 text-sm md:items-end">
            {/* Instagram link. Handle + URL come from data/store.json; hidden in presentation mode until filled in */}
            {(STORE.instagram || !PRESENTATION) && (
              <a href={INSTAGRAM_URL} className="inline-flex h-11 items-center gap-2 rounded-full border border-white/50 px-5 transition-colors hover:bg-white/10">
                <InstagramIcon /> {STORE.instagram ? `Follow ${STORE.instagram}` : <>Follow us on Instagram <Ph onDark>{"{{INSTAGRAM}}"}</Ph></>}
              </a>
            )}
            <ReviewOnly><p className="text-xs text-white/75">Concept mockup. Not the official website.</p></ReviewOnly>
          </div>
        </div>
      </footer>
    </>
  );
}
