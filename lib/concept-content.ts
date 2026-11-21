/** Copy and assets for Clay-style concept pages only (review routes /concepts/*). */

export const CLAY_HEADLINE = "A European market, right off Providence Road.";

export const CLAY_STATEMENT =
  "Cheese cut to order at the counter. Kielbasa sliced while you wait. Candy by the pound, jars from home, and a wine wall you can browse before you check out. Walk in hungry — leave with a full bag.";

export const REEL_PANELS = [
  {
    src: "/photos/concept/cheese.jpg",
    label: "Cheese",
    backdrop: "#E8DFD0",
  },
  {
    src: "/photos/concept/kielbasa.jpg",
    label: "Deli",
    backdrop: "#D9D4C8",
  },
  {
    src: "/photos/concept/candy.jpg",
    label: "Sweets",
    backdrop: "#E5D9CE",
  },
  {
    src: "/photos/concept/preserves.jpg",
    label: "Pantry",
    backdrop: "#DDD6C9",
  },
] as const;

export const TABLE_IMAGES = [
  { src: "/photos/concept/cheese.jpg", alt: "Cheese block on warm studio backdrop", size: "lg" as const },
  { src: "/photos/concept/kielbasa.jpg", alt: "Kielbasa on warm studio backdrop", size: "md" as const },
  { src: "/photos/concept/candy.jpg", alt: "Wrapped candy on warm studio backdrop", size: "sm" as const },
];

export const COUNTER_HERO = {
  src: "/photos/concept/deli-counter.jpg",
  alt: "European deli counter with cheese and sausage, warm directional light",
};