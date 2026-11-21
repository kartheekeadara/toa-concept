"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { CATEGORIES } from "@/app/content";

/**
 * Big serif list of category names in brand red.
 * Desktop (fine pointer, md+): a small tilted photo follows the cursor while hovering a name.
 * Mobile: a rounded thumbnail sits inline next to each name.
 */
export default function CategoryList() {
  const wrap = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState<number | null>(null);
  const [pos, setPos] = useState({ x: 0, y: 0 });

  const move = (e: React.MouseEvent) => {
    const r = wrap.current?.getBoundingClientRect();
    if (r) setPos({ x: e.clientX - r.left, y: e.clientY - r.top });
  };

  return (
    <div ref={wrap} className="relative" onMouseMove={move} onMouseLeave={() => setActive(null)}>
      <ul className="flex flex-col items-center gap-3 text-center sm:gap-2">
        {CATEGORIES.map((c, i) => (
          <li key={c.name} onMouseEnter={() => setActive(i)} className="flex items-center gap-4">
            {/* mobile thumbnail */}
            <span className="relative h-12 w-12 shrink-0 overflow-hidden rounded-xl md:hidden">
              <Image src={c.photo} alt={c.alt} fill sizes="48px" className="object-cover" />
            </span>
            <span
              className={`font-serif text-[2.4rem] font-medium leading-[1.1] text-brand-red transition-opacity duration-300 sm:text-6xl lg:text-7xl ${
                active !== null && active !== i ? "md:opacity-40" : ""
              }`}
            >
              {c.name}
            </span>
          </li>
        ))}
      </ul>

      {/* desktop cursor-follow photo. Decorative (names carry the meaning); all photos preloaded, toggled by opacity */}
      <div
        aria-hidden
        className="pointer-events-none absolute left-0 top-0 z-10 hidden md:block"
        style={{ transform: `translate3d(${pos.x + 24}px, ${pos.y - 110}px, 0)` }}
      >
        <div className="relative h-56 w-44 -rotate-6">
          {CATEGORIES.map((c, i) => (
            <div
              key={c.name}
              className={`follow-photo absolute inset-0 overflow-hidden rounded-2xl shadow-[0_20px_40px_-18px_rgba(0,0,0,0.55)] transition-[opacity,transform] duration-300 ease-out ${
                active === i ? "scale-100 opacity-100" : "scale-90 opacity-0"
              }`}
            >
              <Image src={c.photo} alt="" fill sizes="176px" className="object-cover" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
