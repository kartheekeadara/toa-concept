import { PRESENTATION, isPlaceholder } from "@/lib/flags";

export function Ph({ children, className = "" }: { children: string; className?: string }) {
  if (PRESENTATION) return null;
  return <span className={`placeholder ${className}`}>{children}</span>;
}

export function Val({ v }: { v: string }) {
  return isPlaceholder(v) ? <Ph>{v}</Ph> : <>{v}</>;
}

export const btnPrimary =
  "inline-flex min-h-10 items-center justify-center rounded-btn bg-brand-red-deep px-5 text-[14px] font-medium text-white transition-colors hover:bg-[#b0131a]";

/** @deprecated use btnPrimary */
export const btnBase = btnPrimary;

export const btnGhost =
  "inline-flex min-h-10 items-center justify-center rounded-btn px-3 text-[14px] font-medium text-ink transition-colors hover:text-ink-muted";

export const hairline = "border-t border-line";

export const h1Class = "text-[clamp(1.75rem,4vw,2.75rem)] font-normal leading-[1.15] tracking-[-0.02em] text-ink";

export const h2Class = "text-xl font-normal tracking-[-0.01em] text-ink";

export function CheckIcon({ size = 14 }: { size?: number }) {
  return (
    <svg aria-hidden width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M5 12.5l4.5 4.5L19 7.5" />
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

export function InstagramIcon({ size = 16 }: { size?: number }) {
  return (
    <svg aria-hidden width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
      <rect x="3" y="3" width="18" height="18" rx="4" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="0.8" fill="currentColor" />
    </svg>
  );
}