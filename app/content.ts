/**
 * All page copy lives here so it's easy to review and swap.
 * Every string marked COPY-DRAFT is placeholder marketing copy written for the pitch.
 * Anything in {{DOUBLE_BRACES}} is an unknown fact or a headline the owner/Kartheek still has to supply.
 * Facts we DO know: name, address, and what is visible in the store's own photos
 * (public/photos/real/): candy baskets, gingerbread, boxed sweets, a deli case, cheeses,
 * sausages, smoked fish, preserves, drinks and a wine display.
 */

import store from "@/data/store.json";
import type { StoreHours } from "@/lib/hours";
import { PRESENTATION, isPlaceholder } from "@/lib/flags";

/** "" in data/store.json means "not confirmed yet". */
const filled = (v: string | null | undefined): v is string => typeof v === "string" && v.trim() !== "";

/**
 * Phone, email, Instagram and hours come from data/store.json (fill that in, not this file).
 * Unfilled values are null here; components show a {{PLACEHOLDER}} chip in review mode
 * and hide them in presentation mode.
 */
export const STORE = {
  name: "Taste of Europe",
  nameSuffix: "Gourmet Foods",
  street: "11926 Providence Rd\u00A0W", // non-breaking space keeps "Rd W" together
  cityLine: "Charlotte, NC 28277",
  phone: filled(store.phone) ? store.phone : null,
  email: filled(store.email) ? store.email : null,
  instagram: filled(store.instagram) ? store.instagram : null,
};

export const ADDRESS_QUERY = encodeURIComponent(
  "Taste of Europe Gourmet Foods, 11926 Providence Rd W, Charlotte, NC 28277"
);
export const DIRECTIONS_URL = `https://www.google.com/maps/dir/?api=1&destination=${ADDRESS_QUERY}`;
const rawDigits = STORE.phone ? STORE.phone.replace(/[^\d+]/g, "") : "";
// US 10-digit numbers get +1, e.g. (704) 555-0147 → tel:+17045550147
const phoneDigits = /^\d{10}$/.test(rawDigits) ? `+1${rawDigits}` : rawDigits;
// tel: link. With no phone in store.json, "Call" buttons scroll to Visit us instead of dialing.
export const CALL_HREF = phoneDigits ? `tel:${phoneDigits}` : "#visit";
export const INSTAGRAM_URL = filled(store.instagramUrl) ? store.instagramUrl : "#";

/**
 * Opening hours from data/store.json.
 */
export const HOURS: StoreHours = {
  timezone: store.timezone,
  week: store.hours as StoreHours["week"],
};

/** Holiday hours rows in Visit us, from data/store.json `holidayHours`. Same placeholder rule as above. */
export const HOLIDAY_HOURS = store.holidayHours.filter(
  (r) => filled(r.date) && filled(r.hours) && !(PRESENTATION && (isPlaceholder(r.date) || isPlaceholder(r.hours)))
);

/**
 * Party platter builder. We don't know yet whether the store makes boards or platters,
 * so it stays off. Flip to true once the owner confirms AND the options below are filled in
 * (placeholder options render as empty cards in presentation mode).
 */
export const SHOW_BUILDER = false;

/** Platter builder options (only used when SHOW_BUILDER is true). No prices anywhere. */
export const BOARD = {
  people: ["{{PARTY_SIZE_1}}", "{{PARTY_SIZE_2}}", "{{PARTY_SIZE_3}}"],
  meats: ["{{MEAT_1}}", "{{MEAT_2}}", "{{MEAT_3}}", "{{MEAT_4}}"],
  cheeses: ["{{CHEESE_1}}", "{{CHEESE_2}}", "{{CHEESE_3}}"],
  extras: ["{{EXTRA_1}}", "{{EXTRA_2}}", "{{EXTRA_3}}", "{{EXTRA_4}}"],
};

/** Holiday panel: exactly three items. Names are products visible in the store's own photos. */
export const HOLIDAY_ITEMS = [
  // COPY-DRAFT: labels
  { name: "Sweets by the pound", photo: "/photos/real/candy-baskets-3.jpg", alt: "Wicker baskets stacked on a stand, filled with wrapped candies" },
  { name: "Gingerbread", photo: "/photos/real/gingerbread.jpg", alt: "A wicker basket of packaged gingerbread" },
  { name: "Gift-ready sweets", photo: "/photos/real/sweets-table.jpg", alt: "A wooden table of boxed chocolates and sweets" },
];

/** Taste of home: countries with two things from each. */
export const COUNTRIES = [
  // native: the country's name in its own language (lang = BCP 47 code, so screen readers pronounce it right)
  { name: "Ukraine", native: "Україна", lang: "uk", items: ["Chocolates", "Sunflower halva"] },
  { name: "Poland", native: "Polska", lang: "pl", items: ["Pierogi", "Wafer bars"] },
  { name: "Georgia", native: "საქართველო", lang: "ka", items: ["Borjomi", "Churchkhela"] },
  { name: "Lithuania", native: "Lietuva", lang: "lt", items: ["Dark rye bread", "Farmer's cheese"] },
  { name: "Bulgaria", native: "България", lang: "bg", items: ["White cheese", "Lyutenitsa"] },
  { name: "Moldova", native: "Moldova", lang: "ro", items: ["Wine", "Preserves"] },
]

