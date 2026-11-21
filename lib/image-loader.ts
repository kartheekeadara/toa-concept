/**
 * next/image loader for static hosting (GitHub Pages). There is no image optimizer on a static
 * host, so this serves the file as-is and only adds the base path (e.g. /toa-concept).
 */
export default function staticLoader({ src, width }: { src: string; width: number; quality?: number }) {
  const base = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
  const url = src.startsWith("/") ? `${base}${src}` : src;
  // width as a query keeps srcset entries distinct; static hosts ignore it.
  return `${url}?w=${width}`;
}
