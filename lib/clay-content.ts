import { resolvePhoto } from "@/lib/photos";

export const CLAY_HEADLINE = "A European market, right off Providence Road.";

// Answers "what is this place?" for the neighbor driving past, in one line.
export const CLAY_SUBHEAD = "Deli, sweets and pantry staples from Ukraine, Poland, Georgia and across Eastern Europe.";

export const COUNTER_HERO = {
  src: "/photos/real/sweets-display.jpg",
  alt: "European sweets and chocolates on display tables inside the store",
};

export const INSIDE = {
  eyebrow: "What's inside",
  title: "Walk in hungry, leave with a full bag.",
};

export type InsideTile = {
  name: string;
  line: string;
  image: string;
  alt: string;
};

export const INSIDE_TILES: InsideTile[] = [
  {
    name: "Deli counter",
    line: "Kielbasa sliced while you wait, cheese cut to order.",
    image: resolvePhoto("/photos/real/deli-case-3.jpg"),
    alt: "Deli case filled with smoked sausages, salami and cured meats",
  },
  {
    name: "Sweets by the pound",
    line: "Wrapped candies you scoop yourself, plus chocolate bars and boxes.",
    image: resolvePhoto("/photos/real/candy-baskets-1.jpg"),
    alt: "Wicker baskets of individually wrapped European candies",
  },
  {
    name: "Pantry & preserves",
    line: "Pickles, jarred vegetables, honey and spreads from home.",
    image: "/photos/real/jars-preserves.jpg",
    alt: "Shelves of jarred pickles, preserves and honey",
  },
  {
    name: "Wine & drinks",
    line: "Wine, Eastern European beer and sodas the chain stores don't stock.",
    image: resolvePhoto("/photos/real/wine-barrels.jpg"),
    alt: "Wine bottles displayed on wooden barrels",
  },
];

export const SEASON_COPY = {
  title: "Holiday sweets are in.",
  line: "Gingerbread, boxed chocolates and gift boxes we only stack this time of year.",
  highlights: ["Christmas Eve, Dec 24 · 10–3", "Closed Dec 25", "Orthodox Christmas Eve, Jan 6 · 10–3"],
  cta: "See all holiday hours",
};

export const SEASON_PHOTOS = [
  { src: "/photos/real/gingerbread.jpg", alt: "Packaged gingerbread and holiday cookies stacked on a display", caption: "Gingerbread" },
  { src: "/photos/real/chocolates-basket.jpg", alt: "A basket piled with boxed European chocolates", caption: "Boxed chocolates" },
  { src: "/photos/real-edited/sweets-table-crop.jpg", alt: "Gift boxes and sweets arranged on a display table", caption: "Gift boxes" },
] as const;

// Brands visible on the shelves in the store's own photos.
export const BRANDS = ["Milka", "Krakus", "Noyan", "Borjomi", "Toruńskie", "Roshen", "Bounty"] as const;

// TODO(owner): confirm which languages staff actually speak before this goes live.
export const LANGUAGES_LINE = "Ask us in Ukrainian, Russian or Polish.";

export const FROM_HOME = {
  eyebrow: "From home",
  title: "Find the food you miss.",
  rows: [
    { native: "Україна", english: "Ukraine", lang: "uk", items: "chocolates, sunflower halva" },
    { native: "Polska", english: "Poland", lang: "pl", items: "pierogi, wafer bars" },
    { native: "საქართველო", english: "Georgia", lang: "ka", items: "Borjomi, churchkhela" },
    { native: "Lietuva", english: "Lithuania", lang: "lt", items: "dark rye bread, farmer's cheese" },
    { native: "България", english: "Bulgaria", lang: "bg", items: "white cheese, lyutenitsa" },
    { native: "Moldova", english: "Moldova", lang: "ro", items: "wine, preserves" },
  ],
} as const;

export const FAQ = [
  {
    q: "Can I call ahead from the deli?",
    a: "{{CONFIRM_DELI_ORDER_AHEAD}}",
    placeholder: true,
  },
  {
    q: "Do you take special requests?",
    a: "{{CONFIRM_SPECIAL_REQUESTS}}",
    placeholder: true,
  },
  {
    q: "Where do I park?",
    a: "Right out front — look for the red Taste of Europe parking signs.",
    placeholder: false,
  },
] as const;