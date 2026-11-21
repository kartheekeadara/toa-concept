# Taste of Europe Gourmet Foods: concept homepage notes

Private pitch mockup. Not a live site. 11926 Providence Rd W, Charlotte, NC 28277.

## Part 0: Mobbin research

Mobbin collection: **Taste of Europe concept** (private):
https://mobbin.com/collections/3e09f26f-701b-495a-b366-99917a307f26

Searched: bakery/cafe app home screens (iOS), restaurant/bakery hero sections,
location and hours sections, food/grocery category cards. About 40 results
reviewed. Note: Mobbin's website *sections* are captured at desktop width, so
mobile patterns came mostly from iOS app screens (Blank Street, Honest Greens,
CHOPT) and were translated to the web.

### The 3 best

**1. Savor (website): editorial food brand**
- [Hero](https://mobbin.com/sites/sections/586e08bf-f06e-4acf-a87a-ecbd3d249833) ·
  [Video hero](https://mobbin.com/sites/sections/9578c9fe-7f5c-4d32-b868-786881a90d32)
- Hero: very large, tight high-contrast serif headline on cream, with a short
  sans line and one quiet button beside it. Confident, not busy.
- Photography: close, warm, textural crops (butter, pastry, chocolate) set at
  staggered heights, so the page feels like a cookbook spread.
- Typography: serif display + small clean sans body; dark brown text instead of black.
- Products: shown as ingredients and moments, not packshots on white.
- Why it works: food is the hero; the UI barely exists.

**2. Little Amps Coffee (website): hours and location done right**
- [Location panel](https://mobbin.com/sites/sections/74a3a0da-d93a-419b-a675-1a641b46a4eb)
- Hours/location: name, address, hours in a monospaced/small-caps block, a
  short warm paragraph, then two small buttons ("Go to map", "Download menu").
  Photo of the actual shop beside it.
- Why it works: everything a visitor needs is in one scannable block, and it still feels human.

**3. Monte (website): warm cafe with a clear contact/hours footer**
- [Contact · Hours · Find us](https://mobbin.com/sites/sections/6ecba422-fe26-482b-8225-8e24ec959d84) ·
  [Photo stack](https://mobbin.com/sites/sections/664a16ca-816d-495d-b577-e08ce5c6f1a5)
- Palette: cream + one saturated earthy accent, with type used in a single colour.
- Hours/location: three short labelled columns (Contact / Opening hours / Find us)
  that stack cleanly on mobile.
- Photography: rounded-corner photos with a thin accent outline.
- Why it works: the restraint of one accent colour makes it feel like a real place, not a template.

### Also useful
- [Blank Street (iOS)](https://mobbin.com/screens/f7ed2e47-f3e1-4bdd-b7ac-1ae1add04caf):
  mobile hero as a big rounded photo card with headline over the photo and one
  full-width pill CTA. Good thumb-friendly pattern.
- [Honest Greens (iOS)](https://mobbin.com/screens/10e7e101-4f80-4694-acda-cd72def9ae36):
  full-bleed close-up food photo with bold headline top-left; CTA at the bottom of the screen.
- [Faire food & drink cards](https://mobbin.com/sites/sections/9842bc7f-62e4-4d69-8cb3-07bbd149a335):
  square photo cards with a bold name and a one-line descriptor underneath.

### Patterns to borrow
- Huge serif headline, short sans support line (Savor).
- Full-bleed, close, warm food photography as the hero; text over a soft dark gradient (Honest Greens).
- Thumb-reachable, full-width pill buttons on mobile (Blank Street).
- Category cards: photo first, name in serif, one-line descriptor (Faire).
- Visit block: label/value pairs (Address, Hours, Phone) + small action
  buttons + map (Little Amps, Monte).
- One accent colour used sparingly; dark brown/ink text instead of pure black (Monte, Savor).

### Patterns to avoid
- App chrome: bottom tab bars, search bars, carts, loyalty badges (Panera, Walmart, Instacart). This is a brochure site, not an ordering app.
- Packshot grids on white or icon tiles (Instacart, Target). They read as a supermarket, not a deli.
- Promo pricing, "60% off", calorie counts, ratings (Swiggy, Panera). We can't state prices or reviews, and it cheapens the feel.
- Loud saturated full-page colour floods (re_, CAVA). Too startup-y for an old-world deli.
- Carousels and auto-advancing sliders: hidden content and fiddly on phones.
- Illustrated mascots (Monte). Charming, but it's their identity, not ours.

## Design direction v1 (approved 2026-11-20, superseded by concept-v2 below)
- Calm old-world deli shown like a cookbook spread; no app chrome, prices or ratings.
- Type: Cormorant Garamond (display) + Inter (body). Text in warm brown `#2B1F17`.
- Palette: cream `#F6F0E4`, olive green accent `#2F4A36`, burgundy `#6E2430` for small details only, stone `#B9A992`.
- Motion: slow hero zoom + fade-in on scroll; both disabled under `prefers-reduced-motion`.
- Deliberately avoids the Cassaro brand style.

## concept-v2 (branch `concept-v2`, 2026-11-20)
- **Colour:** one accent, sampled from `logo.png` (`python3 -I scripts/logo-colors.py`).
  `brand-red` `#EC1D24` (logo red) and `brand-ink` `#3A3A3A` (logo charcoal), with cream `#F6F0E4` kept as the background.
  White on `#EC1D24` is only 4.40:1, which fails AA for body text, so any red area that carries text uses `brand-red-deep` `#C8161D`
  (white 5.85:1, and 5.16:1 as small red text on cream). The large category names use the logo red (3:1 is enough at that size).
  `brand-red-tint` `#FBE9E6` is the holiday panel. The olive, burgundy and brown tokens are gone.
- **Order:** nav → ticker → hero → holidays → order ahead (or platter builder) → categories → taste of home → visit → footer.
- **Not rendered any more** (files kept): Just arrived (`data/arrivals.json`), Instagram grid, deli counter, map embed.
- **Ticker:** `announcements` in `data/store.json`. It pauses on hover, on keyboard focus and with its pause button, and it's static under reduced motion.
  It isn't rendered at all when no line is filled in (presentation mode).
- **Holiday hours:** `holidayHours` in `data/store.json`. Rows that are still placeholders are hidden in presentation mode.
- **Platter builder:** `SHOW_BUILDER` in `app/content.ts` (false). When it's false, "Order ahead from the deli" shows instead.
  Fill in `BOARD` before you turn it on, because placeholder options render as empty cards in presentation mode.
- **Presentation mode:** placeholder headlines collapse. Taste of home is hidden until one country is filled in.
  The Instagram button, the Visit Call button and the hours, phone and email rows are hidden until filled in.
- **Hero contrast** (`node scripts/contrast.mjs`, worst pixel / 5th percentile): H1 at 390px is 3.80 / 7.58 and at 1440px is 3.50 / 5.07 (AA large is 3.0).
  The tagline and eyebrow are ≥ 5.3 everywhere.
- Lighthouse accessibility (mobile) scores 100 in both modes.
- The Unsplash files in `public/photos/*.jpg` (stollen, panettone and so on) are unused. v2 only uses `public/photos/real/`.

## concept-v2, round 2 (2026-11-20)
- **Data filled in** (mockup data from Kartheek, not confirmed by the store): hours, holiday hours (including Jan 6, Orthodox Christmas Eve),
  phone (704) 555-0147, email, Instagram, three ticker lines, all headlines, and countries with two items each.
  No placeholder chips render in either mode. `BOARD` (platter builder, off) still has placeholders.
- **Red is an accent only.** Visit is now brand-ink with cream text; the holiday panel is cream-deep; category names are ink and turn red on hover.
  Red text on charcoal uses `brand-red-light` `#FF8A85` (5.00:1). The `brand-red-tint` token is gone.
- **Order:** nav → ticker → hero → holidays (#holidays) → order ahead (#deli) → categories → inside the store (#inside) → countries → visit (#visit) → footer.
- **Photos:** storefront-4 replaces storefront-1, which had a drawn circle and a person in the doorway.
  candy-baskets-4 replaces candy-baskets-2, where a staff member's face is visible.
  interior-wide-1 shows two people from behind, with no faces visible. It's kept because it was requested.
- **Hero:** one bottom-left brand-ink gradient (95% → 85% → 55% → clear), bottom-up on phones, plus a soft text shadow.
  Worst pixel under the H1 is 3.46 at 390px and 3.05 at 1440px (AA large is 3.0). The tagline is ≥ 6.7.
- The footer line "Concept mockup. Not the official website." now shows in both modes, because the contact details are mockup data.
- Lighthouse accessibility (mobile) scores 100 in both modes.

## concept-v2, round 3 (2026-11-21): redesign from Mobbin research
- **Removed:** the scrolling announcement bar (component, CSS and the `announcements` data), the hero eyebrow, and the "The deli counter" label.
- **Type:** Fraunces (via `next/font`, SOFT 50) replaces Cormorant Garamond. Inter stays for body text.
- **Nav** (after Monte): sticky. Links on the left, logo in the centre, and on the right a live "Open today · until 7:00 PM" plus Call.
  On mobile it's the logo, a short status and a Menu button that opens a full-screen sheet (portalled to `<body>`, Esc closes it, focus stays inside).
- **Hero** (after Savor and Little Amps): type on cream with four staggered real photos, and no overlay. On phones the photos become a swipeable strip.
- **Holidays:** sticky headline, plus a Christmas / Orthodox Christmas hours table from `holidayHours` and Call ahead.
  The three photos are staggered (two up, one wide).
- **What's inside:** an aisle guide built as vertical tabs (hover, focus, click or arrow keys) with one big photo. On phones it's a swipeable card row.
- **Inside the store:** a photo stack with prev/next buttons and no autoplay (after Monte). The "Open seven days a week" line comes from the hours data.
- **Shop by country:** a charcoal menu board with dotted leaders.
- **Visit and footer** are merged (after Monte's footer): address and storefront photo, then Hours | Holiday hours | Contact, then a large wordmark and the disclaimer.
- **Photos:** deli-case-3 replaces deli-case-2, which has a child at the counter.
- `scripts/contrast.mjs` measured cream text over the old photo hero. The hero no longer has text over a photo, so it doesn't apply any more.
- Lighthouse accessibility scores 100 on mobile (both modes) and desktop.

## Photos (Part 1, v1 only)
All from Unsplash, free under the [Unsplash License](https://unsplash.com/license)
(free for commercial use, no attribution required, credit given anyway).
Files live in `public/photos/`, named by section so the store's real photos can be dropped in with the same names.

| File | Used in | Source | Photographer |
|---|---|---|---|
| `hero.jpg` | Hero | https://unsplash.com/photos/VT9uj4FbQSE | David B Townsend |
| `cheese.jpg` | What's inside: Cheeses | https://unsplash.com/photos/hD6OvoKMYgM | Caroline Ross |
| `meats.jpg` | What's inside: Cured Meats | https://unsplash.com/photos/FHNJO45Qx_k | Ana Maltez |
| `pastries.jpg` | What's inside: Pastries & Breads | https://unsplash.com/photos/sqkXyyj4WdE | Conor Brown |
| `pantry.jpg` | What's inside: Pantry | https://unsplash.com/photos/NrqKwJ1KPo8 | Artem Kostelnyuk |
| `deli-prepared.jpg` | What's inside: Deli & Prepared Foods | https://unsplash.com/photos/NZPhD2B_M4I | Jojo V |
| `deli-counter.jpg` | The deli counter | https://unsplash.com/photos/M1ww_Evl45w | Nick Karvounis |
| `catering.jpg` | Board builder summary card | https://unsplash.com/photos/MWIGVmMZmVU | Neil Marshall |
| `holiday-stollen.jpg` | Holidays: Stollen | https://unsplash.com/photos/JEU-BWyS1ug | Gary Lee |
| `holiday-panettone.jpg` | Holidays: Panettone | https://unsplash.com/photos/bLuZPpCqVdg | Lee Milo |
| `holiday-advent.jpg` | Holidays: Advent calendars | https://unsplash.com/photos/e9vrm-J192k | David-Olivier Gascon |
| `holiday-chocolates.jpg` | Holidays: Imported chocolates | https://unsplash.com/photos/DPNrBT1WCMs | Igor Lifar |
| `holiday-gift-box.jpg` | Holidays: Gift boxes | https://unsplash.com/photos/QFHN8XN923I | Katya Azimova |
| `arrival-1.jpg` | Just arrived #1 (oil) | https://unsplash.com/photos/uOBApnN_K7w | Roberta Sorge |
| `arrival-2.jpg` | Just arrived #2 (pasta) | https://unsplash.com/photos/FNrmJM-EVKU | Patrick Tomasso |
| `arrival-3.jpg` | Just arrived #3 (preserves) | https://unsplash.com/photos/JpcP8aJ5kHo | Rob Wicks |
| `arrival-4.jpg` | Just arrived #4 (chocolate) | https://unsplash.com/photos/r-hQw_obFd0 | Pushpak Dsilva |
| `instagram-1.jpg` | Instagram grid | https://unsplash.com/photos/nDg84ayrA90 | Dana Ward |
| `instagram-2.jpg` | Instagram grid | https://unsplash.com/photos/z3em1GBRhvY | Nathan Dumlao |
| `instagram-3.jpg` | Instagram grid | https://unsplash.com/photos/AQ_og51xGlE | Jennifer Pallian |
| `instagram-4.jpg` | Instagram grid | https://unsplash.com/photos/SHSSaB4BLgc | Darío Méndez |
| `instagram-5.jpg` | Instagram grid | https://unsplash.com/photos/rwK9YtNqHCY | Elio Santos |
| `instagram-6.jpg` | Instagram grid | https://unsplash.com/photos/DHYfjAe_eeo | Jessica Loaiza |

Notes:
- `deli-counter.jpg` is cropped to remove a different deli's sign ("Deli del Toro"). It's a market
  stall in Europe, not this store. One staff member is visible small in the background (not the
  subject). Top priority to replace with a real photo of their counter.
- No photo shows a person as the main subject.

## Two modes
| | Review mode (default) | Presentation mode |
|---|---|---|
| Start | `npm run dev` (port 3100) | `npm run present` (`PRESENTATION=true`, port 3101) |
| `{{PLACEHOLDER}}` chips | Shown | Hidden |
| "Concept mockup" footer label, "· Concept" in the tab title | Shown | Hidden |
| Board builder serves / price / estimate, "Example options only" note | Shown | Hidden (sizes are just Small / Medium / Large) |
| "Just arrived" section | Shown | Removed |
| Hours, phone, Instagram | From `data/store.json`, chip if empty | From `data/store.json`, row hidden if empty |

The flag is read in `lib/flags.ts` (inlined into client code via `next.config.ts`). The two servers use
separate build folders (`.next` / `.next-present`), so both can run at once. The page stays `noindex` in both modes.

## data/store.json (fill this in)
`phone`, `email`, `instagram` (handle, e.g. `@name`), `instagramUrl`, and `hours` (24h `"HH:MM"`, `null` for a closed day).
Leave a value as `""` until it's confirmed. Once filled in:
- **Phone:** shows in Visit us. Every "Call" button becomes a `tel:` link, and "Send by text" goes to that number.
  While it's empty, Call buttons scroll to Visit us.
- **Hours:** Visit us lists them grouped (e.g. "Mon–Fri 9:00 AM – 7:00 PM"), and the mobile bar shows
  "Open now · until 7:00 PM" / "Closed · opens tomorrow 9:00 AM" in Charlotte time, updating every minute.
  Until all 7 days are filled in, the bar shows "Open now · until `{{CLOSE_TIME}}`" in review mode and
  the store name + "Providence Rd W" in presentation mode, so it never states unconfirmed hours.
- **Instagram:** footer button reads "Follow @handle" and links to `instagramUrl`.

**Fill in phone and hours before presenting.** Otherwise Visit us shows only the address, and "Call us" just scrolls there.

## Placeholders (unknown facts, confirm with the store)
| Placeholder | Where | Notes |
|---|---|---|
| `{{HOURS}}`, `{{CLOSE_TIME}}` | Visit us; mobile sticky bar | `hours` in `data/store.json`. |
| `{{PHONE}}` | Visit us; Call buttons; "Send by text" | `phone` in `data/store.json`. |
| `{{EMAIL}}` | Board builder "Send by email" | `email` in `data/store.json`. |
| `{{INSTAGRAM}}` | Footer "Follow us on Instagram" | `instagram` + `instagramUrl` in `data/store.json`. |
| `{{CONFIRM_CATERING}}` | Whole board builder section | Remove the section if they don't offer trays/catering. |
| `{{CONFIRM_BOARD_OPTIONS}}` | Board builder cheese/meat/extra lists | Generic examples (`BOARD` in `app/content.ts`). Replace with the counter's real options. |
| `{{SERVES}}`, `{{PRICE}}` | Board builder sizes + estimate (review mode only) | No prices anywhere. |
| `{{CONFIRM_HOLIDAY_ITEMS}}` | Holidays section | Item names came from the brief. Confirm what they stock this season. |
| `{{CONFIRM_COUNTRIES}}` | Find a taste of home | 8 placeholder countries (`COUNTRIES` in `app/content.ts`). |
| `{{ARRIVAL_1_NAME}}` … `{{ARRIVAL_4_NAME}}`, `{{ORIGIN}}` | Just arrived (review mode only) | Edit `data/arrivals.json`. |

In presentation mode the `CONFIRM_*` items are still unconfirmed. They're just not labelled on screen.

Facts used without placeholders (from the brief): store name, address, and product range
(imported cheeses, meats, pastries, breads, chocolates, oils, pastas, deli counter with prepared foods).
No prices, reviews, awards, years in business or hours are stated anywhere.

## Page structure
Hero → Holidays → Build your board → What's inside → (Just arrived, review mode only) → Find a taste of home → Visit us → Footer.
The deli counter section and the Instagram grid were removed. Instagram is now a button in the footer.
`deli-counter.jpg` and `instagram-*.jpg` are still in `public/photos` but unused.

## Hero contrast
The hero has a bottom-up dark scrim on every screen, plus a left-side scrim on desktop. Text is full-opacity cream.
The primary button is solid cream; the secondary is a 2px cream outline over a darkened backing.
`node scripts/contrast.mjs` hides the text, samples the real photo + gradient behind each line, and reports WCAG contrast.
Last run, 5th-percentile pixel, against the AA minimum:

| | 390px | 1440px | AA minimum |
|---|---|---|---|
| Eyebrow | 11.7 | 11.7 | 4.5 |
| H1 | 7.5 | 11.6 | 3.0 (large text) |
| Tagline | 11.5 | 13.6 | 4.5 |
| Call us button text | 13.9 | 14.1 | 4.5 |

## How the dynamic bits work
- **Hours:** logic in `lib/hours.ts` (`getOpenStatus`, `formatWeek`). Tested against open, closed-until-tomorrow,
  closed-Sunday and before-opening cases.
- **Just arrived:** edit `data/arrivals.json`. The first 4 items show (review mode only).
- **Board builder:** "Send request" opens "Send by text" (`sms:`) and "Send by email" (`mailto:`), both prefilled
  with size, picks and blank Name / Pickup date lines. When the options open, they scroll into view with a bottom
  margin, so they land above the mobile sticky bar.

## Mobile sticky bar check
`scripts/shoot.mjs` picks a board at 390px, taps "Send request", then measures every board-builder button against the bar.
Last run: the bar is 69px tall, and the page bottom padding is 84px, so nothing at the end of the page is ever covered.
All four buttons (Call to order, Send request, Send by text, Send by email) end at y ≤ 704; the bar starts at y = 775.
See `screenshots/sticky-vs-board-390.png`.

## Copy
All marketing copy is COPY-DRAFT and lives in `app/content.ts` (each string commented `// COPY-DRAFT`).
Open the review server with `?review` (e.g. `http://localhost:3100/?review`) to outline every draft line on screen.

## Running it
```
npm run dev       # review mode:       next dev -H 0.0.0.0 -p 3100
npm run present   # presentation mode: PRESENTATION=true, port 3101
```
Phone on the same Wi-Fi: `http://<your-mac-LAN-IP>:3101` (run `ipconfig getifaddr en0` to get it).

## Screenshots
`node scripts/shoot.mjs` shoots presentation mode (port 3101). `node scripts/shoot.mjs http://localhost:3100/ review`
shoots review mode, adding a `-review` suffix to the file names. Outputs: `home-390.png`, `home-1440.png` (full page, sticky bar hidden
so it isn't drawn mid-page), `mobile-first-screen.png`, `board-builder-390.png` and `sticky-vs-board-390.png`.
Headless Chrome can't draw Google Maps tiles, so the map is an empty box in the full-page shots.
`screenshots/visit-map-browser.jpg` shows the map in a real browser.

## Open questions for the store
- Google lists the address as **11926 Providence Rd W, Suite E2**. Confirm and add the suite number if it's right.
- The map embed uses the bare address on purpose. With the business name, Google's card
  shows their star rating, and this page states no reviews.
