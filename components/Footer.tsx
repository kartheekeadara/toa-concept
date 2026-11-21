import Image from "next/image";
import Link from "next/link";
import { CALL_HREF, COPY, DIRECTIONS_PAGE, HOLIDAY_HOURS, HOURS, INSTAGRAM_URL, STORE } from "@/app/content";
import { formatWeek, hoursConfigured } from "@/lib/hours";
import { PRESENTATION } from "@/lib/flags";
import { InstagramIcon, Ph, Val } from "./ui";

/**
 * Footer in the style of a clean UI-kit footer: brand block, three short columns, a highlighted holiday-hours box,
 * a hairline, then copyright on the left and a round social icon on the right. Charcoal with cream text.
 * Shared by the homepage and /directions. id="visit" is the target of "See holiday hours".
 */
export default function Footer() {
  const hoursReady = hoursConfigured(HOURS);
  const head = "text-[14px] font-medium text-cream";
  const item = "text-[15px] leading-relaxed text-cream/80";
  const link = "underline-offset-4 hover:text-cream hover:underline";

  return (
    <footer id="visit" aria-label="Visit and contact" className="scroll-mt-20 bg-brand-ink pb-[76px] text-cream md:pb-0">
      <div className="mx-auto max-w-6xl px-6 pb-10 pt-16 sm:px-10 sm:pt-20">
        <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-[1.25fr_1fr_1fr_0.75fr_1.7fr] lg:gap-10">
          {/* brand */}
          <div className="sm:col-span-2 lg:col-span-1">
            <span className="inline-block rounded-xl bg-cream px-4 py-3">
              <Image src="/photos/real/logo.png" alt="Taste of Europe Gourmet Foods" width={753} height={355} className="h-10 w-auto" />
            </span>
            <p data-draft className={`mt-5 max-w-xs ${item}`}>{COPY.footerLine}</p>
            <ul className="mt-5 space-y-1">
              <li className={item}>{STORE.phone ? <a href={CALL_HREF} className={link}>{STORE.phone}</a> : <Ph onDark>{"{{PHONE}}"}</Ph>}</li>
              <li className={item}>{STORE.email ? <a href={`mailto:${STORE.email}`} className={`break-all ${link}`}>{STORE.email}</a> : <Ph onDark>{"{{EMAIL}}"}</Ph>}</li>
            </ul>
          </div>

          {/* visit */}
          <div>
            <h2 className={head}>Visit</h2>
            <address className={`mt-4 not-italic ${item}`}>
              {STORE.street}
              <br />
              {STORE.cityLine}
            </address>
            <Link href={DIRECTIONS_PAGE} className={`mt-3 inline-block text-[15px] font-medium text-cream ${link}`}>Get directions →</Link>
          </div>

          {/* hours */}
          <div>
            <h2 className={head}>Hours</h2>
            {hoursReady ? (
              <ul className="mt-4 space-y-1">
                {formatWeek(HOURS).map((r) => (
                  <li key={r.days} className={item}>
                    <span className="text-cream">{r.days}</span>
                    <br />
                    {r.time}
                  </li>
                ))}
              </ul>
            ) : (
              <p className="mt-4"><Ph onDark>{"{{HOURS}}"}</Ph></p>
            )}
          </div>

          {/* explore */}
          <div>
            <h2 className={head}>Explore</h2>
            <ul className="mt-4 space-y-1">
              {[["/#holidays", "Holidays"], ["/#deli", "Deli"], ["/#inside", "Inside"], [DIRECTIONS_PAGE, "Directions"]].map(([h, l]) => (
                <li key={h} className={item}><Link href={h} className={link}>{l}</Link></li>
              ))}
            </ul>
          </div>

          {/* holiday hours box (in the spot a newsletter box usually sits) */}
          {HOLIDAY_HOURS.length > 0 && (
            <div className="sm:col-span-2 lg:col-span-1">
              <div className="rounded-xl bg-cream/[0.07] p-5 ring-1 ring-cream/10">
                <h2 className={head}>Holiday hours</h2>
                <table className="mt-3 w-full text-[14px]">
                  <thead className="sr-only"><tr><th scope="col">Date</th><th scope="col">Hours</th></tr></thead>
                  <tbody>
                    {HOLIDAY_HOURS.map((r, i) => (
                      <tr key={i} className="border-t border-cream/10 first:border-0">
                        <th scope="row" className="py-1.5 pr-3 text-left align-top font-normal text-cream">
                          <Val v={r.date} onDark />
                          {"note" in r && r.note ? <span className="block text-[12px] text-cream/75">{r.note}</span> : null}
                        </th>
                        <td className="whitespace-nowrap py-1.5 text-right align-top text-cream/80"><Val v={r.hours} onDark /></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>

        {/* bottom row */}
        <div className="mt-14 flex flex-col gap-4 border-t border-cream/15 pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-[13px] text-cream/75">
            © 2026 {STORE.name} {STORE.nameSuffix}
            {/* stays in both modes: this is a mockup */}
            <span className="mx-2" aria-hidden>·</span>Concept mockup. Not the official website.
          </p>
          {(STORE.instagram || !PRESENTATION) && (
            <a
              href={INSTAGRAM_URL}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Instagram${STORE.instagram ? ` ${STORE.instagram}` : ""}`}
              className="grid h-11 w-11 place-items-center rounded-full ring-1 ring-cream/30 transition-colors hover:bg-cream hover:text-brand-ink"
            >
              <InstagramIcon size={18} />
            </a>
          )}
        </div>
      </div>
    </footer>
  );
}
