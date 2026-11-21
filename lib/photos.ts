/**
 * Retouched copies of the store's own photos live in public/photos/real-edited/<name>.jpg.
 * A photo only switches to its edit once its name is on this list (reviewed against the
 * original: same products, labels intact, nothing invented). Remove a name to roll back.
 * See docs/photo-retouch-prompts.md for what was done to each.
 */
const APPROVED_EDITS = new Set([
  "sweets-display",
  "sweets-boxes",
  "interior-3",
  "deli-case-3",
  "candy-baskets-1",
  "jars-preserves",
  "gingerbread",
  "chocolates-basket",
  "sweets-table",
  "wine-display",
  // Held for a redo: cheese-case, wine-barrels, chocolates-2, cookie-boxes, storefront-2
]);

function baseName(path: string): string {
  const file = path.split("/").pop() ?? path;
  return file.replace(/\.[^.]+$/, "");
}

/** The approved edit if there is one, else `fallback` (or the original). */
export function resolvePhoto(original: string, fallback?: string): string {
  const base = baseName(original);
  return APPROVED_EDITS.has(base) ? `/photos/real-edited/${base}.jpg` : (fallback ?? original);
}
