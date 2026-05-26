import { NextRequest, NextResponse } from 'next/server'
import type { Preset } from '@/app/lib/presets'
import type { BorderRadius, ComponentStyle, HeadingStyle, Shadow } from '@/app/lib/types'

const FONT_PAIRS = [
  '0: Inter + System (clean, modern, neutral, UI-focused)',
  '1: JetBrains Mono (terminal, hacker, code, monospace)',
  '2: Lora + Source Sans 3 (literary, warm serif, blog)',
  '3: Merriweather + Open Sans (editorial, readable, news)',
  '4: Space Grotesk + Space Mono (geometric, techy, sci-fi)',
  '5: Quicksand + Nunito (playful, rounded, friendly, cute)',
  '6: Playfair Display + Raleway (elegant, magazine, fashion)',
  '7: Space Grotesk + IBM Plex Mono (developer tools, SaaS)',
  '8: Libre Baskerville + Cabin (classic, natural, dependable)',
  '9: EB Garamond + Work Sans (dark academia, gothic, literary)',
  '10: DM Serif + DM Sans (modern editorial, portfolio)',
  '11: Syne + Source Code Pro (sci-fi, experimental, futuristic)',
  '12: Plus Jakarta Sans (clean startup, business, SaaS)',
  '13: Fraunces + DM Sans (earthy, cozy, organic, rustic)',
  '14: Bricolage Grotesque + Fira Code (cyberpunk, bold, gaming, neon)',
  '15: Outfit + JetBrains Mono (modern clean, developer, minimalist)',
  '16: Spectral + Rubik (ocean, calm, soft editorial)',
  '17: Cormorant + Work Sans (luxury, romantic, elegant, poetic)',
]

const SYSTEM_PROMPT = `You are a web theme designer. Given a user's vision description, generate exactly 3 website theme presets as a JSON array.

Each preset object must have:
- "name": short evocative name (2-4 words)
- "description": one sentence describing the feel
- "seed": a hex color string (e.g. "#3a7bd5") — the primary accent color capturing the mood
- "fontPairIndex": integer 0–17, chosen from:
${FONT_PAIRS.join('\n')}
- "density": one of ["airy", "comfortable", "compact", "dense"]
- "borderRadius": one of ["sharp", "soft", "rounded", "pill"]
  - sharp: 0px — brutal/terminal/editorial/industrial
  - soft: 4px — professional/clean/SaaS
  - rounded: 14px — modern/organic/friendly
  - pill: 100px — bubbly/playful/wellness
- "shadow": one of ["none", "subtle", "colored", "layered"]
  - none: flat design — minimal/editorial/nordic
  - subtle: light drop shadows — standard UI
  - colored: accent-tinted glow — vibrant/synthwave/neon
  - layered: complex multi-shadow depth — dark/cyberpunk/gaming
- "headingStyle": one of ["thin", "regular", "bold", "black"]
  - thin: weight 300, wide tracking — luxury/editorial/elegant
  - regular: weight 400 — neutral/literary
  - bold: weight 700 — confident/startup/corporate
  - black: weight 900 + uppercase — dramatic/gaming/newspaper
- "componentStyle": one of ["saas", "editorial", "brutalist", "minimal", "magazine", "wedding", "avant"]
  - saas: centered hero, 3-col feature card grid — standard product landing page
  - editorial: left-aligned, numbered sections (01/02/03), no card backgrounds — content/journal/literary
  - brutalist: all-caps nav, oversized raw heading with №index, alternating full-width rows — bold/industrial/art
  - minimal: wordmark-only nav, text-only hero, divider-separated feature list — clean/elegant/typography-focused
  - magazine: double-row nav, split two-column hero with accent panel, asymmetric 1+2 card grid — publication/media/fashion
- "keywords": array of 3–5 descriptive words

The 3 presets should be genuinely distinct from each other — vary the colors, fonts, density, borderRadius, shadow, and headingStyle to give the user meaningfully different options, not just color tweaks. Make choices feel intentional and creatively considered.

Return ONLY a raw JSON array of exactly 3 objects. No markdown, no explanation, no wrapper.`

const apiKey = process.env.OPENAI_API_KEY

