/* ── Generate theme.md content ────────────────────────────────── */

import type { DarkLightTheme, ColorTokens, Density, Animation, Typography, BorderRadius, Shadow, HeadingStyle, ComponentStyle } from './types'
import { DENSITY_SCALE, BORDER_RADIUS_MAP, HEADING_STYLE_MAP, COMPONENT_STYLE_DESCRIPTIONS } from './types'

/* ── helpers ──────────────────────────────────────────────────── */

function describeColour(hex: string): string {
  // Very rough hue-name mapping for the prose section
  if (hex.startsWith('hsla')) return 'translucent accent'
  const r = parseInt(hex.slice(1, 3), 16)
  const g = parseInt(hex.slice(3, 5), 16)
  const b = parseInt(hex.slice(5, 7), 16)
  const max = Math.max(r, g, b)
  if (max < 30) return 'near-black'
  if (r > 200 && g > 200 && b > 200) return 'near-white'
  if (r > g && r > b) return 'warm-toned'
  if (g > r && g > b) return 'green-toned'
  if (b > r && b > g) return 'cool-toned'
  return 'neutral-toned'
}

function describeDensity(d: Density): string {
  const map: Record<Density, string> = {
    airy: 'generous whitespace and large padding — content breathes',
    comfortable: 'balanced spacing — neither sparse nor cramped',
    compact: 'tighter spacing — more content visible at once',
  }
  return map[d]
}

function describeBorderRadius(r: BorderRadius): string {
  const map: Record<BorderRadius, string> = {
    sharp:   `0px — sharp corners, industrial/editorial feel`,
    soft:    `4px — professional, slightly softened corners`,
    rounded: `14px — friendly, modern rounded corners`,
    pill:    `100px — pill/bubbly corners, playful and approachable`,
  }
  return map[r]
}

function describeShadow(s: Shadow): string {
  const map: Record<Shadow, string> = {
    none:    'No shadows — completely flat design.',
    subtle:  'Subtle drop shadows — light depth on cards and buttons.',
    colored: 'Accent-tinted glow shadows — vibrant, glowing elevation.',
    layered: 'Complex multi-layer shadows — deep, dramatic depth.',
  }
  return map[s]
}

function describeHeadingStyle(h: HeadingStyle): string {
  const s = HEADING_STYLE_MAP[h]
  const map: Record<HeadingStyle, string> = {
    thin:    `Weight ${s.weight}, tracking ${s.tracking} — light and elegant`,
    regular: `Weight ${s.weight}, tracking ${s.tracking} — neutral and readable`,
    bold:    `Weight ${s.weight}, tracking ${s.tracking} — confident and strong`,
    black:   `Weight ${s.weight}, tracking ${s.tracking}, uppercase — dramatic and impactful`,
  }
  return map[h]
}

function describeAnimation(a: Animation): string {
  const map: Record<Animation, string> = {
    none: 'No animations — static, distraction-free interface.',
    subtle: 'Subtle transitions (0.15–0.3s ease) on hover and state changes. No bouncy or decorative motion.',
    playful: 'Expressive animations — spring physics, entrance animations, micro-interactions on buttons and cards.',
  }
  return map[a]
}

function formatTokens(label: string, colors: ColorTokens): string {
  const lines = [
    `### ${label}`,
    '',
    `- Background: ${colors.bg}`,
    `- Text: ${colors.text}`,
    `- Text Muted: ${colors.textMuted}`,
    `- Accent: ${colors.accent}`,
    `- Accent Light: ${colors.accentLight}`,
    `- Surface: ${colors.surface}`,
    `- Surface Hover: ${colors.surfaceHover}`,
    `- Border: ${colors.border}`,
    `- Success: ${colors.success}`,
    `- Warning: ${colors.warning}`,
    `- Error: ${colors.error}`,
  ]
  return lines.join('\n')
}

function computeShadowCss(shadow: Shadow, accent: string): string {
  switch (shadow) {
    case 'none':
      return 'none'
    case 'subtle':
      return '0 2px 8px rgba(0,0,0,0.18), 0 1px 2px rgba(0,0,0,0.12)'
    case 'colored':
      return `0 4px 20px ${accent}55, 0 1px 3px rgba(0,0,0,0.15)`
    case 'layered':
      return `0 1px 2px rgba(0,0,0,0.2), 0 4px 16px rgba(0,0,0,0.2), 0 0 0 1px ${accent}30`
  }
}

