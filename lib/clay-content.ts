import { resolvePhoto } from "@/lib/photos";

// "|" marks the line breaks used by the hero's line-by-line entrance.
export const CLAY_HEADLINE = "A European market,|right off|Providence Road.";

// Answers "what is this place?" for the neighbor driving past, in one line.
export const CLAY_SUBHEAD = "Deli, sweets and pantry staples from Ukraine, Poland, Georgia and across Eastern Europe.";

export const COUNTER_HERO = {
  src: resolvePhoto("/photos/real/sweets-display.jpg"),
  alt: "European sweets and chocolates on display tables inside the store",
};

// Hero sequence: slow crossfade through the shop. First frame is the LCP image.
export const HERO_FRAMES = [
  { src: resolvePhoto("/photos/real/sweets-display.jpg"), alt: "European sweets and chocolates on display tables inside the store", pos: "50% 55%" },
  { src: resolvePhoto("/photos/real/cheese-case.jpg"), alt: "Wedges of European cheese in the deli case", pos: "45% 50%" },
  { src: resolvePhoto("/photos/real/sweets-boxes.jpg"), alt: "Boxed chocolates and wafers stacked on a wooden display", pos: "40% 60%" },
  { src: resolvePhoto("/photos/real/interior-3.jpg"), alt: "The shop floor with display tables and wine barrels", pos: "50% 60%" },
] as const;

export const INSIDE = {
  title: "Inside the shop",
  intro: "Four counters under one roof. Choose one to look closer.",
};

export type InsideTile = {
  name: string;
  line: string;
  image: string;
  alt: string;
  pos?: string;
};

export const INSIDE_TILES: InsideTile[] = [
  {
    name: "Deli counter",
    line: "Kielbasa sliced while you wait, cheese cut to order.",
    image: resolvePhoto("/photos/real/deli-case-3.jpg"),
    alt: "Deli case filled with smoked sausages, salami and cured meats",
    pos: "50% 38%",
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
    image: resolvePhoto("/photos/real/jars-preserves.jpg"),
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
  dates: [
    { day: "Dec 24", note: "Christmas Eve", hours: "10 AM – 3 PM" },
    { day: "Dec 25", note: "Christmas Day", hours: "Closed" },
    { day: "Jan 6", note: "Orthodox Christmas Eve", hours: "10 AM – 3 PM" },
  ],
  cta: "Holiday gifts and hours",
};

export const SEASON_PHOTOS = [
  { src: resolvePhoto("/photos/real/gingerbread.jpg"), alt: "Packaged gingerbread and holiday cookies stacked on a display", caption: "Gingerbread" },
  { src: resolvePhoto("/photos/real/chocolates-basket.jpg"), alt: "A wicker basket of Toruńskie Pierniki gingerbread packs", caption: "Toruń gingerbread" },
  { src: resolvePhoto("/photos/real/sweets-table.jpg", "/photos/real-edited/sweets-table-crop.jpg"), alt: "Gift boxes and sweets arranged on a display table", caption: "Gift boxes" },
] as const;

export const FROM_HOME = {
  lead: "On our shelves, from",
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
    a: "Yes. Call us with what you'd like sliced and how much, and we'll have it wrapped and waiting at the counter when you arrive.",
    placeholder: false,
  },
  {
    q: "Do you take special requests?",
    a: "We do. If there's something from home you can't find on our shelves, ask at the register. We'll check with our suppliers and let you know if we can bring it in.",
    placeholder: false,
  },
  {
    q: "Where do I park?",
    a: "Right out front — look for the red Taste of Europe parking signs.",
    placeholder: false,
  },
] as const;