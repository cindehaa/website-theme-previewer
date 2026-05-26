'use client'

import { useEffect } from 'react'
import type { FontPair } from '../lib/fontPairings'
import { ensureStylesheetLink } from '../lib/stylesheet'
import styles from './FontPairPicker.module.css'

interface Props {
  pairs: FontPair[]
  activeIndex: number
  onSelect: (index: number) => void
}

/** Tracks which font URLs have already been injected — never remove them once loaded */
const injectedFonts = new Set<string>()

/** Injects a Google Fonts <link> once. Re-calling with the same url is a no-op. */
function useGoogleFont(url: string) {
  useEffect(() => {
    if (injectedFonts.has(url)) return
    injectedFonts.add(url)
    ensureStylesheetLink(url)
  }, [url])
}

export function FontPairPicker({ pairs, activeIndex, onSelect }: Props) {
  // Load the active font pair
  useGoogleFont(pairs[activeIndex].googleFontsUrl)

  return (
    <div className={styles.list}>
      {pairs.map((pair, i) => (
        <button
          key={pair.label}
          className={i === activeIndex ? styles.itemActive : styles.item}
          onClick={() => onSelect(i)}
        >
          <span className={styles.label}>{pair.label}</span>
          <span
            className={styles.specimen}
            style={{ fontFamily: i === activeIndex ? pair.heading : undefined }}
          >
            Aa Bb Cc 123
          </span>
        </button>
      ))}
    </div>
  )
}
