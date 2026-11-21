export const DAYS = ["sun", "mon", "tue", "wed", "thu", "fri", "sat"] as const;
export type Day = (typeof DAYS)[number];
export type DayHours = { open: string; close: string } | null;
export type StoreHours = { timezone: string; week: Record<Day, DayHours> };

export type OpenStatus =
  | { kind: "placeholder" }
  | { kind: "open"; until: string }
  | { kind: "closed"; opensAt?: string; opensDay?: string };

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

/** Computes open/closed for "now" in the store's timezone. Returns placeholder if any hours are unconfirmed. */
export function getOpenStatus(hours: StoreHours, now: Date = new Date()): OpenStatus {
  if (!hoursConfigured(hours)) return { kind: "placeholder" };

  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone: hours.timezone,
    weekday: "short",
    hour: "2-digit",
    minute: "2-digit",
    hourCycle: "h23",
  }).formatToParts(now);
  const wd = parts.find((p) => p.type === "weekday")!.value.toLowerCase().slice(0, 3) as Day;
  const nowMin = Number(parts.find((p) => p.type === "hour")!.value) * 60 + Number(parts.find((p) => p.type === "minute")!.value);
  const idx = DAYS.indexOf(wd);

  const today = hours.week[wd];
  if (today && nowMin >= toMin(today.open) && nowMin < toMin(today.close)) {
    return { kind: "open", until: fmtTime(today.close) };
  }
  if (today && nowMin < toMin(today.open)) return { kind: "closed", opensAt: fmtTime(today.open) };
  for (let i = 1; i <= 7; i++) {
    const d = DAYS[(idx + i) % 7];
    const h = hours.week[d];
    if (h) return { kind: "closed", opensAt: fmtTime(h.open), opensDay: i === 1 ? "tomorrow" : LONG[d] };
  }
  return { kind: "closed" };
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