const VALID_DENSITIES = ['airy', 'comfortable', 'compact'] as const
const VALID_RADII = ['sharp', 'soft', 'rounded', 'pill'] as const
const VALID_SHADOWS = ['none', 'subtle', 'colored', 'layered'] as const
const VALID_HEADINGS = ['thin', 'regular', 'bold', 'black'] as const
const VALID_STYLES = ['saas', 'editorial', 'brutalist', 'minimal', 'magazine', 'wedding', 'avant'] as const

function isOneOf<T extends readonly string[]>(value: string, options: T): value is T[number] {
  return options.includes(value)
}

function toDensity(value: unknown): Preset['density'] {
  const density = String(value ?? '')
  return isOneOf(density, VALID_DENSITIES) ? density : 'comfortable'
}

function toBorderRadius(value: unknown): BorderRadius {
  const borderRadius = String(value ?? '')
  return isOneOf(borderRadius, VALID_RADII) ? borderRadius : 'soft'
}

function toShadow(value: unknown): Shadow {
  const shadow = String(value ?? '')
  return isOneOf(shadow, VALID_SHADOWS) ? shadow : 'subtle'
}

function toHeadingStyle(value: unknown): HeadingStyle {
  const headingStyle = String(value ?? '')
  return isOneOf(headingStyle, VALID_HEADINGS) ? headingStyle : 'regular'
}

function toComponentStyle(value: unknown): ComponentStyle {
  const componentStyle = String(value ?? '')
  return isOneOf(componentStyle, VALID_STYLES) ? componentStyle : 'saas'
}

export async function POST(req: NextRequest) {
  if (!apiKey || apiKey === 'your_openai_api_key_here') {
    return NextResponse.json({ error: 'OPENAI_API_KEY not configured' }, { status: 500 })
  }

  let text: string
  try {
    const body = await req.json()
    text = body.text?.trim()
    if (!text) return NextResponse.json({ error: 'Missing text' }, { status: 400 })
  } catch {
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 })
  }

  try {
    const openaiRes = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: [
          { role: 'system', content: SYSTEM_PROMPT },
          { role: 'user', content: text },
        ],
        temperature: 0.8,
        max_tokens: 800,
        response_format: { type: 'json_object' },
      }),
    })

    if (!openaiRes.ok) {
      const err = await openaiRes.text()
      console.error('[theme-vision] OpenAI HTTP error', openaiRes.status, err)
      return NextResponse.json({ error: 'OpenAI request failed' }, { status: 502 })
    }

    const json = await openaiRes.json()
    const raw: string = json.choices?.[0]?.message?.content ?? '[]'

    // The model returns a json_object so unwrap if it's wrapped in a key
    let parsed: unknown
    try {
      parsed = JSON.parse(raw)
    } catch {
      return NextResponse.json({ error: 'LLM returned invalid JSON' }, { status: 502 })
    }

    // Allow { presets: [...] } or { themes: [...] } or bare array
    const arr: unknown[] = Array.isArray(parsed)
      ? parsed
      : (parsed as Record<string, unknown[]>)['presets'] ??
        (parsed as Record<string, unknown[]>)['themes'] ??
        Object.values(parsed as Record<string, unknown[]>)[0] ??
        []

    const presets: Preset[] = arr.slice(0, 3).map((item: unknown, i: number) => {
      const p = item as Record<string, unknown>
      return {
        id: `vision-${i}`,
        name: String(p.name ?? 'Custom'),
        description: String(p.description ?? ''),
        seed: /^#[0-9a-fA-F]{6}$/.test(String(p.seed)) ? String(p.seed) : '#3a7bd5',
        fontPairIndex: Math.max(0, Math.min(17, Number(p.fontPairIndex ?? 0))),
        density: toDensity(p.density),
        borderRadius: toBorderRadius(p.borderRadius),
        shadow: toShadow(p.shadow),
        headingStyle: toHeadingStyle(p.headingStyle),
        componentStyle: toComponentStyle(p.componentStyle),
        keywords: Array.isArray(p.keywords) ? p.keywords.map(String) : [],
      }
    })

    return NextResponse.json({ presets })
  } catch (err) {
    console.error('[theme-vision]', err)
    return NextResponse.json({ error: 'OpenAI request failed' }, { status: 502 })
  }
}
