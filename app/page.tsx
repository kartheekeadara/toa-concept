import Image from "next/image";
import FadeIn from "@/components/FadeIn";
import ReviewMode from "@/components/ReviewMode";
import BoardBuilder from "@/components/BoardBuilder";
import StickyBar from "@/components/StickyBar";
import Nav from "@/components/Nav";
import InsideGrid from "@/components/InsideGrid";
import PhotoStack from "@/components/PhotoStack";
import { Ph, Val, btnBase, h2Class, PinIcon, PhoneIcon, InstagramIcon, ArrowIcon } from "@/components/ui";
import { PRESENTATION } from "@/lib/flags";
import { formatWeek, hoursConfigured, DAYS } from "@/lib/hours";
import {
  STORE,
  COPY,
  HERO_TILES,
  HOLIDAY_ITEMS,
  HOLIDAY_HOURS,
  COUNTRIES,
  FOOTER_STRIP,
  DIRECTIONS_URL,
  CALL_HREF,
  INSTAGRAM_URL,
  HOURS,
  SHOW_BUILDER,
  CATEGORIES,
} from "./content";

const CATEGORY_COUNT_WORDS: Record<number, string> = { 5: "Five", 6: "Six", 7: "Seven", 8: "Eight" };


/** The holiday rows shown in the holidays section: the two Christmases and their eves. Full list lives in the footer. */
const HOLIDAY_GLANCE = HOLIDAY_HOURS.filter((r) => ["Dec 24", "Dec 25", "Jan 6", "Jan 7"].includes(r.date));
const HOLIDAY_NAMES: Record<string, string> = { "Dec 24": "Christmas Eve", "Dec 25": "Christmas Day", "Jan 7": "Orthodox Christmas" };

/**
 * Section order: nav → hero → holidays → order ahead (or platter builder) → what's inside (aisle guide)
 * → inside the store (photo stack) → shop by country (menu board) → visit + footer.
 * Not rendered (components/data kept): Just arrived (data/arrivals.json), Instagram grid, deli counter, map.
 */