function formatMockPreviewExamples(
  themeName: string,
  colors: ColorTokens,
  typography: Typography,
  spacing: { gap: string; padding: string },
  borderRadius: BorderRadius,
  shadow: Shadow,
): string {
  const headingFont = typography.headingFont.split(',')[0].replace(/'/g, '').trim()
  const bodyFont = typography.bodyFont.split(',')[0].replace(/'/g, '').trim()
  const radius = BORDER_RADIUS_MAP[borderRadius]
  const shadowCss = computeShadowCss(shadow, colors.accent)

  const lines = [
    '## Examples',
    '',
    'This example is fully self-contained and token-driven (no dependency on existing global theme styles).',
    '',
    '### Mock Site Preview (TSX)',
    '',
    '```tsx',
    "import type { CSSProperties } from 'react'",
    '',
    `const darkThemeVars: CSSProperties = {`,
    `  '--tok-bg': '${colors.bg}',`,
    `  '--tok-text': '${colors.text}',`,
    `  '--tok-text-muted': '${colors.textMuted}',`,
    `  '--tok-accent': '${colors.accent}',`,
    `  '--tok-accent-light': '${colors.accentLight}',`,
    `  '--tok-surface': '${colors.surface}',`,
    `  '--tok-surface-hover': '${colors.surfaceHover}',`,
    `  '--tok-border': '${colors.border}',`,
    `  '--tok-success': '${colors.success}',`,
    `  '--tok-warning': '${colors.warning}',`,
    `  '--tok-error': '${colors.error}',`,
    `  '--font-heading': '${headingFont}',`,
    `  '--font-body': '${bodyFont}',`,
    `  '--preview-gap': '${spacing.gap}',`,
    `  '--preview-padding': '${spacing.padding}',`,
    `  '--preview-radius': '${radius}',`,
    `  '--preview-shadow': '${shadowCss}',`,
    '} as CSSProperties',
    '',
    'export function ThemePreviewExample() {',
    '  return (',
    '    <main className="themeRoot" style={darkThemeVars}>',
    '      <article className="preview">',
    '        <nav className="nav">',
    `          <span className="navLogo">${themeName}</span>`,
    '          <div className="navLinks">',
    '            <span className="navLink">Product</span>',
    '            <span className="navLink">Pricing</span>',
    '            <span className="navLink">Docs</span>',
    '          </div>',
    '        </nav>',
    '',
    '        <header className="hero">',
    '          <h1 className="heroTitle">Build something beautiful</h1>',
    '          <p className="heroSub">',
    '            Token-driven preview layout matching the Theme Previewer mock site.',
    '          </p>',
    '          <button className="heroCta">Get Started →</button>',
    '        </header>',
    '',
    '        <section className="features">',
    '          {[',
    "            { title: 'Fast', desc: 'Optimized interactions and clear hierarchy.' },",
    "            { title: 'Flexible', desc: 'Scales across product pages and tools.' },",
    "            { title: 'Reliable', desc: 'Accessible contrast with stable tokens.' },",
    '          ].map((feature) => (',
    '            <div key={feature.title} className="featureCard">',
    '              <div className="featureTitle">{feature.title}</div>',
    '              <div className="featureDesc">{feature.desc}</div>',
    '            </div>',
    '          ))}',
    '        </section>',
    '',
    '        <div className="statusRow">',
    '          <span className="status success">Success</span>',
    '          <span className="status warning">Warning</span>',
    '          <span className="status error">Error</span>',
    '        </div>',
    '',
    '        <footer className="footer">© 2026 ' + themeName + '</footer>',
    '      </article>',
    '    </main>',
    '  )',
    '}',
    '```',
    '',
    '### Mock Site Preview (CSS)',
    '',
    '```css',
    'html, body {',
    '  margin: 0;',
    '}',
    '',
    '.themeRoot {',
    '  min-height: 100dvh;',
    '  background: var(--tok-bg);',
    '  color: var(--tok-text);',
    '  font-family: var(--font-body);',
    '  padding: var(--preview-padding);',
    '}',
    '',
    '.preview {',
    '  max-width: 960px;',
    '  margin: 0 auto;',
    '}',
    '',
    '.nav {',
    '  display: flex;',
    '  justify-content: space-between;',
    '  align-items: center;',
    '  border-bottom: 1px solid var(--tok-border);',
    '  margin-bottom: var(--preview-gap);',
    '  padding-bottom: 0.75rem;',
    '}',
    '',
    '.navLogo {',
    '  font-family: var(--font-heading);',
    '  color: var(--tok-accent);',
    '  font-weight: 700;',
    '}',
    '',
    '.navLinks {',
    '  display: flex;',
    '  gap: 1rem;',
    '}',
    '',
    '.navLink {',
    '  color: var(--tok-text-muted);',
    '  font-size: 0.82rem;',
    '}',
    '',
    '.hero {',
    '  text-align: center;',
    '  margin-bottom: var(--preview-gap);',
    '}',
    '',
    '.heroTitle {',
    '  font-family: var(--font-heading);',
    '  font-size: 1.7rem;',
    '  margin: 0 0 0.5rem;',
    '}',
    '',
    '.heroSub {',
    '  color: var(--tok-text-muted);',
    '  margin: 0 0 1rem;',
    '}',
    '',
    '.heroCta {',
    '  background: var(--tok-accent);',
    '  color: var(--tok-bg);',
    '  border: 0;',
    '  border-radius: var(--preview-radius);',
    '  padding: 0.55rem 1.2rem;',
    '}',
    '',
    '.features {',
    '  display: grid;',
    '  grid-template-columns: repeat(3, minmax(0, 1fr));',
    '  gap: var(--preview-gap);',
    '}',
    '',
    '.featureCard {',
    '  background: var(--tok-surface);',
    '  border: 1px solid var(--tok-border);',
    '  border-radius: var(--preview-radius);',
    '  padding: var(--preview-padding);',
    '  box-shadow: var(--preview-shadow);',
    '}',
    '',
    '.featureTitle {',
    '  font-family: var(--font-heading);',
    '  margin-bottom: 0.35rem;',
    '}',
    '',
    '.featureDesc {',
    '  color: var(--tok-text-muted);',
    '  font-size: 0.78rem;',
    '  line-height: 1.45;',
    '}',
    '',
    '.statusRow {',
    '  display: flex;',
    '  gap: 0.5rem;',
    '  margin-top: var(--preview-gap);',
    '}',
    '',
    '.status {',
    '  display: inline-flex;',
    '  align-items: center;',
    '  padding: 0.25rem 0.55rem;',
    '  border-radius: var(--preview-radius);',
    '  font-size: 0.72rem;',
    '  border: 1px solid transparent;',
    '}',
    '',
    '.status.success {',
    '  color: var(--tok-success);',
    '  border-color: var(--tok-success);',
    '}',
    '',
    '.status.warning {',
    '  color: var(--tok-warning);',
    '  border-color: var(--tok-warning);',
    '}',
    '',
    '.status.error {',
    '  color: var(--tok-error);',
    '  border-color: var(--tok-error);',
    '}',
    '',
    '.footer {',
    '  border-top: 1px solid var(--tok-border);',
    '  margin-top: var(--preview-gap);',
    '  padding-top: 0.75rem;',
    '  text-align: center;',
    '  color: var(--tok-text-muted);',
    '  font-size: 0.72rem;',
    '}',
    '```',
    '',
    '### Native Browser Elements (CSS)',
    '',
    'Apply this in your global stylesheet so browser-native UI (scrollbars, text selection, form accent controls) follows the same theme tokens.',
    '',
    '```css',
    ':root {',
    '  color-scheme: dark;',
    '}',
    '',
    'html, body {',
    '  background: var(--tok-bg);',
    '  color: var(--tok-text);',
    '  accent-color: var(--tok-accent);',
    '',
    '  scrollbar-width: thin;',
    '  scrollbar-color: var(--tok-border) var(--tok-bg);',
    '}',
    '',
    '::selection {',
    '  background: var(--tok-accent);',
    '  color: var(--tok-bg);',
    '}',
    '',
    '*::-webkit-scrollbar {',
    '  width: 10px;',
    '  height: 10px;',
    '}',
    '',
    '*::-webkit-scrollbar-track {',
    '  background: var(--tok-bg);',
    '}',
    '',
    '*::-webkit-scrollbar-thumb {',
    '  background: var(--tok-border);',
    '  border: 2px solid var(--tok-bg);',
    '  border-radius: 999px;',
    '}',
    '',
    '*::-webkit-scrollbar-thumb:hover {',
    '  background: var(--tok-accent);',
    '}',
    '',
    'input,',
    'textarea,',
    'select,',
    'button {',
    '  color: var(--tok-text);',
    '  background: var(--tok-surface);',
    '  border-color: var(--tok-border);',
    '}',
    '```',
  ]

  return lines.join('\n')
}

/* ── main export ──────────────────────────────────────────────── */

export function generateMarkdown(theme: DarkLightTheme): string {
  const { dark, light } = theme
  const spacing = DENSITY_SCALE[dark.density]

  const sections: string[] = []

  // Title
  sections.push(`# Theme: ${dark.name}`)
  sections.push('')

  // Style guide summary (natural language for AI agents)
  sections.push('## Style Guide Summary')
  sections.push('')
  sections.push(
    `This is a ${describeColour(dark.colors.accent)} theme called "${dark.name}". ` +
    `The palette is built around the accent colour \`${dark.colors.accent}\`. ` +
    `In dark mode the background is \`${dark.colors.bg}\` with \`${dark.colors.text}\` text; ` +
    `in light mode it flips to \`${light.colors.bg}\` with \`${light.colors.text}\` text.`
  )
  sections.push('')
  sections.push(
    `**Typography:** Headings use ${dark.typography.headingFont.split(',')[0]}. ` +
    `Body text uses ${dark.typography.bodyFont.split(',')[0]}. ` +
    `Code/mono blocks use ${dark.typography.monoFont.split(',')[0]}.`
  )
  sections.push('')
  sections.push(
    `**Spacing & Density:** ${describeDensity(dark.density)} ` +
    `Base font size is ${spacing.baseFontSize}; default gap is ${spacing.gap}; ` +
    `card padding is ${spacing.padding}; border-radius is ${spacing.radius}.`
  )
  sections.push('')
  sections.push(
    `**Border Radius:** ${describeBorderRadius(dark.borderRadius)}`
  )
  sections.push('')
  sections.push(
    `**Shadow Style:** ${describeShadow(dark.shadow)}`
  )
  sections.push('')
  sections.push(
    `**Heading Style:** ${describeHeadingStyle(dark.headingStyle)}`
  )
  sections.push('')
  sections.push(`**Animation:** ${describeAnimation(dark.animation)}`)
  sections.push('')
  sections.push(
    `**Component Style:** ${dark.componentStyle} — ${COMPONENT_STYLE_DESCRIPTIONS[dark.componentStyle]}`
  )
  if (dark.componentStyle === 'minimal') {
    sections.push('')
    sections.push(
      '**Typography Case:** All text in this theme should be rendered entirely in **lowercase**. This applies to headings, body copy, labels, buttons, and all UI text — no uppercase characters anywhere.'
    )
  }
  sections.push('')

  // Tokens — Dark
  sections.push('## Design Tokens')
  sections.push('')
  sections.push(formatTokens('Colours (Dark Mode)', dark.colors))
  sections.push('')

  // Tokens — Light
  sections.push(formatTokens('Colours (Light Mode)', light.colors))
  sections.push('')

  // Typography
  sections.push('### Typography')
  sections.push('')
  sections.push(`- Heading Font: ${dark.typography.headingFont}`)
  sections.push(`- Body Font: ${dark.typography.bodyFont}`)
  sections.push(`- Mono Font: ${dark.typography.monoFont}`)
  sections.push('')

  // Spacing
  sections.push('### Spacing & Density')
  sections.push('')
  sections.push(`- Density: ${dark.density}`)
  sections.push(`- Base Font Size: ${spacing.baseFontSize}`)
  sections.push(`- Default Gap: ${spacing.gap}`)
  sections.push(`- Card Padding: ${spacing.padding}`)
  sections.push(`- Border Radius: ${BORDER_RADIUS_MAP[dark.borderRadius]} (${dark.borderRadius})`)
  sections.push(`- Shadow: ${dark.shadow}`)
  sections.push(`- Heading Style: ${dark.headingStyle} (weight ${HEADING_STYLE_MAP[dark.headingStyle].weight}, tracking ${HEADING_STYLE_MAP[dark.headingStyle].tracking}${dark.headingStyle === 'black' ? ', uppercase' : ''})`)
  sections.push(`- Component Style: ${dark.componentStyle}`)
  sections.push('')

  // Animation
  sections.push('### Animation')
  sections.push('')
  sections.push(`- Preference: ${dark.animation}`)
  sections.push(`- ${describeAnimation(dark.animation)}`)
  sections.push('')

  sections.push(formatMockPreviewExamples(dark.name, dark.colors, dark.typography, spacing, dark.borderRadius, dark.shadow))
  sections.push('')

  return sections.join('\n')
}
