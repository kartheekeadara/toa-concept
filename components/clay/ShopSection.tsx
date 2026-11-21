import Image from "next/image";
import { HERO_PHOTO, HERO_PHOTO_ALT } from "@/app/content";
import { MediaPanel, Reveal, eyebrowClass } from "./ui";

export default function ShopSection() {
  return (
    <section aria-labelledby="shop-title" className="bg-clay-paper">
      <div className="px-5 pb-8 pt-14 sm:px-8 sm:pb-10 sm:pt-16">
        <Reveal>
          <h2 id="shop-title" className={eyebrowClass}>
            The shop
          </h2>
        </Reveal>
      </div>
      <MediaPanel className="relative aspect-[4/3] sm:aspect-[3/2]">
        <Image src={HERO_PHOTO} alt={HERO_PHOTO_ALT} fill className="object-cover" sizes="100vw" priority={false} />
      </MediaPanel>
    </section>
  );
}