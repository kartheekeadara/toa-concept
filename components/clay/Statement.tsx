import { CLAY_STATEMENT } from "@/lib/clay-content";
import { Reveal } from "./ui";

export default function Statement() {
  return (
    <section className="border-t border-clay-line bg-clay-paper">
      <div className="px-5 py-16 sm:px-8 sm:py-24 lg:py-28">
        <Reveal>
          <p data-draft className="max-w-4xl text-statement-clay text-clay-ink">
            {CLAY_STATEMENT}
          </p>
        </Reveal>
      </div>
    </section>
  );
}