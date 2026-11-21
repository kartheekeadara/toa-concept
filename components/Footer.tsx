import { INSTAGRAM_URL, STORE } from "@/app/content";
import { PRESENTATION } from "@/lib/flags";
import { btnGhost, InstagramIcon } from "./ui";

export default function Footer() {
  return (
    <footer className="border-t border-line bg-white pb-20 md:pb-8">
      <div className="mx-auto flex max-w-page flex-col gap-4 px-5 py-8 text-[13px] text-ink-muted sm:flex-row sm:items-center sm:justify-between sm:px-8">
        <p>
          © 2026 {STORE.name}
          <span aria-hidden> · </span>
          Concept mockup
        </p>
        {(STORE.instagram || !PRESENTATION) && (
          <a href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer" className={`${btnGhost} gap-2`}>
            <InstagramIcon />
            {STORE.instagram ?? "Instagram"}
          </a>
        )}
      </div>
    </footer>
  );
}