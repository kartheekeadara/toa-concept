import Image from "next/image";
import { CATEGORIES } from "@/app/content";

/**
 * "What's inside": an edge-to-edge photo grid with no gutters or rounded cards, names set large on the photos.
 * Desktop (4 columns): Cheeses is a 2×2 feature, four squares beside it, then Drinks and Wine as two wide tiles.
 * Mobile (2 columns): Cheeses spans the full width, the rest are squares.
 * Not links: there's nowhere to go. The names and lines are the content.
 */
const LAYOUT = [
  "col-span-2 aspect-[4/3] md:row-span-2 md:aspect-auto",
  "aspect-square md:aspect-auto",
  "aspect-square md:aspect-auto",
  "aspect-square md:aspect-auto",
  "aspect-square md:aspect-auto",
  "aspect-square md:col-span-2 md:aspect-auto",
  "aspect-square md:col-span-2 md:aspect-auto",
];

export default function InsideGrid() {
  return (
    <ul className="grid grid-cols-2 gap-[3px] bg-cream md:auto-rows-[300px] md:grid-cols-4 lg:auto-rows-[340px]">
      {CATEGORIES.map((c, i) => (
        <li key={c.name} className={`group relative overflow-hidden bg-brand-ink ${LAYOUT[i]}`}>
          <Image
            src={c.photo}
            alt={c.alt}
            fill
            sizes={i === 0 ? "(min-width: 768px) 50vw, 100vw" : i >= 5 ? "(min-width: 768px) 50vw, 50vw" : "(min-width: 768px) 25vw, 50vw"}
            className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03] motion-reduce:transition-none motion-reduce:group-hover:scale-100"
          />
          {/* bottom scrim so the white type always reads */}
          <div aria-hidden className="absolute inset-x-0 bottom-0 h-3/4 bg-gradient-to-t from-[rgba(30,30,30,0.92)] via-[rgba(30,30,30,0.5)] to-transparent" />
          <div className="absolute inset-x-0 bottom-0 p-4 text-white sm:p-6 lg:p-7">
            <h3 className={`font-serif font-medium leading-[1.02] ${i === 0 ? "text-[2.2rem] sm:text-5xl lg:text-6xl" : "text-[1.35rem] sm:text-3xl lg:text-[2.2rem]"}`}>
              {c.name}
            </h3>
            <p data-draft className={`mt-1.5 max-w-sm leading-snug text-white/90 ${i === 0 ? "text-[15px] sm:text-[17px]" : "hidden text-[14px] sm:block sm:text-[15px]"}`}>
              {c.line}
            </p>
          </div>
        </li>
      ))}
    </ul>
  );
}
