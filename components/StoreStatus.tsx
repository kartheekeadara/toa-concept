"use client";

import { useEffect, useState } from "react";
import { HOURS } from "@/app/content";
import { getOpenStatus } from "@/lib/hours";
import { Ph } from "./ui";

export default function StoreStatus({ className = "", compact = false }: { className?: string; compact?: boolean }) {
  const [status, setStatus] = useState(() => getOpenStatus(HOURS));

  useEffect(() => {
    const tick = () => setStatus(getOpenStatus(HOURS));
    tick();
    const id = window.setInterval(tick, 60_000);
    return () => window.clearInterval(id);
  }, []);

  if (status.kind === "placeholder") {
    return (
      <span className={`inline-flex items-center gap-2 text-[14px] text-ink-muted ${className}`}>
        <Ph>{"{{HOURS}}"}</Ph>
      </span>
    );
  }

  const open = status.kind === "open";
  const text =
    open
      ? `Open until ${status.until}`
      : status.opensAt
        ? `Closed · opens ${status.opensDay ? `${status.opensDay} ` : ""}${status.opensAt}`
        : "Closed";
  const short = open ? "Open" : "Closed";

  return (
    <span className={`inline-flex items-center gap-2 text-[14px] text-ink-muted ${className}`}>
      <span
        className={`inline-block h-2 w-2 shrink-0 rounded-full ${open ? "bg-emerald-600" : "bg-ink-muted"}`}
        aria-hidden
      />
      {compact ? (
        <>
          <span className="sm:hidden">{short}</span>
          <span className="hidden sm:inline">{text}</span>
        </>
      ) : (
        <>
          <span className="sr-only">{short}</span>
          {text}
        </>
      )}
    </span>
  );
}