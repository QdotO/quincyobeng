'use client'

import { useMemo, useRef, useState } from 'react'
import Link from 'next/link'
import * as htmlToImage from 'html-to-image'

type Adjective =
  | 'Modern'
  | 'Trustworthy'
  | 'Playful'
  | 'Bold'
  | 'Calm'
  | 'Energetic'
  | 'Premium'
type Pairing = 'Display + Sans' | 'Sans + Sans' | 'Mono + Sans'

type Palette = {
  key: string
  name: string
  colors: string[]
}

const PALETTES: Palette[] = [
  {
    key: 'electric',
    name: 'Electric',
    colors: ['#0EA5E9', '#22D3EE', '#111827', '#F8F8F2', '#374151']
  },
  {
    key: 'sunset',
    name: 'Sunset',
    colors: ['#F97316', '#EF4444', '#111827', '#F8F8F2', '#374151']
  },
  {
    key: 'violet',
    name: 'Violet',
    colors: ['#8B5CF6', '#D946EF', '#111827', '#F8F8F2', '#374151']
  },
  {
    key: 'forest',
    name: 'Forest',
    colors: ['#10B981', '#14B8A6', '#111827', '#F8F8F2', '#374151']
  }
]

const ADJECTIVES: Adjective[] = [
  'Modern',
  'Trustworthy',
  'Playful',
  'Bold',
  'Calm',
  'Energetic',
  'Premium'
]
const PAIRINGS: Pairing[] = ['Display + Sans', 'Sans + Sans', 'Mono + Sans']

