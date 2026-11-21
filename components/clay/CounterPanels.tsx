import Image from "next/image";
import { COUNTERS } from "@/lib/clay-content";
import { MediaPanel, Reveal, eyebrowClass } from "./ui";

export default function CounterPanels() {
  return (
    <section aria-labelledby="counters-title" className="bg-clay-paper">
      <h2 id="counters-title" className="sr-only">
        The counters
      </h2>
      <ul className="flex flex-col">
        {COUNTERS.map((panel, i) => (
          <li key={panel.name} className={i % 2 === 1 ? "bg-clay-section" : "bg-clay-paper"}>
            <MediaPanel
              className="grid grid-cols-1 lg:grid-cols-2 lg:h-[60vh] lg:min-h-[440px]"
              style={{ backgroundColor: panel.backdrop }}
            >
              <div
                className={`relative flex flex-col justify-center px-5 py-12 sm:px-8 lg:px-14 lg:py-16 ${i % 2 === 1 ? "lg:order-2" : ""}`}
              >
                <Reveal>
                  <p className={eyebrowClass}>{panel.name}</p>
                  <p
                    data-draft
                    className="mt-4 max-w-md text-[clamp(1.5rem,2.4vw,2.125rem)] font-medium leading-[1.35] tracking-[-0.02em] text-clay-ink"
                  >
                    {panel.line}
                  </p>
                </Reveal>
              </div>
              <div className={`relative h-[300px] w-full lg:h-full ${i % 2 === 1 ? "lg:order-1" : ""}`}>
                <Image src={panel.image} alt="" fill className="object-cover" sizes="(min-width: 1024px) 50vw, 100vw" />
              </div>
            </MediaPanel>
          </li>
        ))}
      </ul>
    </section>
  );
}