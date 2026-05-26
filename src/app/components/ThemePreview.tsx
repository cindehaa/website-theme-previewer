'use client'

import { useMemo } from 'react'
import type { ColorTokens, Density, Animation, Typography, BorderRadius, Shadow, HeadingStyle, ComponentStyle } from '../lib/types'
import { DENSITY_SCALE, BORDER_RADIUS_MAP, HEADING_STYLE_MAP } from '../lib/types'
import type { FontPair } from '../lib/fontPairings'
import styles from './ThemePreview.module.css'

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

const SAAS_FEATURES = [
  { icon: '◆', num: '01', title: 'Agentic',     desc: 'Proprietary AI agents autonomously orchestrate your entire digital ecosystem — end-to-end.' },
  { icon: '◇', num: '02', title: 'Scalable',    desc: 'Infinitely scalable cloud-native infrastructure — leveraging next-gen LLM pipelines at every touchpoint.' },
  { icon: '○', num: '03', title: 'Insightful',  desc: 'Real-time actionable insights — powered by machine learning — surface the signal from the noise.' },
]

const BRUTALIST_FEATURES = [
  { icon: '◆', num: '01', title: 'Recursion',   desc: 're·cur·sion (/rəˈkərZH(ə)n/). see "recursion".' },
  { icon: '◇', num: '02', title: 'Pointer',     desc: '0xDEADBEEF. You dereferenced a null pointer again. Go back to CS101.' },
  { icon: '○', num: '03', title: 'O(nⁿ)',  desc: "LGTM. Let's ship it." },
]

const WEDDING_FEATURES = [
  { icon: '♥', num: '01', title: 'Ceremony',   desc: 'Sunday, June 9th at 4am sharp. Dress code: black tie, jeans, and crocs. Whatever.' },
  { icon: '♦', num: '02', title: 'Reception',  desc: 'Leetcoding session to follow immediately after the ceremony. Bring your best Two-Sum tips.' },
  { icon: '○', num: '03', title: 'RSVP',       desc: "Kindly respond by May 1st, 2067. And don't even think about bringing your crying toddlers." },
]

const MINIMAL_FEATURES = [
  { icon: '◦', num: '01', title: 'new arrivals', desc: 'fresh voices, quietly submitted. open calls every season.' },
  { icon: '◦', num: '02', title: 'archive',      desc: 'seven years of verse. every piece still here, still humming.' },
  { icon: '◦', num: '03', title: 'submit',       desc: 'we read everything. we respond to nothing. but we feel it all.' },
]

const AVANT_FEATURES = [
  { icon: '◆', num: '01', title: 'Barbican',  desc: 'Chamberlin, Powell & Bon, 1969–1976. A city within a city, poured in concrete. London never forgave it. London never forgot it.' },
  { icon: '◇', num: '02', title: 'Trellick',  desc: 'Erno Goldfinger, 1972. 31 storeys of raw social housing. Hated at first. Grade II* listed by 1998.' },
  { icon: '○', num: '03', title: 'Unité',     desc: 'Le Corbusier, 1952. A machine for living in. Street in the sky. The prototype for everything that followed.' },
]

const ORBITAL_FEATURES = [
  { icon: '⊙', coords: 'LAT 51.5074° N', title: 'LANDSAT-9', status: 'ACTIVE', desc: 'Multispectral imaging · 705 km altitude · Next pass: 14:23 UTC' },
  { icon: '◉', coords: 'LON 0.1278° W', title: 'SENTINEL-2A', status: 'OPERATIONAL', desc: 'High-resolution optical · 786 km altitude · Last telemetry: 09:47 UTC' },
  { icon: '◎', coords: 'ALT 408 km', title: 'ISS TRACK', status: 'NOMINAL', desc: 'Position update · Velocity 7.66 km/s · Crew complement: 7' },
]

const GEOCITIES_LINKS = [
  { icon: '🌐', label: 'Yahoo!',       url: 'www.yahoo.com' },
  { icon: '🎵', label: 'Napster',      url: 'www.napster.com' },
  { icon: '💾', label: 'Winamp',       url: 'www.winamp.com' },
  { icon: '📧', label: 'Hotmail',      url: 'www.hotmail.com' },
  { icon: '🎮', label: 'Newgrounds',   url: 'www.newgrounds.com' },
  { icon: '📰', label: 'AltaVista',    url: 'www.altavista.com' },
]

