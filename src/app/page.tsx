/**
 * Website Theme Previewer — generate colour & font palettes, preview them
 * on a live mock site, and download a theme.md for AI agents to reference.
 */
'use client'

import { useState, useCallback, useMemo, useRef, useEffect } from 'react'
import type { ColorTokens, Density, Animation, Typography, DarkLightTheme, BorderRadius, Shadow, HeadingStyle, ComponentStyle } from './lib/types'
import type { Preset } from './lib/presets'
import { seedToPalette, deriveLightMode } from './lib/colorEngine'
import { PRESETS } from './lib/presets'
import { FONT_PAIRS } from './lib/fontPairings'
import { generateMarkdown } from './lib/generateMarkdown'
import { ensureStylesheetLink } from './lib/stylesheet'

import { PresetSelector } from './components/PresetSelector'
import { SeedColorPicker } from './components/SeedColorPicker'
import { FontPairPicker } from './components/FontPairPicker'
import { DensitySlider } from './components/DensitySlider'
import { AnimationPicker } from './components/AnimationPicker'
import { VisionInput } from './components/VisionInput'
import { DownloadButton } from './components/DownloadButton'
import { ThemePreview } from './components/ThemePreview'
import { ComponentGallery } from './components/ComponentGallery'
import { DarkLightToggle } from './components/DarkLightToggle'
import { CollapsibleSection } from './components/CollapsibleSection'

import styles from './page.module.css'

