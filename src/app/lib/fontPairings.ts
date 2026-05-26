/* ── Curated Google Font pairings ─────────────────────────────── */

export interface FontPair {
  label: string
  heading: string
  body: string
  mono: string
  googleFontsUrl: string
}

export const FONT_PAIRS: FontPair[] = [
  // 0
  {
    label: 'Inter + System',
    heading: "'Inter', system-ui, sans-serif",
    body: "'Inter', system-ui, sans-serif",
    mono: "'JetBrains Mono', 'Fira Code', monospace",
    googleFontsUrl: 'https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap',
  },
  // 1
  {
    label: 'JetBrains Mono (Terminal)',
    heading: "'JetBrains Mono', monospace",
    body: "'JetBrains Mono', monospace",
    mono: "'JetBrains Mono', monospace",
    googleFontsUrl: 'https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;600;700&display=swap',
  },
  // 2
  {
    label: 'Lora + Source Sans 3',
    heading: "'Lora', serif",
    body: "'Source Sans 3', sans-serif",
    mono: "'Source Code Pro', monospace",
    googleFontsUrl: 'https://fonts.googleapis.com/css2?family=Lora:wght@400;600;700&family=Source+Sans+3:wght@400;600&family=Source+Code+Pro:wght@400&display=swap',
  },
  // 3
  {
    label: 'Merriweather + Open Sans',
    heading: "'Merriweather', serif",
    body: "'Open Sans', sans-serif",
    mono: "'Fira Code', monospace",
    googleFontsUrl: 'https://fonts.googleapis.com/css2?family=Merriweather:wght@400;700&family=Open+Sans:wght@400;600&family=Fira+Code:wght@400&display=swap',
  },
  // 4
  {
    label: 'Space Grotesk + Space Mono',
    heading: "'Space Grotesk', sans-serif",
    body: "'Space Grotesk', sans-serif",
    mono: "'Space Mono', monospace",
    googleFontsUrl: 'https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;600;700&family=Space+Mono:wght@400&display=swap',
  },
  // 5
  {
    label: 'Quicksand + Nunito',
    heading: "'Quicksand', sans-serif",
    body: "'Nunito', sans-serif",
    mono: "'JetBrains Mono', monospace",
    googleFontsUrl: 'https://fonts.googleapis.com/css2?family=Quicksand:wght@400;600;700&family=Nunito:wght@400;600&family=JetBrains+Mono:wght@400&display=swap',
  },
  // 6
  {
    label: 'Playfair Display + Raleway',
    heading: "'Playfair Display', serif",
    body: "'Raleway', sans-serif",
    mono: "'Fira Code', monospace",
    googleFontsUrl: 'https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700&family=Raleway:wght@400;600&family=Fira+Code:wght@400&display=swap',
  },
  // 7
  {
    label: 'Space Grotesk + IBM Plex Mono',
    heading: "'Space Grotesk', sans-serif",
    body: "'Space Grotesk', sans-serif",
    mono: "'IBM Plex Mono', monospace",
    googleFontsUrl: 'https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;600;700&family=IBM+Plex+Mono:wght@400&display=swap',
  },
  // 8
  {
    label: 'Libre Baskerville + Cabin',
    heading: "'Libre Baskerville', serif",
    body: "'Cabin', sans-serif",
    mono: "'Fira Code', monospace",
    googleFontsUrl: 'https://fonts.googleapis.com/css2?family=Libre+Baskerville:wght@400;700&family=Cabin:wght@400;600&family=Fira+Code:wght@400&display=swap',
  },
  // 9
  {
    label: 'EB Garamond + Work Sans',
    heading: "'EB Garamond', serif",
    body: "'Work Sans', sans-serif",
    mono: "'JetBrains Mono', monospace",
    googleFontsUrl: 'https://fonts.googleapis.com/css2?family=EB+Garamond:wght@400;600;700&family=Work+Sans:wght@400;600&family=JetBrains+Mono:wght@400&display=swap',
  },
  // 10
  {
    label: 'DM Serif + DM Sans',
    heading: "'DM Serif Display', serif",
    body: "'DM Sans', sans-serif",
    mono: "'Fira Code', monospace",
    googleFontsUrl: 'https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=DM+Sans:wght@400;600&family=Fira+Code:wght@400&display=swap',
  },
  // 11
  {
    label: 'Syne + Source Code Pro',
    heading: "'Syne', sans-serif",
    body: "'Syne', sans-serif",
    mono: "'Source Code Pro', monospace",
    googleFontsUrl: 'https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=Source+Code+Pro:wght@400&display=swap',
  },
  // 12
  {
    label: 'Plus Jakarta Sans',
    heading: "'Plus Jakarta Sans', sans-serif",
    body: "'Plus Jakarta Sans', sans-serif",
    mono: "'Courier New', monospace",
    googleFontsUrl: 'https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;600;700&display=swap',
  },
  // 13
  {
    label: 'Fraunces + DM Sans',
    heading: "'Fraunces', serif",
    body: "'DM Sans', sans-serif",
    mono: "'JetBrains Mono', monospace",
    googleFontsUrl: 'https://fonts.googleapis.com/css2?family=Fraunces:ital,wght@0,400;0,700;1,400&family=DM+Sans:wght@400;600&family=JetBrains+Mono:wght@400&display=swap',
  },
  // 14
  {
    label: 'Bricolage Grotesque + Fira Code',
    heading: "'Bricolage Grotesque', sans-serif",
    body: "'Bricolage Grotesque', sans-serif",
    mono: "'Fira Code', monospace",
    googleFontsUrl: 'https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:wght@400;600;700&family=Fira+Code:wght@400&display=swap',
  },
  // 15
  {
    label: 'Outfit + JetBrains Mono',
    heading: "'Outfit', sans-serif",
    body: "'Outfit', sans-serif",
    mono: "'JetBrains Mono', monospace",
    googleFontsUrl: 'https://fonts.googleapis.com/css2?family=Outfit:wght@400;600;700&family=JetBrains+Mono:wght@400&display=swap',
  },
  // 16
  {
    label: 'Spectral + Rubik',
    heading: "'Spectral', serif",
    body: "'Rubik', sans-serif",
    mono: "'IBM Plex Mono', monospace",
    googleFontsUrl: 'https://fonts.googleapis.com/css2?family=Spectral:wght@400;600;700&family=Rubik:wght@400;600&family=IBM+Plex+Mono:wght@400&display=swap',
  },
  // 17
  {
    label: 'Cormorant + Work Sans',
    heading: "'Cormorant Garamond', serif",
    body: "'Work Sans', sans-serif",
    mono: "'Fira Code', monospace",
    googleFontsUrl: 'https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,600;1,400&family=Work+Sans:wght@400;600&family=Fira+Code:wght@400&display=swap',
  },
  // 18
  {
    label: 'Dancing Script + Lato',
    heading: "'Dancing Script', 'Palatino Linotype', Palatino, Georgia, serif",
    body: "'Lato', 'Helvetica Neue', Arial, sans-serif",
    mono: "'Courier New', monospace",
    googleFontsUrl: 'https://fonts.googleapis.com/css2?family=Dancing+Script:wght@400;600;700&family=Lato:wght@300;400;700&display=swap',
  },
  // 19
  {
    label: 'Archivo Black + Space Grotesk',
    heading: "'Archivo Black', 'Arial Black', Impact, sans-serif",
    body: "'Space Grotesk', system-ui, sans-serif",
    mono: "'Space Mono', monospace",
    googleFontsUrl: 'https://fonts.googleapis.com/css2?family=Archivo+Black&family=Space+Grotesk:wght@400;500;600&family=Space+Mono:wght@400&display=swap',
  },
]