const ACADEMIC_SECTIONS = [
  {
    num: '1',
    title: 'Introduction',
    body: 'The proliferation of generative color systems has produced a vast design space that remains largely unexplored. Prior work has addressed static palette curation [1] and perceptual uniformity [2], yet the intersection of seed-color propagation and typographic hierarchy has received scant attention. We address this gap.',
  },
  {
    num: '2',
    title: 'Methodology',
    body: 'We instantiate a generative pipeline operating on a single seed hue s ∈ [0°, 360°) in the OKLCH color space. Tonal surfaces are derived via a luminance-preserving shift function, while accent tokens are computed by rotating s by ±30° and saturating by a factor of 1.4.',
  },
  {
    num: '3',
    title: 'Results & Discussion',
    body: 'Across 847 evaluated seeds, 94.3% of generated palettes satisfied WCAG AA contrast requirements without manual intervention. Mean time-to-theme dropped from 47 min to under 2 min. Crucially, perceived aesthetic quality — rated by 120 participants — did not degrade (p > 0.4).',
  },
  {
    num: '4',
    title: 'Conclusion',
    body: 'We have presented a framework for fully automated UI theme generation grounded in perceptual color theory. Future work will explore dynamic adaptation to ambient lighting conditions and the integration of motion design tokens as first-class parameters.',
  },
]

const ACADEMIC_FINDINGS = [
  { value: '94.3%', label: 'AA compliance' },
  { value: '2 min', label: 'theme generation' },
  { value: 'n = 120', label: 'validation study' },
]

const ACADEMIC_RELATED = [
  { title: 'Adaptive Contrast Systems for Tokenized Interfaces', meta: 'UIST 2025 · 18 min read' },
  { title: 'Palette Curation at Scale in Multi-Brand Systems', meta: 'CHI 2024 · 11 min read' },
  { title: 'Perceptual Metrics for Design Token Pipelines', meta: 'TOCHI 2026 · 23 min read' },
]

const EDITORIAL_FEATURES = [
  { icon: '◆', num: '01', title: 'Fast',      desc: 'Optimised for speed. Every millisecond counts.' },
  { icon: '◇', num: '02', title: 'Flexible',  desc: 'Adapts to your workflow, not the other way around.' },
  { icon: '○', num: '03', title: 'Reliable',  desc: '99.9% uptime. Your users will barely notice us.' },
]

