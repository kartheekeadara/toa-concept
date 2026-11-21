import { PRESENTATION } from "@/lib/flags";
import { notFound } from "next/navigation";
import { btnPrimary, btnGhost, h1Class, h2Class, hairline } from "@/components/ui";

export default function StyleguidePage() {
  if (PRESENTATION) notFound();

  return (
    <main className="mx-auto max-w-page px-5 py-16 sm:px-8">
      <h1 className={h1Class}>Quiet White styleguide</h1>
      <p className="mt-4 text-ink-muted">Review builds only.</p>

      <section className="mt-12 space-y-3">
        <p className={h2Class}>Type</p>
        <p className="text-[15px] text-ink-muted">Body and secondary text</p>
        <p className="text-[15px] text-ink">Україна · Polska · საქართველო</p>
      </section>

      <section className={`mt-12 space-y-4 pt-8 ${hairline}`}>
        <div className="flex flex-wrap gap-4">
          <span className={btnPrimary}>Directions</span>
          <span className={btnGhost}>Secondary</span>
        </div>
        <div className="flex gap-6 text-sm">
          <span className="text-ink">ink</span>
          <span className="text-ink-muted">ink-muted</span>
          <span className="border border-line px-3 py-1">line</span>
        </div>
      </section>
    </main>
  );
}