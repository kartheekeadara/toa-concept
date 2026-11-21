import store from "@/data/store.json";

type SeasonConfig = { seasonWindow?: { start: string; end: string } };

/** ISO dates "MM-DD" compared in America/New_York calendar day. */
export function isInSeasonWindow(now: Date = new Date()): boolean {
  const win = (store as SeasonConfig).seasonWindow;
  if (!win?.start || !win?.end) return false;

  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone: store.timezone || "America/New_York",
    month: "2-digit",
    day: "2-digit",
  }).formatToParts(now);
  const month = parts.find((p) => p.type === "month")!.value;
  const day = parts.find((p) => p.type === "day")!.value;

  const [sM, sD] = win.start.split("-").map(Number);
  const [eM, eD] = win.end.split("-").map(Number);
  const t = Number(month) * 100 + Number(day);
  const s = sM * 100 + sD;
  const e = eM * 100 + eD;

  if (s <= e) return t >= s && t <= e;
  // wraps year (e.g. Dec–Jan)
  return t >= s || t <= e;
}