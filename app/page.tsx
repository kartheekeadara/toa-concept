import Image from "next/image";
import FadeIn from "@/components/FadeIn";
import ReviewMode from "@/components/ReviewMode";
import BoardBuilder from "@/components/BoardBuilder";
import StickyBar from "@/components/StickyBar";
import Ticker from "@/components/Ticker";
import CategoryList from "@/components/CategoryList";
import { Ph, Val, Eyebrow, btnBase, h2Class, PinIcon, PhoneIcon, InstagramIcon, ArrowIcon } from "@/components/ui";
import { PRESENTATION, isPlaceholder } from "@/lib/flags";
import { formatWeek, hoursConfigured } from "@/lib/hours";
import {
  STORE,
  COPY,
  HOLIDAY_ITEMS,
  HOLIDAY_HOURS,
  COUNTRIES,
  MOSAIC,
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

const NAV = [
  { href: "#holidays", label: "Holidays" },
  { href: "#deli", label: "Deli" },
  { href: "#inside", label: "Inside" },
  { href: "#visit", label: "Visit" },
];

/** Small uppercase label; `onInk` uses the lighter red that passes AA on charcoal. */
function Label({ children, id, onInk = false, className = "" }: { children: string; id?: string; onInk?: boolean; className?: string }) {
  return (
    <p id={id} data-draft className={`text-[11px] font-semibold uppercase tracking-[0.22em] ${onInk ? "text-brand-red-light" : "text-brand-red-deep"} ${className}`}>
      {children}
    </p>
  );
}

/** Mosaic tile layout (desktop): first tile is 2×2, the other five fill a 3-column grid around it. */
const TILE = [
  "md:col-span-2 md:row-span-2",
  "",
  "",
  "",
  "",
  "",
];

/**
 * Section order: nav → ticker → hero → holidays → order ahead (or platter builder) → categories
 * → inside the store → countries → visit → footer.
 * Not rendered (components/data kept): Just arrived (data/arrivals.json), Instagram grid, deli counter, map.
 */
export default function Home() {
  const hoursReady = hoursConfigured(HOURS);

  return (
    <>
      {/* NAV */}
      <header className="bg-cream">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6 sm:px-10">
          <a href="#top" className="rounded-md focus-visible:outline-brand-ink">
            <Image src="/photos/real/logo.png" alt="Taste of Europe Gourmet Foods, home" width={753} height={355} priority className="h-10 w-auto" />
          </a>
          <nav aria-label="Main">
            <ul className="flex items-center gap-1">
              {NAV.map((n) => (
                <li key={n.href} className={n.href === "#visit" ? "" : "hidden md:block"}>
                  <a href={n.href} className="inline-flex h-11 items-center rounded-full px-4 text-[15px] font-medium text-brand-ink underline-offset-4 hover:text-brand-red-deep hover:underline">
                    {n.label}
                  </a>
                </li>
              ))}
            </ul>
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
          {/* One brand-ink gradient from the bottom-left corner (behind the text), easing through ~55% to clear.
              On phones the text spans the full width, so it runs bottom-up instead of diagonal.
              No flat wash: the top of the photo stays bright. Measured with scripts/contrast.mjs. */}
          <div className="absolute inset-0 -z-10 bg-[linear-gradient(to_top,rgba(58,58,58,0.95)_0%,rgba(58,58,58,0.85)_45%,rgba(58,58,58,0.55)_70%,rgba(58,58,58,0)_100%)] lg:bg-[linear-gradient(to_top_right,rgba(58,58,58,0.95)_0%,rgba(58,58,58,0.85)_45%,rgba(58,58,58,0.55)_68%,rgba(58,58,58,0)_92%)]" />

          {/* extra bottom padding on mobile so the sticky bar never covers the hero buttons */}
          <div className="mx-auto w-full max-w-6xl px-6 pb-24 pt-32 sm:px-10 md:pb-16 lg:pb-24">
            <FadeIn className="[text-shadow:0_1px_18px_rgba(30,30,30,0.55)]">
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
              <a href="#visit" className={`${btnBase} border-2 border-white bg-brand-ink/50 text-white hover:bg-white/15 focus-visible:outline-white`}>
                See holiday hours
              </a>
            </FadeIn>
          </div>
        </section>

        {/* HOLIDAYS */}
        <section id="holidays" aria-labelledby="holiday-title" className="scroll-mt-4 px-3 py-14 sm:px-6 sm:py-20">
          <div className="mx-auto max-w-6xl rounded-[2rem] bg-cream-deep px-6 py-12 sm:px-10 sm:py-16 lg:px-14">
            <FadeIn className="max-w-2xl">
              <Label className="mb-4">{COPY.holidayEyebrow}</Label>
              <Headline id="holiday-title" v={COPY.holidayTitle} className={h2Class} />
            </FadeIn>

            {/* mobile: horizontal snap row with the next card peeking in; desktop: 3 columns */}
            <ul className="-mx-6 mt-10 flex snap-x snap-mandatory scroll-px-6 gap-4 overflow-x-auto px-6 pb-2 [scrollbar-width:none] sm:-mx-10 sm:scroll-px-10 sm:px-10 md:mx-0 md:grid md:grid-cols-3 md:gap-6 md:overflow-visible md:px-0 md:pb-0 [&::-webkit-scrollbar]:hidden">
              {HOLIDAY_ITEMS.map((h, i) => (
                <li key={h.name} className="w-[78%] shrink-0 snap-start sm:w-[45%] md:w-auto">
                  <FadeIn delay={i * 90}>
                    <div className="relative aspect-[3/4] overflow-hidden rounded-2xl bg-cream shadow-[0_18px_40px_-24px_rgba(58,58,58,0.6)]">
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
          <section id="deli" aria-labelledby="order-title" className="mx-auto max-w-6xl scroll-mt-4 px-6 py-14 sm:px-10 sm:py-20">
            <div className="grid items-center gap-8 md:grid-cols-2 md:gap-14">
              <FadeIn>
                <div className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-cream-deep">
                  <Image src="/photos/real/deli-case-1.jpg" alt="The Taste of Europe deli case" fill sizes="(min-width: 768px) 50vw, 100vw" className="object-cover" />
                </div>
              </FadeIn>
              <FadeIn delay={100}>
                <Label className="mb-4">The deli counter</Label>
                <h2 id="order-title" className={h2Class}>{COPY.orderTitle}</h2>
                <p data-draft className="mt-5 max-w-md text-[17px] leading-relaxed text-brand-ink-soft"><Val v={COPY.orderBody} /></p>
                <div className="mt-8">
                  <a href={CALL_HREF} className={`${btnBase} w-full bg-brand-red-deep text-white hover:bg-[#b0131a] focus-visible:outline-brand-ink sm:w-auto`}>
                    <PhoneIcon /> Call the store
                  </a>
                  <p data-draft className="mt-3 text-sm text-brand-ink-soft">{COPY.orderNote}</p>
                </div>
              </FadeIn>
            </div>
          </section>
        )}

        {/* CATEGORIES */}
        <section aria-labelledby="inside-title" className="border-t border-brand-ink/10 py-16 sm:py-24">
          <div className="mx-auto max-w-6xl px-6 sm:px-10">
            <Label id="inside-title" className="mb-6">{COPY.insideEyebrow}</Label>
            <CategoryList />
          </div>
        </section>

        {/* INSIDE THE STORE: photo mosaic, no captions */}
        <section id="inside" aria-labelledby="mosaic-title" className="scroll-mt-4 pb-16 sm:pb-24">
          <div className="mx-auto max-w-6xl px-6 sm:px-10">
            <FadeIn className="mb-8 flex flex-col gap-3 sm:mb-10">
              <Label>{COPY.mosaicEyebrow}</Label>
              <h2 id="mosaic-title" data-draft className="font-serif text-[2rem] font-medium leading-tight sm:text-5xl">{COPY.mosaicLine}</h2>
            </FadeIn>
            <ul className="grid grid-cols-2 gap-3 sm:gap-4 md:auto-rows-[220px] md:grid-cols-3 lg:auto-rows-[260px]">
              {MOSAIC.map((m, i) => (
                <li key={m.photo} className={`relative aspect-square overflow-hidden rounded-2xl bg-cream-deep md:aspect-auto ${TILE[i]}`}>
                  <Image src={m.photo} alt={m.alt} fill sizes={i === 0 ? "(min-width: 768px) 66vw, 50vw" : "(min-width: 768px) 33vw, 50vw"} className="object-cover" />
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* COUNTRIES */}
        <section aria-labelledby="country-title" className="bg-cream-deep">
          <div className="mx-auto max-w-6xl px-6 py-16 sm:px-10 sm:py-24">
            <FadeIn className="max-w-2xl">
              <Label className="mb-4">{COPY.countryEyebrow}</Label>
              <Headline id="country-title" v={COPY.countryTitle} className={h2Class} />
            </FadeIn>
            {/* desktop: 3 columns; mobile: snap-scroll row */}
            <ul aria-label="Countries" className="-mx-6 mt-10 flex snap-x snap-mandatory scroll-px-6 gap-4 overflow-x-auto px-6 py-1 [scrollbar-width:none] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-ink sm:-mx-10 sm:scroll-px-10 sm:px-10 md:mx-0 md:grid md:grid-cols-3 md:gap-5 md:overflow-visible md:px-0 md:pb-0 [&::-webkit-scrollbar]:hidden">
              {COUNTRIES.map((c) => (
                <li key={c.name} className="w-[70%] shrink-0 snap-start rounded-2xl border-t-2 border-brand-red bg-cream px-6 pb-6 pt-5 sm:w-[42%] md:w-auto">
                  <h3 className="font-serif text-[1.9rem] font-medium leading-tight">{c.name}</h3>
                  <p className="mt-2 text-[15px] text-brand-ink-soft">{c.items.join(" · ")}</p>
                </li>
              ))}
            </ul>
            <p data-draft className="mt-8 text-[15px] text-brand-ink-soft">{COPY.countryNote}</p>
          </div>
        </section>

        {/* VISIT US */}
        <section id="visit" aria-labelledby="visit-title" className="scroll-mt-4 bg-brand-ink text-cream">
          <div className="mx-auto grid max-w-6xl gap-12 px-6 py-16 sm:px-10 sm:py-24 lg:grid-cols-12 lg:gap-16">
            <FadeIn className="lg:col-span-6">
              <h2 id="visit-title" data-draft className="text-[11px] font-semibold uppercase tracking-[0.22em] text-brand-red-light">{COPY.visitEyebrow}</h2>

              <address className="mt-4 font-serif text-[2rem] font-medium not-italic leading-[1.1] sm:text-5xl">
                {STORE.street}
                <br />
                {STORE.cityLine}
              </address>

              <dl className="mt-10 space-y-8 text-[17px]">
                {(hoursReady || !PRESENTATION) && (
                  <div>
                    <dt className="text-[11px] font-semibold uppercase tracking-[0.2em] text-brand-red-light">Hours</dt>
                    <dd className="mt-3">
                      {hoursReady ? (
                        <table className="w-full max-w-sm">
                          <tbody>
                            {formatWeek(HOURS).map((r) => (
                              <tr key={r.days}>
                                <th scope="row" className="py-1 pr-6 text-left font-normal">{r.days}</th>
                                <td className="whitespace-nowrap py-1">{r.time}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      ) : (
                        <Ph onDark>{"{{HOURS}}"}</Ph>
                      )}
                    </dd>
                  </div>
                )}
                {HOLIDAY_HOURS.length > 0 && (
                  <div>
                    <dt className="text-[11px] font-semibold uppercase tracking-[0.2em] text-brand-red-light">Holiday hours</dt>
                    <dd className="mt-3">
                      <table className="w-full max-w-md border-t border-cream/20">
                        <thead className="sr-only">
                          <tr><th scope="col">Date</th><th scope="col">Hours</th></tr>
                        </thead>
                        <tbody>
                          {HOLIDAY_HOURS.map((r, i) => (
                            <tr key={i} className="border-b border-cream/20">
                              <th scope="row" className="py-2.5 pr-4 text-left align-top font-normal">
                                <Val v={r.date} onDark />
                                {"note" in r && r.note ? <span className="block text-[14px] text-cream/80">{r.note}</span> : null}
                              </th>
                              <td className="whitespace-nowrap py-2.5 text-right align-top sm:text-left"><Val v={r.hours} onDark /></td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </dd>
                  </div>
                )}
                {(STORE.phone || !PRESENTATION) && (
                  <div>
                    <dt className="text-[11px] font-semibold uppercase tracking-[0.2em] text-brand-red-light">Phone</dt>
                    <dd className="mt-2">
                      {STORE.phone ? <a href={CALL_HREF} className="underline decoration-cream/40 underline-offset-4 hover:decoration-cream">{STORE.phone}</a> : <Ph onDark>{"{{PHONE}}"}</Ph>}
                    </dd>
                  </div>
                )}
                {(STORE.email || !PRESENTATION) && (
                  <div>
                    <dt className="text-[11px] font-semibold uppercase tracking-[0.2em] text-brand-red-light">Email</dt>
                    <dd className="mt-2">
                      {STORE.email ? <a href={`mailto:${STORE.email}`} className="break-all underline decoration-cream/40 underline-offset-4 hover:decoration-cream">{STORE.email}</a> : <Ph onDark>{"{{EMAIL}}"}</Ph>}
                    </dd>
                  </div>
                )}
              </dl>

              <div className="mt-10 flex flex-col gap-3 sm:flex-row">
                <a href={DIRECTIONS_URL} target="_blank" rel="noopener noreferrer" className={`${btnBase} bg-brand-red-deep text-white hover:bg-[#b0131a] focus-visible:outline-cream`}>
                  <PinIcon /> Get directions
                </a>
                {(STORE.phone || !PRESENTATION) && (
                  <a href={CALL_HREF} className={`${btnBase} border-2 border-cream/80 text-cream hover:bg-cream/10 focus-visible:outline-cream`}>
                    <PhoneIcon /> Call
                  </a>
                )}
              </div>
            </FadeIn>

            {/* storefront (all screens) + interior (desktop) */}
            <div className="grid content-start gap-4 lg:col-span-6">
              {/* storefront-4: no people, no markup. storefront-1 had a drawn circle and a person in the doorway. */}
              <div className="relative aspect-[16/9] overflow-hidden rounded-2xl">
                <Image src="/photos/real/storefront-4.jpg" alt="The Taste of Europe storefront, with its red and white sign above the door" fill sizes="(min-width: 1024px) 45vw, 100vw" className="object-cover" />
              </div>
              <div className="relative hidden aspect-[16/10] overflow-hidden rounded-2xl lg:block">
                <Image src="/photos/real/interior-wide-1.jpg" alt="Inside the store: a wide aisle with display tables" fill sizes="45vw" className="object-cover" />
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* FOOTER */}
      <footer className="border-t border-cream/10 bg-brand-ink pb-[76px] text-cream md:pb-0">
        <div className="mx-auto flex max-w-6xl flex-col gap-8 px-6 py-14 sm:px-10 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="font-serif text-3xl">{STORE.name} <span className="italic text-cream/85">{STORE.nameSuffix}</span></p>
            <p data-draft className="mt-2 max-w-sm text-sm text-cream/85">{COPY.footerLine}</p>
            <p className="mt-4 text-sm text-cream/85">{STORE.street}, {STORE.cityLine}</p>
          </div>
          <div className="flex flex-col gap-3 text-sm md:items-end">
            {(STORE.instagram || !PRESENTATION) && (
              <a href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer" className="inline-flex h-11 items-center gap-2 rounded-full border border-cream/50 px-5 transition-colors hover:bg-cream/10">
                <InstagramIcon /> {STORE.instagram ? `Follow ${STORE.instagram}` : <>Follow us on Instagram <Ph onDark>{"{{INSTAGRAM}}"}</Ph></>}
              </a>
            )}
            {/* stays in both modes: this is a mockup */}
            <p className="text-xs text-cream/75">Concept mockup. Not the official website.</p>
          </div>
        </div>
      </footer>
    </>
  );
}
