import { resolvePhoto } from "@/lib/photos";

export const CLAY_HEADLINE = "A European market, right off Providence Road.";

export const CLAY_STATEMENT =
  "Cheese cut to order at the counter. Kielbasa sliced while you wait. Candy by the pound, jars from home, and a wine wall you can browse before you check out. Walk in hungry — leave with a full bag.";

export const COUNTER_HERO = {
  src: "/photos/concept/deli-counter.jpg",
  alt: "European deli counter with cheese and sausage, warm directional light",
  concept: true,
};

export type CounterPanel = {
  name: string;
  line: string;
  image: string;
  backdrop: string;
  concept?: boolean;
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
    image: "/photos/concept/candy.jpg",
    backdrop: "#E5D9CE",
    concept: true,
  },
  {
    name: "Pantry & preserves",
    line: "Pickles, jarred vegetables, honey and spreads from home.",
    image: "/photos/concept/preserves.jpg",
    backdrop: "#DDD6C9",
    concept: true,
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
  cta: "Holiday hours",
};

export const FROM_HOME = {
  eyebrow: "From home",
  title: "The food you grew up with, a short drive away.",
  line: "For people who miss it, and for neighbours curious about what’s in the jar.",
  image: resolvePhoto("/photos/real/pantry-aisle.jpg"),
  imageAlt: "An aisle of jars and packaged goods inside the store",
  rows: [
    { native: "Україна", english: "Ukraine", lang: "uk" },
    { native: "Polska", english: "Poland", lang: "pl" },
    { native: "საქართველო", english: "Georgia", lang: "ka" },
    { native: "Lietuva", english: "Lithuania", lang: "lt" },
    { native: "България", english: "Bulgaria", lang: "bg" },
    { native: "Moldova", english: "Moldova", lang: "ro" },
  ],
} as const;

export const SHOP_COPY = {
  line1: "Green storefront on Providence Road — you will see the red sign before you pull in.",
  line2: "Walk the aisles, talk to the counter, leave with bags you did not plan on filling.",
};

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

export const FOOTER_CLOSER = "Come by.";