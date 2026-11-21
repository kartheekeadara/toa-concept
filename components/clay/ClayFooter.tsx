import { CALL_HREF, DIRECTIONS_URL, HOLIDAY_HOURS, HOURS, INSTAGRAM_URL, STORE } from "@/app/content";
import { formatWeekWithToday, hoursConfigured } from "@/lib/hours";
import { isInSeasonWindow } from "@/lib/season";
import { PRESENTATION } from "@/lib/flags";
import { InstagramIcon, Val } from "@/components/ui";
import StoreStatus from "@/components/StoreStatus";
import { PillButton } from "./ui";

const headCls = "text-[15px] font-medium text-clay-ivory";

export default function ClayFooter() {
  const ready = hoursConfigured(HOURS);
  const season = isInSeasonWindow();

  return (
    <footer id="visit" aria-labelledby="visit-title" className="scroll-mt-16 bg-clay-dark pb-24 text-clay-ivory md:pb-0">
      <div className="px-5 pt-16 sm:px-8 sm:pt-24 lg:px-12">
        <div className="grid gap-14 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-6">
            <h2 id="visit-title" className={headCls}>
              Visit the shop
            </h2>
            <address className="mt-4 font-display text-[clamp(2.1rem,4.2vw,3.75rem)] font-light not-italic leading-[1.04] tracking-[-0.015em]">
              {STORE.street}
              <br />
              Charlotte, NC 28277
            </address>
            <p className="mt-5 text-[17px] text-clay-ivory/70">Suite E2, with parking right out front.</p>
            <StoreStatus className="mt-2 !text-[16px] !text-clay-ivory" />
            <div className="mt-8 flex flex-wrap gap-3">
              <PillButton href={DIRECTIONS_URL} external variant="light">
                Get directions
              </PillButton>
              {STORE.phone ? (
                <PillButton href={CALL_HREF} variant="outline">
                  Call {STORE.phone}
                </PillButton>
              ) : null}
            </div>
          </div>

          <div className="grid gap-12 sm:grid-cols-2 lg:col-span-6 lg:gap-10">
            <div>
              <h3 className={headCls}>Hours</h3>
              {ready ? (
                <table className="mt-4 w-full text-left text-[16px]">
                  <caption className="sr-only">Opening hours</caption>
                  <tbody className="divide-y divide-clay-brass/25 border-y border-clay-brass/25">
                    {formatWeekWithToday(HOURS).map((r) => (
                      <tr key={r.days} className={r.isToday ? "text-clay-ivory" : "text-clay-ivory/70"}>
                        <th scope="row" className="py-3 pr-4 font-normal">
                          {r.days}
                        </th>
                        <td className="whitespace-nowrap py-3 text-right">{r.time}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              ) : (
                <p className="mt-4">
                  <Val v="{{HOURS}}" />
                </p>
              )}
            </div>

            {season && HOLIDAY_HOURS.length > 0 ? (
              <div id="holiday-hours" className="scroll-mt-24">
                <h3 className={headCls}>Holiday hours</h3>
                <table className="mt-4 w-full text-left text-[15px]">
                  <caption className="sr-only">Holiday hours</caption>
                  <tbody className="divide-y divide-clay-brass/25 border-y border-clay-brass/25">
                    {HOLIDAY_HOURS.map((r, i) => (
                      <tr key={i} className="align-baseline text-clay-ivory/70">
                        <th scope="row" className="py-2.5 pr-4 font-normal text-clay-ivory">
                          <Val v={r.date} />
                          {r.note ? <span className="block text-[13px] text-clay-ivory/60">{r.note}</span> : null}
                        </th>
                        <td className="whitespace-nowrap py-2.5 text-right">
                          <Val v={r.hours} />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : null}
          </div>
        </div>

        <div className="mt-20 flex flex-col gap-6 border-t border-clay-ivory/15 py-8 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="font-display text-[22px] font-light">
              {STORE.name} <span className="text-clay-ivory/60">{STORE.nameSuffix}</span>
            </p>
            <p className="mt-1 text-[13px] text-clay-ivory/55">
              © 2026 {STORE.name} {STORE.nameSuffix}
              {!PRESENTATION ? <span>. Concept mockup, not the official website.</span> : null}
            </p>
          </div>
          <ul className="flex flex-wrap items-center gap-x-8 text-[15px]">
            {STORE.phone ? (
              <li>
                <a href={CALL_HREF} className="inline-flex min-h-11 items-center underline-offset-[6px] hover:underline">
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
                  className="inline-flex min-h-11 items-center gap-2 underline-offset-[6px] hover:underline"
                >
                  <InstagramIcon />
                  {STORE.instagram ?? "Instagram"}
                </a>
              </li>
            ) : null}
          </ul>
        </div>
      </div>
    </footer>
  );
}
