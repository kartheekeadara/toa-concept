// Token contrast (Quiet White + Clay concepts).
//   node scripts/contrast.mjs
import { execFileSync } from "node:child_process";

const py = `
def lin(c):
    c/=255; return c/12.92 if c<=0.03928 else ((c+0.055)/1.055)**2.4
def L(rgb):
    r,g,b=rgb; return 0.2126*lin(r)+0.7152*lin(g)+0.0722*lin(b)
def ratio(fg,bg):
    l1,l2=L(fg),L(bg); return (max(l1,l2)+0.05)/(min(l1,l2)+0.05)
def h(s): return tuple(int(s[i:i+2],16) for i in (1,3,5))
pairs=[
  ("Ink on white", h("#141414"), h("#FFFFFF"), False),
  ("Ink-muted on white", h("#6B6B6B"), h("#FFFFFF"), False),
  ("White on brand-red-deep (button)", h("#FFFFFF"), h("#C8161D"), False),
  ("Clay ink on paper", h("#1C1917"), h("#FAF7F2"), False),
  ("Clay muted on paper", h("#6B645C"), h("#FAF7F2"), False),
  ("Clay paper on dark (pill btn)", h("#FAF7F2"), h("#141210"), False),
  ("Clay paper on dark gradient", h("#FAF7F2"), h("#141210"), True),
]
for name,fg,bg,large in pairs:
    r=ratio(fg,bg); need=3.0 if large else 4.5
    print(f"{name:<42} {r:4.2f}  AA {need}  {'PASS' if r>=need else 'FAIL'}")
`;
console.log(execFileSync("python3", ["-c", py]).toString());