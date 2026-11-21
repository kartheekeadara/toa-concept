export const DAYS = ["sun", "mon", "tue", "wed", "thu", "fri", "sat"] as const;
export type Day = (typeof DAYS)[number];
export type DayHours = { open: string; close: string } | null;
/** A one-off day, e.g. { date: "Dec 24", hours: "10:00 AM – 3:00 PM" } or { date: "Dec 25", hours: "Closed" }. */
export type HolidayHours = { date: string; hours: string; note?: string };
export type StoreHours = { timezone: string; week: Record<Day, DayHours>; holidays?: HolidayHours[] };

export type OpenStatus =
  | { kind: "placeholder" }
  | { kind: "open"; until: string }
  | { kind: "closed"; opensAt?: string; opensDay?: string; closedToday?: boolean };

const isTime = (s: string) => /^([01]\d|2[0-3]):[0-5]\d$/.test(s);
const toMin = (s: string) => Number(s.slice(0, 2)) * 60 + Number(s.slice(3));
export const fmtTime = (s: string) => {
  const h = Number(s.slice(0, 2));
  const m = s.slice(3);
  return `${((h + 11) % 12) + 1}:${m} ${h < 12 ? "AM" : "PM"}`;
};
const LONG: Record<Day, string> = {
  sun: "Sunday", mon: "Monday", tue: "Tuesday", wed: "Wednesday", thu: "Thursday", fri: "Friday", sat: "Saturday",
};
const SHORT: Record<Day, string> = { sun: "Sun", mon: "Mon", tue: "Tue", wed: "Wed", thu: "Thu", fri: "Fri", sat: "Sat" };

/** True once every day is either null (closed) or has valid HH:MM open/close times. */
export function hoursConfigured(hours: StoreHours) {
  return DAYS.every((d) => {
    const h = hours.week[d];
    return h === null || (!!h && isTime(h.open) && isTime(h.close));
  });
}

const MONTHS = ["jan", "feb", "mar", "apr", "may", "jun", "jul", "aug", "sep", "oct", "nov", "dec"];

/** "Dec 24" → "12-24"; null if it can't be read. */
function holidayKey(date: string): string | null {
  const m = date.trim().toLowerCase().match(/^([a-z]{3})[a-z]*\.?\s+(\d{1,2})$/);
  if (!m) return null;
  const mi = MONTHS.indexOf(m[1]);
  return mi < 0 ? null : `${String(mi + 1).padStart(2, "0")}-${m[2].padStart(2, "0")}`;
}

/** "10:00 AM" → "10:00", "3 PM" → "15:00". */
function to24(s: string): string | null {
  const m = s.trim().toUpperCase().match(/^(\d{1,2})(?::(\d{2}))?\s*(AM|PM)$/);
  if (!m) return null;
  let h = Number(m[1]) % 12;
  if (m[3] === "PM") h += 12;
  return `${String(h).padStart(2, "0")}:${m[2] ?? "00"}`;
}

/** "Closed" → null, "10:00 AM – 3:00 PM" → { open, close }, anything unreadable → undefined (ignored). */
function parseHolidayHours(hours: string): DayHours | undefined {
  if (/^closed$/i.test(hours.trim())) return null;
  const [o, c] = hours.split(/\s*[–—-]\s*/);
  const open = o && to24(o);
  const close = c && to24(c);
  return open && close ? { open, close } : undefined;
}

/** Calendar date (y, m, d) and minutes since midnight in the store's timezone. */
function zonedNow(timezone: string, now: Date) {
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone: timezone,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    hourCycle: "h23",
  }).formatToParts(now);
  const get = (t: string) => Number(parts.find((p) => p.type === t)!.value);
  return { y: get("year"), m: get("month"), d: get("day"), min: get("hour") * 60 + get("minute") };
}

