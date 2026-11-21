import Image from "next/image";
import { CALL_HREF, DIRECTIONS_URL, HOLIDAY_HOURS, HOURS, INSTAGRAM_URL, STORE } from "@/app/content";
import { formatWeekWithToday, hoursConfigured } from "@/lib/hours";
import { isInSeasonWindow } from "@/lib/season";
import { PRESENTATION } from "@/lib/flags";
import { InstagramIcon, Val } from "@/components/ui";
import { PillButton, eyebrowClass } from "./ui";

export default function ClayFooter() {
  const ready = hoursConfigured(HOURS);
  const season = isInSeasonWindow();

  return (
    <footer id="visit" aria-labelledby="visit-title" className="scroll-mt-16 bg-clay-section pb-20 text-clay-ink md:pb-8">
      <h2 id="visit-title" className="sr-only">
        Visit
      </h2>
      <div className="px-5 py-16 sm:px-8 sm:py-20 lg:py-24">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
          <div>
            <Image
              src="/photos/real/logo.png"
              alt="Taste of Europe Gourmet Foods"
              width={753}
              height={355}
              className="h-auto w-[140px]"
            />
            <p className="mt-6 text-[13px] leading-relaxed text-clay-muted">
              © 2026 {STORE.name} {STORE.nameSuffix}
              {!PRESENTATION ? <span> · Concept mockup, not the official website</span> : null}
            </p>
          </div>

          <div>
            <h3 className={eyebrowClass}>Find us</h3>
            <address className="mt-4 text-[17px] not-italic leading-relaxed">
              {STORE.street}
              <br />
              {STORE.cityLine}
            </address>
            <div className="mt-5">
              <PillButton href={DIRECTIONS_URL} external variant="primary">
                Directions
              </PillButton>
            </div>
          </div>

          <div>
            <h3 className={eyebrowClass}>Hours</h3>
            {ready ? (
              <table className="mt-4 w-full max-w-xs text-left text-[15px]">
                <caption className="sr-only">Opening hours</caption>
                <tbody>
                  {formatWeekWithToday(HOURS).map((r) => (
                    <tr key={r.days} className={r.isToday ? "text-clay-ink" : "text-clay-muted"}>
                      <th scope="row" className={`py-1 pr-6 ${r.isToday ? "font-medium" : "font-normal"}`}>
                        {r.days}
                      </th>
                      <td className={`py-1 ${r.isToday ? "font-medium" : ""}`}>{r.time}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <p className="mt-4">
                <Val v="{{HOURS}}" />
              </p>
            )}
            {season && HOLIDAY_HOURS.length > 0 ? (
              <div id="holiday-hours" className="mt-8 scroll-mt-24">
                <h3 className={eyebrowClass}>Holiday hours</h3>
                <table className="mt-3 w-full max-w-xs text-left text-[14px]">
                  <tbody>
                    {HOLIDAY_HOURS.map((r, i) => (
                      <tr key={i} className="align-top text-clay-muted">
                        <th scope="row" className="py-1 pr-6 font-normal text-clay-ink">
                          <Val v={r.date} />
                          {r.note ? <span className="block text-[12px] text-clay-muted">{r.note}</span> : null}
                        </th>
                        <td className="py-1">
                          <Val v={r.hours} />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : null}
          </div>

          <div>
            <h3 className={eyebrowClass}>Say hello</h3>
            <ul className="mt-4 space-y-3 text-[17px]">
              {STORE.phone ? (
                <li>
                  <a href={CALL_HREF} className="underline-offset-4 hover:underline">
                    {STORE.phone}
                  </a>
                </li>
              ) : null}
              {STORE.instagram || !PRESENTATION ? (
                <li>
                  <a
                    href={INSTAGRAM_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 underline-offset-4 hover:underline"
                  >
                    <InstagramIcon />
                    {STORE.instagram ?? "Instagram"}
                  </a>
                </li>
              ) : null}
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
}