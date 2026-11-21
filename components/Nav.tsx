"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import { CALL_HREF, DIRECTIONS_URL, HOURS, STORE } from "@/app/content";
import { getOpenStatus, type OpenStatus } from "@/lib/hours";
import { PhoneIcon, PinIcon } from "./ui";

const LINKS = [
  { id: "holidays", label: "Holidays" },
  { id: "deli", label: "Deli" },
  { id: "inside", label: "Inside" },
  { id: "visit", label: "Visit" },
];

/** Live open/closed from data/store.json hours, in Charlotte time. Client-only to avoid hydration drift. */
function useOpenStatus() {
  const [status, setStatus] = useState<OpenStatus | null>(null);
  useEffect(() => {
    const tick = () => setStatus(getOpenStatus(HOURS));
    tick();
    const id = setInterval(tick, 60_000);
    return () => clearInterval(id);
  }, []);
  return status;
}

/** Status chip: "Open · until 7:00 PM" / "Closed · opens 10:00 AM". `compact` drops the second half on phones. */
function StatusChip({ status, compact = false, className = "" }: { status: OpenStatus | null; compact?: boolean; className?: string }) {
  if (!status || status.kind === "placeholder") return <span className={className} />;
  const open = status.kind === "open";
  const detail = open ? `until ${status.until}` : status.opensAt ? `opens ${status.opensDay ? `${status.opensDay} ` : ""}${status.opensAt}` : "";
  return (
    <span className={`inline-flex h-9 items-center gap-2 rounded-full border border-brand-ink/15 bg-white/70 px-3 text-[13px] text-brand-ink ${className}`}>
      <span aria-hidden className="relative flex h-2 w-2">
        {open && <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-500 opacity-60 motion-reduce:hidden" />}
        <span className={`relative inline-flex h-2 w-2 rounded-full ${open ? "bg-emerald-600" : "bg-brand-ink-soft"}`} />
      </span>
      <span className="font-medium">{open ? "Open" : "Closed"}</span>
      {detail && <span className={`text-brand-ink-soft ${compact ? "hidden min-[400px]:inline" : ""}`}>· {detail}</span>}
    </span>
  );
}

export default function Nav() {
  const status = useOpenStatus();
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [active, setActive] = useState<string | null>(null);
  const [open, setOpen] = useState(false);
  const menuBtn = useRef<HTMLButtonElement>(null);
  const sheet = useRef<HTMLDivElement>(null);
  const header = useRef<HTMLElement>(null);

  // Compact border once scrolled; slide away when scrolling down, come back when scrolling up.
  // Never hides while something in the header has keyboard focus.
  useEffect(() => {
    let last = window.scrollY;
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 8);
      const focusInside = header.current?.contains(document.activeElement);
      if (y > 240 && y > last + 4 && !focusInside) setHidden(true);
      else if (y < last - 4 || y <= 240) setHidden(false);
      last = y;
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Which section is on screen (underlines the matching link): the last section whose top has passed 40% of the viewport.
  // None above the first section (hero), so nothing is underlined there.
  useEffect(() => {
    const onScroll = () => {
      const line = window.innerHeight * 0.4;
      let current: string | null = null;
      for (const l of LINKS) {
        const el = document.getElementById(l.id);
        if (el && el.getBoundingClientRect().top <= line) current = l.id;
      }
      setActive(current);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  // Mobile menu: lock scroll, focus the first control, close on Escape, keep Tab inside, return focus on close.
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const el = sheet.current;
    const btn = menuBtn.current;
    el?.querySelector<HTMLElement>("a,button")?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
      if (e.key === "Tab" && el) {
        const f = [...el.querySelectorAll<HTMLElement>("a,button")];
        const first = f[0], last = f[f.length - 1];
        if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
        else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
      }
    };
    document.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      document.removeEventListener("keydown", onKey);
      btn?.focus();
    };
  }, [open]);

  return (
    <header
      ref={header}
      onFocus={() => setHidden(false)}
      className={`sticky top-0 z-50 bg-cream/90 backdrop-blur-md transition-[transform,border-color,box-shadow] duration-300 ease-out motion-reduce:transition-none ${
        hidden ? "-translate-y-full" : "translate-y-0"
      } ${scrolled ? "border-b border-brand-ink/10 shadow-[0_8px_30px_-24px_rgba(58,58,58,0.6)]" : "border-b border-transparent"}`}
    >
      <div className="mx-auto grid h-16 max-w-6xl grid-cols-[auto_1fr_auto] items-center gap-3 px-6 sm:px-10 md:h-[76px] md:grid-cols-[1fr_auto_1fr]">
        {/* links (desktop) */}
        <nav aria-label="Main" className="hidden md:block">
          <ul className="-ml-3 flex items-center">
            {LINKS.map((l) => {
              const on = active === l.id;
              return (
                <li key={l.id}>
                  <a
                    href={`#${l.id}`}
                    aria-current={on ? "location" : undefined}
                    className="group relative inline-flex h-11 items-center rounded-full px-3 text-[15px] font-medium text-brand-ink"
                  >
                    {l.label}
                    <span
                      aria-hidden
                      className={`absolute inset-x-3 bottom-2 h-[2px] origin-left rounded-full bg-brand-ink transition-transform duration-300 motion-reduce:transition-none ${
                        on ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
                      }`}
                    />
                  </a>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* logo */}
        <a href="#top" className="justify-self-start rounded-md md:justify-self-center">
          <Image src="/photos/real/logo.png" alt="Taste of Europe Gourmet Foods, home" width={753} height={355} priority className="h-9 w-auto md:h-12" />
        </a>

        {/* mobile: status + menu */}
        <div className="flex items-center justify-end gap-2 md:hidden">
          <StatusChip status={status} compact />
          <button
            ref={menuBtn}
            type="button"
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label="Menu"
            onClick={() => setOpen(true)}
            className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-brand-ink text-cream"
          >
            <svg aria-hidden width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <path d="M4 8h16M4 16h16" />
            </svg>
          </button>
        </div>

        {/* desktop: status + phone */}
        <div className="hidden items-center justify-end gap-3 md:flex">
          <StatusChip status={status} className="hidden lg:inline-flex" />
          <a
            href={CALL_HREF}
            className="inline-flex h-11 items-center gap-2 rounded-full bg-brand-ink px-5 text-[15px] font-medium text-cream transition-colors hover:bg-black focus-visible:outline-brand-ink"
          >
            <PhoneIcon size={16} /> {STORE.phone ?? "Call"}
          </a>
        </div>
      </div>

      {/* mobile menu sheet. Portalled to <body>: the header's backdrop-blur would otherwise trap a fixed child inside it. */}
      {open &&
        createPortal(
          <div id="mobile-menu" ref={sheet} role="dialog" aria-modal="true" aria-label="Menu" className="fixed inset-0 z-[60] flex flex-col bg-cream px-6 pb-8 pt-3 md:hidden">
            <div className="flex h-12 items-center justify-between">
              <Image src="/photos/real/logo.png" alt="" width={753} height={355} className="h-9 w-auto" />
              <button type="button" onClick={() => setOpen(false)} aria-label="Close menu" className="grid h-11 w-11 place-items-center rounded-full bg-brand-ink text-cream">
                <svg aria-hidden width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                  <path d="M6 6l12 12M18 6L6 18" />
                </svg>
              </button>
            </div>
            <nav aria-label="Menu links" className="mt-10">
              <ul className="divide-y divide-brand-ink/10 border-y border-brand-ink/10">
                {LINKS.map((l, i) => (
                  <li key={l.id}>
                    <a href={`#${l.id}`} onClick={() => setOpen(false)} className="flex items-baseline justify-between py-4 font-serif text-[2.4rem] font-medium leading-tight text-brand-ink">
                      {l.label}
                      <span className="font-sans text-[13px] font-semibold tabular-nums text-brand-ink-soft">0{i + 1}</span>
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
            <div className="mt-auto space-y-5">
              <StatusChip status={status} />
              <p className="text-[15px] leading-relaxed">{STORE.street}<br />{STORE.cityLine}</p>
              <div className="grid grid-cols-2 gap-3">
                <a href={DIRECTIONS_URL} target="_blank" rel="noopener noreferrer" className="inline-flex h-12 items-center justify-center gap-2 rounded-full bg-brand-red-deep text-[15px] font-medium text-white focus-visible:outline-brand-ink">
                  <PinIcon size={17} /> Directions
                </a>
                <a href={CALL_HREF} className="inline-flex h-12 items-center justify-center gap-2 rounded-full border-2 border-brand-ink/80 text-[15px] font-medium">
                  <PhoneIcon size={17} /> Call
                </a>
              </div>
            </div>
          </div>,
          document.body
        )}
    </header>
  );
}
