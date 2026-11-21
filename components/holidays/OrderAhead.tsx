import Image from "next/image";
import { CALL_HREF, STORE } from "@/app/content";
import { ORDER_AHEAD } from "@/lib/holiday-content";
import { PillButton } from "@/components/clay/ui";
import { resolvePhoto } from "@/lib/photos";

export default function OrderAhead() {
  return (
    <section aria-labelledby="order-title" className="bg-clay-paper">
      <div className="grid gap-10 px-5 py-16 sm:px-8 sm:py-24 lg:grid-cols-12 lg:items-center lg:gap-12 lg:px-12">
        <div className="relative aspect-[4/3] overflow-hidden bg-clay-line lg:col-span-6">
          <Image
            src={resolvePhoto("/photos/real/sweets-table.jpg", "/photos/real-edited/sweets-table-crop.jpg")}
            alt="A display table of boxed sweets and gift boxes under baskets of treats"
            fill
            sizes="(min-width: 1024px) 50vw, 100vw"
            className="object-cover"
          />
        </div>
        <div className="lg:col-span-5 lg:col-start-8">
          <h2 id="order-title" className="font-display text-[clamp(2.25rem,4vw,3.25rem)] font-light leading-[1.02] tracking-[-0.015em] text-clay-ink">
            {ORDER_AHEAD.title}
          </h2>
          <p data-draft className="mt-4 max-w-md text-[17px] leading-relaxed text-clay-muted">
            {ORDER_AHEAD.line}
          </p>
          {STORE.phone ? (
            <div className="mt-8">
              <PillButton href={CALL_HREF} variant="primary">
                Call {STORE.phone}
              </PillButton>
            </div>
          ) : null}
        </div>
      </div>
    </section>
  );
}
