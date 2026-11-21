import Image from "next/image";
import { CATEGORIES } from "@/app/content";

/**
 * Category rows: small rounded photo, big serif name, one plain line.
 * One column on mobile, two on desktop. Names are brand-ink and turn red on hover.
 */
export default function CategoryList() {
  return (
    <ul className="grid gap-x-12 md:grid-cols-2">
      {CATEGORIES.map((c) => (
        <li key={c.name} className="group flex items-center gap-5 border-b border-brand-ink/10 py-5 sm:gap-6 sm:py-6">
          <span className="relative h-20 w-20 shrink-0 overflow-hidden rounded-2xl bg-cream-deep sm:h-24 sm:w-24">
            <Image
              src={c.photo}
              alt={c.alt}
              fill
              sizes="96px"
              className="object-cover transition-transform duration-500 ease-out group-hover:scale-105 motion-reduce:transition-none"
            />
          </span>
          <span className="min-w-0">
            <span className="block font-serif text-[1.9rem] font-medium leading-[1.05] text-brand-ink transition-colors duration-200 group-hover:text-brand-red-deep sm:text-[2.4rem]">
              {c.name}
            </span>
            <span data-draft className="mt-1.5 block text-[15px] leading-snug text-brand-ink-soft">{c.line}</span>
          </span>
        </li>
      ))}
    </ul>
  );
}
