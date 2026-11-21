/** Shared bits of the design system. */
import { PRESENTATION, isPlaceholder } from "@/lib/flags";

/**
 * Renders a {{PLACEHOLDER}} as a visible dashed chip. `onDark` for dark/green backgrounds.
 * Renders nothing in presentation mode.
 */
export function Ph({ children, onDark = false, className = "" }: { children: string; onDark?: boolean; className?: string }) {
  if (PRESENTATION) return null;
  return (
    <span className={`placeholder ${onDark ? "!border-white/60 !bg-white/10 !text-white" : ""} ${className}`}>{children}</span>
  );
}

/** Placeholder-aware text: {{X}} values render as chips (nothing in presentation mode), everything else as plain text. */
export function Val({ v, onDark = false }: { v: string; onDark?: boolean }) {
  return isPlaceholder(v) ? <Ph onDark={onDark}>{v}</Ph> : <>{v}</>;
}

/** Review-only content (placeholder notes, "example options" lines). Hidden in presentation mode. */
export function ReviewOnly({ children }: { children: React.ReactNode }) {
  return PRESENTATION ? null : <>{children}</>;
}

export function Eyebrow({ children, light = false }: { children: string; light?: boolean }) {
  return (
    <p
      data-draft
      className={`mb-4 text-[11px] font-semibold uppercase tracking-[0.22em] ${light ? "text-white" : "text-brand-red-deep"}`}
    >
      {children}
    </p>
  );
}

export const btnBase =
  "inline-flex h-14 items-center justify-center gap-2 rounded-full px-7 text-[15px] font-medium tracking-wide transition-[background-color,transform,box-shadow] duration-200 active:scale-[0.97] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2";

export const h2Class = "font-serif text-[2.6rem] font-medium leading-[1.02] sm:text-6xl";

export function PinIcon({ size = 18 }: { size?: number }) {
  return (
    <svg aria-hidden width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
      <path d="M12 21s-7-6.2-7-11.5A7 7 0 0 1 19 9.5C19 14.8 12 21 12 21Z" />
      <circle cx="12" cy="9.5" r="2.5" />
    </svg>
  );
}

export function PhoneIcon({ size = 18 }: { size?: number }) {
  return (
    <svg aria-hidden width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
      <path d="M5 4h3l2 5-2.5 1.5a11 11 0 0 0 6 6L15 14l5 2v3a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2Z" />
    </svg>
  );
}

export function InstagramIcon({ size = 18 }: { size?: number }) {
  return (
    <svg aria-hidden width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="0.8" fill="currentColor" />
    </svg>
  );
}

export function CheckIcon({ size = 14 }: { size?: number }) {
  return (
    <svg aria-hidden width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M5 12.5l4.5 4.5L19 7.5" />
    </svg>
  );
}

export function ArrowIcon({ size = 16 }: { size?: number }) {
  return (
    <svg aria-hidden width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M5 12h14M13 6l6 6-6 6" />
    </svg>
  );
}
