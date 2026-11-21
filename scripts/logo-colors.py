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
