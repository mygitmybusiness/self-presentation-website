// utils/shadow.ts

type Glow = { offset: number; blur: number; alpha: number };

const clamp = (v: number, min = 0, max = 1) => Math.max(min, Math.min(max, v));

function hexToRgb(hex: string) {
  const h = hex.replace(/^#/, "");
  const full = h.length === 3 ? h.split("").map(c => c + c).join("") : h;
  const num = parseInt(full, 16);
  return { r: (num >> 16) & 255, g: (num >> 8) & 255, b: num & 255 };
}

function rgbToHex(r: number, g: number, b: number) {
  const toHex = (n: number) => n.toString(16).padStart(2, "0");
  return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
}

function rgbToHsl(r: number, g: number, b: number) {
  r /= 255; g /= 255; b /= 255;
  const max = Math.max(r, g, b), min = Math.min(r, g, b);
  let h = 0, s = 0, l = (max + min) / 2;
  const d = max - min;
  if (d !== 0) {
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r: h = (g - b) / d + (g < b ? 6 : 0); break;
      case g: h = (b - r) / d + 2; break;
      case b: h = (r - g) / d + 4; break;
    }
    h /= 6;
  }
  return { h, s, l };
}

function hslToRgb(h: number, s: number, l: number) {
  const hue2rgb = (p: number, q: number, t: number) => {
    if (t < 0) t += 1;
    if (t > 1) t -= 1;
    if (t < 1/6) return p + (q - p) * 6 * t;
    if (t < 1/2) return q;
    if (t < 2/3) return p + (q - p) * (2/3 - t) * 6;
    return p;
  };
  let r: number, g: number, b: number;
  if (s === 0) {
    r = g = b = l; // grayscale
  } else {
    const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
    const p = 2 * l - q;
    r = hue2rgb(p, q, h + 1/3);
    g = hue2rgb(p, q, h);
    b = hue2rgb(p, q, h - 1/3);
  }
  return { r: Math.round(r * 255), g: Math.round(g * 255), b: Math.round(b * 255) };
}

/** Darkens base hex color by `percent` (0..1) using HSL Lightness */
function darkenHex(hex: string, percent: number) {
  const { r, g, b } = hexToRgb(hex);
  const { h, s, l } = rgbToHsl(r, g, b);
  const l2 = clamp(l * (1 - percent));
  const rgb = hslToRgb(h, s, l2);
  return rgbToHex(rgb.r, rgb.g, rgb.b);
}

type MakeShadowOpts = {
  steps?: number;               // number of “solid” offset layers (without glows)
  startOffset?: number;         // initial px offset
  stepOffset?: number;          // px increment per step
  darkenPerStep?: number;       // how much to darken per step (0..1)
  direction?: [number, number]; // direction vector. (-1, 1) = left + down
  glows?: Glow[];               // extra soft glow layers
  includeGlows?: boolean;       // whether to include glow layers
  noBlur?: boolean;             // if true — all blur = 0
  asTextShadow?: boolean;       // if true — generate text-shadow syntax
};

/**
 * Returns a box-shadow or text-shadow stack string.
 * Produces stepped layers that darken progressively using the base color.
 */
export function makeShadowStack(baseHex: string, opts: MakeShadowOpts = {}) {
  const {
    steps = 8,
    startOffset = 1,
    stepOffset = 1,
    darkenPerStep = 0.06,
    direction = [-1, 1],
    glows = [
      { offset: 2,  blur: 5,  alpha: 0.05 },
      { offset: 3,  blur: 3,  alpha: 0.20 },
      { offset: 9,  blur: 9,  alpha: 0.30 },
      { offset: 12, blur: 12, alpha: 0.30 },
      { offset: 15, blur: 15, alpha: 0.30 },
    ],
    includeGlows = true,
    noBlur = false,
    asTextShadow = false,
  } = opts;

  const parts: string[] = [];

  // Hard stepped shadows with 0 blur that get darker each step
  for (let i = 0; i < steps; i++) {
    const off = startOffset + i * stepOffset;
    const x = direction[0] * off;
    const y = direction[1] * off;
    const shade = darkenHex(baseHex, darkenPerStep * (i + 1));
    const piece = asTextShadow
      ? `${x}px ${y}px 0 ${shade}`
      : `${x}px ${y}px 0 ${shade}`;
    parts.push(piece);
  }

  // Soft glow layers (can be disabled or forced to no-blur)
  if (includeGlows) {
    const { r, g, b } = hexToRgb(baseHex);
    glows.forEach(gw => {
      const x = direction[0] * gw.offset;
      const y = direction[1] * gw.offset;
      const rgba = `rgba(${r}, ${g}, ${b}, ${gw.alpha})`;
      const blur = noBlur ? 0 : gw.blur;
      const piece = asTextShadow
        ? `${x}px ${y}px ${blur}px ${rgba}`
        : `${x}px ${y}px ${blur}px ${rgba}`;
      parts.push(piece);
    });
  }

  return parts.join(", ");
}
