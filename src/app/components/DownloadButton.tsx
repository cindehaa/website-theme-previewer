'use client'

import styles from './DownloadButton.module.css'

interface Props {
  onClick: () => void
  fileName: string
}

export function DownloadButton({ onClick, fileName }: Props) {
  return (
    <button className={styles.button} onClick={onClick}>
      <span className={styles.icon}>↓</span>
      Create {fileName}
    </button>
  )
}
