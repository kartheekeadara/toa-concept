const EDITED_BY_BASE: Record<string, string> = {
  "deli-case-3": "/photos/real/deli-case-3.jpg",
  "interior-wide-1": "/photos/real/interior-wide-1.jpg",
  "candy-baskets-1": "/photos/real/candy-baskets-1.jpg",
  "wine-barrels": "/photos/real/wine-barrels.jpg",
};

function baseName(path: string): string {
  const file = path.split("/").pop() ?? path;
  return file.replace(/\.[^.]+$/, "");
}

export function resolvePhoto(original: string): string {
  const base = baseName(original);
  return EDITED_BY_BASE[base] ?? original;
}