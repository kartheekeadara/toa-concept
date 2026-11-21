// Screenshots for a concept hero page (390 + 1440 full page).
//   node scripts/shoot-concept.mjs http://localhost:3100/concepts/a concept-a
import puppeteer from "puppeteer-core";
import { execFileSync } from "node:child_process";
import { mkdtempSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";

const url = process.argv[2];
const slug = process.argv[3];
if (!url || !slug) {
  console.error("Usage: node scripts/shoot-concept.mjs <url> <slug>");
  process.exit(1);
}
const out = (n) => `screenshots/${slug}-${n}.png`;

const browser = await puppeteer.launch({
  executablePath: "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
  headless: "new",
});
const wait = (ms) => new Promise((r) => setTimeout(r, ms));

async function assertOk(page) {
  const err = await page.$("[data-nextjs-error]");
  const title = await page.title();
  if (err || /Application error|Server Error/i.test(title)) {
    throw new Error(`Page failed at ${url} (title: ${title})`);
  }
  const h1 = await page.$("h1");
  if (!h1) throw new Error(`Missing h1 at ${url}`);
}

async function open(w, h, mobile) {
  const page = await browser.newPage();
  await page.setViewport({ width: w, height: h, deviceScaleFactor: 2, isMobile: mobile, hasTouch: mobile });
  const res = await page.goto(url, { waitUntil: "networkidle0", timeout: 90000 });
  const ok = res && (res.status() === 200 || res.status() === 304);
  if (!ok) throw new Error(`${url} returned ${res?.status() ?? "no response"}`);
  await assertOk(page);
  const total = await page.evaluate(() => document.body.scrollHeight);
  for (let y = 0; y < total; y += h / 2) {
    await page.evaluate((y) => window.scrollTo(0, y), y);
    await wait(250);
  }
  await wait(1500);
  await page.evaluate(() => window.scrollTo(0, 0));
  await wait(400);
  return page;
}

async function fullPage(page, w, dest) {
  const total = await page.evaluate(() => document.documentElement.scrollHeight);
  const dir = mkdtempSync(join(tmpdir(), "shoot-concept-"));
  const parts = [];
  for (let y = 0, i = 0; y < total; y += 3000, i++) {
    const p = join(dir, `${i}.png`);
    await page.screenshot({
      path: p,
      clip: { x: 0, y, width: w, height: Math.min(3000, total - y) },
      captureBeyondViewport: true,
    });
    parts.push(p);
  }
  const py = `import sys\nfrom PIL import Image\nims=[Image.open(p) for p in sys.argv[2:]]\nW=ims[0].width;H=sum(i.height for i in ims)\no=Image.new('RGB',(W,H))\ny=0\nfor i in ims:\n  o.paste(i,(0,y));y+=i.height\no.save(sys.argv[1])\n`;
  writeFileSync(join(dir, "stitch.py"), py);
  execFileSync("python3", ["-I", join(dir, "stitch.py"), dest, ...parts]);
  console.log("saved", dest);
}

let p = await open(390, 844, true);
await fullPage(p, 390, out("390"));
await p.close();

p = await open(1440, 900, false);
await fullPage(p, 1440, out("1440"));
await browser.close();