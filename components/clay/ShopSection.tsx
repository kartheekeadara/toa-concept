import Image from "next/image";
import { HERO_PHOTO, HERO_PHOTO_ALT } from "@/app/content";
import { SHOP_COPY } from "@/lib/clay-content";
import { MediaPanel, Reveal } from "./ui";

export default function ShopSection() {
  return (
    <section aria-labelledby="shop-title" className="bg-clay-paper">
      <div className="px-5 py-14 sm:px-8 sm:py-16">
        <Reveal>
          <h2 id="shop-title" className="text-[13px] font-medium uppercase tracking-[0.14em] text-clay-muted">
            The shop
          </h2>
          <p data-draft className="mt-4 max-w-2xl text-statement-clay text-clay-ink">
            {SHOP_COPY.line1} {SHOP_COPY.line2}
          </p>
        </Reveal>
      </div>
      <MediaPanel className="relative aspect-[4/3] sm:aspect-[21/9]">
        <Image src={HERO_PHOTO} alt={HERO_PHOTO_ALT} fill className="object-cover" sizes="100vw" priority={false} />
      </MediaPanel>
    </section>
  );
}