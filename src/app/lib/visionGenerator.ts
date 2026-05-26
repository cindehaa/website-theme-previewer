/* ── Generate custom presets from vision text ────────────────── */

import type { Preset } from './presets'
import type { Density, BorderRadius, Shadow, HeadingStyle, ComponentStyle } from './types'

/* ── keyword → attribute maps ────────────────────────────────── */

interface Trait {
  hue: number        // 0-360
  saturation: number // 0-100
  lightness: number  // 30-70 (accent lightness)
  density: Density
  fontPairIndex: number
  nameFragment: string
  borderRadius: BorderRadius
  shadow: Shadow
  headingStyle: HeadingStyle
  componentStyle?: ComponentStyle
}

const COLOUR_WORDS: Record<string, { hue: number; sat: number }> = {
  red: { hue: 0, sat: 75 }, crimson: { hue: 348, sat: 80 }, scarlet: { hue: 5, sat: 80 },
  orange: { hue: 25, sat: 85 }, amber: { hue: 38, sat: 90 }, gold: { hue: 45, sat: 85 },
  yellow: { hue: 50, sat: 90 }, lime: { hue: 80, sat: 75 }, chartreuse: { hue: 75, sat: 70 },
  green: { hue: 140, sat: 65 }, emerald: { hue: 155, sat: 70 }, jade: { hue: 160, sat: 55 },
  teal: { hue: 175, sat: 60 }, cyan: { hue: 185, sat: 75 }, aqua: { hue: 190, sat: 70 },
  blue: { hue: 220, sat: 70 }, sky: { hue: 200, sat: 75 }, navy: { hue: 230, sat: 60 },
  indigo: { hue: 245, sat: 65 }, violet: { hue: 270, sat: 65 }, purple: { hue: 280, sat: 65 },
  magenta: { hue: 300, sat: 70 }, pink: { hue: 330, sat: 65 }, rose: { hue: 340, sat: 70 },
  coral: { hue: 16, sat: 75 }, peach: { hue: 28, sat: 60 }, salmon: { hue: 10, sat: 65 },
  lavender: { hue: 260, sat: 50 }, mint: { hue: 155, sat: 50 }, sage: { hue: 135, sat: 30 },
  burgundy: { hue: 345, sat: 55 }, maroon: { hue: 0, sat: 50 }, rust: { hue: 18, sat: 65 },
  terracotta: { hue: 15, sat: 55 }, clay: { hue: 20, sat: 45 }, sand: { hue: 35, sat: 40 },
  cream: { hue: 40, sat: 25 }, ivory: { hue: 48, sat: 20 }, beige: { hue: 36, sat: 30 },
  slate: { hue: 210, sat: 15 }, charcoal: { hue: 0, sat: 5 }, silver: { hue: 0, sat: 5 },
}

