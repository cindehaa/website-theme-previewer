/* ── Colour engine — pure HSL-based palette generation ────────── */

import type { ColorTokens } from './types'

/* ── helpers ──────────────────────────────────────────────────── */

function hexToHsl(hex: string): [number, number, number] {
  const r = parseInt(hex.slice(1, 3), 16) / 255
  const g = parseInt(hex.slice(3, 5), 16) / 255
  const b = parseInt(hex.slice(5, 7), 16) / 255

  const max = Math.max(r, g, b)
  const min = Math.min(r, g, b)
  const l = (max + min) / 2
  let h = 0
  let s = 0

  if (max !== min) {
    const d = max - min
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min)
    switch (max) {
      case r: h = ((g - b) / d + (g < b ? 6 : 0)) / 6; break
      case g: h = ((b - r) / d + 2) / 6; break
      case b: h = ((r - g) / d + 4) / 6; break
    }
  }

  return [Math.round(h * 360), Math.round(s * 100), Math.round(l * 100)]
}

function hslToHex(h: number, s: number, l: number): string {
  const sn = s / 100
  const ln = l / 100
  const a = sn * Math.min(ln, 1 - ln)
  const f = (n: number) => {
    const k = (n + h / 30) % 12
    const color = ln - a * Math.max(Math.min(k - 3, 9 - k, 1), -1)
    return Math.round(255 * color).toString(16).padStart(2, '0')
  }
  return `#${f(0)}${f(8)}${f(4)}`
}

function clamp(v: number, min: number, max: number) {
  return Math.max(min, Math.min(max, v))
}

/* ── dark palette from a seed colour ─────────────────────────── */

export function seedToPalette(hex: string): ColorTokens {
  const [h, s, l] = hexToHsl(hex)

  // Accent = the seed colour, normalised to decent saturation & lightness
  const accentS = clamp(s, 50, 90)
  const accentL = clamp(l, 45, 60)
  const accent = hslToHex(h, accentS, accentL)
  const accentLight = hslToHex(h, clamp(s, 40, 75), clamp(accentL + 15, 60, 80))

  return {
    bg: hslToHex(h, clamp(s * 0.15, 3, 12), 5),
    text: hslToHex(h, 5, 88),
    textMuted: hslToHex(h, 8, 50),
    accent,
    accentLight,
    surface: `hsla(${h}, ${clamp(s, 10, 30)}%, 50%, 0.05)`,
    surfaceHover: `hsla(${h}, ${clamp(s, 10, 30)}%, 50%, 0.09)`,
    border: `hsla(${h}, ${clamp(s, 10, 30)}%, 50%, 0.1)`,
    success: hslToHex(142, 70, 55),
    warning: hslToHex(48, 95, 55),
    error: hslToHex(0, 84, 60),
  }
}

/* ── derive light mode from a dark palette ───────────────────── */

export function deriveLightMode(dark: ColorTokens): ColorTokens {
  const flipHex = (hex: string): string => {
    // For hsla values (surface/border), just flip them
    if (hex.startsWith('hsla')) return hex

    const [h, s, l] = hexToHsl(hex)
    // Invert lightness around 50%, with some adjustments
    const newL = clamp(100 - l, 10, 95)
    return hslToHex(h, s, newL)
  }

  const [h, s] = hexToHsl(dark.accent)

  return {
    bg: hslToHex(h, clamp(s * 0.1, 2, 8), 97),
    text: hslToHex(h, 8, 12),
    textMuted: hslToHex(h, 6, 45),
    accent: hslToHex(h, clamp(s, 50, 85), clamp(hexToHsl(dark.accent)[2] - 10, 35, 50)),
    accentLight: hslToHex(h, clamp(s, 40, 70), clamp(hexToHsl(dark.accentLight)[2] - 20, 40, 60)),
    surface: `hsla(${h}, ${clamp(s, 5, 20)}%, 50%, 0.05)`,
    surfaceHover: `hsla(${h}, ${clamp(s, 5, 20)}%, 50%, 0.09)`,
    border: `hsla(${h}, ${clamp(s, 5, 20)}%, 50%, 0.12)`,
    success: hslToHex(142, 60, 38),
    warning: hslToHex(38, 90, 42),
    error: hslToHex(0, 75, 45),
  }
}
