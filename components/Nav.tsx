"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import Link from "next/link";
import { CALL_HREF, DIRECTIONS_PAGE, STORE } from "@/app/content";
import { PhoneIcon, PinIcon } from "./ui";

/** Links go to the homepage sections, so they also work from /directions. */
const LINKS = [
  { href: "/#holidays", label: "Holidays" },
  { href: "/#deli", label: "Deli" },
  { href: "/#inside", label: "Inside" },
];

/**
 * Simple, classic header: logo left, links right, one "Get directions" button.
 * Mobile: logo + Menu (the bottom bar already carries Directions and Call).
 */
export default function Nav() {
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
    <header className={`sticky top-0 z-50 bg-cream transition-[border-color] duration-200 ${scrolled ? "border-b border-brand-ink/10" : "border-b border-transparent"}`}>
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-6 px-6 sm:px-10 md:h-20">
        <Link href="/" className="shrink-0 rounded-md focus-visible:outline-brand-ink">
          <Image src="/photos/real/logo.png" alt="Taste of Europe Gourmet Foods, home" width={753} height={355} priority className="h-10 w-auto md:h-12" />
        </Link>

        {/* desktop */}
        <nav aria-label="Main" className="hidden items-center gap-2 md:flex">
          <ul className="flex items-center">
            {LINKS.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="inline-flex h-11 items-center px-4 text-[15px] font-medium text-brand-ink underline-offset-[6px] hover:underline">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
          <Link href={DIRECTIONS_PAGE} className="ml-3 inline-flex h-11 items-center gap-2 rounded-full bg-brand-red-deep px-5 text-[15px] font-medium text-white transition-colors hover:bg-[#b0131a] focus-visible:outline-brand-ink">
            <PinIcon size={16} /> Get directions
          </Link>
        </nav>

        {/* mobile */}
        <button
          ref={menuBtn}
          type="button"
          aria-expanded={open}
          aria-controls="mobile-menu"
          onClick={() => setOpen(true)}
          className="inline-flex h-11 items-center gap-2 rounded-full border border-brand-ink/25 px-4 text-[15px] font-medium md:hidden"
        >
          <svg aria-hidden width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M4 8h16M4 16h16" /></svg>
          Menu
        </button>
      </div>

      {open &&
        createPortal(
          <div id="mobile-menu" ref={sheet} role="dialog" aria-modal="true" aria-label="Menu" className="fixed inset-0 z-[60] flex flex-col bg-cream px-6 pb-8 md:hidden">
            <div className="flex h-16 items-center justify-between">
              <Image src="/photos/real/logo.png" alt="" width={753} height={355} className="h-10 w-auto" />
              <button type="button" onClick={() => setOpen(false)} className="inline-flex h-11 items-center gap-2 rounded-full border border-brand-ink/25 px-4 text-[15px] font-medium">
                <svg aria-hidden width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M6 6l12 12M18 6L6 18" /></svg>
                Close
              </button>
            </div>
            <nav aria-label="Menu links" className="mt-8">
              <ul className="space-y-1">
                {LINKS.map((l) => (
                  <li key={l.href}>
                    <Link href={l.href} onClick={() => setOpen(false)} className="block py-2 font-serif text-[2.4rem] font-medium leading-tight text-brand-ink">
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
            <div className="mt-auto space-y-3">
              <p className="text-[15px] text-brand-ink-soft">{STORE.street}, {STORE.cityLine}</p>
              <Link href={DIRECTIONS_PAGE} className="flex h-12 items-center justify-center gap-2 rounded-full bg-brand-red-deep text-[15px] font-medium text-white focus-visible:outline-brand-ink">
                <PinIcon size={17} /> Get directions
              </Link>
              <a href={CALL_HREF} className="flex h-12 items-center justify-center gap-2 rounded-full border-2 border-brand-ink/80 text-[15px] font-medium">
                <PhoneIcon size={17} /> {STORE.phone ?? "Call"}
              </a>
            </div>
          </div>,
          document.body
        )}
    </header>
  );
}
