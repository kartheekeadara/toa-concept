"use client";

import { useEffect, useState } from "react";
import { HOLIDAY_HOURS, HOURS } from "@/app/content";
import { seasonRows, type HolidayRow } from "@/lib/holidays";

/** Season rows; past/today/next are filled in on the client only, since the page is statically built. */
export function useSeasonRows(): HolidayRow[] {
  const [rows, setRows] = useState(() => seasonRows(HOLIDAY_HOURS));
  useEffect(() => {
    const tick = () => setRows(seasonRows(HOLIDAY_HOURS, new Date(), HOURS.timezone));
    tick();
    const id = window.setInterval(tick, 60_000);
    return () => window.clearInterval(id);
  }, []);
  return rows;
}
