'use client'

import type { Animation } from '../lib/types'
import styles from './AnimationPicker.module.css'

interface Props {
  value: Animation
  onChange: (a: Animation) => void
}

const OPTIONS: { value: Animation; label: string; hint: string }[] = [
  { value: 'none', label: 'None', hint: 'Static UI' },
  { value: 'subtle', label: 'Subtle', hint: 'Soft fades' },
  { value: 'playful', label: 'Playful', hint: 'Bouncy' },
]

export function AnimationPicker({ value, onChange }: Props) {
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
