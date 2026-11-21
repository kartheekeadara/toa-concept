import { holidayKey } from "@/lib/hours";

export type HolidayInput = { date: string; note?: string; hours: string };
export type HolidayStatus = "past" | "today" | "next" | "upcoming";
export type HolidayRow = HolidayInput & { key: string; closed: boolean; status?: HolidayStatus };

/** Holiday rows in season order (Dec before Jan), with past/today/next marked for `now` in the store's timezone. */
export function seasonRows(rows: HolidayInput[], now?: Date, timezone = "America/New_York"): HolidayRow[] {
  const base = rows
    .map((r) => ({ ...r, key: holidayKey(r.date) ?? "", closed: /^closed$/i.test(r.hours.trim()) }))
    .filter((r) => r.key)
    // Season runs Dec → Jan, so December sorts first.
    .sort((a, b) => seasonOrder(a.key) - seasonOrder(b.key));
  if (!now) return base;

  const parts = new Intl.DateTimeFormat("en-US", { timeZone: timezone, month: "2-digit", day: "2-digit" }).formatToParts(now);
  const today = `${parts.find((p) => p.type === "month")!.value}-${parts.find((p) => p.type === "day")!.value}`;
  const t = seasonOrder(today);
  // Outside the Dec–Jan window everything is "upcoming".
  const inWindow = today >= "12-01" || today <= "01-31";
  let nextMarked = false;
  return base.map((r) => {
    const o = seasonOrder(r.key);
    let status: HolidayStatus = "upcoming";
    if (inWindow && o < t) status = "past";
    else if (o === t) status = "today";
    if (status !== "past" && !nextMarked) {
      nextMarked = true;
      if (status === "upcoming") status = "next";
    }
    return { ...r, status };
  });
}

function seasonOrder(key: string) {
  const [m, d] = key.split("-").map(Number);
  return (m >= 7 ? m : m + 12) * 100 + d;
}