/** Hours for the store-local date `offset` days from (y, m, d), with holiday overrides applied. */
function hoursOn(hours: StoreHours, y: number, m: number, d: number, offset: number) {
  const date = new Date(Date.UTC(y, m - 1, d + offset));
  const day = DAYS[date.getUTCDay()];
  const key = `${String(date.getUTCMonth() + 1).padStart(2, "0")}-${String(date.getUTCDate()).padStart(2, "0")}`;
  for (const h of hours.holidays ?? []) {
    if (holidayKey(h.date) !== key) continue;
    const parsed = parseHolidayHours(h.hours);
    if (parsed !== undefined) return { day, hours: parsed, holiday: true };
  }
  return { day, hours: hours.week[day], holiday: false };
}

/**
 * Computes open/closed for "now" in the store's timezone (America/New_York), honoring holiday
 * overrides (e.g. Dec 25 → closed all day). Returns placeholder if any weekly hours are unconfirmed.
 */
export function getOpenStatus(hours: StoreHours, now: Date = new Date()): OpenStatus {
  if (!hoursConfigured(hours)) return { kind: "placeholder" };

  const { y, m, d, min } = zonedNow(hours.timezone, now);
  const today = hoursOn(hours, y, m, d, 0).hours;

  if (today && min >= toMin(today.open) && min < toMin(today.close)) {
    return { kind: "open", until: fmtTime(today.close) };
  }
  if (today && min < toMin(today.open)) return { kind: "closed", opensAt: fmtTime(today.open) };
  for (let i = 1; i <= 14; i++) {
    const next = hoursOn(hours, y, m, d, i);
    if (next.hours) {
      return {
        kind: "closed",
        opensAt: fmtTime(next.hours.open),
        opensDay: i === 1 ? "tomorrow" : LONG[next.day],
        closedToday: today === null,
      };
    }
  }
  return { kind: "closed", closedToday: today === null };
}

/** Weekly hours for display, Monday first, consecutive days with the same hours grouped ("Mon–Fri"). */
export function formatWeek(hours: StoreHours): { days: string; time: string }[] {
  const order: Day[] = ["mon", "tue", "wed", "thu", "fri", "sat", "sun"];
  const label = (h: DayHours) => (h ? `${fmtTime(h.open)} – ${fmtTime(h.close)}` : "Closed");
  const rows: { from: Day; to: Day; time: string }[] = [];
  for (const d of order) {
    const time = label(hours.week[d]);
    const last = rows[rows.length - 1];
    if (last && last.time === time) last.to = d;
    else rows.push({ from: d, to: d, time });
  }
  return rows.map((r) => ({ days: r.from === r.to ? SHORT[r.from] : `${SHORT[r.from]}–${SHORT[r.to]}`, time: r.time }));
}

export function formatWeekWithToday(hours: StoreHours, now: Date = new Date()) {
  const today = todayDayKey(hours, now);
  const order: Day[] = ["mon", "tue", "wed", "thu", "fri", "sat", "sun"];
  const label = (h: DayHours) => (h ? `${fmtTime(h.open)} – ${fmtTime(h.close)}` : "Closed");
  const rows: { from: Day; to: Day; time: string }[] = [];
  for (const d of order) {
    const time = label(hours.week[d]);
    const last = rows[rows.length - 1];
    if (last && last.time === time) last.to = d;
    else rows.push({ from: d, to: d, time });
  }
  const idx = (d: Day) => order.indexOf(d);
  return rows.map((r) => {
    const isToday = idx(today) >= idx(r.from) && idx(today) <= idx(r.to);
    return {
      days: r.from === r.to ? SHORT[r.from] : `${SHORT[r.from]}–${SHORT[r.to]}`,
      time: r.time,
      isToday,
    };
  });
}

/** Current weekday key in the store timezone (for bold "today" row). */
export function todayDayKey(hours: StoreHours, now: Date = new Date()): Day {
  const wd = new Intl.DateTimeFormat("en-US", { timeZone: hours.timezone, weekday: "short" }).format(now).toLowerCase().slice(0, 3);
  return wd as Day;
}

/** Today's hours line, e.g. "10:00 AM – 7:00 PM" or "Closed". */
export function todayHoursLabel(hours: StoreHours, now: Date = new Date()): string | null {
  if (!hoursConfigured(hours)) return null;
  const d = todayDayKey(hours, now);
  const h = hours.week[d];
  return h ? `${fmtTime(h.open)} – ${fmtTime(h.close)}` : "Closed";
}
