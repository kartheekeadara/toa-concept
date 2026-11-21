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
  street: "11926 Providence Rd W",
  cityLine: "Charlotte, NC 28277",
  phone: filled(store.phone) ? store.phone : null,
  email: filled(store.email) ? store.email : null,
  instagram: filled(store.instagram) ? store.instagram : null,
};

export const ADDRESS_QUERY = encodeURIComponent(
  "Taste of Europe Gourmet Foods, 11926 Providence Rd W, Charlotte, NC 28277"
);
export const DIRECTIONS_URL = `https://www.google.com/maps/dir/?api=1&destination=${ADDRESS_QUERY}`;
const phoneDigits = STORE.phone ? STORE.phone.replace(/[^\d+]/g, "") : "";
// tel:{{PHONE}}. With no phone in store.json, "Call" buttons scroll to Visit us instead of dialing.
export const CALL_HREF = phoneDigits ? `tel:${phoneDigits}` : "#visit";
export const INSTAGRAM_URL = filled(store.instagramUrl) ? store.instagramUrl : "#";

/**
 * Opening hours from data/store.json.
 */
export const HOURS: StoreHours = {
  timezone: store.timezone,
  week: store.hours as StoreHours["week"],
};

/**
 * Ticker lines under the nav, from data/store.json `announcements`.
 * Examples of what the owner might put there:
 *   "Holiday candy baskets are in"
 *   "Fresh smoked fish this week"
 * Unfilled {{ANNOUNCEMENT_N}} lines are dropped in presentation mode; with none left the bar isn't rendered.
 */
export const ANNOUNCEMENTS: string[] = store.announcements.filter((l) => filled(l) && !(PRESENTATION && isPlaceholder(l)));

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

/** Taste of home. NEEDS OWNER INPUT: which countries the store's products come from. */
export const COUNTRIES = ["{{COUNTRY_1}}", "{{COUNTRY_2}}", "{{COUNTRY_3}}", "{{COUNTRY_4}}", "{{COUNTRY_5}}", "{{COUNTRY_6}}"];

export const COPY = {
  // COPY-DRAFT
  heroEyebrow: "European grocery & deli · Charlotte",
  // COPY-DRAFT
  heroTagline: "A little corner of Europe, right here in Charlotte.",

  // COPY-DRAFT
  holidayEyebrow: "The season",
  holidayTitle: "{{HOLIDAY_HEADLINE}}",

  orderTitle: "Order ahead from the deli",
  orderBody: "{{ORDER_AHEAD_COPY}}",

  builderTitle: "Build a party platter",

  // COPY-DRAFT
  insideEyebrow: "What's inside",
  // NEEDS OWNER INPUT: Taste of Home headline (Kartheek writes the final line).
  insideTitle: "{{TASTE_OF_HOME_HEADLINE}}",

  // COPY-DRAFT
  countryEyebrow: "Shop by country",

  // COPY-DRAFT
  visitEyebrow: "Visit us",

  // COPY-DRAFT
  footerLine: "Imported cheeses, deli, sweets and pantry staples.",
};

/** Big serif list. Photos are from the store. */
export const CATEGORIES = [
  { name: "Cheeses", photo: "/photos/real/cheese-case.jpg", alt: "Cheeses in the deli case" },
  { name: "Sausages & Deli", photo: "/photos/real/deli-sausages.jpg", alt: "Sausages and smoked meats in the deli case" },
  { name: "Sweets & Candy", photo: "/photos/real/candy-baskets-1.jpg", alt: "Wicker baskets of candy" },
  { name: "Pantry & Preserves", photo: "/photos/real/preserves-shelves.jpg", alt: "Shelves of jarred preserves" },
  { name: "Smoked Fish & Salads", photo: "/photos/real/smoked-fish-case.jpg", alt: "Smoked fish in the deli case" },
  { name: "Drinks", photo: "/photos/real/drinks-shelf-1.jpg", alt: "Shelves of bottled drinks" },
  { name: "Wine", photo: "/photos/real/wine-display.jpg", alt: "Wine bottles in wooden crates on a barrel" },
];
