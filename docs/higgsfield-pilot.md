# Higgsfield pilot: cleaning up the store's real photos

**Goal:** make the store's own phone photos look sharp and tidy enough for the pitch, without inventing anything.
Every output is a retouched copy of a real photo. Nothing is generated from scratch.

**Time:** about half a day. **Cost:** one month of a paid plan. The free tier doesn't allow commercial use.
Pricing sources disagree ($15–$129/month), so check higgsfield.ai/pricing first. The Starter tier should cover this pilot.

---

## 1. Ground rules

1. **Remove and repair only.** Allowed: upscaling, sharpening, white balance, straightening, and erasing price tags, stray signs, glare and people.
   Not allowed: adding products, changing what's on a shelf, or generating new scenes or people.
2. **Originals stay untouched.** Download from `public/photos/real/` and save edits to a new folder, `public/photos/real-edited/`, using the **same filename**.
   Never write into `public/photos/real/` or `public/photos/real/originals/`.
3. **Check every label.** AI upscalers often garble small text, especially Cyrillic, which is all over these packages.
   Reject any edit where a brand name or label reads wrong.
4. **The owner signs off** before an edited photo is shown as their store. Until then, edited photos appear only in review mode.
5. **Keep a log.** Add a row to the edit log (section 5) for every file.

---

## 2. The photos (in priority order)

The first five are on the page now and have a real problem. The last three are fixes that would make good photos usable again.

| # | File | Where it's used | Problem | Edit |
|---|---|---|---|---|
| 1 | `candy-baskets-3.jpg` | Holidays ("Sweets by the pound") | **"BULK CANDY $9.75 lb" sign** at the top, which breaks the no-prices rule | Erase the sign and the small price tags on the baskets. Upscale 2× |
| 2 | `storefront-4.jpg` | Footer | A **"NOW OPEN 980-207-…" sign** in the window shows a different phone number from the one on the site. The "PARKING ONLY" sign clutters the door | Erase both signs. Straighten the building's verticals. Upscale 2× |
| 3 | `candy-baskets-4.jpg` | Hero | Pink and red **price tags** on every basket | Erase the tags. Upscale 2× |
| 4 | `sweets-display.jpg` | Hero (largest tile), mosaic | Soft focus, cool cast, a **"CLEARANCE" sign** at the top | Erase the sign. Warm the white balance slightly. Upscale 2× and sharpen |
| 5 | `deli-case-3.jpg` | Hero | Blue light-strip **glare** across the glass, and soft focus | Reduce the glare (don't remove the food behind it). Upscale 2× |
| 6 | `candy-baskets-2.jpg` | Not used (a staff member's face is visible) | Person in the background | Erase the person and the "BULK CANDY $9.75 lb" sign. If clean, it can go back in the mosaic |
| 7 | `interior-wide-1.jpg` | Inside the store, footer (earlier) | Two shoppers at the counter, seen from behind | Erase both people. Upscale 2× |
| 8 | `beet-salad.jpg` | Not used (price label) | **"$12.75 /Lb"** shelf label | Erase the price label only. Keep the "Beet Salad" tub labels. Could illustrate Smoked Fish & Salads |

For each file: run the cleanup first and the upscale last, so the upscaler doesn't sharpen the patched areas into smears.

---

## 3. Steps in Higgsfield

1. Buy a paid plan (needed for commercial use). Open **Layers** (inpainting) and **Upscale** (Topaz).
2. For each photo in the table:
   1. Upload the original from `public/photos/real/`.
   2. **Layers → Remove Object:** brush over the sign, tag or person. Brush tightly, don't re-render the whole image, and use more than one small pass if needed.
   3. Zoom to 200% and check: the basket weave, shelf edges and packaging text should look continuous and readable.
   4. **Upscale:** 2× with Topaz and low sharpening. Turn grain and noise reduction down so the food doesn't look plastic.
   5. Export JPG at quality 85–90, with the long edge at or under 3000px.
   6. Save to `public/photos/real-edited/<same-name>.jpg` and add a row to the edit log.
3. **Optional: two short loops**, only once the stills are approved:
   - `candy-baskets-1.jpg`: a slow 5-second push-in, with no new objects and no motion in the candy.
   - `wine-barrels.jpg`: a slow 5-second sideways drift.
   - Use image-to-video with a camera-only prompt, for example "slow dolly-in, camera motion only, nothing in the scene moves, no people".
     Reject anything where labels warp or objects appear.
   - Export MP4 (H.264, under 3 MB, no audio) and a WebM. Each loop needs a still poster image, and the site shows the still under reduced motion.

---

## 4. How we'll judge it

Before anything goes on the page, Kartheek reviews each edit against its original. An edit passes only if:

- [ ] No price, phone number or person is visible anywhere.
- [ ] Every brand name and label is still readable and correct. Compare against the original at 200%.
- [ ] No new or changed products. The shelf has the same items in the same places.
- [ ] It looks like a better photo of the same store, not a render. Food texture, wood grain and the marble floor look natural.
- [ ] It's sharp on a phone at 2× density. Check the hero tiles on a real phone.

**The pilot is worth continuing if** at least 4 of the first 5 edits pass, and the owner is happy to see them as their store.
**Otherwise:** keep the originals, and plan a 30-minute phone photo session at the store instead (morning light, wipe the glass, take tags off for the shot).

---

## 5. Edit log

Fill in one row per exported file. Keep it in this document.

| File | Date | Operations | Credits | Passed review? | Owner approved? |
|---|---|---|---|---|---|
| | | | | | |

---

## 6. Site changes once edits exist (I'll do these)

- **Photo resolver:** a single helper in `app/content.ts`. If `public/photos/real-edited/<name>.jpg` exists and the photo is marked approved, the page uses it. Otherwise it falls back to the original. One `approved` list makes rollback instant.
- **Review mode only at first:** edited photos show on port 3100 (review). Presentation (3101) keeps the originals until the owner approves.
- **Before/after page** for the pitch: a `/compare` route with a drag slider for each edited photo, reachable only in review mode.
  The pitch becomes "here's your store's photos, cleaned up", which is a selling point on its own.
- **Loops (if approved):** `<video autoplay muted loop playsinline poster=…>`, paused and replaced by the poster under `prefers-reduced-motion`, with a visible pause control.
- **Notes:** `NOTES.md` gets a section listing which photos are edited and what was changed, so nobody mistakes them for untouched photos.
- **Rule change:** the photo rule becomes "photos only from `public/photos/real/`, or retouched copies of them in `public/photos/real-edited/`, never anything generated from scratch".
