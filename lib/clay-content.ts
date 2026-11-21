import { resolvePhoto } from "@/lib/photos";

export const CLAY_HEADLINE = "A European market, right off Providence Road.";

export const CLAY_STATEMENT =
  "Cheese cut to order at the counter. Kielbasa sliced while you wait. Candy by the pound, jars from home, and a wine wall you can browse before you check out. Walk in hungry — leave with a full bag.";

export const COUNTER_HERO = {
  src: "/photos/real/sweets-display.jpg",
  alt: "European sweets and chocolates on display tables inside the store",
};

export type CounterPanel = {
  name: string;
  line: string;
  image: string;
  backdrop: string;
};

export const COUNTERS: CounterPanel[] = [
  {
    name: "Deli counter",
    line: "We slice kielbasa while you wait and cut cheese to order.",
    image: resolvePhoto("/photos/real/deli-case-3.jpg"),
    backdrop: "#D4C9BC",
  },
  {
    name: "Sweets by the pound",
    line: "Wrapped candies, chocolate bars and boxed sweets you scoop yourself.",
    image: resolvePhoto("/photos/real/candy-baskets-1.jpg"),
    backdrop: "#E5D9CE",
  },
  {
    name: "Pantry & preserves",
    line: "Pickles, jarred vegetables, honey and spreads from home.",
    image: "/photos/real/jars-preserves.jpg",
    backdrop: "#DDD6C9",
  },
  {
    name: "Wine & drinks",
    line: "Bottles for dinner, beer from Eastern Europe and sodas you will not see at the chain store.",
    image: resolvePhoto("/photos/real/wine-barrels.jpg"),
    backdrop: "#C9BFB4",
  },
];

export const SEASON_COPY = {
  title: "The season",
  line: "Gingerbread, boxed chocolates and a few things we only stack this time of year.",
  highlights: ["Dec 24 · 10–3", "Jan 6, Orthodox Christmas Eve · 10–3"],
  cta: "See all holiday hours",
};

export const SEASON_PHOTOS = [
  { src: "/photos/real/gingerbread.jpg", alt: "Gingerbread and holiday sweets on display" },
  { src: "/photos/real/chocolates-basket.jpg", alt: "Basket of boxed chocolates" },
  { src: "/photos/real-edited/sweets-table-crop.jpg", alt: "Gift boxes and sweets on a display table" },
] as const;

export const FROM_HOME = {
  eyebrow: "From home",
  title: "Find the food you miss.",
  line: "For people who miss it, and for neighbors curious about what's in the jar.",
  image: resolvePhoto("/photos/real/pantry-aisle.jpg"),
  imageAlt: "An aisle of jars and packaged goods inside the store",
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
    a: "{{CONFIRM_PARKING}}",
    placeholder: true,
  },
] as const;