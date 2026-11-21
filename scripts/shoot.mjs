// Full-page screenshots at 390px and 1440px. Run with a dev server up:
//   node scripts/shoot.mjs                              presentation mode (npm run present, port 3101)
//   node scripts/shoot.mjs http://localhost:3100/ review   review mode, files get a -review suffix
// Captures in 3000px slices and stitches them (Chrome can't capture very tall pages in one go at 2x).
// Writes:
//   screenshots/home-390.png, home-1440.png   full page (mobile sticky bar hidden so it doesn't repeat)
//   screenshots/mobile-first-screen.png        first screen on a phone, with the sticky bar
import puppeteer from "puppeteer-core";
import { execFileSync } from "node:child_process";
import { mkdtempSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";

const url = process.argv[2] || "http://localhost:3101/";
const sfx = process.argv[3] ? `-${process.argv[3]}` : "";
const out = (n) => `screenshots/${n}${sfx}.png`;
const browser = await puppeteer.launch({
  executablePath: "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
  headless: "new",
});
const wait = (ms) => new Promise((r) => setTimeout(r, ms));

async function open(w, h, mobile) {
  const page = await browser.newPage();
  await page.setViewport({ width: w, height: h, deviceScaleFactor: 2, isMobile: mobile, hasTouch: mobile });
  await page.setUserAgent((await browser.userAgent()).replace("HeadlessChrome", "Chrome"));
  await page.goto(url, { waitUntil: "networkidle0", timeout: 60000 });
  const total = await page.evaluate(() => document.body.scrollHeight);
  for (let y = 0; y < total; y += h / 2) {
    await page.evaluate((y) => window.scrollTo(0, y), y);
    await wait(200);
  }
  await wait(1200);
  await page.evaluate(() => window.scrollTo(0, 0));
  await wait(300);
  return page;
}

async function fullPage(page, w, out) {
  await page.addStyleTag({ content: '[aria-label="Quick actions"]{display:none!important}' });
  const total = await page.evaluate(() => document.documentElement.scrollHeight);
  const dir = mkdtempSync(join(tmpdir(), "shoot-"));
  const parts = [];
  for (let y = 0, i = 0; y < total; y += 3000, i++) {
    const p = join(dir, `${i}.png`);
    await page.screenshot({ path: p, clip: { x: 0, y, width: w, height: Math.min(3000, total - y) }, captureBeyondViewport: true });
    parts.push(p);
  }
  const py = `import sys\nfrom PIL import Image\nims=[Image.open(p) for p in sys.argv[2:]]\nW=ims[0].width;H=sum(i.height for i in ims)\no=Image.new('RGB',(W,H))\ny=0\nfor i in ims:\n  o.paste(i,(0,y));y+=i.height\no.save(sys.argv[1])\n`;
  writeFileSync(join(dir, "stitch.py"), py);
  execFileSync("python3", ["-I", join(dir, "stitch.py"), out, ...parts]);
  console.log("saved", out);
}

// first screen on a phone, with the sticky bar
let p = await open(390, 844, true);
await p.screenshot({ path: out("mobile-first-screen") });
console.log("saved", out("mobile-first-screen"));
await p.close();

p = await open(390, 844, true);
await fullPage(p, 390, out("home-390"));
await p.close();

p = await open(1440, 900, false);
await fullPage(p, 1440, out("home-1440"));
await browser.close();
