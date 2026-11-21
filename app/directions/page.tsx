import type { Metadata } from "next";
import Image from "next/image";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import StickyBar from "@/components/StickyBar";
import { btnBase, PhoneIcon, PinIcon } from "@/components/ui";
import { PRESENTATION } from "@/lib/flags";
import { formatWeek, hoursConfigured, DAYS } from "@/lib/hours";
import { CALL_HREF, DIRECTIONS_URL, HOURS, MAP_EMBED_URL, STORE } from "../content";

export const metadata: Metadata = {
  title: PRESENTATION ? "Directions · Taste of Europe Gourmet Foods" : "Directions · Taste of Europe · Concept",
  robots: { index: false, follow: false },
};

/**
 * /directions: where every "Get directions" button lands.
 * The storefront photo (so people recognise the shop), the address, a Google Maps embed, and a button that opens
 * turn-by-turn directions in Google Maps.
 */
export default function DirectionsPage() {
  const hoursReady = hoursConfigured(HOURS);
  const openEveryDay = hoursReady && DAYS.every((d) => HOURS.week[d] !== null);

  return (
    <>
      <Nav />
      <main id="top" className="overflow-x-clip">
        <StickyBar />

        <section aria-labelledby="dir-title" className="mx-auto max-w-6xl px-6 pb-12 pt-10 sm:px-10 sm:pt-14 lg:grid lg:grid-cols-12 lg:items-center lg:gap-14 lg:pb-16">
          <div className="lg:col-span-5">
            <h1 id="dir-title" className="font-serif text-[2.8rem] font-medium leading-[1.02] sm:text-6xl">Find the shop</h1>
            <address className="mt-6 text-[1.25rem] not-italic leading-relaxed">
              {STORE.street}
              <br />
              {STORE.cityLine}
            </address>
            {hoursReady && (
              <table className="mt-6 text-[16px]">
                <caption className="sr-only">Opening hours</caption>
                <tbody>
                  {formatWeek(HOURS).map((r) => (
                    <tr key={r.days}>
                      <th scope="row" className="py-0.5 pr-6 text-left font-medium">{r.days}</th>
                      <td className="py-0.5 text-brand-ink-soft">{r.time}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
            {openEveryDay && <p className="mt-2 text-[15px] text-brand-ink-soft">Open seven days a week.</p>}
            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <a href={DIRECTIONS_URL} target="_blank" rel="noopener noreferrer" className={`${btnBase} bg-brand-red-deep text-white hover:bg-[#b0131a] focus-visible:outline-brand-ink`}>
                <PinIcon /> <span className="whitespace-nowrap">Open in Google Maps</span>
              </a>
              {STORE.phone && (
                <a href={CALL_HREF} className={`${btnBase} border-2 border-brand-ink/80 hover:bg-brand-ink/5 focus-visible:outline-brand-ink`}>
                  <PhoneIcon /> <span className="whitespace-nowrap">{STORE.phone}</span>
                </a>
              )}
            </div>
          </div>

          {/* storefront-3: the clearest, widest shot of the building, no people */}
          <figure className="mt-10 lg:col-span-7 lg:mt-0">
            <div className="relative aspect-[4/3] overflow-hidden rounded-[1.5rem] bg-cream-deep sm:aspect-[16/10]">
              <Image
                src="/photos/real/storefront-3.jpg"
                alt="The Taste of Europe storefront: a green building with the red Taste of Europe sign over a glass door"
                fill
                priority
                sizes="(min-width: 1024px) 55vw, 100vw"
                className="object-cover"
                style={{ objectPosition: "50% 40%" }}
              />
            </div>
            <figcaption className="mt-3 text-[14px] text-brand-ink-soft">Look for the red sign above the door.</figcaption>
          </figure>
        </section>

        {/* map: bare address so Google's card doesn't show star ratings */}
        <section aria-label="Map" className="mx-auto max-w-6xl px-6 pb-20 sm:px-10">
          <div className="relative h-[420px] overflow-hidden rounded-[1.5rem] bg-cream-deep ring-1 ring-brand-ink/10 sm:h-[520px]">
            <iframe
              title={`Map showing ${STORE.street}, ${STORE.cityLine}`}
              src={MAP_EMBED_URL}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="absolute inset-0 h-full w-full border-0"
            />
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