const MOOD_TRAITS: Record<string, Partial<Trait>> = {
  // warm
  warm:          { hue: 25,  saturation: 70, fontPairIndex: 13, borderRadius: 'rounded', shadow: 'subtle',  headingStyle: 'regular', nameFragment: 'Warm' },
  cozy:          { hue: 30,  saturation: 60, density: 'comfortable', fontPairIndex: 13, borderRadius: 'rounded', shadow: 'subtle',  headingStyle: 'regular', nameFragment: 'Cozy' },
  inviting:      { hue: 28,  saturation: 65, density: 'comfortable', fontPairIndex: 8,  borderRadius: 'rounded', shadow: 'subtle',  headingStyle: 'regular', nameFragment: 'Inviting' },
  friendly:      { hue: 35,  saturation: 60, density: 'comfortable', fontPairIndex: 5,  borderRadius: 'pill',    shadow: 'subtle',  headingStyle: 'regular', nameFragment: 'Friendly' },
  homey:         { hue: 30,  saturation: 50, density: 'comfortable', fontPairIndex: 13, borderRadius: 'rounded', shadow: 'subtle',  headingStyle: 'regular', nameFragment: 'Homey' },
  rustic:        { hue: 22,  saturation: 50, density: 'comfortable', fontPairIndex: 13, borderRadius: 'soft',    shadow: 'subtle',  headingStyle: 'regular', nameFragment: 'Rustic' },
  // cool
  cool:          { hue: 200, saturation: 60, fontPairIndex: 4,  borderRadius: 'rounded', shadow: 'none',    headingStyle: 'thin',    nameFragment: 'Cool' },
  calm:          { hue: 195, saturation: 50, density: 'airy',        fontPairIndex: 16, borderRadius: 'rounded', shadow: 'none',    headingStyle: 'thin',    nameFragment: 'Calm' },
  serene:        { hue: 190, saturation: 45, density: 'airy',        fontPairIndex: 6,  borderRadius: 'rounded', shadow: 'none',    headingStyle: 'thin',    nameFragment: 'Serene' },
  tranquil:      { hue: 185, saturation: 45, density: 'airy',        fontPairIndex: 10, borderRadius: 'rounded', shadow: 'none',    headingStyle: 'thin',    nameFragment: 'Tranquil' },
  peaceful:      { hue: 175, saturation: 40, density: 'airy',        fontPairIndex: 10, borderRadius: 'rounded', shadow: 'none',    headingStyle: 'thin',    nameFragment: 'Peaceful' },
  // professional
  professional:  { hue: 215, saturation: 50, density: 'comfortable', fontPairIndex: 12, borderRadius: 'soft',    shadow: 'subtle',  headingStyle: 'bold',    nameFragment: 'Professional' },
  corporate:     { hue: 220, saturation: 55, density: 'comfortable', fontPairIndex: 0,  borderRadius: 'soft',    shadow: 'subtle',  headingStyle: 'bold',    nameFragment: 'Corporate' },
  business:      { hue: 215, saturation: 50, density: 'comfortable', fontPairIndex: 12, borderRadius: 'soft',    shadow: 'subtle',  headingStyle: 'bold',    nameFragment: 'Business' },
  formal:        { hue: 225, saturation: 40, density: 'compact',     fontPairIndex: 3,  borderRadius: 'soft',    shadow: 'subtle',  headingStyle: 'bold',    nameFragment: 'Formal' },
  elegant:       { hue: 260, saturation: 35, density: 'comfortable', fontPairIndex: 17, borderRadius: 'rounded', shadow: 'subtle',  headingStyle: 'thin',    nameFragment: 'Elegant' },
  sophisticated: { hue: 250, saturation: 30, density: 'comfortable', fontPairIndex: 17, borderRadius: 'rounded', shadow: 'subtle',  headingStyle: 'thin',    nameFragment: 'Sophisticated' },
  // playful
  playful:       { hue: 320, saturation: 75, density: 'comfortable', fontPairIndex: 5,  borderRadius: 'pill',    shadow: 'subtle',  headingStyle: 'regular', nameFragment: 'Playful' },
  fun:           { hue: 340, saturation: 80, density: 'comfortable', fontPairIndex: 5,  borderRadius: 'pill',    shadow: 'subtle',  headingStyle: 'regular', nameFragment: 'Fun' },
  vibrant:       { hue: 15,  saturation: 85, density: 'comfortable', fontPairIndex: 14, borderRadius: 'soft',    shadow: 'colored', headingStyle: 'black',   nameFragment: 'Vibrant' },
  energetic:     { hue: 10,  saturation: 80, density: 'compact',     fontPairIndex: 14, borderRadius: 'soft',    shadow: 'colored', headingStyle: 'black',   nameFragment: 'Energetic' },
  bold:          { hue: 0,   saturation: 80, density: 'compact',     fontPairIndex: 14, borderRadius: 'soft',    shadow: 'colored', headingStyle: 'black',   nameFragment: 'Bold' },
  lively:        { hue: 45,  saturation: 80, density: 'comfortable', fontPairIndex: 5,  borderRadius: 'pill',    shadow: 'subtle',  headingStyle: 'bold',    nameFragment: 'Lively' },
  cute:          { hue: 320, saturation: 65, density: 'comfortable', fontPairIndex: 5,  borderRadius: 'pill',    shadow: 'subtle',  headingStyle: 'regular', nameFragment: 'Cute' },
  // minimal
  minimal:       { hue: 0,   saturation: 5,  density: 'airy',        fontPairIndex: 9,  borderRadius: 'soft',    shadow: 'none',    headingStyle: 'thin',    componentStyle: 'minimal',   nameFragment: 'Minimal' },
  clean:         { hue: 210, saturation: 10, density: 'airy',        fontPairIndex: 15, borderRadius: 'soft',    shadow: 'none',    headingStyle: 'thin',    componentStyle: 'minimal',   nameFragment: 'Clean' },
  simple:        { hue: 0,   saturation: 8,  density: 'airy',        fontPairIndex: 0,  borderRadius: 'soft',    shadow: 'none',    headingStyle: 'thin',    componentStyle: 'minimal',   nameFragment: 'Simple' },
  minimalist:    { hue: 0,   saturation: 5,  density: 'airy',        fontPairIndex: 9,  borderRadius: 'soft',    shadow: 'none',    headingStyle: 'thin',    componentStyle: 'minimal',   nameFragment: 'Minimalist' },
  whitespace:    { saturation: 8, lightness: 65, density: 'airy',    fontPairIndex: 0,  borderRadius: 'soft',    shadow: 'none',    headingStyle: 'thin',    componentStyle: 'minimal',   nameFragment: 'Spacious' },
  // techy / sci-fi
  tech:          { hue: 200, saturation: 70, density: 'compact',     fontPairIndex: 11, borderRadius: 'sharp',   shadow: 'subtle',  headingStyle: 'bold',    nameFragment: 'Tech' },
  techy:         { hue: 200, saturation: 70, density: 'compact',     fontPairIndex: 11, borderRadius: 'sharp',   shadow: 'subtle',  headingStyle: 'bold',    nameFragment: 'Tech' },
  modern:        { hue: 230, saturation: 65, density: 'compact',     fontPairIndex: 15, borderRadius: 'soft',    shadow: 'subtle',  headingStyle: 'bold',    nameFragment: 'Modern' },
  futuristic:    { hue: 280, saturation: 75, density: 'compact',     fontPairIndex: 11, borderRadius: 'sharp',   shadow: 'layered', headingStyle: 'bold',    nameFragment: 'Futuristic' },
  digital:       { hue: 195, saturation: 70, density: 'compact',     fontPairIndex: 7,  borderRadius: 'soft',    shadow: 'subtle',  headingStyle: 'bold',    nameFragment: 'Digital' },
  hacker:        { hue: 130, saturation: 80, density: 'compact',     fontPairIndex: 1,  borderRadius: 'sharp',   shadow: 'colored', headingStyle: 'regular', componentStyle: 'brutalist', nameFragment: 'Hacker' },
  terminal:      { hue: 130, saturation: 75, density: 'compact',     fontPairIndex: 1,  borderRadius: 'sharp',   shadow: 'colored', headingStyle: 'regular', componentStyle: 'brutalist', nameFragment: 'Terminal' },
  matrix:        { hue: 130, saturation: 90, density: 'compact',     fontPairIndex: 1,  borderRadius: 'sharp',   shadow: 'colored', headingStyle: 'regular', componentStyle: 'brutalist', nameFragment: 'Matrix' },
  cyber:         { hue: 300, saturation: 80, density: 'compact',     fontPairIndex: 14, borderRadius: 'sharp',   shadow: 'layered', headingStyle: 'black',   componentStyle: 'brutalist', nameFragment: 'Cyber' },
  cyberpunk:     { hue: 295, saturation: 90, density: 'compact',     fontPairIndex: 14, borderRadius: 'sharp',   shadow: 'layered', headingStyle: 'black',   componentStyle: 'brutalist', nameFragment: 'Cyberpunk' },
  punk:          { hue: 330, saturation: 85, density: 'compact',     fontPairIndex: 14, borderRadius: 'sharp',   shadow: 'layered', headingStyle: 'black',   componentStyle: 'brutalist', nameFragment: 'Punk' },
  neon:          { hue: 310, saturation: 90, density: 'compact',     fontPairIndex: 14, borderRadius: 'sharp',   shadow: 'layered', headingStyle: 'black',   componentStyle: 'brutalist', nameFragment: 'Neon' },
  glitch:        { hue: 290, saturation: 90, density: 'compact',     fontPairIndex: 14, borderRadius: 'sharp',   shadow: 'layered', headingStyle: 'black',   componentStyle: 'brutalist', nameFragment: 'Glitch' },
  scifi:         { hue: 220, saturation: 80, density: 'compact',     fontPairIndex: 11, borderRadius: 'sharp',   shadow: 'layered', headingStyle: 'bold',    componentStyle: 'brutalist', nameFragment: 'Sci-Fi' },
  space:         { hue: 250, saturation: 70, density: 'airy',        fontPairIndex: 11, borderRadius: 'sharp',   shadow: 'subtle',  headingStyle: 'thin',    nameFragment: 'Space' },
  robot:         { hue: 200, saturation: 60, density: 'compact',     fontPairIndex: 1,  borderRadius: 'sharp',   shadow: 'subtle',  headingStyle: 'bold',    nameFragment: 'Robotic' },
  synthwave:     { hue: 285, saturation: 85, density: 'compact',     fontPairIndex: 14, borderRadius: 'sharp',   shadow: 'layered', headingStyle: 'black',   componentStyle: 'brutalist', nameFragment: 'Synthwave' },
  vaporwave:     { hue: 295, saturation: 75, lightness: 58, density: 'comfortable', fontPairIndex: 14, borderRadius: 'pill', shadow: 'colored', headingStyle: 'black', componentStyle: 'magazine', nameFragment: 'Vaporwave' },
  // nature
  natural:       { hue: 140, saturation: 40, density: 'comfortable', fontPairIndex: 8,  borderRadius: 'rounded', shadow: 'subtle',  headingStyle: 'regular', nameFragment: 'Natural' },
  organic:       { hue: 90,  saturation: 35, density: 'comfortable', fontPairIndex: 13, borderRadius: 'rounded', shadow: 'subtle',  headingStyle: 'regular', nameFragment: 'Organic' },
  earthy:        { hue: 25,  saturation: 45, density: 'comfortable', fontPairIndex: 13, borderRadius: 'rounded', shadow: 'subtle',  headingStyle: 'regular', nameFragment: 'Earthy' },
  botanical:     { hue: 145, saturation: 45, density: 'airy',        fontPairIndex: 8,  borderRadius: 'rounded', shadow: 'none',    headingStyle: 'thin',    nameFragment: 'Botanical' },
  forest:        { hue: 150, saturation: 50, density: 'comfortable', fontPairIndex: 8,  borderRadius: 'soft',    shadow: 'subtle',  headingStyle: 'bold',    nameFragment: 'Forest' },
  ocean:         { hue: 195, saturation: 60, density: 'airy',        fontPairIndex: 16, borderRadius: 'rounded', shadow: 'none',    headingStyle: 'thin',    nameFragment: 'Ocean' },
  jungle:        { hue: 135, saturation: 60, density: 'comfortable', fontPairIndex: 13, borderRadius: 'rounded', shadow: 'subtle',  headingStyle: 'regular', nameFragment: 'Jungle' },
  floral:        { hue: 340, saturation: 55, density: 'airy',        fontPairIndex: 18, borderRadius: 'pill',    shadow: 'subtle',  headingStyle: 'thin',    componentStyle: 'wedding', nameFragment: 'Floral' },
  // style / aesthetic
  retro:         { hue: 35,  saturation: 60, density: 'compact',     fontPairIndex: 13, borderRadius: 'pill',    shadow: 'colored', headingStyle: 'black',   nameFragment: 'Retro' },
  vintage:       { hue: 30,  saturation: 40, density: 'comfortable', fontPairIndex: 9,  borderRadius: 'soft',    shadow: 'none',    headingStyle: 'thin',    nameFragment: 'Vintage' },
  antique:       { hue: 35,  saturation: 35, density: 'comfortable', fontPairIndex: 9,  borderRadius: 'soft',    shadow: 'none',    headingStyle: 'thin',    nameFragment: 'Antique' },
  luxury:        { hue: 45,  saturation: 50, density: 'airy',        fontPairIndex: 17, borderRadius: 'rounded', shadow: 'subtle',  headingStyle: 'thin',    nameFragment: 'Luxe' },
  premium:       { hue: 40,  saturation: 45, density: 'comfortable', fontPairIndex: 17, borderRadius: 'rounded', shadow: 'subtle',  headingStyle: 'thin',    nameFragment: 'Premium' },
  opulent:       { hue: 42,  saturation: 55, density: 'airy',        fontPairIndex: 17, borderRadius: 'rounded', shadow: 'subtle',  headingStyle: 'thin',    nameFragment: 'Opulent' },
  gothic:        { hue: 270, saturation: 25, density: 'comfortable', fontPairIndex: 9,  borderRadius: 'sharp',   shadow: 'layered', headingStyle: 'bold',    nameFragment: 'Gothic' },
  dark:          { hue: 0,   saturation: 5,  lightness: 45,          fontPairIndex: 9,  borderRadius: 'sharp',   shadow: 'layered', headingStyle: 'bold',    nameFragment: 'Dark' },
  moody:         { hue: 255, saturation: 30, lightness: 42, density: 'comfortable', fontPairIndex: 9,  borderRadius: 'soft',  shadow: 'layered', headingStyle: 'bold', nameFragment: 'Moody' },
  dramatic:      { hue: 0,   saturation: 15, lightness: 40, density: 'comfortable', fontPairIndex: 9,  borderRadius: 'sharp', shadow: 'layered', headingStyle: 'black', nameFragment: 'Dramatic' },
  light:         { hue: 0,   saturation: 5,  lightness: 65, fontPairIndex: 0,  borderRadius: 'soft',    shadow: 'none',    headingStyle: 'thin',    nameFragment: 'Light' },
  bright:        { saturation: 85, lightness: 60, fontPairIndex: 5,  borderRadius: 'pill',    shadow: 'subtle',  headingStyle: 'bold',    nameFragment: 'Bright' },
  muted:         { saturation: 25, lightness: 45, fontPairIndex: 8,  borderRadius: 'soft',    shadow: 'none',    headingStyle: 'regular', nameFragment: 'Muted' },
  soft:          { saturation: 35, lightness: 55, density: 'airy', fontPairIndex: 5, borderRadius: 'pill',    shadow: 'subtle',  headingStyle: 'regular', nameFragment: 'Soft' },
  pastel:        { saturation: 40, lightness: 62, density: 'airy', fontPairIndex: 5, borderRadius: 'pill',    shadow: 'subtle',  headingStyle: 'regular', nameFragment: 'Pastel' },
  // typography-driven aesthetics
  editorial:     { density: 'airy',        fontPairIndex: 16, borderRadius: 'soft',    shadow: 'none',    headingStyle: 'thin',    componentStyle: 'editorial', nameFragment: 'Editorial' },
  literary:      { density: 'airy',        fontPairIndex: 2,  borderRadius: 'soft',    shadow: 'none',    headingStyle: 'thin',    componentStyle: 'editorial', nameFragment: 'Literary' },
  academic:      { density: 'comfortable', fontPairIndex: 3,  borderRadius: 'soft',    shadow: 'none',    headingStyle: 'regular', componentStyle: 'editorial', nameFragment: 'Academic' },
  newspaper:     { density: 'comfortable', fontPairIndex: 2,  borderRadius: 'sharp',   shadow: 'none',    headingStyle: 'black',   componentStyle: 'editorial', nameFragment: 'Newspaper' },
  magazine:      { hue: 350, saturation: 50, density: 'comfortable', fontPairIndex: 6,  borderRadius: 'rounded', shadow: 'subtle',  headingStyle: 'thin',    componentStyle: 'magazine',  nameFragment: 'Magazine' },
  romantic:      { hue: 340, saturation: 55, density: 'airy',        fontPairIndex: 18, borderRadius: 'pill',    shadow: 'subtle',  headingStyle: 'thin',    componentStyle: 'wedding', nameFragment: 'Romantic' },
  poetic:        { density: 'airy',        fontPairIndex: 17, borderRadius: 'rounded', shadow: 'none',    headingStyle: 'thin',    componentStyle: 'editorial', nameFragment: 'Poetic' },
  artsy:         { density: 'compact', fontPairIndex: 19, borderRadius: 'sharp', shadow: 'none', headingStyle: 'black', componentStyle: 'avant', nameFragment: 'Artsy' },
  creative:      { hue: 35, saturation: 60, density: 'compact', fontPairIndex: 19, borderRadius: 'sharp', shadow: 'none', headingStyle: 'black', componentStyle: 'avant', nameFragment: 'Creative' },
  brutalist:     { hue: 0,   saturation: 10, density: 'compact',     fontPairIndex: 14, borderRadius: 'sharp',   shadow: 'none',    headingStyle: 'black',   componentStyle: 'brutalist', nameFragment: 'Brutalist' },
  // density / spacing overrides
  dense:         { density: 'compact', nameFragment: 'Dense' },
  spacious:      { density: 'airy',    nameFragment: 'Spacious' },
  compact:       { density: 'compact', nameFragment: 'Compact' },
  airy:          { density: 'airy',    nameFragment: 'Airy' },
  // content type
  blog:          { density: 'airy',        fontPairIndex: 16, borderRadius: 'soft',    shadow: 'none',    headingStyle: 'thin',    componentStyle: 'editorial', nameFragment: 'Editorial' },
  portfolio:     { density: 'comfortable', fontPairIndex: 10, borderRadius: 'soft',    shadow: 'subtle',  headingStyle: 'regular', componentStyle: 'saas',      nameFragment: 'Portfolio' },
  dashboard:     { density: 'compact',     fontPairIndex: 0,  borderRadius: 'soft',    shadow: 'subtle',  headingStyle: 'bold',    componentStyle: 'saas',      nameFragment: 'Dashboard' },
  landing:       { density: 'comfortable', fontPairIndex: 15, borderRadius: 'soft',    shadow: 'subtle',  headingStyle: 'bold',    componentStyle: 'saas',      nameFragment: 'Landing' },
  saas:          { density: 'comfortable', fontPairIndex: 12, borderRadius: 'soft',    shadow: 'subtle',  headingStyle: 'bold',    componentStyle: 'saas',      nameFragment: 'SaaS' },
  gaming:        { hue: 280, saturation: 80, density: 'compact',     fontPairIndex: 14, borderRadius: 'sharp',   shadow: 'layered', headingStyle: 'black',   componentStyle: 'brutalist', nameFragment: 'Gaming' },
  startup:       { hue: 215, saturation: 70, density: 'comfortable', fontPairIndex: 12, borderRadius: 'soft',    shadow: 'subtle',  headingStyle: 'bold',    componentStyle: 'saas',      nameFragment: 'Startup' },
  app:           { density: 'compact',     fontPairIndex: 0,  borderRadius: 'soft',    shadow: 'subtle',  headingStyle: 'bold',    componentStyle: 'saas',      nameFragment: 'App' },
  wellness:      { hue: 155, saturation: 40, density: 'airy',        fontPairIndex: 5,  borderRadius: 'pill',    shadow: 'none',    headingStyle: 'thin',    componentStyle: 'minimal',   nameFragment: 'Wellness' },
  fashion:       { hue: 345, saturation: 30, density: 'airy',        fontPairIndex: 6,  borderRadius: 'rounded', shadow: 'subtle',  headingStyle: 'thin',    componentStyle: 'magazine',  nameFragment: 'Fashion' },
  food:          { hue: 25,  saturation: 70, density: 'comfortable', fontPairIndex: 13, borderRadius: 'rounded', shadow: 'subtle',  headingStyle: 'bold',    nameFragment: 'Food' },
  music:         { hue: 290, saturation: 65, density: 'comfortable', fontPairIndex: 14, borderRadius: 'sharp',   shadow: 'colored', headingStyle: 'black',   nameFragment: 'Music' },
  photography:   { hue: 0,   saturation: 5,  density: 'airy',        fontPairIndex: 0,  borderRadius: 'sharp',   shadow: 'none',    headingStyle: 'thin',    nameFragment: 'Photo' },
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

/* ── main generation function ────────────────────────────────── */

export function generatePresetsFromVision(text: string): Preset[] {
  if (!text.trim()) return []

  const words = text
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, '')
    .split(/\s+/)
    .filter(Boolean)

  // Collect all matched traits
  let hueSum = 0, hueCount = 0
  let satSum = 0, satCount = 0
  let lightSum = 0, lightCount = 0
  let densityVotes: Density[] = []
  let fontVotes: number[] = []
  let borderRadiusVotes: BorderRadius[] = []
  let shadowVotes: Shadow[] = []
  let headingStyleVotes: HeadingStyle[] = []
  let componentStyleVotes: ComponentStyle[] = []
  let nameFragments: string[] = []

  for (const word of words) {
    // Check explicit colour words
    const col = COLOUR_WORDS[word]
    if (col) {
      hueSum += col.hue; hueCount++
      satSum += col.sat; satCount++
    }

    // Check mood/style traits — exact match first, then substring fallback
    const exactTrait = MOOD_TRAITS[word]
    const trait = exactTrait ?? Object.entries(MOOD_TRAITS).find(([key]) =>
      word.includes(key) || key.includes(word)
    )?.[1]

    if (trait) {
      if (trait.hue !== undefined) { hueSum += trait.hue; hueCount++ }
      if (trait.saturation !== undefined) { satSum += trait.saturation; satCount++ }
      if (trait.lightness !== undefined) { lightSum += trait.lightness; lightCount++ }
      if (trait.density) densityVotes.push(trait.density)
      if (trait.fontPairIndex !== undefined) fontVotes.push(trait.fontPairIndex)
      if (trait.borderRadius) borderRadiusVotes.push(trait.borderRadius)
      if (trait.shadow) shadowVotes.push(trait.shadow)
      if (trait.headingStyle) headingStyleVotes.push(trait.headingStyle)
      if (trait.componentStyle) componentStyleVotes.push(trait.componentStyle)
      if (trait.nameFragment) nameFragments.push(trait.nameFragment)
    }
  }

  // Defaults
  const baseHue = hueCount > 0 ? Math.round(hueSum / hueCount) : Math.floor(Math.random() * 360)
  const baseSat = satCount > 0 ? Math.round(satSum / satCount) : 60
  const baseLightness = lightCount > 0 ? Math.round(lightSum / lightCount) : 52
  const topDensity = densityVotes.length > 0 ? mode(densityVotes) : 'comfortable'
  const topFont = fontVotes.length > 0 ? mode(fontVotes) : 0
  const topBorderRadius: BorderRadius = borderRadiusVotes.length > 0 ? mode(borderRadiusVotes) : 'soft'
  const topShadow: Shadow = shadowVotes.length > 0 ? mode(shadowVotes) : 'subtle'
  const topHeadingStyle: HeadingStyle = headingStyleVotes.length > 0 ? mode(headingStyleVotes) : 'regular'
  const topComponentStyle: ComponentStyle = componentStyleVotes.length > 0 ? mode(componentStyleVotes) : 'saas'
  const nameBase = nameFragments.length > 0 ? nameFragments.slice(0, 2).join(' ') : 'Custom'

  // Variation ladders for visual distinction between the 3 presets
  const radiusLadder: BorderRadius[] = ['sharp', 'soft', 'rounded', 'pill']
  const shadowLadder: Shadow[] = ['none', 'subtle', 'colored', 'layered']
  const headingLadder: HeadingStyle[] = ['thin', 'regular', 'bold', 'black']
  const radiusBase = radiusLadder.indexOf(topBorderRadius)
  const shadowBase = shadowLadder.indexOf(topShadow)
  const headingBase = headingLadder.indexOf(topHeadingStyle)

  // Generate 3 variations
  const variations: Array<{ hueDelta: number; satDelta: number; lightDelta: number; suffix: string; densityShift: number; fontShift: number }> = [
    { hueDelta: 0, satDelta: 0, lightDelta: 0, suffix: '', densityShift: 0, fontShift: 0 },
    { hueDelta: 30, satDelta: -10, lightDelta: 5, suffix: 'Alt', densityShift: -1, fontShift: 1 },
    { hueDelta: -25, satDelta: 10, lightDelta: -5, suffix: 'Bold', densityShift: 1, fontShift: 2 },
  ]

  const densityOrder: Density[] = ['airy', 'comfortable', 'compact']
  const densityIdx = densityOrder.indexOf(topDensity)

  // Each variation deliberately shifts one visual dimension to maximise distinctiveness
  const variationShifts = [
    { radiusDelta: 0,  shadowDelta: 0,  headingDelta: 0  }, // base
    { radiusDelta: -1, shadowDelta: -1, headingDelta: -1 }, // softer / quieter
    { radiusDelta: 1,  shadowDelta: 1,  headingDelta: 1  }, // stronger / louder
  ]

  return variations.map((v, i) => {
    const hue = (baseHue + v.hueDelta + 360) % 360
    const sat = clamp(baseSat + v.satDelta, 10, 95)
    const light = clamp(baseLightness + v.lightDelta, 35, 65)
    const seed = hslToHex(hue, sat, light)
    const dIdx = clamp(densityIdx + v.densityShift, 0, 3)
    const fIdx = clamp(topFont + v.fontShift, 0, 17)
    const vShift = variationShifts[i]
    const suffix = v.suffix ? ` ${v.suffix}` : ''

    return {
      id: `vision-${i}`,
      name: `${nameBase}${suffix}`,
      description: `Generated from "${text.slice(0, 50)}${text.length > 50 ? '…' : ''}"`,
      seed,
      fontPairIndex: fIdx,
      density: densityOrder[dIdx],
      borderRadius: radiusLadder[clamp(radiusBase + vShift.radiusDelta, 0, 3)],
      shadow: shadowLadder[clamp(shadowBase + vShift.shadowDelta, 0, 3)],
      headingStyle: headingLadder[clamp(headingBase + vShift.headingDelta, 0, 3)],
      componentStyle: topComponentStyle,
      keywords: words,
    }
  })
}

/** Find the most common element in an array */
function mode<T>(arr: T[]): T {
  const counts = new Map<T, number>()
  let best = arr[0]
  let bestCount = 0
  for (const v of arr) {
    const c = (counts.get(v) ?? 0) + 1
    counts.set(v, c)
    if (c > bestCount) { best = v; bestCount = c }
  }
  return best
}
