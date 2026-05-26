'use client'

import type { Density } from '../lib/types'
import styles from './DensitySlider.module.css'

interface Props {
  value: Density
  onChange: (d: Density) => void
}

const OPTIONS: { value: Density; label: string; hint: string }[] = [
  { value: 'airy', label: 'Airy', hint: 'Open & spacious' },
  { value: 'comfortable', label: 'Comfortable', hint: 'Balanced default' },
  { value: 'compact', label: 'Compact', hint: 'Info-dense' },
]

export function DensitySlider({ value, onChange }: Props) {
  return (
    <div className={styles.track}>
      {OPTIONS.map((opt) => (
        <button
          key={opt.value}
          className={opt.value === value ? styles.optionActive : styles.option}
          onClick={() => onChange(opt.value)}
        >
          <span className={styles.label}>{opt.label}</span>
          <span className={styles.hint}>{opt.hint}</span>
        </button>
      ))}
    </div>
  )
}