export const COPY = {
  // COPY-DRAFT
  heroTagline: "A little corner of Europe, right here in Charlotte.",

  // COPY-DRAFT
  holidayEyebrow: "The season",
  holidayTitle: "Everything for the holiday table.",

  orderTitle: "Order ahead from the deli",
  orderBody: "Call before you come. We'll have your deli order sliced, weighed and waiting at the counter.",
  orderNote: "Bigger orders? Give us a day's notice.",

  builderTitle: "Build a party platter",

  // COPY-DRAFT
  insideEyebrow: "What's inside",

  insideStoreEyebrow: "Inside the store",
  insideStoreLine: "Come hungry. Leave with a full bag.",

  // COPY-DRAFT
  countryEyebrow: "Shop by country",
  countryTitle: "The brands you grew up with.",
  countryNote: "Don't see it? Ask at the counter — we can usually get it.",

  // COPY-DRAFT
  visitEyebrow: "Visit us",

  // COPY-DRAFT
  footerLine: "Imported cheeses, deli, sweets and pantry staples.",
};

/** Category rows: photo, name, one plain line. Photos are from the store. */
export const CATEGORIES = [
  // COPY-DRAFT: one-liners
  { name: "Cheeses", line: "Hard, soft and smoked cheeses from the deli case.", photo: "/photos/real/cheese-case.jpg", alt: "Blocks of cheese in the deli case" },
  { name: "Sausages & Deli", line: "Kielbasa, salami and smoked meats, sliced at the counter.", photo: "/photos/real/deli-sausages.jpg", alt: "Sausages and smoked meats in the deli case" },
  { name: "Sweets & Candy", line: "Wrapped candies by the pound, chocolate bars and boxed sweets.", photo: "/photos/real/candy-baskets-1.jpg", alt: "Wicker baskets of wrapped candy" },
  { name: "Pantry & Preserves", line: "Pickles, jarred vegetables, preserves and spreads.", photo: "/photos/real/preserves-shelves.jpg", alt: "Shelves of jarred preserves and pickles" },
  { name: "Smoked Fish & Salads", line: "Mackerel, herring and salads made to go with them.", photo: "/photos/real/smoked-fish-case.jpg", alt: "Smoked fish in the deli case" },
  { name: "Drinks", line: "Kvass, Borjomi, juices and imported beer.", photo: "/photos/real/drinks-shelf-1.jpg", alt: "Shelves of bottled juices and drinks" },
  { name: "Wine", line: "A wine wall with bottles for the table and for gifts.", photo: "/photos/real/wine-display.jpg", alt: "Wine bottles in wooden crates beside a barrel" },
];

/** Hero photo tiles (staggered on desktop, swipeable strip on mobile). */
export const HERO_TILES = [
  { photo: "/photos/real/sweets-display.jpg", alt: "Wooden tables of chocolate bars and wicker baskets of sweets", shape: "aspect-[4/5]" },
  // deli-case-2 has a child at the counter, so deli-case-3 is used instead
  { photo: "/photos/real/deli-case-3.jpg", alt: "Smoked meats and sausages in the deli case", shape: "aspect-[4/3]" },
  { photo: "/photos/real/candy-baskets-4.jpg", alt: "A stand of wicker baskets filled with wrapped candies", shape: "aspect-[4/3]" },
  { photo: "/photos/real/chocolates-basket.jpg", alt: "A wicker basket of boxed chocolates and wafers", shape: "aspect-[4/5]" },
];

/** "Inside the store" photo stack, one photo at a time. No captions. */
export const STORE_PHOTOS = [
  { photo: "/photos/real/interior-wide-1.jpg", alt: "Wide view of the store with display tables of sweets" },
  { photo: "/photos/real/wine-barrels.jpg", alt: "Wine shelves and oak barrels by the front windows" },
  { photo: "/photos/real/jars-honey.jpg", alt: "Shelves of honey and preserves in jars" },
  { photo: "/photos/real/smoked-fish.jpg", alt: "A tray of herring and salmon in the cooler" },
  { photo: "/photos/real/sweets-boxes.jpg", alt: "Boxed chocolates and sweets on a wooden table" },
];

/** Footer photo strip (store photos, no people, no prices visible). */
export const FOOTER_STRIP = [
  { photo: "/photos/real/sushki-bakery.jpg", alt: "Bags of sushki and baked rings" },
  { photo: "/photos/real/cakes-case.jpg", alt: "Whole cakes in a glass case" },
  { photo: "/photos/real/jars-preserves.jpg", alt: "Jars of rose petal preserves" },
  { photo: "/photos/real/chocolates-2.jpg", alt: "Boxes of chocolates on a wooden table" },
  { photo: "/photos/real/dessert-case-2.jpg", alt: "Slices of cake in the dessert case" },
  { photo: "/photos/real/sour-cabbage.jpg", alt: "A tub of sour cabbage" },
];
