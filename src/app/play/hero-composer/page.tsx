'use client'

import { useMemo, useRef, useState } from 'react'
import Link from 'next/link'

type Theme = 'bold' | 'minimal' | 'playful'
type CtaStyle = 'primary' | 'secondary'
type PaletteKey = 'electric' | 'sunset' | 'violet' | 'forest'

const HEADLINE_PRESETS = [
  'Turn your idea into a product people love',
  'Launch faster with clean, modern UX',
  'From concept to MVP — delivered',
  'Build something delightful and durable',
  'Your app, beautifully engineered',
  'Elegant software, real results'
]

const SUB_PRESETS = [
  'I design and build user‑first products with pragmatic engineering.',
  'Let’s bring your vision to life with clarity and craft.',
  'Senior engineer with a product mindset — shipping is the strategy.',
  'AI/ML when it helps, simplicity when it matters.'
]

const PALETTES: Record<
  PaletteKey,
  { name: string; from: string; to: string; accent: string }
> = {
  electric: {
    name: 'Electric',
    from: 'from-electric',
    to: 'to-electric-secondary',
    accent: 'text-electric'
  },
  sunset: {
    name: 'Sunset',
    from: 'from-orange-500',
    to: 'to-pink-500',
    accent: 'text-orange-400'
  },
  violet: {
    name: 'Violet',
    from: 'from-purple-500',
    to: 'to-fuchsia-500',
    accent: 'text-purple-400'
  },
  forest: {
    name: 'Forest',
    from: 'from-emerald-500',
    to: 'to-teal-500',
    accent: 'text-emerald-400'
  }
}

