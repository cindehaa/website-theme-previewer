'use client'

import { useState } from 'react'
import { seedToPalette } from '../lib/colorEngine'
import type { Preset } from '../lib/presets'
import styles from './PresetSelector.module.css'

interface Props {
  presets: Preset[]
  activeId: string
  onSelect: (id: string) => void
}

export function PresetSelector({ presets, activeId, onSelect }: Props) {
  const [query, setQuery] = useState('')

  const filtered = query.trim()
    ? presets.filter(
        (p) =>
          p.name.toLowerCase().includes(query.toLowerCase()) ||
          p.description?.toLowerCase().includes(query.toLowerCase()),
      )
    : presets

  return (
    <div className={styles.wrapper}>
      <input
        className={styles.searchInput}
        type="text"
        placeholder="Search presets…"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <div className={styles.grid}>
        {filtered.map((preset) => {
          const palette = seedToPalette(preset.seed)
          const isActive = preset.id === activeId

          return (
            <button
              key={preset.id}
              className={isActive ? styles.cardActive : styles.card}
              onClick={() => onSelect(preset.id)}
            >
              <div className={styles.swatches}>
                {[palette.bg, palette.accent, palette.accentLight, palette.text, palette.textMuted].map(
                  (c, i) => (
                    <span key={i} className={styles.swatch} style={{ background: c }} />
                  ),
                )}
              </div>
              <div className={styles.info}>
                <div className={styles.name}>{preset.name}</div>
                <div className={styles.desc}>{preset.description}</div>
              </div>
            </button>
          )
        })}
      </div>
    </div>
  )
}
