import Image from "next/image";
import Link from "next/link";
import { COPY, HERO_PHOTO, HERO_PHOTO_ALT, HOURS, STORE } from "@/app/content";
import { todayHoursLabel } from "@/lib/hours";
import { isInSeasonWindow } from "@/lib/season";
import StoreStatus from "./StoreStatus";
import { h1Class } from "./ui";

export default function Hero() {
  const today = todayHoursLabel(HOURS);
  const season = isInSeasonWindow();

  return (
    <section aria-labelledby="hero-title" className="bg-white">
      <div className="mx-auto max-w-page px-5 pb-10 pt-12 sm:px-8 sm:pb-14 sm:pt-16">
        <div className="sm:hidden">
          <StoreStatus />
        </div>
        <h1 id="hero-title" data-draft className={`mt-4 max-w-2xl sm:mt-0 ${h1Class}`}>
          {COPY.heroLine}
        </h1>
        <p className="mt-4 text-[15px] leading-relaxed text-ink-muted">
          <span className="text-ink">
            {STORE.street}, {STORE.cityLine}
          </span>
          {today ? (
            <>
              <span aria-hidden> · </span>
              <span>Today {today}</span>
            </>
          ) : null}
        </p>
        {season ? (
          <p className="mt-3 text-[14px] text-ink-muted">
            <Link href="#holiday-hours" className="underline underline-offset-4 hover:text-ink">
              Holiday hours
            </Link>
          </p>
        ) : null}
        <div className="relative mt-10 aspect-[16/10] w-full overflow-hidden rounded-photo bg-line sm:aspect-[2/1]">
          <Image src={HERO_PHOTO} alt={HERO_PHOTO_ALT} fill priority sizes="(min-width: 1080px) 1080px, 100vw" className="object-cover" />
        </div>
      </div>
    </section>
  );
}