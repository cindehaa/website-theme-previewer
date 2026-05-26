'use client'

import { useMemo } from 'react'
import type { ColorTokens, Density, Animation, Typography, BorderRadius, Shadow, HeadingStyle, ComponentStyle } from '../lib/types'
import { DENSITY_SCALE, BORDER_RADIUS_MAP, HEADING_STYLE_MAP } from '../lib/types'
import type { FontPair } from '../lib/fontPairings'
import styles from './ComponentGallery.module.css'

function computeShadow(shadow: Shadow, accent: string): string {
  switch (shadow) {
    case 'none':    return 'none'
    case 'subtle':  return '0 2px 8px rgba(0,0,0,0.18), 0 1px 2px rgba(0,0,0,0.12)'
    case 'colored': return `0 4px 20px ${accent}55, 0 1px 3px rgba(0,0,0,0.15)`
    case 'layered': return `0 1px 2px rgba(0,0,0,0.2), 0 4px 16px rgba(0,0,0,0.2), 0 0 0 1px ${accent}30`
  }
}

interface Props {
  colors: ColorTokens
  typography: Typography
  density: Density
  animation: Animation
  fontPair: FontPair
  borderRadius: BorderRadius
  shadow: Shadow
  headingStyle: HeadingStyle
  componentStyle: ComponentStyle
  presetName?: string
}

export function ComponentGallery({ colors, typography, density, animation, fontPair, borderRadius, shadow, headingStyle, componentStyle, presetName }: Props) {
  const spacing = DENSITY_SCALE[density]
  const hs = HEADING_STYLE_MAP[headingStyle]

  const galleryModClass: string = {
    saas:       '',
    editorial:  styles.galleryEditorial,
    brutalist:  styles.galleryBrutalist,
    minimal:    styles.galleryMinimal,
    magazine:   styles.galleryMagazine,
    wedding:    styles.galleryWedding,
    avant:      styles.galleryAvant,
    orbital:    '',
    academic:   '',
    geocities:  '',
  }[componentStyle]

  const cssVars = useMemo(
    () =>
      ({
        '--tok-bg': colors.bg,
        '--tok-text': colors.text,
        '--tok-text-muted': colors.textMuted,
        '--tok-accent': colors.accent,
        '--tok-accent-light': colors.accentLight,
        '--tok-surface': colors.surface,
        '--tok-surface-hover': colors.surfaceHover,
        '--tok-border': colors.border,
        '--tok-success': colors.success,
        '--tok-warning': colors.warning,
        '--tok-error': colors.error,
        '--preview-gap': spacing.gap,
        '--preview-padding': spacing.padding,
        '--preview-radius': BORDER_RADIUS_MAP[borderRadius],
        '--preview-shadow': computeShadow(shadow, colors.accent),
        '--preview-heading-weight': String(hs.weight),
        '--preview-heading-tracking': hs.tracking,
        '--preview-heading-transform': hs.transform,
        '--anim-dur': animation === 'none' ? '0s' : animation === 'subtle' ? '0.18s' : '0.35s',
        '--anim-ease': animation === 'playful' ? 'cubic-bezier(0.34, 1.56, 0.64, 1)' : 'ease',
        '--anim-hover-y': animation === 'none' ? '0px' : animation === 'subtle' ? '-3px' : '-6px',
        '--anim-hover-scale': animation === 'playful' ? '1.03' : '1',
        backgroundColor: colors.bg,
        color: colors.text,
        fontFamily: typography.bodyFont,
        fontSize: spacing.baseFontSize,
      }) as React.CSSProperties,
    [colors, typography, spacing, animation, borderRadius, shadow, hs],
  )

  return (
    <div className={styles.frame}>
      <div className={styles.frameLabel}>Component Gallery{presetName ? <> — <span style={{ fontStyle: 'italic' }}>{presetName}</span></> : null}</div>
      <div className={`${styles.gallery} ${galleryModClass}`} style={cssVars} data-animation={animation}>
        {/* Typography */}
        <div className={styles.section}>
          <span className={styles.sectionTitle}>Typography</span>
          <div className={styles.typeScale}>
            <div className={styles.typeH1} style={{ fontFamily: typography.headingFont }}>
              Heading One
            </div>
            <div className={styles.typeH2} style={{ fontFamily: typography.headingFont }}>
              Heading Two
            </div>
            <div className={styles.typeH3} style={{ fontFamily: typography.headingFont }}>
              Heading Three
            </div>
            <div className={styles.typeBody}>
              Body text — The quick brown fox jumps over the lazy dog. Good typography is invisible;
              bad typography is everywhere.
            </div>
            <div className={styles.typeMuted}>
              Muted text — secondary information, captions, and helper labels.
            </div>
          </div>
        </div>

        {/* Buttons */}
        <div className={styles.section}>
          <span className={styles.sectionTitle}>Buttons</span>
          <div className={styles.buttonRow}>
            <button className={styles.btnPrimary} style={{ fontFamily: typography.bodyFont }}>
              Primary
            </button>
            <button className={styles.btnSecondary} style={{ fontFamily: typography.bodyFont }}>
              Secondary
            </button>
            <button className={styles.btnGhost} style={{ fontFamily: typography.bodyFont }}>
              Ghost
            </button>
          </div>
        </div>

        {/* Input */}
        <div className={styles.section}>
          <span className={styles.sectionTitle}>Form Input</span>
          <div className={styles.inputGroup}>
            <label className={styles.inputLabel}>Email address</label>
            <input
              className={styles.input}
              type="text"
              placeholder="you@example.com"
              readOnly
              style={{ fontFamily: typography.bodyFont }}
            />
          </div>
        </div>

        {/* Card */}
        <div className={styles.section}>
          <span className={styles.sectionTitle}>Card</span>
          <div className={styles.sampleCard}>
            <div className={styles.cardTitle} style={{ fontFamily: typography.headingFont }}>
              Sample Card Title
            </div>
            <div className={styles.cardBody}>
              This is a sample card component showing surface colour, border radius, and padding at
              the current density level.
            </div>
            <div className={styles.cardFooter}>
              <button className={styles.btnPrimary} style={{ fontFamily: typography.bodyFont }}>
                Action
              </button>
              <button className={styles.btnGhost} style={{ fontFamily: typography.bodyFont }}>
                Cancel
              </button>
            </div>
          </div>
        </div>

        {/* Badges */}
        <div className={styles.section}>
          <span className={styles.sectionTitle}>Badges</span>
          <div className={styles.badgeRow}>
            <span className={styles.badgeAccent}>Accent</span>
            <span className={styles.badgeSuccess}>Success</span>
            <span className={styles.badgeWarning}>Warning</span>
            <span className={styles.badgeError}>Error</span>
          </div>
        </div>
      </div>
    </div>
  )
}
