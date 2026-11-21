import Image from "next/image";
import FadeIn from "@/components/FadeIn";
import ReviewMode from "@/components/ReviewMode";
import BoardBuilder from "@/components/BoardBuilder";
import StickyBar from "@/components/StickyBar";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import Link from "next/link";
import InsideGrid from "@/components/InsideGrid";
import PhotoStack from "@/components/PhotoStack";
import { Val, btnBase, h2Class, PinIcon, PhoneIcon, ArrowIcon } from "@/components/ui";
import { hoursConfigured, DAYS } from "@/lib/hours";
import {
  STORE,
  COPY,
  HERO_TILES,
  HOLIDAY_ITEMS,
  HOLIDAY_HOURS,
  COUNTRIES,
  DIRECTIONS_PAGE,
  CALL_HREF,
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
              <Link href={DIRECTIONS_PAGE} className={`${btnBase} bg-brand-red-deep text-white hover:bg-[#b0131a] focus-visible:outline-brand-ink`}>
                <PinIcon /> Get directions
              </Link>
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
              <Link href={DIRECTIONS_PAGE} className="group mt-6 inline-flex items-center gap-2 rounded text-[17px] font-medium underline-offset-4 hover:underline">
                Get directions
                <span className="text-brand-red-deep transition-transform group-hover:translate-x-1 motion-reduce:transition-none"><ArrowIcon /></span>
              </Link>
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

      <Footer />
    </>
  );
}
