'use client'

import { useCallback } from 'react'
import styles from './VisionInput.module.css'

interface Props {
  value: string
  onChange: (text: string) => void
  onGenerate: () => void
  isGenerating?: boolean
  error?: string | null
}

export function VisionInput({ value, onChange, onGenerate, isGenerating, error }: Props) {
  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
      if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault()
        if (value.trim() && !isGenerating) onGenerate()
      }
    },
    [value, onGenerate, isGenerating],
  )

  return (
    <div>
      <textarea
        className={`${styles.textarea} ${isGenerating ? styles.loading : ''}`}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="whatcha cooking?"
        rows={3}
        disabled={isGenerating}
      />
      {error
        ? <span className={styles.error}>{error}</span>
        : <span className={styles.hint}>{isGenerating ? 'Generating…' : 'Press Enter to generate presets'}</span>
      }
    </div>
  )
}
