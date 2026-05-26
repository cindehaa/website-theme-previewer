'use client'

import { useState } from 'react'
import styles from './CollapsibleSection.module.css'

interface Props {
  label: string
  defaultOpen?: boolean
  children: React.ReactNode
}

export function CollapsibleSection({ label, defaultOpen = true, children }: Props) {
  const [open, setOpen] = useState(defaultOpen)

  return (
    <div className={styles.section}>
      <button className={styles.trigger} onClick={() => setOpen((o) => !o)}>
        <span className={styles.label}>{label}</span>
        <span className={open ? styles.chevronOpen : styles.chevron}>▼</span>
      </button>
      {open && <div className={styles.body}>{children}</div>}
    </div>
  )
}
