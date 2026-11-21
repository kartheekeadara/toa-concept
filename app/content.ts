/**
 * Quiet White: all marketing strings are COPY-DRAFT unless confirmed in store data.
 */

import store from "@/data/store.json";
import type { StoreHours } from "@/lib/hours";
import { PRESENTATION, isPlaceholder } from "@/lib/flags";
import { resolvePhoto } from "@/lib/photos";

const filled = (v: string | null | undefined): v is string => typeof v === "string" && v.trim() !== "";

export const STORE = {
  name: "Taste of Europe",
  nameSuffix: "Gourmet Foods",
  street: "11926 Providence Rd\u00A0W",
  cityLine: "Charlotte, NC 28277",
  phone: filled(store.phone) ? store.phone : null,
  email: filled(store.email) ? store.email : null,
  instagram: filled(store.instagram) ? store.instagram : null,
};

export const ADDRESS_QUERY = encodeURIComponent(
  "Taste of Europe Gourmet Foods, 11926 Providence Rd W, Charlotte, NC 28277"
);
export const DIRECTIONS_URL = `https://www.google.com/maps/dir/?api=1&destination=${ADDRESS_QUERY}`;
export const DIRECTIONS_PAGE = "/directions";
export const MAP_EMBED_URL = `https://www.google.com/maps?q=${encodeURIComponent("11926 Providence Rd W, Charlotte, NC 28277")}&z=16&output=embed`;

const rawDigits = STORE.phone ? STORE.phone.replace(/[^\d+]/g, "") : "";
const phoneDigits = /^\d{10}$/.test(rawDigits) ? `+1${rawDigits}` : rawDigits;
export const CALL_HREF = phoneDigits ? `tel:${phoneDigits}` : "#visit";
export const INSTAGRAM_URL = filled(store.instagramUrl) ? store.instagramUrl : "#";

export const HOURS: StoreHours = {
  timezone: store.timezone,
  week: store.hours as StoreHours["week"],
};

export const HOLIDAY_HOURS = store.holidayHours.filter(
  (r) => filled(r.date) && filled(r.hours) && !(PRESENTATION && (isPlaceholder(r.date) || isPlaceholder(r.hours)))
);

export const SHOW_BUILDER = false;

export const BOARD = {
  people: ["{{PARTY_SIZE_1}}", "{{PARTY_SIZE_2}}", "{{PARTY_SIZE_3}}"],
  meats: ["{{MEAT_1}}", "{{MEAT_2}}", "{{MEAT_3}}", "{{MEAT_4}}"],
  cheeses: ["{{CHEESE_1}}", "{{CHEESE_2}}", "{{CHEESE_3}}"],
  extras: ["{{EXTRA_1}}", "{{EXTRA_2}}", "{{EXTRA_3}}", "{{EXTRA_4}}"],
};

export type Category = {
  name: string;
  line: string;
  confirm?: boolean;
};

export const CATEGORIES: Category[] = [
  { name: "Cheeses", line: "Hard, soft and smoked cheeses from the deli case." },
  { name: "Sausages & Deli", line: "Kielbasa, salami and smoked meats, sliced at the counter." },
  { name: "Sweets & Candy", line: "Wrapped candies by the pound, chocolate bars and boxed sweets." },
  { name: "Pantry & Preserves", line: "Pickles, jarred vegetables, preserves and spreads." },
  { name: "Smoked Fish & Salads", line: "Mackerel, herring and salads made to go with them." },
  { name: "Drinks", line: "Kvass, Borjomi, juices and imported beer." },
  { name: "Wine", line: "Bottles for the table and for gifts." },
  { name: "Bakery", line: "{{CONFIRM_BAKERY_LINE}}", confirm: true },
  { name: "Cakes & desserts", line: "{{CONFIRM_CAKES_LINE}}", confirm: true },
  { name: "Coffee bar", line: "{{CONFIRM_COFFEE_LINE}}", confirm: true },
];

export const COUNTRY_NATIVE = [
  { native: "Україна", lang: "uk" },
  { native: "Polska", lang: "pl" },
  { native: "საქართველო", lang: "ka" },
  { native: "Lietuva", lang: "lt" },
  { native: "България", lang: "bg" },
  { native: "Moldova", lang: "ro" },
];

export const CARRY_PHOTOS = [
  {
    src: resolvePhoto("/photos/real/interior-wide-1.jpg"),
    alt: "Wide view of the store with display tables of sweets",
  },
  {
    src: resolvePhoto("/photos/real/deli-case-3.jpg"),
    alt: "Smoked meats and sausages in the deli case",
  },
  {
    src: resolvePhoto("/photos/real/candy-baskets-1.jpg"),
    alt: "Wicker baskets of wrapped candy",
  },
];

export const COPY = {
  heroLine: "European grocery and deli on Providence Road.",
  carryTitle: "What we carry",
  countriesLabel: "From home",
  visitTitle: "Visit",
  deliOrder: "Order ahead from the deli — call before you come and we will have your order ready at the counter.",
  builderTitle: "Build a party platter",
};

export const HERO_PHOTO = "/photos/real-edited/storefront-2-crop.jpg";
export const HERO_PHOTO_ALT = "Taste of Europe storefront on Providence Road";

export const VISIT_PHOTO = HERO_PHOTO;