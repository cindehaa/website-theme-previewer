'use client'

import styles from './DarkLightToggle.module.css'

interface Props {
  mode: 'dark' | 'light'
  onChange: (mode: 'dark' | 'light') => void
}

export function DarkLightToggle({ mode, onChange }: Props) {
  return (
    <div className={styles.toggle}>
      <button
        className={mode === 'dark' ? styles.optionActive : styles.option}
        onClick={() => onChange('dark')}
      >
        ● Dark
      </button>
      <button
        className={mode === 'light' ? styles.optionActive : styles.option}
        onClick={() => onChange('light')}
      >
        ○ Light
      </button>
    </div>
  )
}