export function ThemePreview({ colors, typography, density, animation, fontPair, borderRadius, shadow, headingStyle, componentStyle, presetName }: Props) {
  const spacing = DENSITY_SCALE[density]
  const hs = HEADING_STYLE_MAP[headingStyle]
  const hf = typography.headingFont

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
      <div className={styles.frameLabel}>Mock Site Preview{presetName ? <> — <span style={{ opacity: 1, fontStyle: 'italic' }}>{presetName}</span></> : null}</div>
      <div className={styles.preview} style={cssVars} data-animation={animation}>

        {/* ── SAAS ─────────────────────────────────────────────── */}
        {componentStyle === 'saas' && <>
          <nav className={styles.nav}>
            <span className={styles.navLogo} style={{ fontFamily: hf }}>AI.ai</span>
            <div className={styles.navLinks}>
              <span className={styles.navLink}>Solutions</span>
              <span className={styles.navLink}>Leverage</span>
              <span className={styles.navLink}>Synergize</span>
            </div>
          </nav>
          <div className={styles.hero}>
            <h2 className={styles.heroTitle} style={{ fontFamily: hf }}>Leverage AI-Powered Synergies at Scale</h2>
            <p className={styles.heroSub}>Our paradigm-shifting platform — disrupting the disruptors — unlocks the full potential of your end-to-end workflow transformation.</p>
            <span className={styles.heroCta}>Start Your Journey →</span>
          </div>
          <div className={styles.features}>
            {SAAS_FEATURES.map((f) => (
              <div key={f.title} className={styles.featureCard}>
                <div className={styles.featureIcon}>{f.icon}</div>
                <div className={styles.featureTitle} style={{ fontFamily: hf }}>{f.title}</div>
                <div className={styles.featureDesc}>{f.desc}</div>
              </div>
            ))}
          </div>
          <div className={styles.footer}>© 2026 AI.ai — Transforming Tomorrow, Today.</div>
        </>}

        {/* ── EDITORIAL ────────────────────────────────────────── */}
        {componentStyle === 'editorial' && <>
          <nav className={styles.editorialNav}>
            <span className={styles.navLogo} style={{ fontFamily: hf }}>Acme Co.</span>
            <span className={styles.editorialVolume}>Vol. 01 — 2026</span>
          </nav>
          <div className={styles.editorialHero}>
            <div className={styles.editorialCategory}>Feature Story</div>
            <h2 className={styles.editorialTitle} style={{ fontFamily: hf }}>Build something beautiful</h2>
            <hr className={styles.editorialRule} />
            <p className={styles.editorialSub}>A modern toolkit for designers and developers who care about craft.</p>
          </div>
          <div className={styles.editorialFeatures}>
            {EDITORIAL_FEATURES.map((f) => (
              <div key={f.num} className={styles.editorialItem}>
                <span className={styles.editorialNum}>{f.num}</span>
                <div>
                  <div className={styles.editorialItemTitle} style={{ fontFamily: hf }}>{f.title}</div>
                  <div className={styles.editorialItemDesc}>{f.desc}</div>
                </div>
              </div>
            ))}
          </div>
          <div className={styles.editorialFooter}>
            <span>Acme Co.</span>
            <span>© 2026</span>
          </div>
        </>}

        {/* ── BRUTALIST ────────────────────────────────────────── */}
        {componentStyle === 'brutalist' && <>
          <nav className={styles.brutalistNav}>
            <span className={styles.brutalistLogo} style={{ fontFamily: hf }}>SYS://ROOT</span>
            <div className={styles.navLinks}>
              <span className={styles.navLink} style={{ textTransform: 'uppercase', letterSpacing: '0.08em' }}>MAN PAGES</span>
              <span className={styles.navLink} style={{ textTransform: 'uppercase', letterSpacing: '0.08em' }}>STACK DUMP</span>
              <span className={styles.navLink} style={{ textTransform: 'uppercase', letterSpacing: '0.08em' }}>CHMOD +X</span>
            </div>
          </nav>
          <div className={styles.brutalistHero}>
            <div className={styles.brutalistIndex}>0xDEADBEEF</div>
            <h2 className={styles.brutalistTitle} style={{ fontFamily: hf }}>01001000 01000101 01001100 01001100 01001111</h2>
            <p className={styles.brutalistSub}>grep -r &apos;meaning&apos; /life | head -n 1 — segmentation fault (core dumped)</p>
            <span className={styles.brutalistCta}>SUDO RUN →</span>
          </div>
          <div className={styles.brutalistFeatures}>
            {BRUTALIST_FEATURES.map((f) => (
              <div key={f.title} className={styles.brutalistRow}>
                <div className={styles.brutalistRowLabel} style={{ fontFamily: hf }}>{f.title.toUpperCase()}</div>
                <div className={styles.brutalistRowDesc}>{f.desc}</div>
              </div>
            ))}
          </div>
          <div className={styles.brutalistFooter}>SYS://ROOT — ALL RIGHTS RESERVED — 0x07E2</div>
        </>}

        {/* ── MINIMAL ──────────────────────────────────────────── */}
        {componentStyle === 'minimal' && <>
          <nav className={styles.minimalNav}>
            <span className={styles.minimalLogo} style={{ fontFamily: hf }}>words</span>
            <div className={styles.navLinks} style={{ opacity: 0.4 }}>
              <span className={styles.navLink}>work</span>
              <span className={styles.navLink}>about</span>
            </div>
          </nav>
          <div className={styles.minimalHero}>
            <h2 className={styles.minimalTitle} style={{ fontFamily: hf }}>s(he) be(lie)ved</h2>
            <p className={styles.minimalSub}>
            a sanctuary for the ethereal incantations of the written word — a digital garden where verse blooms eternal, and every syllable is a seed of wonder.</p>
            <span className={styles.minimalLink}>read →</span>
          </div>
          <div className={styles.minimalFeatures}>
            {MINIMAL_FEATURES.map((f, i) => (
              <div key={f.title}>
                {i > 0 && <hr className={styles.minimalDivider} />}
                <div className={styles.minimalItem}>
                  <div className={styles.minimalItemTitle} style={{ fontFamily: hf }}>{f.title}</div>
                  <div className={styles.minimalItemDesc}>{f.desc}</div>
                </div>
              </div>
            ))}
          </div>
          <div className={styles.minimalFooter}>© 2026 words</div>
        </>}

        {/* ── MAGAZINE ─────────────────────────────────────────── */}
        {componentStyle === 'magazine' && <>
          <header className={styles.magazineHeader}>
            <div className={styles.magazineTopBar}>
              <span>March 2026</span>
              <span>Issue 01</span>
            </div>
            <div className={styles.magazineNavRow}>
              <span className={styles.navLogo} style={{ fontFamily: hf }}>Acme Co.</span>
              <div className={styles.navLinks}>
                <span className={styles.navLink}>Features</span>
                <span className={styles.navLink}>Pricing</span>
                <span className={styles.navLink}>Docs</span>
              </div>
            </div>
          </header>
          <div className={styles.magazineHero}>
            <div className={styles.magazineHeroLeft}>
              <div className={styles.magazineCategory}>Product</div>
              <h2 className={styles.magazineTitle} style={{ fontFamily: hf }}>Build something beautiful</h2>
              <span className={styles.heroCta}>Read More →</span>
            </div>
            <div className={styles.magazineHeroRight}>
              <p className={styles.magazineSubtext}>A modern toolkit for designers and developers who care about craft.</p>
            </div>
          </div>
          <div className={styles.magazineGrid}>
            <div className={styles.magazineMainCard}>
              <div className={styles.featureIcon}>{EDITORIAL_FEATURES[0].icon}</div>
              <div className={styles.magazineCardTitle} style={{ fontFamily: hf }}>{EDITORIAL_FEATURES[0].title}</div>
              <div className={styles.featureDesc}>{EDITORIAL_FEATURES[0].desc}</div>
            </div>
            <div className={styles.magazineSideCards}>
              {EDITORIAL_FEATURES.slice(1).map((f) => (
                <div key={f.title} className={styles.magazineSideCard}>
                  <div className={styles.featureIcon}>{f.icon}</div>
                  <div className={styles.magazineCardTitle} style={{ fontFamily: hf }}>{f.title}</div>
                  <div className={styles.featureDesc}>{f.desc}</div>
                </div>
              ))}
            </div>
          </div>
          <div className={styles.footer}>© 2026 Acme Co. All rights reserved.</div>
        </>}

        {/* ── WEDDING ──────────────────────────────────────────── */}
        {componentStyle === 'wedding' && <>
          <div className={styles.weddingHeader}>
            <div className={styles.weddingMonogram} style={{ fontFamily: hf }}>C &amp; L</div>
            <div className={styles.weddingTagline}>Est. 2067</div>
          </div>
          <div className={styles.weddingDivider}>
            <span className={styles.weddingOrn}>❧</span>
          </div>
          <div className={styles.weddingHero}>
            <div className={styles.weddingDate}>June 9th, 2067 · E7 Bridge, Waterloo</div>
            <h2 className={styles.weddingTitle} style={{ fontFamily: hf }}>Always Living, Laughing, and Loving.</h2>
            <p className={styles.weddingSub}>We joyfully invite you to celebrate the beginning of our forever.</p>
            <span className={styles.weddingCta}>RSVP Now</span>
          </div>
          <div className={styles.weddingDivider}>
            <span className={styles.weddingOrn}>✦</span>
          </div>
          <div className={styles.weddingFeatures}>
            {WEDDING_FEATURES.map((f) => (
              <div key={f.title} className={styles.weddingFeatureItem}>
                <div className={styles.weddingFeatureIcon}>{f.icon}</div>
                <div className={styles.weddingFeatureTitle} style={{ fontFamily: hf }}>{f.title}</div>
                <div className={styles.weddingFeatureDesc}>{f.desc}</div>
              </div>
            ))}
          </div>
          <div className={styles.weddingFooter} style={{ fontFamily: hf }}>With Love — Cindy &amp; Li.</div>
        </>}

        {/* ── AVANT ────────────────────────────────────────────── */}
        {componentStyle === 'avant' && <>
          <div className={styles.avantHeader}>
            <span className={styles.avantLogo} style={{ fontFamily: hf }}>BÉTON BRUT</span>
            <span className={styles.avantIssue}>Vol. I — 1952</span>
          </div>
          <div className={styles.avantSlash}>
            <div className={styles.avantSlashInner}>
              <div className={styles.avantTag}>CONCRETE · MASS · SHELTER</div>
              <h2 className={styles.avantTitle} style={{ fontFamily: hf }}>HONESTY OF MATERIALS</h2>
            </div>
          </div>
          <div className={styles.avantBody}>
            <div className={styles.avantMain}>
              {AVANT_FEATURES.map((f) => (
                <div key={f.title} className={styles.avantRow}>
                  <div className={styles.avantRowNum} style={{ fontFamily: hf }}>{f.num}</div>
                  <div>
                    <div className={styles.avantRowTitle} style={{ fontFamily: hf }}>{f.title.toUpperCase()}</div>
                    <div className={styles.avantRowDesc}>{f.desc}</div>
                  </div>
                </div>
              ))}
            </div>
            <div className={styles.avantSide}>
              <div className={styles.avantAccentBlock} />
              <div className={styles.avantSideText} style={{ fontFamily: hf }}>1952 ED.</div>
            </div>
          </div>
          <div className={styles.avantFooter}>BÉTON BRUT — THE ART OF HONEST CONCRETE</div>
        </>}

        {/* ── ACADEMIC ─────────────────────────────────────────── */}
        {componentStyle === 'academic' && (
          <div className={styles.academicWrap}>
            <nav className={styles.academicNav}>
              <span className={styles.academicNavLogo} style={{ fontFamily: hf }}>Aesthetics&nbsp;Now</span>
              <div className={styles.academicSearch}>
                <span className={styles.academicSearchIcon}>⌕</span>
                <span className={styles.academicSearchPlaceholder}>Search articles, authors, keywords</span>
              </div>
              <div className={styles.academicNavLinks}>
                <span className={styles.academicNavLink}>Browse</span>
                <span className={styles.academicNavLink}>Issues</span>
                <span className={styles.academicNavLink}>Submit</span>
                <span className={styles.academicNavAction}>Sign in</span>
              </div>
            </nav>
            <div className={styles.academicBreadcrumb}>
              <span>Home</span><span className={styles.academicBreadcrumbSep}>/</span>
              <span>Journal of Computational Aesthetics</span><span className={styles.academicBreadcrumbSep}>/</span>
              <span className={styles.academicBreadcrumbCurrent}>Vol.&thinsp;12 No.&thinsp;3</span>
            </div>
            <div className={styles.academicUtilityBar}>
              <div className={styles.academicTabs}>
                <span className={`${styles.academicTab} ${styles.academicTabActive}`}>Overview</span>
                <span className={styles.academicTab}>Full Text</span>
                <span className={styles.academicTab}>Figures</span>
                <span className={styles.academicTab}>References</span>
              </div>
              <div className={styles.academicUtilityMeta}>
                <span>DOI 10.1145/ANS.2026.014</span>
                <span>Published Mar 12, 2026</span>
              </div>
            </div>
            <div className={styles.academicHero}>
              <div className={styles.academicBadges}>
                <span className={styles.academicBadgeFilled}>Open Access</span>
                <span className={styles.academicBadgeOutline}>Peer Reviewed</span>
                <span className={styles.academicBadgeOutline}>Featured Paper</span>
              </div>
              <h1 className={styles.academicTitle} style={{ fontFamily: hf }}>
                Perceptual Resonance in Digital Color Systems: A Generative Approach to UI Theme Synthesis
              </h1>
              <div className={styles.academicAuthors}>A. R. Whitmore &nbsp;&middot;&nbsp; S. K. Okonkwo &nbsp;&middot;&nbsp; J. L. V&aacute;squez</div>
              <div className={styles.academicInstitution}>Department of Human-Computer Interaction, Institute of Applied Design &mdash; March 2026</div>
              <div className={styles.academicMetaRow}>
                <span className={styles.academicMetaPill}>12 pages</span>
                <span className={styles.academicMetaPill}>18 minute read</span>
                <span className={styles.academicMetaPill}>8 figures</span>
                <span className={styles.academicMetaPill}>Supplementary data</span>
              </div>
              <div className={styles.academicActions}>
                <span className={styles.academicBtnPrimary}>&#8595; Download PDF</span>
                <span className={styles.academicBtnGhost}>Cite</span>
                <span className={styles.academicBtnGhost}>BibTeX</span>
                <span className={styles.academicBtnGhost}>Share</span>
              </div>
            </div>
            <div className={styles.academicBody}>
              <main className={styles.academicMain}>
                <div className={styles.academicCard}>
                  <div className={styles.academicCardLabel} style={{ fontFamily: hf }}>Abstract</div>
                  <p className={styles.academicCardText}>
                    We present a seed-color propagation framework for generating perceptually coherent UI themes from a single hue parameter.
                    Operating in OKLCH color space, our system derives surface, accent, and typographic tokens while maintaining WCAG AA compliance
                    across 94.3% of evaluated inputs. A user study (n&thinsp;=&thinsp;120) confirms aesthetic parity with hand-crafted themes.
                    Our approach reduces time-to-theme from 47&thinsp;min to under 2&thinsp;min without degrading perceived quality.
                  </p>
                  <div className={styles.academicKeywords}><strong>Keywords</strong>&ensp;color theory &middot; generative design &middot; UI themes &middot; OKLCH &middot; accessibility</div>
                </div>
                <div className={styles.academicCard}>
                  <div className={styles.academicCardLabel} style={{ fontFamily: hf }}>Key Findings</div>
                  <div className={styles.academicFindings}>
                    {ACADEMIC_FINDINGS.map((finding) => (
                      <div key={finding.label} className={styles.academicFinding}>
                        <div className={styles.academicFindingValue}>{finding.value}</div>
                        <div className={styles.academicFindingLabel}>{finding.label}</div>
                      </div>
                    ))}
                  </div>
                </div>
                <div className={styles.academicCard}>
                  <div className={styles.academicCardLabel} style={{ fontFamily: hf }}>Figures &amp; Data</div>
                  <div className={styles.academicFigureGrid}>
                    <div className={styles.academicFigureCard}>
                      <div className={styles.academicFigurePreview} />
                      <div className={styles.academicFigureCaption}>Figure 2. Token derivation graph across seed rotations.</div>
                    </div>
                    <div className={styles.academicFigureCard}>
                      <div className={`${styles.academicFigurePreview} ${styles.academicFigurePreviewAlt}`} />
                      <div className={styles.academicFigureCaption}>Dataset. 847 generated palettes benchmarked for contrast stability.</div>
                    </div>
                  </div>
                </div>
                {ACADEMIC_SECTIONS.map((s) => (
                  <div key={s.num} className={styles.academicCard}>
                    <div className={styles.academicCardLabel} style={{ fontFamily: hf }}>
                      <span className={styles.academicSectionNum}>{s.num}.</span>&ensp;{s.title}
                    </div>
                    <p className={styles.academicCardText}>{s.body}</p>
                  </div>
                ))}
              </main>
              <aside className={styles.academicSidebar}>
                <div className={styles.academicCard}>
                  <div className={styles.academicCardLabel} style={{ fontFamily: hf }}>On This Page</div>
                  <div className={styles.academicToc}>
                    <span className={styles.academicTocLink}>Abstract</span>
                    {ACADEMIC_SECTIONS.map((s) => (
                      <span key={s.num} className={styles.academicTocLink}>{s.num}. {s.title}</span>
                    ))}
                    <span className={styles.academicTocLink}>References</span>
                  </div>
                </div>
                <div className={styles.academicCard}>
                  <div className={styles.academicCardLabel} style={{ fontFamily: hf }}>Article Metrics</div>
                  <div className={styles.academicStats}>
                    <div className={styles.academicStat}>
                      <div className={styles.academicStatNum}>142</div>
                      <div className={styles.academicStatLabel}>Citations</div>
                    </div>
                    <div className={styles.academicStat}>
                      <div className={styles.academicStatNum}>3.8k</div>
                      <div className={styles.academicStatLabel}>Downloads</div>
                    </div>
                    <div className={styles.academicStat}>
                      <div className={styles.academicStatNum}>12.4k</div>
                      <div className={styles.academicStatLabel}>Views</div>
                    </div>
                  </div>
                </div>
                <div className={styles.academicCard}>
                  <div className={styles.academicCardLabel} style={{ fontFamily: hf }}>Authors</div>
                  <div className={styles.academicAuthorList}>
                    <div className={styles.academicAuthorItem}>
                      <div className={styles.academicAuthorAvatar}>AW</div>
                      <div>
                        <div className={styles.academicAuthorName}>A. R. Whitmore</div>
                        <div className={styles.academicAuthorAffil}>Inst. of Applied Design</div>
                        <div className={styles.academicAuthorMeta}>127 papers · 4.2k citations</div>
                      </div>
                    </div>
                    <div className={styles.academicAuthorItem}>
                      <div className={styles.academicAuthorAvatar}>SO</div>
                      <div>
                        <div className={styles.academicAuthorName}>S. K. Okonkwo</div>
                        <div className={styles.academicAuthorAffil}>Inst. of Applied Design</div>
                        <div className={styles.academicAuthorMeta}>42 papers · 980 citations</div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className={styles.academicCard}>
                  <div className={styles.academicCardLabel} style={{ fontFamily: hf }}>References</div>
                  <div className={styles.academicRef}>[1] Sharma, G. et al. &ldquo;Palette Curation at Scale.&rdquo; CHI 2019.</div>
                  <div className={styles.academicRef}>[2] Luo, M. R. &ldquo;Uniform Color Spaces.&rdquo; Color Res. Appl. 2001.</div>
                  <div className={styles.academicRef}>[3] Whitmore, A. &ldquo;Seed-Hue Propagation.&rdquo; UIST 2025.</div>
                </div>
                <div className={styles.academicCard}>
                  <div className={styles.academicCardLabel} style={{ fontFamily: hf }}>Related Articles</div>
                  <div className={styles.academicRelatedList}>
                    {ACADEMIC_RELATED.map((article) => (
                      <div key={article.title} className={styles.academicRelatedItem}>
                        <div className={styles.academicRelatedTitle}>{article.title}</div>
                        <div className={styles.academicRelatedMeta}>{article.meta}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </aside>
            </div>
            <div className={styles.academicFooter}>
              <span>Journal of Computational Aesthetics</span>
              <span>&copy; 2026 Institute of Applied Design</span>
            </div>
          </div>
        )}

        {/* ── ORBITAL ──────────────────────────────────────────── */}
        {componentStyle === 'orbital' && <>
          <nav className={styles.orbitalNav}>
            <span className={styles.orbitalLogo} style={{ fontFamily: hf }}>MISSION·CTL</span>
            <div className={styles.orbitalCoords}>
              <span className={styles.orbitalCoord}>UTC +00:00</span>
              <span className={styles.orbitalCoord}>10:34:22</span>
            </div>
          </nav>
          <div className={styles.orbitalHero}>
            <div className={styles.orbitalGrid}>
              <div className={styles.orbitalGridLine} />
              <div className={styles.orbitalGridLine} />
              <div className={styles.orbitalGridLine} />
            </div>
            <div className={styles.orbitalHeroContent}>
              <div className={styles.orbitalTag}>GEOSPATIAL OPERATIONS</div>
              <h2 className={styles.orbitalTitle} style={{ fontFamily: hf }}>Real-Time Satellite Constellation Monitoring</h2>
              <p className={styles.orbitalSub}>Track orbital mechanics, analyze telemetry streams, and coordinate ground station passes across global infrastructure.</p>
            </div>
          </div>
          <div className={styles.orbitalFeatures}>
            {ORBITAL_FEATURES.map((f) => (
              <div key={f.title} className={styles.orbitalCard}>
                <div className={styles.orbitalCardHeader}>
                  <div className={styles.orbitalCardIcon}>{f.icon}</div>
                  <div className={styles.orbitalCardCoords}>{f.coords}</div>
                </div>
                <div className={styles.orbitalCardTitle} style={{ fontFamily: hf }}>{f.title}</div>
                <div className={styles.orbitalCardStatus}>{f.status}</div>
                <div className={styles.orbitalCardDesc}>{f.desc}</div>
              </div>
            ))}
          </div>
          <div className={styles.orbitalFooter}>
            <span>MISSION·CTL</span>
            <span>·</span>
            <span>ALL SYSTEMS NOMINAL</span>
          </div>
        </>}

        {/* ── GEOCITIES ─────────────────────────────────────────── */}
        {componentStyle === 'geocities' && <>
          {/* Construction banner */}
          <div className={styles.geocitiesConstruction}>
            <span>🚧</span>
            <span className={styles.geocitiesConstructionText}>UNDER CONSTRUCTION — PLEASE EXCUSE THE MESS!!</span>
            <span>🚧</span>
          </div>

          {/* Site title */}
          <div className={styles.geocitiesTitle} style={{ fontFamily: hf }}>
            ★ ★ ★&nbsp;&nbsp;WELCOME TO MY HOMEPAGE&nbsp;&nbsp;★ ★ ★
          </div>

          {/* Profile row */}
          <div className={styles.geocitiesProfile}>
            <div className={styles.geocitiesAvatar}>
              <div className={styles.geocitiesAvatarImg}>✿</div>
              <div className={styles.geocitiesAvatarCaption}>me irl (2003)</div>
            </div>
            <div className={styles.geocitiesBio}>
              <div className={styles.geocitiesBioName} style={{ fontFamily: hf }}>HELLO!! IM CINDY :)</div>
              <div className={styles.geocitiesBioLine}><span className={styles.geocitiesLabel}>age:</span> 15 (march 14)</div>
              <div className={styles.geocitiesBioLine}><span className={styles.geocitiesLabel}>location:</span> ontario, canada</div>
              <div className={styles.geocitiesBioLine}><span className={styles.geocitiesLabel}>fav band:</span> linkin park + BSB forever</div>
              <div className={styles.geocitiesBioLine}><span className={styles.geocitiesLabel}>this page:</span> <span style={{ fontStyle: 'italic' }}>best viewed netscape 4.0 · 800×600</span></div>
            </div>
          </div>

          {/* Divider */}
          <div className={styles.geocitiesDivider}>
            <span>·:*¨¨*:·.</span><span className={styles.geocitiesDividerText}>MY FAVOURITE LINKS</span><span>·:*¨¨*:·.</span>
          </div>

          {/* Links grid */}
          <div className={styles.geocitiesLinks}>
            {GEOCITIES_LINKS.map((link) => (
              <div key={link.label} className={styles.geocitiesLinkBtn}>
                <span>{link.icon}</span>
                <span className={styles.geocitiesLinkLabel}>{link.label}</span>
                <span className={styles.geocitiesLinkUrl}>{link.url}</span>
              </div>
            ))}
          </div>

          {/* Action row */}
          <div className={styles.geocitiesActions}>
            <span className={styles.geocitiesActionBtn}>✉️ EMAIL ME</span>
            <span className={styles.geocitiesActionBtn}>📖 SIGN GUESTBOOK</span>
            <span className={styles.geocitiesActionBtn}>🏠 ABOUT</span>
          </div>

          {/* Footer / counter */}
          <div className={styles.geocitiesFooter}>
            <div className={styles.geocitiesCounter}>
              <span className={styles.geocitiesCounterLabel}>VISITORS</span>
              <span className={styles.geocitiesCounterNum}>0 0 4 2 1</span>
            </div>
            <div className={styles.geocitiesFooterNote}>
              © 2003 cindyspageforever.geocities.com · all rights reserved · no hotlinking!!
            </div>
          </div>
        </>}

      </div>
    </div>
  )
}
