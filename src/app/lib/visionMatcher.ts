/* ── Vision text → preset matching ────────────────────────────── */

import { PRESETS, type Preset } from './presets'

export interface MatchResult {
  preset: Preset
  score: number
}

export function matchVision(text: string): MatchResult[] {
  if (!text.trim()) {
    return PRESETS.map((p) => ({ preset: p, score: 0 }))
  }

  const words = text
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, '')
    .split(/\s+/)
    .filter(Boolean)

  const results: MatchResult[] = PRESETS.map((preset) => {
    let score = 0
    for (const word of words) {
      for (const kw of preset.keywords) {
        // Exact match
        if (word === kw) {
          score += 3
        }
        // Partial match (word is substring of keyword or vice-versa, 3+ chars)
        else if (word.length >= 3 && (kw.includes(word) || word.includes(kw))) {
          score += 1
        }
      }
    }
    return { preset, score }
  })

  // Sort descending by score, stable-sort preserves original order for ties
  results.sort((a, b) => b.score - a.score)

  return results
}

/** Suggest a seed colour from strong keyword matches */
export function suggestSeedFromVision(text: string): string | null {
  const matches = matchVision(text)
  if (matches.length > 0 && matches[0].score >= 3) {
    return matches[0].preset.seed
  }
  return null
}
