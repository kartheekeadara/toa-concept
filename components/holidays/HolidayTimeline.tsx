"use client";

import { TWO_CHRISTMASES } from "@/lib/holiday-content";
import { useSeasonRows } from "./useSeasonRows";

/** Dec 24 → Jan 7 as a real sequence. Closed days read as gaps; today/next carry a brass marker. */
export default function HolidayTimeline() {
  const rows = useSeasonRows();

  return (
    <section id="holiday-hours" aria-labelledby="timeline-title" className="scroll-mt-16 bg-clay-dark text-clay-ivory">
      <div className="px-5 py-16 sm:px-8 sm:py-24 lg:px-12">
        <div className="grid gap-6 lg:grid-cols-12 lg:items-end">
          <h2 id="timeline-title" className="font-display text-[clamp(2.25rem,4.4vw,3.75rem)] font-light leading-[1] tracking-[-0.02em] lg:col-span-6">
            {TWO_CHRISTMASES.title}
          </h2>
          <p className="max-w-md text-[17px] leading-relaxed text-clay-ivory/75 lg:col-span-5 lg:col-start-8">{TWO_CHRISTMASES.line}</p>
        </div>

        <ol className="relative mt-12 grid gap-0 lg:mt-20 lg:grid-cols-6">
          {/* the rail */}
          <span aria-hidden className="absolute bottom-0 left-[5px] top-0 w-px bg-clay-ivory/20 lg:bottom-auto lg:left-0 lg:right-0 lg:top-[5px] lg:h-px lg:w-auto" />
          {rows.map((r) => {
            const marked = r.status === "today" || r.status === "next";
            const past = r.status === "past";
            return (
              <li
                key={r.key}
                aria-current={r.status === "today" ? "date" : undefined}
                className={`relative grid grid-cols-[1.25rem_1fr] gap-x-4 pb-8 lg:block lg:pb-0 lg:pr-6 ${past ? "opacity-45" : ""}`}
              >
                <span
                  aria-hidden
                  className={`relative z-10 mt-1.5 block h-[11px] w-[11px] rounded-full border lg:mt-0 ${
                    marked
                      ? "border-clay-brass bg-clay-brass shadow-[0_0_0_5px_rgba(176,141,87,0.25)]"
                      : r.closed
                        ? "border-clay-ivory/40 bg-clay-dark"
                        : "border-clay-ivory bg-clay-ivory"
                  }`}
                />
                <div className="lg:mt-6">
                  {marked ? (
                    <span className="mb-1 block text-[13px] text-clay-brass lg:absolute lg:-top-7 lg:left-0 lg:mb-0">{r.status === "today" ? "Today" : "Next"}</span>
                  ) : null}
                  <span className="block font-display text-[30px] font-light leading-none lg:text-[clamp(1.75rem,2.4vw,2.5rem)]">{r.date}</span>
                  <span className="mt-2 block min-h-[1.5em] text-[15px] text-clay-ivory/65">{r.note || " "}</span>
                  <span className={`mt-1 block text-[16px] ${r.closed ? "text-clay-ivory/55" : "text-clay-ivory"}`}>{r.hours}</span>
                </div>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
