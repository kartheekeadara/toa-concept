// Measures real WCAG contrast of the hero text against the photo + gradient behind it.
// Hides the text, screenshots each text box, and finds the brightest background pixels under it.
//   node scripts/contrast.mjs [url]
import puppeteer from "puppeteer-core";
import { execFileSync } from "node:child_process";
import { mkdtempSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";

const url = process.argv[2] || "http://localhost:3101/";
const browser = await puppeteer.launch({ executablePath: "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome", headless: "new" });
const dir = mkdtempSync(join(tmpdir(), "contrast-"));
const py = `
import sys, json
from PIL import Image
def lin(c):
    c/=255; return c/12.92 if c<=0.03928 else ((c+0.055)/1.055)**2.4
def L(r,g,b): return 0.2126*lin(r)+0.7152*lin(g)+0.0722*lin(b)
fg=(0xF6,0xF0,0xE4)
for spec in json.loads(sys.argv[1]):
    im=Image.open(spec['file']).convert('RGB'); a=spec['alpha']
    vals=[]
    for (r,g,b) in im.get_flattened_data() if hasattr(im,"get_flattened_data") else im.getdata():
        t=tuple(a*f+(1-a)*x for f,x in zip(fg,(r,g,b)))  # text colour blended over this pixel
        l1,l2=L(*t),L(r,g,b); vals.append((max(l1,l2)+0.05)/(min(l1,l2)+0.05))
    vals.sort()
    need=3.0 if spec['large'] else 4.5
    print(f"{spec['name']:<28} worst pixel {vals[0]:5.2f}  5th pct {vals[len(vals)//20]:5.2f}  median {vals[len(vals)//2]:5.2f}  (AA needs {need})  {'PASS' if vals[len(vals)//20]>=need else 'FAIL'}")
`;
writeFileSync(join(dir, "c.py"), py);
for (const [w, h, mobile] of [[390, 844, true], [1440, 900, false]]) {
  const page = await browser.newPage();
  await page.setViewport({ width: w, height: h, deviceScaleFactor: 1, isMobile: mobile, hasTouch: mobile });
  await page.goto(url, { waitUntil: "networkidle0" });
  await page.addStyleTag({ content: "*{animation:none!important;transition:none!important} .fade-in{opacity:1!important;transform:none!important}" });
  await new Promise((r) => setTimeout(r, 500));
  const boxes = await page.evaluate(() => {
    const hero = document.querySelector("main section"); // hero is the first section in <main>
    const pick = (el, name, alpha, large) => { const r = el.getBoundingClientRect(); return { name, alpha, large, x: r.x, y: r.y, w: r.width, h: r.height }; };
    const h1 = hero.querySelectorAll("h1 span");
    const ps = hero.querySelectorAll("p");
    const btn = [...hero.querySelectorAll("a")].find((a) => a.textContent.includes("holiday hours"));
    return [pick(ps[0], "eyebrow", 1, false), pick(h1[0], "h1 name", 1, true), pick(h1[1], "h1 suffix (italic)", 1, true), pick(ps[1], "tagline", 1, false), { ...pick(btn, "See holiday hours button (inside border)", 1, false), inset: 6 }];
  });
  await page.addStyleTag({ content: "main section:first-of-type *{color:transparent!important} main section:first-of-type svg{visibility:hidden}" });
  const specs = [];
  for (const b of boxes) {
    const file = join(dir, `${w}-${specs.length}.png`);
    await page.screenshot({ path: file, clip: { x: b.x + (b.inset || 0), y: b.y + (b.inset || 0), width: b.w - 2 * (b.inset || 0), height: b.h - 2 * (b.inset || 0) } });
    specs.push({ ...b, file });
  }
  console.log(`\n${w}px`);
  console.log(execFileSync("python3", ["-I", join(dir, "c.py"), JSON.stringify(specs)]).toString());
  await page.close();
}
await browser.close();
