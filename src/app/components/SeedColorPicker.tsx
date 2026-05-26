'use client'

import { useCallback } from 'react'
import { PRESETS } from '../lib/presets'
import styles from './SeedColorPicker.module.css'

interface Props {
  value: string
  onChange: (hex: string) => void
}

const QUICK_PICKS = PRESETS.slice(0, 6).map((p) => p.seed)

export function SeedColorPicker({ value, onChange }: Props) {
  const handleHexInput = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      let v = e.target.value.trim()
      if (!v.startsWith('#')) v = '#' + v
      if (/^#[0-9a-fA-F]{6}$/.test(v)) {
        onChange(v)
      }
    },
    [onChange],
  )

  return (
    <div>
      <div className={styles.row}>
        <input
          type="color"
          className={styles.colorInput}
          value={value}
          onChange={(e) => onChange(e.target.value)}
        />
        <input
          type="text"
          className={styles.hexInput}
          value={value}
          onChange={handleHexInput}
          placeholder="#3b82f6"
          maxLength={7}
        />
      </div>

      <div className={styles.quickPicks}>
        {QUICK_PICKS.map((hex) => (
          <button
            key={hex}
            className={hex === value ? styles.quickPickActive : styles.quickPick}
            style={{ background: hex }}
            onClick={() => onChange(hex)}
            title={hex}
          />
        ))}
      </div>
    </div>
  )
}