export default function HeroComposerPage() {
  const [theme, setTheme] = useState<Theme>('bold')
  const [palette, setPalette] = useState<PaletteKey>('electric')
  const [headline, setHeadline] = useState(HEADLINE_PRESETS[0])
  const [subhead, setSubhead] = useState(SUB_PRESETS[0])
  const [ctaText, setCtaText] = useState('Get Started')
  const [ctaStyle, setCtaStyle] = useState<CtaStyle>('primary')
  const [dark, setDark] = useState(true)
  const [mobileMode, setMobileMode] = useState<'preview' | 'build'>('preview')

  const previewRef = useRef<HTMLDivElement>(null)

  const paletteCfg = PALETTES[palette]

  const wrapperClasses = useMemo(() => {
    return [
      'rounded-2xl border border-border overflow-hidden',
      dark
        ? 'bg-gradient-to-br from-dark via-dark-secondary to-surface'
        : 'bg-white'
    ].join(' ')
  }, [dark])

  const heroBg = useMemo(() => {
    switch (theme) {
      case 'bold':
        return `relative isolate px-8 py-20 md:py-28 text-center`
      case 'minimal':
        return `relative isolate px-8 py-16 md:py-24`
      case 'playful':
        return `relative isolate px-8 py-20 md:py-28`
    }
  }, [theme])

  const gradientOverlay = `absolute inset-0 bg-gradient-to-r ${paletteCfg.from} ${paletteCfg.to} opacity-15 pointer-events-none`

  const titleClasses = useMemo(() => {
    const base = 'font-display font-black tracking-tight'
    const size = 'text-5xl md:text-7xl'
    if (theme === 'minimal')
      return `${base} ${size} ${dark ? 'text-light' : 'text-gray-900'}`
    if (theme === 'playful')
      return `${base} ${size} bg-clip-text text-transparent bg-gradient-to-r ${paletteCfg.from} ${paletteCfg.to}`
    // bold
    return `${base} ${size} ${dark ? 'text-light' : 'text-gray-900'}`
  }, [theme, paletteCfg, dark])

  const subClasses = `${
    dark ? 'text-muted' : 'text-gray-600'
  } text-lg md:text-xl max-w-2xl mx-auto mt-4`

  const ctaClasses = useMemo(() => {
    const base =
      'inline-flex items-center gap-2 px-6 py-3 rounded-full font-semibold transition-transform duration-200 hover:scale-105'
    if (ctaStyle === 'secondary')
      return `${base} border ${
        dark ? 'border-electric text-electric' : 'border-gray-900 text-gray-900'
      }`
    // primary
    return `${base} text-dark bg-gradient-to-r ${paletteCfg.from} ${paletteCfg.to}`
  }, [ctaStyle, paletteCfg, dark])

  const copyHtml = async () => {
    const node = previewRef.current
    if (!node) return
    // Produce a simple, portable snippet (no Tailwind build expected on consumer side)
    // We’ll snapshot the inner content with inline style fallback.
    const html = node.innerHTML
    await navigator.clipboard.writeText(html)
  }

  return (
    <main className='min-h-screen bg-gradient-to-br from-dark via-dark-secondary to-surface px-6 py-10 pb-28 lg:pb-10'>
      {/* Back to Work */}
      <div className='fixed top-3 left-3 md:top-6 md:left-6 z-50'>
        <Link
          href='/work'
          className='inline-flex items-center gap-2 px-3 py-1.5 md:px-4 md:py-2 rounded-full bg-black/40 text-white border border-white/20 backdrop-blur-md hover:bg-black/50 transition'
        >
          <svg
            viewBox='0 0 24 24'
            fill='none'
            stroke='currentColor'
            strokeWidth='1.5'
            className='h-5 w-5'
            aria-hidden
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              d='M15 19l-7-7 7-7'
            />
          </svg>
          <span className='hidden sm:inline'>Back to Work</span>
        </Link>
      </div>
      {/* Mobile view switcher */}
      <div className='lg:hidden flex justify-center mb-6'>
        <div className='inline-flex rounded-full border border-white/20 bg-black/30 backdrop-blur-md p-1'>
          <button
            onClick={() => setMobileMode('preview')}
            className={`px-4 py-1.5 rounded-full text-sm ${
              mobileMode === 'preview'
                ? 'bg-white text-dark font-semibold'
                : 'text-white/80'
            }`}
          >
            Preview
          </button>
          <button
            onClick={() => setMobileMode('build')}
            className={`px-4 py-1.5 rounded-full text-sm ${
              mobileMode === 'build'
                ? 'bg-white text-dark font-semibold'
                : 'text-white/80'
            }`}
          >
            Build
          </button>
        </div>
      </div>
      <div className='max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8'>
        {/* Controls */}
        <aside
          className={`order-2 lg:order-none lg:col-span-1 bg-surface border border-border rounded-2xl p-6 h-fit lg:sticky lg:top-6 ${
            mobileMode === 'preview' ? 'hidden' : ''
          } lg:block`}
        >
          <h2 className='text-light font-display text-xl font-bold mb-4'>
            Hero Composer
          </h2>
          <div className='space-y-5'>
            {/* Theme */}
            <div>
              <label className='block text-sm text-muted mb-2'>Theme</label>
              <div className='grid grid-cols-3 gap-2'>
                {(['bold', 'minimal', 'playful'] as Theme[]).map((t) => (
                  <button
                    key={t}
                    onClick={() => setTheme(t)}
                    className={`px-3.5 py-2.5 rounded-lg border transition ${
                      theme === t
                        ? 'border-electric text-electric'
                        : 'border-border text-light/80 hover:border-electric/50'
                    }`}
                  >
                    {t}
                  </button>
                ))}
              </div>
            </div>

            {/* Palette */}
            <div>
              <label className='block text-sm text-muted mb-2'>Palette</label>
              <div className='grid grid-cols-4 gap-2'>
                {(Object.keys(PALETTES) as PaletteKey[]).map((p) => (
                  <button
                    key={p}
                    onClick={() => setPalette(p)}
                    className={`px-3.5 py-6 rounded-lg border transition bg-gradient-to-r ${
                      PALETTES[p].from
                    } ${PALETTES[p].to} ${
                      palette === p ? 'border-electric' : 'border-border'
                    }`}
                    aria-label={PALETTES[p].name}
                    title={PALETTES[p].name}
                  >
                    <span className='sr-only'>{PALETTES[p].name}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Headline */}
            <div>
              <label className='block text-sm text-muted mb-2'>Headline</label>
              <select
                className='w-full rounded-lg bg-dark-secondary border border-border text-light p-3 text-base'
                value={headline}
                onChange={(e) => setHeadline(e.target.value)}
              >
                {HEADLINE_PRESETS.map((h) => (
                  <option key={h} value={h}>
                    {h}
                  </option>
                ))}
              </select>
              <input
                className='w-full mt-2 rounded-lg bg-dark-secondary border border-border text-light p-3 text-base'
                value={headline}
                onChange={(e) => setHeadline(e.target.value)}
              />
            </div>

            {/* Subhead */}
            <div>
              <label className='block text-sm text-muted mb-2'>
                Subheading
              </label>
              <select
                className='w-full rounded-lg bg-dark-secondary border border-border text-light p-3 text-base'
                value={subhead}
                onChange={(e) => setSubhead(e.target.value)}
              >
                {SUB_PRESETS.map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </select>
              <input
                className='w-full mt-2 rounded-lg bg-dark-secondary border border-border text-light p-3 text-base'
                value={subhead}
                onChange={(e) => setSubhead(e.target.value)}
              />
            </div>

            {/* CTA */}
            <div className='grid grid-cols-2 gap-3'>
              <div>
                <label className='block text-sm text-muted mb-2'>
                  CTA Text
                </label>
                <input
                  className='w-full rounded-lg bg-dark-secondary border border-border text-light p-3 text-base'
                  value={ctaText}
                  onChange={(e) => setCtaText(e.target.value)}
                />
              </div>
              <div>
                <label className='block text-sm text-muted mb-2'>
                  CTA Style
                </label>
                <select
                  className='w-full rounded-lg bg-dark-secondary border border-border text-light p-3 text-base'
                  value={ctaStyle}
                  onChange={(e) => setCtaStyle(e.target.value as CtaStyle)}
                >
                  <option value='primary'>Primary</option>
                  <option value='secondary'>Secondary</option>
                </select>
              </div>
            </div>

            {/* Mode */}
            <div className='flex items-center justify-between'>
              <span className='text-sm text-muted'>Dark mode</span>
              <button
                onClick={() => setDark((d) => !d)}
                className={`px-3 py-1 rounded-full border ${
                  dark
                    ? 'border-electric text-electric'
                    : 'border-border text-light/80'
                }`}
                aria-pressed={dark}
              >
                {dark ? 'On' : 'Off'}
              </button>
            </div>

            {/* Actions (desktop only; mobile uses sticky bar) */}
            <div className='pt-2 hidden lg:flex lg:flex-col gap-2'>
              <button
                onClick={copyHtml}
                className='px-4 py-2 rounded-lg border border-electric text-electric hover:bg-electric hover:text-dark transition'
              >
                Copy HTML Snippet
              </button>
              <button
                disabled
                title='Share URL coming next'
                className='px-4 py-2 rounded-lg border border-border text-muted cursor-not-allowed'
              >
                Copy Share URL (soon)
              </button>
            </div>
          </div>
        </aside>

        {/* Preview */}
        <section
          className={`order-1 lg:order-none lg:col-span-2 ${
            mobileMode === 'build' ? 'hidden' : ''
          } lg:block`}
        >
          <div ref={previewRef} className={wrapperClasses}>
            <div className={heroBg}>
              {/* Gradient accent */}
              <div className={gradientOverlay} aria-hidden='true' />

              {/* Content */}
              <div className='relative z-10 max-w-3xl mx-auto text-center'>
                <h1 className={titleClasses}>
                  {theme === 'bold' ? (
                    <>
                      {headline.split(' ')[0]}{' '}
                      <span
                        className={`bg-gradient-to-r ${paletteCfg.from} ${paletteCfg.to} bg-clip-text text-transparent`}
                      >
                        {headline.split(' ').slice(1).join(' ')}
                      </span>
                    </>
                  ) : (
                    headline
                  )}
                </h1>
                <p className={subClasses}>{subhead}</p>
                <div className='mt-8 flex justify-center'>
                  <a href='#' className={ctaClasses}>
                    {ctaText}
                    <svg
                      className='w-4 h-4'
                      fill='none'
                      stroke='currentColor'
                      viewBox='0 0 24 24'
                      aria-hidden
                    >
                      <path
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        strokeWidth={2}
                        d='M9 5l7 7-7 7'
                      />
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
      {/* Mobile sticky action bar */}
      <div className='lg:hidden fixed left-4 right-4 bottom-4 z-50 pb-[env(safe-area-inset-bottom)]'>
        <div className='backdrop-blur-md bg-black/30 border border-white/20 text-white rounded-2xl shadow-lg p-3 flex gap-2'>
          <button
            onClick={copyHtml}
            className='flex-1 px-4 py-3 rounded-lg border border-white/30 text-white/90 hover:bg-white/10 transition text-base'
          >
            Copy HTML
          </button>
          <button
            disabled
            title='Share URL coming next'
            className='px-4 py-3 rounded-lg border border-white/20 text-white/40 cursor-not-allowed'
          >
            Share (soon)
          </button>
        </div>
      </div>
    </main>
  )
}
