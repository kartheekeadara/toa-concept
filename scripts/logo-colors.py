# Samples the dominant red and charcoal from the logo. Run: python3 -I scripts/logo-colors.py
from PIL import Image
from statistics import median
im = Image.open("public/photos/real/logo.png").convert("RGBA")
px = list(im.get_flattened_data() if hasattr(im, "get_flattened_data") else im.getdata())
red = [p for p in px if p[3] > 240 and p[0] > 190 and p[1] < 70 and p[2] < 80]
ink = [p for p in px if p[3] > 240 and max(p[:3]) < 90 and max(p[:3]) - min(p[:3]) < 12]
hexc = lambda ps: "#%02X%02X%02X" % tuple(round(median(p[i] for p in ps)) for i in range(3))
print("brand-red", hexc(red), len(red), "px")
print("brand-ink", hexc(ink), len(ink), "px")
green = [p for p in px if p[3] > 240 and p[1] > 90 and p[1] > p[0] + 15 and p[1] > p[2] + 10 and max(p[:3]) < 200]
yellow = [p for p in px if p[3] > 240 and p[0] > 140 and p[1] > 130 and p[2] < 100 and abs(p[0] - p[1]) < 50]
if green:
    print("brand-green", hexc(green), len(green), "px")
if yellow:
    print("brand-yellow", hexc(yellow), len(yellow), "px")
store = Image.open("public/photos/real/storefront-3.jpg").convert("RGB")
spx = list(store.getdata())
sg = [p for p in spx if p[1] > p[0] and p[1] > p[2] and 70 < p[1] < 180]
if sg:
    print("storefront-green", hexc(sg), len(sg), "px")
