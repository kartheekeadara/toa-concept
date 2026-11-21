"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import { CALL_HREF, DIRECTIONS_URL, HOURS, STORE } from "@/app/content";
import { getOpenStatus, type OpenStatus } from "@/lib/hours";
import { PhoneIcon, PinIcon } from "./ui";

const LINKS = [
  { href: "#holidays", label: "Holidays" },
  { href: "#deli", label: "Deli" },
  { href: "#inside", label: "Inside" },
  { href: "#visit", label: "Visit" },
];

/** Live "Open today · until 7:00 PM" from data/store.json hours, in Charlotte time. Client-only to avoid hydration drift. */
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

function StatusText({ status, className = "", short = false }: { status: OpenStatus | null; className?: string; short?: boolean }) {
  if (!status || status.kind === "placeholder") return null;
  const open = status.kind === "open";
  const text = open
    ? short ? `Open until ${status.until}` : `Open today · until ${status.until}`
    : `Closed${status.opensAt ? ` · opens ${status.opensDay ? `${status.opensDay} ` : ""}${status.opensAt}` : ""}`;
  return (
    <span className={`inline-flex items-center gap-2 ${className}`}>
      <span aria-hidden className={`h-2 w-2 shrink-0 rounded-full ${open ? "bg-emerald-600" : "bg-brand-red-deep"}`} />
      <span>{text}</span>
    </span>
  );
}

export default function Nav() {
  const status = useOpenStatus();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const menuBtn = useRef<HTMLButtonElement>(null);
  const sheet = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Mobile menu: lock scroll, focus the first link, close on Escape, keep Tab inside, return focus on close.
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

  const link = "inline-flex h-11 items-center rounded-full px-3 text-[15px] font-medium text-brand-ink transition-colors hover:text-brand-red-deep";

  return (
    <header className={`sticky top-0 z-50 bg-cream/95 backdrop-blur transition-[border-color] duration-200 ${scrolled ? "border-b border-brand-ink/10" : "border-b border-transparent"}`}>
      <div className="mx-auto grid h-16 max-w-6xl grid-cols-[auto_1fr_auto] items-center gap-3 px-6 sm:px-10 md:h-[72px] md:grid-cols-3">
        {/* left: links (desktop) */}
        <nav aria-label="Main" className="hidden md:block">
          <ul className="-ml-3 flex items-center">
            {LINKS.map((l) => (
              <li key={l.href}><a href={l.href} className={link}>{l.label}</a></li>
            ))}
          </ul>
        </nav>

        {/* logo: left on mobile, centred on desktop */}
        <a href="#top" className="justify-self-start rounded-md md:justify-self-center">
          <Image src="/photos/real/logo.png" alt="Taste of Europe Gourmet Foods, home" width={753} height={355} priority className="h-9 w-auto md:h-11" />
        </a>

        {/* mobile: status + menu */}
        <div className="flex items-center justify-end gap-2 md:hidden">
          <StatusText short status={status} className="min-w-0 truncate text-[12px] text-brand-ink-soft" />
          <button
            ref={menuBtn}
            type="button"
            aria-expanded={open}
            aria-controls="mobile-menu"
            onClick={() => setOpen(true)}
            className="inline-flex h-11 shrink-0 items-center gap-2 rounded-full border border-brand-ink/20 px-4 text-[14px] font-medium"
          >
            Menu
          </button>
        </div>

        {/* desktop: status + call */}
        <div className="hidden items-center justify-end gap-4 md:flex">
          <StatusText status={status} className="text-[14px] text-brand-ink-soft" />
          <a href={CALL_HREF} className="inline-flex h-11 items-center gap-2 rounded-full bg-brand-red-deep px-5 text-[15px] font-medium text-white transition-colors hover:bg-[#b0131a] focus-visible:outline-brand-ink">
            <PhoneIcon size={16} /> Call
          </a>
        </div>
      </div>

      {/* mobile menu sheet. Portalled to <body>: the header's backdrop-blur would otherwise trap a fixed child inside it. */}
      {open && createPortal(
        <div
          id="mobile-menu"
          ref={sheet}
          role="dialog"
          aria-modal="true"
          aria-label="Menu"
          className="fixed inset-0 z-[60] flex flex-col bg-cream px-6 pb-8 pt-4 md:hidden"
        >
          <div className="flex h-12 items-center justify-between">
            <Image src="/photos/real/logo.png" alt="" width={753} height={355} className="h-9 w-auto" />
            <button type="button" onClick={() => setOpen(false)} className="inline-flex h-11 items-center rounded-full border border-brand-ink/20 px-4 text-[14px] font-medium">
              Close
            </button>
          </div>
          <nav aria-label="Menu links" className="mt-10">
            <ul className="space-y-1">
              {LINKS.map((l) => (
                <li key={l.href}>
                  <a href={l.href} onClick={() => setOpen(false)} className="block py-2 font-serif text-[2.6rem] font-medium leading-tight text-brand-ink">
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
          <div className="mt-auto space-y-5">
            <StatusText status={status} className="text-[15px] text-brand-ink-soft" />
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
