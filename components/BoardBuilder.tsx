"use client";

import { useRef, useState } from "react";
import { BOARD, CALL_HREF, COPY, STORE } from "@/app/content";
import { CheckIcon, PhoneIcon, Ph, Val, btnBase, h2Class } from "./ui";

/**
 * "Build a party platter": one question at a time.
 * How many people? → Meats → Cheeses → Extras → Call to order. No prices.
 * Only rendered when SHOW_BUILDER is true in app/content.ts.
 */
type Group = "meats" | "cheeses" | "extras";
const STEPS = [
  { key: "people", q: "How many people?", multi: false },
  { key: "meats", q: "Meats", multi: true },
  { key: "cheeses", q: "Cheeses", multi: true },
  { key: "extras", q: "Extras", multi: true },
  { key: "call", q: "Call to order", multi: false },
] as const;

function OptionCard({ label, on, onClick, multi }: { label: string; on: boolean; onClick: () => void; multi: boolean }) {
  return (
    <button
      type="button"
      role={multi ? "checkbox" : "radio"}
      aria-checked={on}
      onClick={onClick}
      className={`flex min-h-[64px] items-center justify-between gap-3 rounded-2xl border-2 px-5 py-4 text-left text-[17px] transition-colors duration-200 focus-visible:outline-brand-ink ${
        on ? "border-brand-red-deep bg-brand-red-tint" : "border-brand-ink/15 bg-white/60 hover:border-brand-ink/40"
      }`}
    >
      <span><Val v={label} /></span>
      <span
        aria-hidden
        className={`grid h-6 w-6 shrink-0 place-items-center rounded-full border-2 ${on ? "border-brand-red-deep bg-brand-red-deep text-white" : "border-brand-ink/30"}`}
      >
        {on && <CheckIcon />}
      </span>
    </button>
  );
}

export default function BoardBuilder() {
  const [step, setStep] = useState(0);
  const [people, setPeople] = useState<string | null>(null);
  const [picks, setPicks] = useState<Record<Group, string[]>>({ meats: [], cheeses: [], extras: [] });
  const headRef = useRef<HTMLHeadingElement>(null);

  const go = (n: number) => {
    setStep(n);
    // move focus to the new question so keyboard and screen-reader users land on it
    setTimeout(() => headRef.current?.focus(), 0);
  };
  const toggle = (g: Group, item: string) =>
    setPicks((p) => ({ ...p, [g]: p[g].includes(item) ? p[g].filter((x) => x !== item) : [...p[g], item] }));

  const s = STEPS[step];
  const canNext = s.key !== "people" || people !== null;

  return (
    <section id="platter" aria-labelledby="platter-title" className="mx-auto max-w-3xl px-6 py-20 sm:px-10 sm:py-28">
      <h2 id="platter-title" className={h2Class}>{COPY.builderTitle}</h2>

      <div className="mt-10 rounded-[2rem] border border-brand-ink/10 bg-cream-deep/60 p-6 sm:p-10">
        <p className="text-[12px] font-semibold uppercase tracking-[0.2em] text-brand-red-deep">
          Step {step + 1} of {STEPS.length}
        </p>
        {/* progress */}
        <div aria-hidden className="mt-3 flex gap-1.5">
          {STEPS.map((_, i) => (
            <span key={i} className={`h-1 flex-1 rounded-full ${i <= step ? "bg-brand-red-deep" : "bg-brand-ink/15"}`} />
          ))}
        </div>

        <h3 ref={headRef} tabIndex={-1} className="mt-8 font-serif text-3xl font-medium focus:outline-none sm:text-4xl">
          {s.q}
        </h3>

        <div className="mt-6">
          {s.key === "people" && (
            <div role="radiogroup" aria-label="How many people" className="grid gap-3 sm:grid-cols-3">
              {BOARD.people.map((o) => (
                <OptionCard key={o} label={o} multi={false} on={people === o} onClick={() => setPeople(o)} />
              ))}
            </div>
          )}
          {(s.key === "meats" || s.key === "cheeses" || s.key === "extras") && (
            <div role="group" aria-label={s.q} className="grid gap-3 sm:grid-cols-2">
              {BOARD[s.key].map((o) => (
                <OptionCard key={o} label={o} multi on={picks[s.key as Group].includes(o)} onClick={() => toggle(s.key as Group, o)} />
              ))}
            </div>
          )}
          {s.key === "call" && (
            <div>
              <dl className="divide-y divide-brand-ink/10 border-y border-brand-ink/10 text-[16px]">
                {[
                  ["People", people ? [people] : []],
                  ["Meats", picks.meats],
                  ["Cheeses", picks.cheeses],
                  ["Extras", picks.extras],
                ].map(([label, vals]) => (
                  <div key={label as string} className="grid grid-cols-[96px_1fr] gap-3 py-3">
                    <dt className="text-[12px] font-semibold uppercase tracking-[0.16em] text-brand-ink-soft">{label as string}</dt>
                    <dd className="flex flex-wrap gap-1.5">
                      {(vals as string[]).length ? (vals as string[]).map((v) => <span key={v}><Val v={v} /></span>) : <span className="text-brand-ink-soft">Your choice</span>}
                    </dd>
                  </div>
                ))}
              </dl>
              <a href={CALL_HREF} className={`${btnBase} mt-6 w-full bg-brand-red-deep text-white hover:bg-[#b0131a] focus-visible:outline-brand-ink sm:w-auto`}>
                <PhoneIcon /> Call to order
              </a>
              {!STORE.phone && <p className="mt-3 text-sm"><Ph>{"{{PHONE}}"}</Ph></p>}
            </div>
          )}
        </div>

        <div className="mt-8 flex items-center justify-between gap-3">
          {step > 0 ? (
            <button type="button" onClick={() => go(step - 1)} className="h-12 rounded-full px-4 text-[15px] font-medium underline underline-offset-4">
              Back
            </button>
          ) : <span />}
          {step < STEPS.length - 1 && (
            <button
              type="button"
              disabled={!canNext}
              onClick={() => go(step + 1)}
              className={`${btnBase} h-12 bg-brand-ink text-white focus-visible:outline-brand-ink disabled:cursor-not-allowed disabled:opacity-40`}
            >
              Next
            </button>
          )}
        </div>
      </div>
    </section>
  );
}
