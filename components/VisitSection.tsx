import Image from "next/image";
import { CALL_HREF, COPY, DIRECTIONS_URL, HOLIDAY_HOURS, HOURS, MAP_EMBED_URL, STORE, VISIT_PHOTO } from "@/app/content";
import { formatWeekWithToday, hoursConfigured } from "@/lib/hours";
import { isInSeasonWindow } from "@/lib/season";
import { btnPrimary, h2Class, hairline, Val } from "./ui";

export default function VisitSection() {
  const ready = hoursConfigured(HOURS);
  const season = isInSeasonWindow();

  return (
    <section id="visit" aria-labelledby="visit-title" className="scroll-mt-16 bg-white">
      <div className="mx-auto max-w-page px-5 py-14 sm:px-8 sm:py-20">
        <h2 id="visit-title" className={h2Class}>
          {COPY.visitTitle}
        </h2>
        <address className="mt-4 text-[15px] not-italic leading-relaxed text-ink">
          {STORE.street}
          <br />
          {STORE.cityLine}
        </address>

        {ready ? (
          <table className="mt-8 w-full max-w-md border-collapse text-left text-[15px]">
            <caption className="sr-only">Opening hours</caption>
            <tbody className="divide-y divide-line">
              {formatWeekWithToday(HOURS).map((r) => (
                <tr key={r.days}>
                  <th scope="row" className={`py-2 pr-6 font-normal ${r.isToday ? "font-medium text-ink" : "text-ink-muted"}`}>
                    {r.days}
                  </th>
                  <td className={`py-2 ${r.isToday ? "font-medium text-ink" : "text-ink-muted"}`}>{r.time}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p className="mt-6">
            <Val v="{{HOURS}}" />
          </p>
        )}

        {season && HOLIDAY_HOURS.length > 0 ? (
          <div id="holiday-hours" className={`mt-10 max-w-md pt-8 ${hairline}`}>
            <h3 className="text-[13px] text-ink-muted">Holiday hours</h3>
            <table className="mt-3 w-full text-[14px]">
              <tbody className="divide-y divide-line">
                {HOLIDAY_HOURS.map((r, i) => (
                  <tr key={i}>
                    <th scope="row" className="py-2 pr-4 text-left font-normal text-ink">
                      <Val v={r.date} />
                      {r.note ? <span className="block text-[12px] text-ink-muted">{r.note}</span> : null}
                    </th>
                    <td className="py-2 text-right text-ink-muted">
                      <Val v={r.hours} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : null}

        <p data-draft className="mt-10 max-w-lg text-[15px] leading-relaxed text-ink-muted">
          {COPY.deliOrder}{" "}
          {STORE.phone ? (
            <a href={CALL_HREF} className="font-medium text-ink underline underline-offset-4">
              {STORE.phone}
            </a>
          ) : (
            <Val v="{{PHONE}}" />
          )}
        </p>

        <a href={DIRECTIONS_URL} target="_blank" rel="noopener noreferrer" className={`mt-8 ${btnPrimary}`}>
          Open in Google Maps
        </a>

        <div className="mt-12 grid gap-6 sm:grid-cols-2">
          <div className="relative aspect-[4/3] overflow-hidden rounded-photo bg-line">
            <Image src={VISIT_PHOTO} alt="Taste of Europe storefront" fill sizes="(min-width: 640px) 40vw, 100vw" className="object-cover" />
          </div>
          <div className="relative min-h-[280px] overflow-hidden rounded-photo bg-line sm:min-h-[320px]">
            <iframe
              title={`Map showing ${STORE.street}, ${STORE.cityLine}`}
              src={MAP_EMBED_URL}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="absolute inset-0 h-full w-full border-0"
            />
          </div>
        </div>
      </div>
    </section>
  );
}