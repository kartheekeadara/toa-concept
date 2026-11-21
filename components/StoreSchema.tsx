import { HOURS, STORE } from "@/app/content";
import { DAYS } from "@/lib/hours";

const SCHEMA_DAY = {
  sun: "Sunday", mon: "Monday", tue: "Tuesday", wed: "Wednesday", thu: "Thursday", fri: "Friday", sat: "Saturday",
} as const;

/** LocalBusiness structured data so search and maps can read address, phone and hours. */
export default function StoreSchema() {
  const data = {
    "@context": "https://schema.org",
    "@type": "GroceryStore",
    name: `${STORE.name} ${STORE.nameSuffix}`,
    image: `${process.env.NEXT_PUBLIC_BASE_PATH ?? ""}/photos/real-edited/storefront-2-crop.jpg`,
    telephone: STORE.phone ?? undefined,
    address: {
      "@type": "PostalAddress",
      streetAddress: "11926 Providence Rd W, Suite E2",
      addressLocality: "Charlotte",
      addressRegion: "NC",
      postalCode: "28277",
      addressCountry: "US",
    },
    openingHoursSpecification: DAYS.flatMap((d) => {
      const h = HOURS.week[d];
      return h ? [{ "@type": "OpeningHoursSpecification", dayOfWeek: SCHEMA_DAY[d], opens: h.open, closes: h.close }] : [];
    }),
  };
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />;
}
