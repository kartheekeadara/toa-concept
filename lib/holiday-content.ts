// Copy for /holidays. Everything describes what's visible in the store's own photos.

export const GIFTS_HERO = {
  title: "Holiday gifts from across Europe",
  line: "Boxed chocolates, Toruń gingerbread and sweets by the pound, the same ones people grew up with.",
  image: "/photos/real/sweets-boxes.jpg",
  alt: "Boxes of Ptasie Mleczko, Śliwka Nałęczowska and wafers stacked on a wooden display table",
};

export type Gift = { name: string; line: string; image: string; alt: string; shape: "wide" | "tall" };

export const GIFTS: Gift[] = [
  {
    name: "Toruń gingerbread",
    line: "Soft, spiced and chocolate-coated. A Polish Christmas classic.",
    image: "/photos/real/chocolates-basket.jpg",
    alt: "A wicker basket of Toruńskie Pierniki gingerbread packs",
    shape: "wide",
  },
  {
    name: "Boxed chocolates",
    line: "Wedel and other boxes that are ready to give as they are.",
    image: "/photos/real/chocolates-2.jpg",
    alt: "Stacked boxes of Wedel chocolates on a display",
    shape: "tall",
  },
  {
    name: "Cookies and wafers",
    line: "Gift-sized boxes for the host, the office or the neighbors.",
    image: "/photos/real/cookie-boxes.jpg",
    alt: "Boxed cookies and wafers stacked on a wooden shelf",
    shape: "tall",
  },
  {
    name: "Sweets by the pound",
    line: "Mix wrapped candies into a bag for stockings and the holiday table.",
    image: "/photos/real/candy-baskets-1.jpg",
    alt: "A tiered stand of wicker baskets filled with wrapped candies",
    shape: "tall",
  },
  {
    name: "Wine for the table",
    line: "Bottles from Georgia, Moldova and beyond to bring to dinner.",
    image: "/photos/real/wine-display.jpg",
    alt: "Wine bottles on wooden racks beside barrels under a Wine sign",
    shape: "tall",
  },
];

export const TWO_CHRISTMASES = {
  title: "Two Christmases, one shop",
  line: "Many of our customers celebrate on December 25 and again on January 7, Orthodox Christmas. These are our hours across both.",
};

export const ORDER_AHEAD = {
  title: "Buying for a crowd?",
  line: "For the office, a big family table or a box of gifts, call before you come and we'll check what's on the shelf.",
};
