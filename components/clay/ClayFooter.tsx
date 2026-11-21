import Image from "next/image";
import { CALL_HREF, DIRECTIONS_URL, HOLIDAY_HOURS, HOURS, INSTAGRAM_URL, STORE } from "@/app/content";
import { formatWeekWithToday, hoursConfigured, todayHoursLabel } from "@/lib/hours";
import { isInSeasonWindow } from "@/lib/season";
import { PRESENTATION } from "@/lib/flags";
import { FOOTER_CLOSER } from "@/lib/clay-content";
import StoreStatus from "@/components/StoreStatus";
import { InstagramIcon, Val } from "@/components/ui";
import { PillButton, Reveal } from "./ui";

const label = "text-[12px] font-medium uppercase tracking-[0.14em] text-clay-muted";

export default function ClayFooter() {
  const ready = hoursConfigured(HOURS);
  const today = todayHoursLabel(HOURS);
  const season = isInSeasonWindow();

  return (
    <footer id="visit" aria-labelledby="visit-title" className="scroll-mt-16 bg-clay-section pb-20 text-clay-ink md:pb-0">
      <div className="px-5 pt-16 sm:px-8 sm:pt-24 lg:pt-28">
        <Reveal>
          <h2
            id="visit-title"
            data-draft
            className="font-display text-[clamp(4.5rem,19vw,17rem)] font-medium leading-[0.85] tracking-[-0.055em]"
          >
            {FOOTER_CLOSER}
          </h2>
        </Reveal>

        <div className="mt-14 grid gap-10 border-t border-clay-ink/15 pt-10 sm:grid-cols-2 lg:mt-20 lg:grid-cols-4 lg:gap-8">
          <div>
            <h3 className={label}>Today</h3>
            <p className="mt-4 text-[22px] font-medium leading-tight tracking-[-0.01em]">
              {today ?? <Val v="{{HOURS}}" />}
            </p>
            <p className="mt-2">
              <StoreStatus className="!text-clay-muted text-[14px]" />
            </p>
          </div>

          <div>
            <h3 className={label}>Find us</h3>
            <address className="mt-4 text-[17px] not-italic leading-relaxed">
              {STORE.street}
              <br />
              {STORE.cityLine}
            </address>
            <div className="mt-5">
              <PillButton href={DIRECTIONS_URL} external>
                Directions
              </PillButton>
            </div>
          </div>

          <div>
            <h3 className={label}>Hours</h3>
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
                <h3 className={label}>Holiday hours</h3>
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
            <h3 className={label}>Say hello</h3>
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

        <div className="mt-16 flex flex-col gap-6 border-t border-clay-ink/15 py-8 sm:flex-row sm:items-center sm:justify-between lg:mt-24">
          <Image src="/photos/real/logo.png" alt="Taste of Europe Gourmet Foods" width={753} height={355} className="h-12 w-auto sm:h-14" />
          <p className="text-[13px] text-clay-muted">
            © 2026 {STORE.name} {STORE.nameSuffix}
            {!PRESENTATION ? <span> · Concept mockup, not the official website</span> : null}
          </p>
        </div>
      </div>
    </footer>
  );
}