import Image from "next/image";
import { COUNTERS } from "@/lib/clay-content";
import { ConceptTag, MediaPanel, Reveal } from "./ui";

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
              className="grid min-h-[min(100vw,520px)] grid-cols-1 lg:min-h-[72vh] lg:grid-cols-2"
              style={{ backgroundColor: panel.backdrop }}
            >
              <div
                className={`relative flex flex-col justify-center px-5 py-12 sm:px-8 lg:px-14 lg:py-16 ${i % 2 === 1 ? "lg:order-2" : ""}`}
              >
                <Reveal>
                  <p className="text-[13px] font-medium uppercase tracking-[0.14em] text-clay-muted">{panel.name}</p>
                  <p data-draft className="mt-4 max-w-md text-statement-clay text-clay-ink">
                    {panel.line}
                  </p>
                </Reveal>
              </div>
              <div className={`relative min-h-[280px] w-full lg:min-h-full ${i % 2 === 1 ? "lg:order-1" : ""}`}>
                {panel.concept ? <ConceptTag /> : null}
                <Image src={panel.image} alt="" fill className="object-cover" sizes="(min-width: 1024px) 50vw, 100vw" />
              </div>
            </MediaPanel>
          </li>
        ))}
      </ul>
    </section>
  );
}