export default function Home() {
  const hoursReady = hoursConfigured(HOURS);
  const CATEGORIES_COUNT = CATEGORY_COUNT_WORDS[CATEGORIES.length] ?? String(CATEGORIES.length);
  const openEveryDay = hoursReady && DAYS.every((d) => HOURS.week[d] !== null);

  return (
    <>
      <Nav />

      <main id="top" className="overflow-x-clip">
        <ReviewMode />
        <StickyBar />

        {/* HERO: type on cream + staggered real photos. No overlay needed. */}
        <section className="mx-auto max-w-6xl px-6 pb-16 pt-10 sm:px-10 sm:pt-14 lg:grid lg:grid-cols-12 lg:items-center lg:gap-10 lg:pb-24 lg:pt-12">
          <FadeIn className="lg:col-span-6">
            <h1 className="font-serif font-medium leading-[0.92] tracking-[-0.01em]">
              <span className="block text-[4.2rem] sm:text-8xl lg:text-[7.25rem]">{STORE.name}</span>
              <span className="mt-3 block text-[1.6rem] italic text-brand-ink-soft sm:text-3xl">{STORE.nameSuffix}</span>
            </h1>
            <p data-draft className="mt-6 max-w-md text-lg leading-relaxed text-brand-ink-soft sm:text-xl">
              {COPY.heroTagline}
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <a href={DIRECTIONS_URL} target="_blank" rel="noopener noreferrer" className={`${btnBase} bg-brand-red-deep text-white hover:bg-[#b0131a] focus-visible:outline-brand-ink`}>
                <PinIcon /> Get directions
              </a>
              <a href="#visit" className={`${btnBase} border-2 border-brand-ink/80 text-brand-ink hover:bg-brand-ink/5 focus-visible:outline-brand-ink`}>
                See holiday hours
              </a>
            </div>
          </FadeIn>

          {/* mobile: swipeable strip */}
          <ul aria-label="Photos from the store" className="-mx-6 mt-10 flex snap-x snap-mandatory scroll-px-6 items-end gap-3 overflow-x-auto px-6 py-1 [scrollbar-width:none] focus-visible:outline focus-visible:outline-2 focus-visible:outline-brand-ink sm:-mx-10 sm:px-10 lg:hidden [&::-webkit-scrollbar]:hidden">
            {HERO_TILES.map((t, i) => (
              <li key={t.photo} className={`relative shrink-0 snap-start overflow-hidden rounded-2xl bg-cream-deep ${i % 2 ? "h-56 w-[52%]" : "h-72 w-[60%]"} sm:w-[38%]`}>
                <Image src={t.photo} alt={t.alt} fill priority={i < 2} sizes="60vw" className="object-cover" />
              </li>
            ))}
          </ul>

          {/* desktop: two staggered columns */}
          <div className="hidden grid-cols-2 gap-4 lg:col-span-6 lg:grid">
            {[0, 1].map((col) => (
              <div key={col} className={`flex flex-col gap-4 ${col ? "pt-16" : ""}`}>
                {HERO_TILES.filter((_, i) => i % 2 === col).map((t, j) => (
                  <FadeIn key={t.photo} delay={(col * 2 + j) * 90}>
                    <div className={`relative overflow-hidden rounded-[1.5rem] bg-cream-deep ${t.shape}`}>
                      <Image src={t.photo} alt={t.alt} fill priority sizes="25vw" className="object-cover" />
                    </div>
                  </FadeIn>
                ))}
              </div>
            ))}
          </div>
        </section>

        {/* HOLIDAYS: sticky headline + key dates on the left, staggered photos on the right */}
        <section id="holidays" aria-labelledby="holiday-title" className="scroll-mt-20 bg-cream-deep">
          <div className="mx-auto max-w-6xl px-6 py-16 sm:px-10 sm:py-24 lg:grid lg:grid-cols-12 lg:gap-14">
            <div className="lg:col-span-5">
              <div className="lg:sticky lg:top-28">
                <h2 id="holiday-title" data-draft className={h2Class}>{COPY.holidayTitle}</h2>

                {HOLIDAY_GLANCE.length > 0 && (
                  <table className="mt-8 w-full max-w-sm text-[15px]">
                    <caption className="mb-2 text-left text-[13px] font-semibold text-brand-ink">Christmas and Orthodox Christmas hours</caption>
                    <tbody>
                      {HOLIDAY_GLANCE.map((r) => (
                        <tr key={r.date} className="border-t border-brand-ink/10">
                          <th scope="row" className="py-2.5 pr-4 text-left align-top font-normal">
                            <span className="font-medium">{r.date}</span>
                            <span className="block text-[13px] text-brand-ink-soft">{("note" in r && r.note) || HOLIDAY_NAMES[r.date]}</span>
                          </th>
                          <td className="whitespace-nowrap py-2.5 text-right align-top">{r.hours}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                )}

                <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3">
                  <a href={CALL_HREF} className={`${btnBase} h-12 bg-brand-red-deep px-6 text-white hover:bg-[#b0131a] focus-visible:outline-brand-ink`}>
                    <PhoneIcon /> Call ahead
                  </a>
                  <a href="#visit" className="group inline-flex items-center gap-2 rounded text-[15px] font-medium underline-offset-4 hover:underline">
                    All holiday hours
                    <span className="text-brand-red-deep transition-transform group-hover:translate-x-1 motion-reduce:transition-none"><ArrowIcon /></span>
                  </a>
                </div>
              </div>
            </div>

            {/* photos: mobile snap row, desktop staggered (two up, one wide) */}
            <ul aria-label="Holiday photos" className="-mx-6 mt-12 flex snap-x snap-mandatory scroll-px-6 gap-4 overflow-x-auto px-6 pb-2 [scrollbar-width:none] focus-visible:outline focus-visible:outline-2 focus-visible:outline-brand-ink sm:-mx-10 sm:px-10 md:mx-0 md:grid md:grid-cols-2 md:gap-6 md:overflow-visible md:px-0 lg:col-span-7 lg:mt-0 [&::-webkit-scrollbar]:hidden">
              {HOLIDAY_ITEMS.map((h, i) => (
                <li key={h.name} className={`w-[78%] shrink-0 snap-start md:w-auto ${i === 1 ? "md:mt-20" : ""} ${i === 2 ? "md:col-span-2" : ""}`}>
                  <FadeIn delay={i * 90}>
                    <div className={`relative overflow-hidden rounded-[1.5rem] bg-cream ${i === 2 ? "aspect-[3/4] md:aspect-[16/10]" : "aspect-[3/4]"}`}>
                      <Image src={h.photo} alt={h.alt} fill sizes={i === 2 ? "(min-width: 1024px) 55vw, 78vw" : "(min-width: 1024px) 28vw, 78vw"} className="object-cover" />
                    </div>
                    <p data-draft className="mt-4 font-serif text-[1.3rem] font-medium text-brand-ink">{h.name}</p>
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
          <section id="deli" aria-labelledby="order-title" className="mx-auto max-w-6xl scroll-mt-20 px-6 py-16 sm:px-10 sm:py-24">
            <div className="grid items-center gap-8 md:grid-cols-2 md:gap-14">
              <FadeIn>
                <div className="relative aspect-[4/3] overflow-hidden rounded-[1.5rem] bg-cream-deep">
                  <Image src="/photos/real/deli-case-1.jpg" alt="The Taste of Europe deli case" fill sizes="(min-width: 768px) 50vw, 100vw" className="object-cover" />
                </div>
              </FadeIn>
              <FadeIn delay={100}>
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

        {/* WHAT'S INSIDE: edge-to-edge photo grid */}
        <section aria-labelledby="aisles-title" className="border-t border-brand-ink/10 pt-16 sm:pt-24">
          <div className="mx-auto mb-10 flex max-w-6xl flex-col gap-4 px-6 sm:mb-12 sm:px-10 md:flex-row md:items-end md:justify-between">
            <h2 id="aisles-title" data-draft className={h2Class}>{COPY.insideEyebrow}</h2>
            <p className="max-w-xs text-[15px] leading-relaxed text-brand-ink-soft">
              {CATEGORIES_COUNT} sections, one small shop on {STORE.street.replace(/^\d+ /, "")}.
            </p>
          </div>
          <InsideGrid />
        </section>

        {/* INSIDE THE STORE: photo stack + one line */}
        <section id="inside" aria-labelledby="store-title" className="scroll-mt-20 bg-cream-deep">
          <div className="mx-auto grid max-w-6xl items-center gap-12 px-6 py-16 sm:px-10 sm:py-24 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-6">
              <PhotoStack />
            </div>
            <FadeIn className="lg:col-span-6">
              <h2 id="store-title" data-draft className={h2Class}>{COPY.insideStoreLine}</h2>
              <p className="mt-6 max-w-md text-[17px] leading-relaxed text-brand-ink-soft">
                {STORE.street}, {STORE.cityLine.replace(/ \d{5}$/, "")}.
                {openEveryDay && " Open seven days a week."}
              </p>
              <a href={DIRECTIONS_URL} target="_blank" rel="noopener noreferrer" className="group mt-6 inline-flex items-center gap-2 rounded text-[17px] font-medium underline-offset-4 hover:underline">
                Get directions
                <span className="text-brand-red-deep transition-transform group-hover:translate-x-1 motion-reduce:transition-none"><ArrowIcon /></span>
              </a>
            </FadeIn>
          </div>
        </section>

        {/* SHOP BY COUNTRY: deli menu board */}
        <section aria-labelledby="country-title" className="px-3 py-14 sm:px-6 sm:py-20">
          <div className="mx-auto max-w-6xl rounded-[2rem] bg-brand-ink p-2 text-cream sm:p-3">
            {/* inner rule, like a framed menu board */}
            <div className="rounded-[1.6rem] border border-cream/20 px-5 py-12 sm:px-12 sm:py-16 lg:px-16">
              <div className="text-center">
                <h2 id="country-title" data-draft className={`${h2Class} mx-auto max-w-2xl`}>{COPY.countryTitle}</h2>
                <div aria-hidden className="mx-auto mt-6 flex max-w-[12rem] items-center gap-3 text-cream/40">
                  <span className="h-px flex-1 bg-current" />
                  <span className="h-1.5 w-1.5 rotate-45 bg-current" />
                  <span className="h-px flex-1 bg-current" />
                </div>
              </div>
              <ul className="mt-10 grid gap-x-16 md:grid-cols-2">
                {COUNTRIES.map((c) => (
                  <li key={c.name} className="border-b border-dashed border-cream/20 py-5 last:border-0 md:[&:nth-last-child(2)]:border-0">
                    <div className="flex items-baseline gap-3">
                      <h3 className="font-serif text-[1.75rem] font-medium leading-tight sm:text-[2rem]">{c.name}</h3>
                      <span aria-hidden className="hidden flex-1 translate-y-[-0.35em] border-b-2 border-dotted border-cream/25 sm:block" />
                      <span lang={c.lang} className="ml-auto text-[14px] text-cream/75 sm:ml-0">{c.native}</span>
                    </div>
                    <p className="mt-1.5 font-serif text-[1.1rem] italic text-cream/90">{c.items.join(" & ")}</p>
                  </li>
                ))}
              </ul>
              <p data-draft className="mt-10 text-center text-[15px] text-cream/85">{COPY.countryNote}</p>
            </div>
          </div>
        </section>
      </main>

      {/* VISIT + FOOTER: light, so the real logo can sit in it */}
      <footer id="visit" aria-labelledby="visit-title" className="scroll-mt-16 border-t border-brand-ink/10 bg-cream-deep">
        <h2 id="visit-title" className="sr-only">Visit us</h2>
        <div className="mx-auto grid max-w-6xl gap-10 px-6 pt-16 sm:px-10 sm:pt-24 lg:grid-cols-12 lg:gap-12">
          {/* find us */}
          <div className="lg:col-span-5">
            <Image src="/photos/real/logo.png" alt="Taste of Europe Gourmet Foods" width={753} height={355} className="h-auto w-[170px]" />
            <address className="mt-8 font-serif text-[1.8rem] font-medium not-italic leading-[1.08] min-[400px]:text-[2rem] sm:text-[2.6rem] lg:text-[2.1rem] xl:text-[2.25rem]">
              {STORE.street}
              <br />
              {STORE.cityLine}
            </address>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <a href={DIRECTIONS_URL} target="_blank" rel="noopener noreferrer" className={`${btnBase} bg-brand-red-deep text-white hover:bg-[#b0131a] focus-visible:outline-brand-ink`}>
                <PinIcon /> Get directions
              </a>
              {(STORE.phone || !PRESENTATION) && (
                <a href={CALL_HREF} className={`${btnBase} border-2 border-brand-ink/80 hover:bg-brand-ink/5 focus-visible:outline-brand-ink`}>
                  <PhoneIcon /> {STORE.phone ?? "Call"}
                </a>
              )}
            </div>
            <ul className="mt-8 space-y-2 text-[16px]">
              <li>{STORE.email ? <a href={`mailto:${STORE.email}`} className="break-all underline decoration-brand-ink/30 underline-offset-4 hover:decoration-brand-ink">{STORE.email}</a> : <Ph>{"{{EMAIL}}"}</Ph>}</li>
              {(STORE.instagram || !PRESENTATION) && (
                <li>
                  <a href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 underline decoration-brand-ink/30 underline-offset-4 hover:decoration-brand-ink">
                    <InstagramIcon size={16} /> {STORE.instagram ?? <Ph>{"{{INSTAGRAM}}"}</Ph>}
                  </a>
                </li>
              )}
            </ul>
          </div>

          {/* hours, styled like the sign that hangs on a shop door */}
          <div className="lg:col-span-4">
            <div className="relative rounded-[1.5rem] bg-white px-6 pb-7 pt-10 shadow-[0_24px_50px_-30px_rgba(58,58,58,0.55)] ring-1 ring-brand-ink/10 sm:px-8">
              {/* hanger */}
              <span aria-hidden className="absolute left-1/2 top-3 h-3 w-3 -translate-x-1/2 rounded-full border-2 border-brand-ink/25 bg-cream-deep" />
              <h3 className="text-center font-serif text-[1.9rem] font-medium">Hours</h3>
              {hoursReady ? (
                <table className="mt-4 w-full text-[16px]">
                  <tbody>
                    {formatWeek(HOURS).map((r) => (
                      <tr key={r.days} className="border-t border-brand-ink/10">
                        <th scope="row" className="py-2 pr-4 text-left font-medium">{r.days}</th>
                        <td className="whitespace-nowrap py-2 text-right">{r.time}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              ) : (
                <p className="mt-4 text-center"><Ph>{"{{HOURS}}"}</Ph></p>
              )}
              {HOLIDAY_HOURS.length > 0 && (
                <>
                  <h3 className="mt-8 text-center font-serif text-[1.35rem] font-medium">Holiday hours</h3>
                  <table className="mt-3 w-full text-[15px]">
                    <thead className="sr-only"><tr><th scope="col">Date</th><th scope="col">Hours</th></tr></thead>
                    <tbody>
                      {HOLIDAY_HOURS.map((r, i) => (
                        <tr key={i} className="border-t border-brand-ink/10">
                          <th scope="row" className="py-1.5 pr-4 text-left align-top font-normal">
                            <Val v={r.date} />
                            {"note" in r && r.note ? <span className="block text-[13px] text-brand-ink-soft">{r.note}</span> : null}
                          </th>
                          <td className="whitespace-nowrap py-1.5 text-right align-top"><Val v={r.hours} /></td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </>
              )}
            </div>
          </div>

          {/* storefront */}
          <div className="lg:col-span-3">
            {/* storefront-4: no people, no markup. storefront-1 had a drawn circle and a person in the doorway. */}
            <div className="relative aspect-[4/3] overflow-hidden rounded-[1.5rem] lg:aspect-[3/4]">
              <Image style={{ objectPosition: "38% 50%" }} src="/photos/real/storefront-4.jpg" alt="The Taste of Europe storefront, with its red and white sign above the door" fill sizes="(min-width: 1024px) 25vw, 100vw" className="object-cover" />
            </div>
            <p className="mt-3 text-[14px] text-brand-ink-soft">Look for the red sign above the door.</p>
          </div>
        </div>

        {/* photo strip */}
        <div className="mt-16 sm:mt-20">
          <div className="mx-auto flex max-w-6xl flex-col gap-1 px-6 sm:flex-row sm:items-baseline sm:justify-between sm:gap-4 sm:px-10">
            <p className="font-serif text-[1.35rem] font-medium">From the shelves</p>
            {STORE.instagram && (
              <a href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-[15px] font-medium underline-offset-4 hover:underline">
                <InstagramIcon size={16} /> Follow {STORE.instagram}
              </a>
            )}
          </div>
          <ul className="mt-5 grid grid-cols-3 gap-[3px] md:grid-cols-6">
            {FOOTER_STRIP.map((f) => (
              <li key={f.photo} className="relative aspect-square overflow-hidden bg-brand-ink">
                <Image src={f.photo} alt={f.alt} fill sizes="(min-width: 768px) 17vw, 33vw" className="object-cover" />
              </li>
            ))}
          </ul>
        </div>

        {/* bottom bar */}
        <div className="bg-brand-ink pb-[76px] text-cream md:pb-0">
          <div className="mx-auto flex max-w-6xl flex-col gap-2 px-6 py-6 text-[13px] text-cream/80 sm:flex-row sm:justify-between sm:px-10">
            <p>© 2026 {STORE.name} {STORE.nameSuffix} · {STORE.street}, {STORE.cityLine}</p>
            {/* stays in both modes: this is a mockup */}
            <p>Concept mockup. Not the official website.</p>
          </div>
        </div>
      </footer>
    </>
  );
}
