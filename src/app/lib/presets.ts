/* ── Preset theme starters ────────────────────────────────────── */

import type { Density, BorderRadius, Shadow, HeadingStyle, ComponentStyle } from './types'

export interface Preset {
  id: string
  name: string
  description: string
  seed: string
  fontPairIndex: number
  density: Density
  borderRadius: BorderRadius
  shadow: Shadow
  headingStyle: HeadingStyle
  componentStyle: ComponentStyle
  keywords: string[]
}

export const PRESETS: Preset[] = [
  {
    id: 'corporate',
    name: 'Vibe-Code Hell',
    description: 'what every site looks like these days...',
    seed: '#3b82f6',
    fontPairIndex: 0,
    density: 'comfortable',
    borderRadius: 'soft',
    shadow: 'subtle',
    headingStyle: 'bold',
    componentStyle: 'saas',
    keywords: ['corporate', 'professional', 'clean', 'business', 'formal', 'office', 'saas', 'enterprise'],
  },
  {
    id: 'terminal',
    name: 'Retro Terminal',
    description: 'you fucking nerdddd',
    seed: '#22c55e',
    fontPairIndex: 1,
    density: 'compact',
    borderRadius: 'sharp',
    shadow: 'colored',
    headingStyle: 'regular',
    componentStyle: 'brutalist',
    keywords: ['retro', 'terminal', 'hacker', 'code', 'matrix', 'cli', 'dark', 'developer', 'dev'],
  },
  {
    id: 'zine',
    name: 'Futurist',
    description: 'like those pretentious decorative magazines that nobody actually reads',
    seed: '#ccff00',
    fontPairIndex: 19,
    density: 'compact',
    borderRadius: 'sharp',
    shadow: 'none',
    headingStyle: 'black',
    componentStyle: 'avant',
    keywords: ['art', 'zine', 'avant-garde', 'abstract', 'modern', 'quirky', 'experimental', 'asymmetric', 'bold'],
  },
  {
    id: 'blossom',
    name: 'Live Laugh Love',
    description: 'disgustingly romantic',
    seed: '#d4748a',
    fontPairIndex: 18,
    density: 'airy',
    borderRadius: 'pill',
    shadow: 'subtle',
    headingStyle: 'regular',
    componentStyle: 'wedding',
    keywords: ['artsy', 'cursive', 'romantic', 'cottagecore', 'rose', 'pink', 'feminine', 'cozy', 'floral', 'soft', 'wedding', 'elegant'],
  },
  {
    id: 'ink',
    name: 'Performative',
    description: 'get your matcha and tote bags for this one',
    seed: '#967bb6',
    fontPairIndex: 9,
    density: 'airy',
    borderRadius: 'soft',
    shadow: 'none',
    headingStyle: 'thin',
    componentStyle: 'minimal',
    keywords: ['minimal', 'ink', 'simple', 'editorial', 'typography', 'blog', 'content', 'classic'],
  },
  {
    id: 'orbital',
    name: 'Orbital',
    description: "it's not rocket science... oh wait",
    seed: '#1e3a8a',
    fontPairIndex: 4,
    density: 'comfortable',
    borderRadius: 'soft',
    shadow: 'subtle',
    headingStyle: 'regular',
    componentStyle: 'orbital',
    keywords: ['space', 'geospatial', 'satellite', 'orbital', 'cosmos', 'astronomy', 'stars', 'universe', 'galaxy', 'mission', 'control', 'tech', 'data', 'visualization', 'map', 'gis'],
  },
  {
    id: 'geocities',
    name: 'GeoCities Nostalgia',
    description: 'haiiiiiiiiiii welcome to my homepage!!!',
    seed: '#ff00ff',
    fontPairIndex: 4,
    density: 'comfortable',
    borderRadius: 'sharp',
    shadow: 'layered',
    headingStyle: 'black',
    componentStyle: 'geocities',
    keywords: ['90s', 'retro', 'geocities', 'nostalgia', 'web1.0', 'vintage', 'internet', 'old school', 'neon', 'guestbook'],
  },
]