export default function ThemePreviewerPage() {
  /* ── state ────────────────────────────────────────────────────── */
  const [activePresetId, setActivePresetId] = useState(PRESETS[0].id)
  const [seedColor, setSeedColor] = useState(PRESETS[0].seed)
  const [fontPairIndex, setFontPairIndex] = useState(PRESETS[0].fontPairIndex)
  const [density, setDensity] = useState<Density>(PRESETS[0].density)
  const [animation, setAnimation] = useState<Animation>('subtle')
  const [borderRadius, setBorderRadius] = useState<BorderRadius>(PRESETS[0].borderRadius)
  const [shadow, setShadow] = useState<Shadow>(PRESETS[0].shadow)
  const [headingStyle, setHeadingStyle] = useState<HeadingStyle>(PRESETS[0].headingStyle)
  const [componentStyle, setComponentStyle] = useState<ComponentStyle>(PRESETS[0].componentStyle)
  const [visionText, setVisionText] = useState('')
  const [generatedPresets, setGeneratedPresets] = useState<Preset[]>([])
  const [isGenerating, setIsGenerating] = useState(false)
  const [visionError, setVisionError] = useState<string | null>(null)
  const [themeName, setThemeName] = useState(PRESETS[0].name)
  const [previewMode, setPreviewMode] = useState<'dark' | 'light'>('dark')
  const [controlsWidth, setControlsWidth] = useState(340)
  const [collapsed, setCollapsed] = useState(false)
  const controlsWidthRef = useRef(340)

  /* ── eager-load all preset fonts on mount ────────────────────── */
  useEffect(() => {
    const injected = new Set<string>()
    PRESETS.forEach((p) => {
      const url = FONT_PAIRS[p.fontPairIndex]?.googleFontsUrl
      if (url && !injected.has(url)) {
        injected.add(url)
        ensureStylesheetLink(url)
      }
    })
  }, [])

  /* ── derived ──────────────────────────────────────────────────── */
  const darkColors = useMemo(() => seedToPalette(seedColor), [seedColor])
  const lightColors = useMemo(() => deriveLightMode(darkColors), [darkColors])
  const activeColors = previewMode === 'dark' ? darkColors : lightColors
  const fontPair = FONT_PAIRS[fontPairIndex]

  const typography: Typography = useMemo(
    () => ({
      headingFont: fontPair.heading,
      bodyFont: fontPair.body,
      monoFont: fontPair.mono,
    }),
    [fontPair],
  )

  const allPresets = useMemo(
    () => [...generatedPresets, ...PRESETS],
    [generatedPresets],
  )

  /* ── handlers ─────────────────────────────────────────────────── */
  const handleVisionGenerate = useCallback(async () => {
    if (!visionText.trim()) return
    setIsGenerating(true)
    setVisionError(null)
    let presets: Preset[] = []
    try {
      const res = await fetch('/api/theme-vision', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: visionText }),
      })
      if (res.ok) {
        const data = await res.json()
        presets = data.presets
      } else {
        setVisionError('Feature not available')
      }
    } catch {
      setVisionError('Feature not available')
    } finally {
      setIsGenerating(false)
    }
    if (presets.length > 0) {
      setGeneratedPresets(presets)
      const first = presets[0]
      setActivePresetId(first.id)
      setThemeName(first.name)
      setSeedColor(first.seed)
      setFontPairIndex(first.fontPairIndex)
      setDensity(first.density)
      setBorderRadius(first.borderRadius)
      setShadow(first.shadow)
      setHeadingStyle(first.headingStyle)
      setComponentStyle(first.componentStyle)
    }
  }, [visionText])

  const handlePresetSelect = useCallback(
    (id: string) => {
      const preset = allPresets.find((p) => p.id === id)
      if (!preset) return
      setActivePresetId(id)
      setThemeName(preset.name)
      setSeedColor(preset.seed)
      setFontPairIndex(preset.fontPairIndex)
      setDensity(preset.density)
      setBorderRadius(preset.borderRadius)
      setShadow(preset.shadow)
      setHeadingStyle(preset.headingStyle)
      setComponentStyle(preset.componentStyle)
    },
    [allPresets],
  )

  const handleResizeMouseDown = useCallback((e: React.MouseEvent) => {
    if (collapsed) return
    e.preventDefault()
    const startX = e.clientX
    const startWidth = controlsWidthRef.current
    const onMouseMove = (mv: MouseEvent) => {
      const newWidth = Math.max(200, Math.min(560, startWidth + mv.clientX - startX))
      controlsWidthRef.current = newWidth
      setControlsWidth(newWidth)
    }
    const onMouseUp = () => {
      document.removeEventListener('mousemove', onMouseMove)
      document.removeEventListener('mouseup', onMouseUp)
    }
    document.addEventListener('mousemove', onMouseMove)
    document.addEventListener('mouseup', onMouseUp)
  }, [collapsed])

  const handleSeedChange = useCallback((hex: string) => {
    setSeedColor(hex)
    setActivePresetId('') // clear preset highlight since user customised
  }, [])

  const handleDownload = useCallback(() => {
    const fullTheme: DarkLightTheme = {
      dark: { name: themeName, colors: darkColors, typography, density, animation, borderRadius, shadow, headingStyle, componentStyle },
      light: { name: themeName, colors: lightColors, typography, density, animation, borderRadius, shadow, headingStyle, componentStyle },
    }

    const md = generateMarkdown(fullTheme)
    const blob = new Blob([md], { type: 'text/markdown;charset=utf-8' })
    const url = URL.createObjectURL(blob)
    const slug = themeName.trim().replace(/[^a-zA-Z0-9]+/g, '-').replace(/^-|-$/g, '') || 'Custom'
    const a = document.createElement('a')
    a.href = url
    a.download = `THEME-${slug}.md`
    a.click()
    URL.revokeObjectURL(url)
  }, [themeName, darkColors, lightColors, typography, density, animation, borderRadius, shadow, headingStyle, componentStyle])

  /* ── render ───────────────────────────────────────────────────── */
  return (
    <div className={styles.pageWrap}>
    <div className={styles.page}>
      <div className={styles.header}>
        <h1 className={styles.title}>Website Theme Previewer</h1>
        <p className={styles.subtitle}>Generate · Preview · Download as THEME.md</p>
      </div>

      <div
        className={styles.workspace}
        style={{ gridTemplateColumns: `${collapsed ? 0 : controlsWidth}px 12px 1fr` }}
      >
        {/* ── Controls (left) ───────────────────────────── */}
        <div className={`${styles.controls}${collapsed ? ` ${styles.controlsCollapsed}` : ''}`}>
          <CollapsibleSection label="Vision">
            <VisionInput value={visionText} onChange={(t) => { setVisionText(t); setVisionError(null) }} onGenerate={handleVisionGenerate} isGenerating={isGenerating} error={visionError} />
          </CollapsibleSection>

          <CollapsibleSection label="Presets">
            <PresetSelector
              presets={allPresets}
              activeId={activePresetId}
              onSelect={handlePresetSelect}
            />
          </CollapsibleSection>

          <CollapsibleSection label="Seed Colour">
            <SeedColorPicker value={seedColor} onChange={handleSeedChange} />
          </CollapsibleSection>

          <CollapsibleSection label="Font Pairing">
            <FontPairPicker
              pairs={FONT_PAIRS}
              activeIndex={fontPairIndex}
              onSelect={setFontPairIndex}
            />
          </CollapsibleSection>

          <CollapsibleSection label="Content Density">
            <DensitySlider value={density} onChange={setDensity} />
          </CollapsibleSection>

          <CollapsibleSection label="Animation">
            <AnimationPicker value={animation} onChange={setAnimation} />
          </CollapsibleSection>

          <div className={styles.downloadBar}>
            <input
              className={styles.themeNameInput}
              type="text"
              value={themeName}
              onChange={(e) => setThemeName(e.target.value)}
              placeholder="Theme name"
              aria-label="Theme name"
            />
            <DownloadButton
              onClick={handleDownload}
              fileName={`THEME-${themeName.trim().replace(/[^a-zA-Z0-9]+/g, '-').replace(/^-|-$/g, '') || 'Custom'}.md`}
            />
          </div>
        </div>

        {/* ── Resize handle ─────────────────────────────── */}
        <div
          className={`${styles.resizeHandle}${collapsed ? ` ${styles.resizeHandleCollapsed}` : ''}`}
          onMouseDown={handleResizeMouseDown}
        >
          <button
            className={styles.collapseBtn}
            onClick={() => setCollapsed(c => !c)}
            title={collapsed ? 'Expand settings' : 'Collapse settings'}
          >
            {collapsed ? '›' : '‹'}
          </button>
        </div>

        {/* ── Preview (right) ──────────────────────────── */}
        <div className={styles.preview}>
          <DarkLightToggle mode={previewMode} onChange={setPreviewMode} />
          <ThemePreview
            colors={activeColors}
            typography={typography}
            density={density}
            animation={animation}
            fontPair={fontPair}
            borderRadius={borderRadius}
            shadow={shadow}
            headingStyle={headingStyle}
            componentStyle={componentStyle}
            presetName={allPresets.find(p => p.id === activePresetId)?.name}
          />
          <ComponentGallery
            colors={activeColors}
            typography={typography}
            density={density}
            animation={animation}
            fontPair={fontPair}
            borderRadius={borderRadius}
            shadow={shadow}
            headingStyle={headingStyle}
            componentStyle={componentStyle}
            presetName={allPresets.find(p => p.id === activePresetId)?.name}
          />
        </div>
      </div>
    </div>
    </div>
  )
}
