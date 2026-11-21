#!/usr/bin/env node
/**
 * Requests every photo path used on the site (and common Next Image widths).
 * Fails on non-200 responses or timeouts — use against a running server:
 *   BASE_URL=http://localhost:3101 node scripts/check-images.mjs
 */
import fs from "node:fs";
import path from "node:path";

const ROOT = path.resolve(import.meta.dirname, "..");
const BASE = (process.env.BASE_URL || "http://localhost:3100").replace(/\/$/, "");
const TIMEOUT_MS = Number(process.env.IMAGE_CHECK_TIMEOUT || 25000);
const WIDTHS = [384, 640, 828, 1080, 1200, 1920];

function walk(dir, acc = []) {
  for (const name of fs.readdirSync(dir)) {
    const p = path.join(dir, name);
    const st = fs.statSync(p);
    if (st.isDirectory()) walk(p, acc);
    else if (/\.(jpe?g|png|webp|gif|avif)$/i.test(name)) acc.push(p);
  }
  return acc;
}

function photoPaths() {
  const pub = path.join(ROOT, "public");
  return walk(pub).map((p) => "/" + path.relative(pub, p).split(path.sep).join("/"));
}

async function headOk(url) {
  const ctrl = new AbortController();
  const t = setTimeout(() => ctrl.abort(), TIMEOUT_MS);
  try {
    const res = await fetch(url, { signal: ctrl.signal });
    return res.ok ? res.status : res.status;
  } catch {
    return 0;
  } finally {
    clearTimeout(t);
  }
}

const ROUTES = ["/", "/directions"];
const routeFailures = [];
for (const route of ROUTES) {
  const status = await headOk(`${BASE}${route}`);
  if (status !== 200) routeFailures.push({ url: `${BASE}${route}`, status });
}
if (routeFailures.length) {
  console.error("Route check failed:");
  for (const f of routeFailures) console.error(`  [${f.status}] ${f.url}`);
  process.exit(1);
}

const staticPaths = photoPaths();
const failures = [];

for (const src of staticPaths) {
  const direct = await headOk(`${BASE}${src}`);
  if (direct !== 200) failures.push({ url: `${BASE}${src}`, status: direct, kind: "static" });
  for (const w of WIDTHS) {
    const q = new URLSearchParams({ url: src, w: String(w), q: "75" });
    const opt = await headOk(`${BASE}/_next/image?${q}`);
    if (opt !== 200) failures.push({ url: `${BASE}/_next/image?${q}`, status: opt, kind: "optimizer" });
  }
}

if (failures.length) {
  console.error(`Image check failed (${failures.length}):`);
  for (const f of failures.slice(0, 40)) console.error(`  [${f.status}] ${f.kind}: ${f.url}`);
  if (failures.length > 40) console.error(`  …and ${failures.length - 40} more`);
  process.exit(1);
}
console.log(`OK: ${staticPaths.length} files × (${WIDTHS.length} widths + direct) on ${BASE}`);