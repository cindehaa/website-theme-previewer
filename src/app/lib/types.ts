/* ── Core theme types ─────────────────────────────────────────── */

export interface ColorTokens {
  bg: string
  text: string
  textMuted: string
  accent: string
  accentLight: string
  surface: string
  surfaceHover: string
  border: string
  success: string
  warning: string
  error: string
}

export type Density = 'airy' | 'comfortable' | 'compact'
export type Animation = 'none' | 'subtle' | 'playful'
export type BorderRadius = 'sharp' | 'soft' | 'rounded' | 'pill'
export type Shadow = 'none' | 'subtle' | 'colored' | 'layered'
export type HeadingStyle = 'thin' | 'regular' | 'bold' | 'black'
export type ComponentStyle = 'saas' | 'editorial' | 'brutalist' | 'minimal' | 'magazine' | 'wedding' | 'avant' | 'orbital' | 'academic' | 'geocities'

export const COMPONENT_STYLE_DESCRIPTIONS: Record<ComponentStyle, string> = {
  saas:       'Centered hero, feature card grid — classic product landing page',
  editorial:  'Left-aligned layout, numbered sections, no card backgrounds — content/journal feel',
  brutalist:  'Raw industrial layout with oversized all-caps type and alternating full-width rows',
  minimal:    'Text-only hero, divider-separated feature list — pure typography focus',
  magazine:   'Split hero, double-row nav, asymmetric 1+2 card grid — publication style',
  wedding:    'Centred monogram hero, ornamental dividers, all text centred — elegant event/wedding site feel',
  avant:      'Skewed diagonal hero band, asymmetric sidebar, vertical text — quirky contemporary art zine',
  orbital:    'Geospatial command center layout — coordinate grid, satellite status cards, mission control aesthetic',
  academic:   'Academic journal website — search, tabs, article metadata, side panels, and research cards',
  geocities:  'Authentic 90s homepage — construction banner, profile box, visitor counter, favourite links table, guestbook',
}

export interface Typography {
  headingFont: string
  bodyFont: string
  monoFont: string
}

export interface Theme {
  name: string
  colors: ColorTokens
  typography: Typography
  density: Density
  animation: Animation
  borderRadius: BorderRadius
  shadow: Shadow
  headingStyle: HeadingStyle
  componentStyle: ComponentStyle
}

export interface DarkLightTheme {
  dark: Theme
  light: Theme
}

/** Spacing scale derived from density */
export const DENSITY_SCALE: Record<Density, { gap: string; padding: string; radius: string; baseFontSize: string }> = {
  airy:        { gap: '3rem',    padding: '4rem',    radius: '20px', baseFontSize: '1.1rem' },
  comfortable: { gap: '1.25rem', padding: '1.75rem', radius: '12px', baseFontSize: '1rem' },
  compact:     { gap: '0.375rem', padding: '0.625rem', radius: '4px', baseFontSize: '0.85rem' },
}

export const BORDER_RADIUS_MAP: Record<BorderRadius, string> = {
  sharp: '0px',
  soft: '4px',
  rounded: '14px',
  pill: '100px',
}

export const HEADING_STYLE_MAP: Record<HeadingStyle, { weight: number; tracking: string; transform: string }> = {
  thin:    { weight: 300, tracking: '0.04em',  transform: 'none' },
  regular: { weight: 400, tracking: '0em',     transform: 'none' },
  bold:    { weight: 700, tracking: '-0.01em', transform: 'none' },
  black:   { weight: 900, tracking: '0.05em',  transform: 'uppercase' },
}
