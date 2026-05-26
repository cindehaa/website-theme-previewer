# theme-previewer/lib

Pure TypeScript — no React, no side effects (except `visionGenerator.ts` which calls the API).

---

## types.ts

All shared TypeScript types for the tool.

```ts
interface ColorTokens {
  bg, text, textMuted, accent, accentLight,
  surface, surfaceHover, border, success, warning, error
  // all strings (hex colours)
}

type Density    = 'airy' | 'comfortable' | 'compact' | 'dense'
type Animation  = 'none' | 'subtle' | 'playful'

interface Typography { headingFont, bodyFont, monoFont }

interface Theme {
  name: string
  colors: ColorTokens
  typography: Typography
  density: Density
  animation: Animation
}

interface DarkLightTheme { dark: Theme; light: Theme }
```

### DENSITY_SCALE

```ts
DENSITY_SCALE['airy']        // gap: 2rem, padding: 2.5rem, radius: 16px, baseFontSize: 1.05rem
DENSITY_SCALE['comfortable'] // gap: 1.25rem, padding: 1.5rem, radius: 12px, baseFontSize: 1rem
DENSITY_SCALE['compact']     // gap: 0.75rem, padding: 1rem, radius: 8px, baseFontSize: 0.95rem
DENSITY_SCALE['dense']       // gap: 0.5rem, padding: 0.75rem, radius: 6px, baseFontSize: 0.9rem
```

---

## colorEngine.ts

Generates a full 12-token `ColorTokens` palette from a single seed hex colour.

```ts
function generatePalette(seedHex: string, mode: 'dark' | 'light'): ColorTokens
```

- Converts seed to HSL, then derives all tokens by adjusting lightness/saturation.
- Dark mode: low-lightness bg, high-lightness text.
- Light mode: high-lightness bg, low-lightness text.
- Accent is kept close to the seed hue.
- Success/warning/error are fixed hue offsets from the accent.

---

## fontPairings.ts

```ts
interface FontPair {
  label: string
  headingFont: string
  bodyFont: string
  monoFont: string
  googleFontsUrl: string
}

export const FONT_PAIRS: FontPair[]
```

18 curated pairings. Add new ones by appending to the array — no other changes needed.
Indices must stay stable (they are referenced by the AI vision API response).

---

## presets.ts

```ts
export const PRESETS: { name: string; theme: DarkLightTheme }[]
```

Built-in one-click starter themes. Each entry has a `name` and a full `DarkLightTheme`.
Rendered by `PresetSelector` component.

---

## generateMarkdown.ts

```ts
function generateMarkdown(theme: DarkLightTheme): string
```

Pure function. Output sections:
1. Theme name heading
2. Style guide summary paragraph (human-readable, useful as AI context)
3. Dark / light colour token tables
4. Typography section
5. Spacing & density table
6. Animation preference

---

## visionGenerator.ts

```ts
async function generateVisionThemes(text: string): Promise<RawVisionPreset[]>
```

Calls `POST /api/tools/theme-vision` with `{ text }`. Returns an array of 3 raw presets:

```ts
interface RawVisionPreset {
  name: string
  description: string
  seed: string          // hex colour
  fontPairIndex: number // index into FONT_PAIRS
  density: Density
  keywords: string[]
}
```

---

## visionMatcher.ts

```ts
function matchVisionPreset(raw: RawVisionPreset): DarkLightTheme
```

Maps a `RawVisionPreset` from the AI to a full `DarkLightTheme` by:
1. Calling `generatePalette(raw.seed, 'dark')` and `generatePalette(raw.seed, 'light')`.
2. Looking up `FONT_PAIRS[raw.fontPairIndex]` for typography.
3. Passing through `density` and `animation`.