export default function MoodboardPage() {
  const [selectedAdjs, setSelectedAdjs] = useState<Adjective[]>([
    'Modern',
    'Trustworthy',
    'Playful'
  ])
  const [paletteKey, setPaletteKey] = useState<string>(PALETTES[0].key)
  const [pairing, setPairing] = useState<Pairing>('Display + Sans')
  const [brandName, setBrandName] = useState('Your Brand')
  const [dark, setDark] = useState(true)
  const [mobileMode, setMobileMode] = useState<'preview' | 'build'>('preview')
  const [showDetails, setShowDetails] = useState(false)

  const cardRef = useRef<HTMLDivElement>(null)

  const palette = useMemo(
    () => PALETTES.find((p) => p.key === paletteKey)!,
    [paletteKey]
  )

  const fonts = useMemo(() => {
    switch (pairing) {
      case 'Display + Sans':
        return { heading: 'font-display', body: 'font-sans' }
      case 'Sans + Sans':
        return { heading: 'font-sans', body: 'font-sans' }
      case 'Mono + Sans':
        return { heading: 'font-mono', body: 'font-sans' }
    }
  }, [pairing])

  const copyTokens = async () => {
    const tokens = {
      brand: brandName,
      adjectives: selectedAdjs,
      palette: { name: palette.name, colors: palette.colors },
      typography: {
        heading: pairing.split(' + ')[0],
        body: pairing.split(' + ')[1]
      },
      mode: dark ? 'dark' : 'light'
    }
    await navigator.clipboard.writeText(JSON.stringify(tokens, null, 2))
  }

  const exportPng = async () => {
    if (!cardRef.current) return
    const dataUrl = await htmlToImage.toPng(cardRef.current, {
      backgroundColor: dark ? '#0a0a0a' : '#ffffff'
    })
    const link = document.createElement('a')
    link.download = `${brandName
      .replace(/\s+/g, '-')
      .toLowerCase()}-moodboard.png`
    link.href = dataUrl
    link.click()
  }

  const toggleAdj = (adj: Adjective) => {
    setSelectedAdjs((prev) => {
      if (prev.includes(adj)) return prev.filter((a) => a !== adj)
      if (prev.length >= 3) return [...prev.slice(1), adj]
      return [...prev, adj]
    })
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
          <h1 className='text-light font-display text-xl font-bold mb-1'>
            Brand Moodboard
          </h1>
          <p className='text-muted text-sm mb-4'>
            Pick a vibe, palette, and type pairing. Copy tokens or export the
            card.
          </p>

          <div className='space-y-5'>
            {/* Brand name */}
            <div>
              <label className='block text-sm text-muted mb-2'>
                Brand name
              </label>
              <input
                className='w-full rounded-lg bg-dark-secondary border border-border text-light p-3 text-base'
                value={brandName}
                onChange={(e) => setBrandName(e.target.value)}
              />
            </div>

            {/* Adjectives */}
            <div>
              <div className='flex items-center justify-between mb-2'>
                <label className='block text-sm text-muted'>
                  Adjectives (pick up to 3)
                </label>
                <span className='text-xs text-muted'>
                  {selectedAdjs.length}/3
                </span>
              </div>
              <div className='flex flex-wrap gap-2'>
                {ADJECTIVES.map((a) => (
                  <button
                    key={a}
                    onClick={() => toggleAdj(a)}
                    className={`px-3.5 py-2.5 rounded-full border text-base md:text-sm md:py-1.5 transition ${
                      selectedAdjs.includes(a)
                        ? 'border-electric text-electric'
                        : 'border-border text-light/80 hover:border-electric/50'
                    }`}
                    aria-pressed={selectedAdjs.includes(a)}
                  >
                    {a}
                  </button>
                ))}
              </div>
            </div>

            {/* Palette */}
            <div>
              <label className='block text-sm text-muted mb-2'>Palette</label>
              <div className='grid grid-cols-2 gap-3'>
                {PALETTES.map((p) => (
                  <button
                    key={p.key}
                    onClick={() => setPaletteKey(p.key)}
                    className={`rounded-xl p-3 border transition ${
                      paletteKey === p.key ? 'border-electric' : 'border-border'
                    }`}
                    aria-label={p.name}
                    title={p.name}
                  >
                    <div className='grid grid-cols-5 gap-1'>
                      {p.colors.map((c) => (
                        <div
                          key={c}
                          className='h-6 rounded'
                          style={{ backgroundColor: c }}
                        />
                      ))}
                    </div>
                    <div className='mt-2 text-xs text-light/80 text-left'>
                      {p.name}
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Pairing */}
            <div>
              <label className='block text-sm text-muted mb-2'>
                Type pairing
              </label>
              <select
                className='w-full rounded-lg bg-dark-secondary border border-border text-light p-3 text-base'
                value={pairing}
                onChange={(e) => setPairing(e.target.value as Pairing)}
              >
                {PAIRINGS.map((p) => (
                  <option key={p} value={p}>
                    {p}
                  </option>
                ))}
              </select>
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
                onClick={copyTokens}
                className='px-4 py-2 rounded-lg border border-electric text-electric hover:bg-electric hover:text-dark transition'
              >
                Copy Tokens (JSON)
              </button>
              <button
                onClick={exportPng}
                className='px-4 py-2 rounded-lg bg-gradient-to-r from-electric to-electric-secondary text-dark font-semibold'
              >
                Export Brand Card (PNG)
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
          <div
            ref={cardRef}
            className={`rounded-2xl border border-border overflow-hidden ${
              dark
                ? 'bg-gradient-to-br from-dark via-dark-secondary to-surface'
                : 'bg-white'
            }`}
          >
            {/* Header */}
            <div className='px-8 py-8'>
              <div className='text-sm text-muted mb-2'>Moodboard</div>
              <h2
                className={`${
                  fonts.heading
                } text-4xl md:text-5xl font-black tracking-tight ${
                  dark ? 'text-light' : 'text-gray-900'
                }`}
              >
                {brandName}
              </h2>
              <p
                className={`${fonts.body} mt-2 ${
                  dark ? 'text-muted' : 'text-gray-600'
                }`}
              >
                {selectedAdjs.join(' • ')}
              </p>
            </div>

            {/* Swatches */}
            <div className='px-8 pb-8'>
              <div className='grid grid-cols-5 gap-3'>
                {palette.colors.map((c) => (
                  <div
                    key={c}
                    className='rounded-xl h-20 border border-border flex items-end p-2'
                    style={{ backgroundColor: c }}
                  >
                    <span
                      className='text-xs bg-black/40 text-white px-1.5 py-0.5 rounded'
                      style={{ mixBlendMode: 'luminosity' }}
                    >
                      {c}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Mobile: Details toggle */}
            <div className='lg:hidden px-8 pb-4'>
              <button
                onClick={() => setShowDetails((s) => !s)}
                className='w-full px-4 py-2 rounded-lg border border-white/30 text-white/90 hover:bg-white/10 transition'
              >
                {showDetails ? 'Hide details' : 'Show details'}
              </button>
            </div>

            {/* Typography specimen */}
            <div
              className={`${
                dark ? 'bg-black/20' : 'bg-gray-50'
              } px-8 py-8 border-t border-border ${
                !showDetails ? 'hidden lg:block' : ''
              }`}
            >
              <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                <div>
                  <div className='text-xs text-muted mb-2'>Heading</div>
                  <div
                    className={`${fonts.heading} text-3xl font-bold ${
                      dark ? 'text-light' : 'text-gray-900'
                    }`}
                  >
                    Design that speaks clearly
                  </div>
                </div>
                <div>
                  <div className='text-xs text-muted mb-2'>Body</div>
                  <p
                    className={`${fonts.body} text-sm leading-relaxed ${
                      dark ? 'text-muted' : 'text-gray-600'
                    }`}
                  >
                    We craft simple, elegant experiences backed by strong
                    engineering. Clarity, consistency, and care — from first
                    sketch to shipped product.
                  </p>
                </div>
              </div>
            </div>

            {/* Buttons */}
            <div
              className={`px-8 py-8 flex flex-wrap gap-3 items-center ${
                !showDetails ? 'hidden lg:flex' : ''
              }`}
            >
              <a
                className='inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-dark font-semibold'
                style={{
                  backgroundImage: `linear-gradient(to right, ${palette.colors[0]}, ${palette.colors[1]})`
                }}
                href='#'
              >
                Primary
              </a>
              <a
                className='inline-flex items-center gap-2 px-5 py-2.5 rounded-full font-semibold border'
                style={{
                  borderColor: palette.colors[0],
                  color: palette.colors[0]
                }}
                href='#'
              >
                Secondary
              </a>
              <span className='text-xs text-muted'>
                Palette: {palette.name} • Pairing: {pairing}
              </span>
            </div>
          </div>
        </section>
      </div>
      {/* Mobile sticky action bar */}
      <div className='lg:hidden fixed left-4 right-4 bottom-4 z-50 pb-[env(safe-area-inset-bottom)]'>
        <div className='backdrop-blur-md bg-black/30 border border-white/20 text-white rounded-2xl shadow-lg p-3 flex gap-2'>
          <button
            onClick={copyTokens}
            className='px-4 py-3 rounded-lg border border-white/30 text-white/90 hover:bg-white/10 transition text-base'
          >
            Copy Tokens
          </button>
          <button
            onClick={exportPng}
            className='flex-1 px-4 py-3 rounded-lg bg-gradient-to-r from-electric to-electric-secondary text-dark font-semibold'
          >
            Export Card
          </button>
        </div>
      </div>
    </main>
  )
}
