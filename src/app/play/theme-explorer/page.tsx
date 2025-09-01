'use client'

import { Suspense, useEffect, useMemo, useState } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import Link from 'next/link'

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

function Swatch({ color }: { color: string }) {
  return (
    <div
      className='rounded-lg h-8 border border-border'
      style={{ backgroundColor: color }}
    />
  )
}

function PalettePicker({
  value,
  onChange
}: {
  value: string
  onChange: (k: string) => void
}) {
  return (
    <div className='grid grid-cols-4 gap-2'>
      {PALETTES.map((p) => (
        <button
          key={p.key}
          onClick={() => onChange(p.key)}
          className={`rounded-xl p-2 border transition ${
            value === p.key ? 'border-electric' : 'border-border'
          }`}
          aria-label={p.name}
          title={p.name}
        >
          <div className='grid grid-cols-5 gap-1'>
            {p.colors.map((c) => (
              <div
                key={c}
                className='h-4 rounded'
                style={{ backgroundColor: c }}
              />
            ))}
          </div>
          <div className='mt-1 text-[10px] text-light/70 text-left'>
            {p.name}
          </div>
        </button>
      ))}
    </div>
  )
}

function ThemeExplorerInner() {
  const params = useSearchParams()
  const router = useRouter()
  const [sophKey, setSophKey] = useState(params.get('soph') || 'electric')
  const [funKey, setFunKey] = useState(params.get('fun') || 'sunset')
  const [designKey, setDesignKey] = useState(params.get('design') || 'violet')
  const [corpKey, setCorpKey] = useState(params.get('corp') || 'forest')
  const [sophMode, setSophMode] = useState<'dark' | 'light'>(
    (params.get('sophm') as 'dark' | 'light') || 'dark'
  )
  const [funMode, setFunMode] = useState<'dark' | 'light'>(
    (params.get('funm') as 'dark' | 'light') || 'dark'
  )
  const [designMode, setDesignMode] = useState<'dark' | 'light'>(
    (params.get('designm') as 'dark' | 'light') || 'dark'
  )
  const [corpMode, setCorpMode] = useState<'dark' | 'light'>(
    (params.get('corpm') as 'dark' | 'light') || 'dark'
  )

  const soph = useMemo(
    () => PALETTES.find((p) => p.key === sophKey)!,
    [sophKey]
  )
  const fun = useMemo(() => PALETTES.find((p) => p.key === funKey)!, [funKey])
  const design = useMemo(
    () => PALETTES.find((p) => p.key === designKey)!,
    [designKey]
  )
  const corp = useMemo(
    () => PALETTES.find((p) => p.key === corpKey)!,
    [corpKey]
  )

  // URL state sync
  useEffect(() => {
    const q = new URLSearchParams()
    q.set('soph', sophKey)
    q.set('fun', funKey)
    q.set('design', designKey)
    q.set('corp', corpKey)
    q.set('sophm', sophMode)
    q.set('funm', funMode)
    q.set('designm', designMode)
    q.set('corpm', corpMode)
    router.replace(`?${q.toString()}`, { scroll: false })
  }, [
    sophKey,
    funKey,
    designKey,
    corpKey,
    sophMode,
    funMode,
    designMode,
    corpMode,
    router
  ])

  const promote = (
    label: string,
    paletteKey: string,
    mode: 'dark' | 'light',
    fonts?: {
      display?: 'playfair' | 'spaceGrotesk' | 'inter' | 'ibmPlex'
      sans?: 'inter' | 'ibmPlex' | 'spaceGrotesk'
    }
  ) => {
    const pal = PALETTES.find((p) => p.key === paletteKey)!
    const theme = {
      paletteName: label,
      colors: [
        pal.colors[0],
        pal.colors[1],
        pal.colors[2],
        pal.colors[3],
        pal.colors[4]
      ],
      mode,
      fonts
    }
    localStorage.setItem('siteTheme', JSON.stringify(theme))
    // Apply immediately
    const root = document.documentElement
    root.style.setProperty('--accent-color', pal.colors[0])
    root.style.setProperty('--accent-secondary-color', pal.colors[1])
    root.style.setProperty('--color-dark', pal.colors[2])
    root.style.setProperty('--color-light', pal.colors[3])
    root.style.setProperty('--color-border', pal.colors[4])
    root.style.setProperty('--color-surface', pal.colors[2])
    root.style.setProperty(
      '--background-start-rgb',
      mode === 'dark' ? '10, 10, 10' : '255, 255, 255'
    )
    root.style.setProperty(
      '--foreground-rgb',
      mode === 'dark' ? '248, 248, 242' : '17, 24, 39'
    )
    // Apply fonts immediately for live preview site-wide
    const mapDisplay = {
      playfair: 'var(--font-playfair)',
      spaceGrotesk: 'var(--font-space-grotesk)',
      inter: 'var(--font-inter)',
      ibmPlex: 'var(--font-ibm-plex-sans)'
    } as const
    const mapSans = {
      inter: 'var(--font-inter)',
      ibmPlex: 'var(--font-ibm-plex-sans)',
      spaceGrotesk: 'var(--font-space-grotesk)'
    } as const
    if (fonts?.display)
      root.style.setProperty('--font-display-active', mapDisplay[fonts.display])
    if (fonts?.sans)
      root.style.setProperty('--font-sans-active', mapSans[fonts.sans])
    // Signal runtime listeners too
    window.dispatchEvent(new Event('siteTheme:apply'))
  }

  const resetTheme = () => {
    localStorage.removeItem('siteTheme')
    window.dispatchEvent(new Event('siteTheme:reset'))
  }

  return (
    <main className='min-h-screen bg-gradient-to-br from-dark via-dark-secondary to-surface px-6 py-10'>
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

      <div className='max-w-6xl mx-auto'>
        <header className='mb-10 text-center'>
          <h1 className='text-3xl md:text-4xl font-theme-display font-bold text-light mb-2'>
            Theme Explorer
          </h1>
          <p className='text-muted'>
            Explore alternative vibes for the site. Each block has its own
            palette control.
          </p>
          <div className='mt-4 flex justify-center'>
            <button
              onClick={resetTheme}
              className='px-4 py-2 rounded-lg border border-white/20 text-white/80 hover:bg-white/10 transition text-sm'
            >
              Reset Site Theme
            </button>
          </div>
        </header>

        <div className='grid grid-cols-1 md:grid-cols-2 gap-8'>
          {/* Sophisticated */}
          <section className='bg-surface border border-border rounded-2xl p-6'>
            <div className='flex items-start justify-between gap-4 mb-3'>
              <div>
                <h2 className='text-light font-serifDisplay text-xl font-bold'>
                  Sophisticated
                </h2>
                <p className='text-muted text-sm'>
                  Calm, refined, high contrast with generous spacing.
                </p>
              </div>
              <div className='hidden md:flex gap-1'>
                {soph.colors.map((c) => (
                  <Swatch key={c} color={c} />
                ))}
              </div>
            </div>
            <div className='mb-2 text-[10px] uppercase tracking-widest text-light/60'>
              Conic + Radial overlays
            </div>
            <div className='flex items-center justify-between gap-3'>
              <PalettePicker value={sophKey} onChange={setSophKey} />
              <div className='shrink-0'>
                <span className='text-xs text-muted mr-2'>Mode</span>
                <button
                  onClick={() =>
                    setSophMode((m) => (m === 'dark' ? 'light' : 'dark'))
                  }
                  className={`px-3 py-1 rounded-full border ${
                    sophMode === 'dark'
                      ? 'border-electric text-electric'
                      : 'border-border text-light/80'
                  }`}
                >
                  {sophMode === 'dark' ? 'Dark' : 'Light'}
                </button>
              </div>
            </div>
            <div className='mt-6 rounded-xl overflow-hidden border border-border'>
              <div
                className='px-8 py-12 with-texture'
                style={{
                  background:
                    sophMode === 'dark'
                      ? `conic-gradient(from 160deg at 30% 20%, ${soph.colors[1]}22, transparent 40%), radial-gradient(800px 300px at -10% 0%, ${soph.colors[0]}11, transparent 60%), ${soph.colors[2]}`
                      : `conic-gradient(from 160deg at 30% 20%, ${soph.colors[1]}11, transparent 40%), ${soph.colors[3]}`
                }}
              >
                <h3
                  className='font-serifDisplay text-4xl md:text-5xl font-black tracking-tight'
                  style={{
                    color: sophMode === 'dark' ? soph.colors[3] : '#0b0b0b'
                  }}
                >
                  Elegant craft, lasting impact
                </h3>
                <p
                  className='mt-3 max-w-xl'
                  style={{
                    color:
                      sophMode === 'dark' ? `${soph.colors[3]}CC` : '#374151'
                  }}
                >
                  Quiet confidence with a crisp typographic rhythm and tasteful
                  accents.
                </p>
                <div className='mt-6'>
                  <a
                    href='#'
                    className='inline-flex items-center gap-2 px-6 py-3 rounded-full font-semibold'
                    style={{
                      background: `linear-gradient(90deg, ${soph.colors[0]}, ${soph.colors[1]})`,
                      color: '#0b0b0b'
                    }}
                  >
                    Get in touch
                  </a>
                </div>
                <div className='mt-4'>
                  <button
                    onClick={() =>
                      promote('Sophisticated', sophKey, sophMode, {
                        display: 'playfair',
                        sans: 'inter'
                      })
                    }
                    className='px-4 py-2 rounded-lg border border-electric text-electric hover:bg-electric hover:text-dark transition text-sm'
                  >
                    Promote to Site
                  </button>
                </div>
              </div>
            </div>
          </section>

          {/* Fun Artistic */}
          <section className='bg-surface border border-border rounded-2xl p-6'>
            <div className='flex items-start justify-between gap-4 mb-3'>
              <div>
                <h2 className='text-light font-display text-xl font-bold'>
                  Fun • Artistic
                </h2>
                <p className='text-muted text-sm'>
                  Energetic gradients, playful motion, bold color blocks.
                </p>
              </div>
              <div className='hidden md:flex gap-1'>
                {fun.colors.map((c) => (
                  <Swatch key={c} color={c} />
                ))}
              </div>
            </div>
            <div className='mb-2 text-[10px] uppercase tracking-widest text-light/60'>
              Repeating Radial + Radial
            </div>
            <div className='flex items-center justify-between gap-3'>
              <PalettePicker value={funKey} onChange={setFunKey} />
              <div className='shrink-0'>
                <span className='text-xs text-muted mr-2'>Mode</span>
                <button
                  onClick={() =>
                    setFunMode((m) => (m === 'dark' ? 'light' : 'dark'))
                  }
                  className={`px-3 py-1 rounded-full border ${
                    funMode === 'dark'
                      ? 'border-electric text-electric'
                      : 'border-border text-light/80'
                  }`}
                >
                  {funMode === 'dark' ? 'Dark' : 'Light'}
                </button>
              </div>
            </div>
            <div className='mt-6 rounded-xl overflow-hidden border border-border'>
              <div
                className='relative px-8 py-12 with-texture'
                style={{
                  background:
                    funMode === 'dark'
                      ? `repeating-radial-gradient(circle at 80% 120%, ${fun.colors[1]}22 0 8px, transparent 8px 16px), radial-gradient(1200px 300px at 20% -10%, ${fun.colors[1]}55, transparent), radial-gradient(1200px 400px at 110% 10%, ${fun.colors[0]}44, transparent), ${fun.colors[2]}`
                      : `repeating-radial-gradient(circle at 20% -10%, ${fun.colors[0]}11 0 6px, transparent 6px 14px), ${fun.colors[3]}`
                }}
              >
                <div
                  className='absolute inset-0 opacity-20 pointer-events-none'
                  style={{
                    background: `conic-gradient(from 90deg, ${fun.colors[0]}, ${fun.colors[1]}, ${fun.colors[0]})`
                  }}
                />
                <h3
                  className='relative font-display text-4xl md:text-5xl font-black tracking-tight'
                  style={{
                    color: funMode === 'dark' ? fun.colors[3] : '#0b0b0b'
                  }}
                >
                  Make it memorable
                </h3>
                <p
                  className='relative mt-3 max-w-xl'
                  style={{
                    color: funMode === 'dark' ? `${fun.colors[3]}CC` : '#374151'
                  }}
                >
                  Motion-friendly layers and delightful accents that feel alive.
                </p>
                <div className='relative mt-6'>
                  <a
                    href='#'
                    className='inline-flex items-center gap-2 px-6 py-3 rounded-full font-semibold border'
                    style={{
                      borderColor: fun.colors[0],
                      color: fun.colors[0],
                      backgroundColor: `${fun.colors[3]}10`
                    }}
                  >
                    See examples
                  </a>
                </div>
                <div className='relative mt-4'>
                  <button
                    onClick={() =>
                      promote('Fun Artistic', funKey, funMode, {
                        display: 'spaceGrotesk',
                        sans: 'spaceGrotesk'
                      })
                    }
                    className='px-4 py-2 rounded-lg border border-electric text-electric hover:bg-electric hover:text-dark transition text-sm'
                  >
                    Promote to Site
                  </button>
                </div>
              </div>
            </div>
          </section>

          {/* Design Focused */}
          <section className='bg-surface border border-border rounded-2xl p-6'>
            <div className='flex items-start justify-between gap-4 mb-3'>
              <div>
                <h2 className='text-light font-sans text-xl font-bold'>
                  Design Focused
                </h2>
                <p className='text-muted text-sm'>
                  Type-forward, measured rhythm, grid clarity with subtle rules.
                </p>
              </div>
              <div className='hidden md:flex gap-1'>
                {design.colors.map((c) => (
                  <Swatch key={c} color={c} />
                ))}
              </div>
            </div>
            <div className='mb-2 text-[10px] uppercase tracking-widest text-light/60'>
              Repeating Linear
            </div>
            <div className='flex items-center justify-between gap-3'>
              <PalettePicker value={designKey} onChange={setDesignKey} />
              <div className='shrink-0'>
                <span className='text-xs text-muted mr-2'>Mode</span>
                <button
                  onClick={() =>
                    setDesignMode((m) => (m === 'dark' ? 'light' : 'dark'))
                  }
                  className={`px-3 py-1 rounded-full border ${
                    designMode === 'dark'
                      ? 'border-electric text-electric'
                      : 'border-border text-light/80'
                  }`}
                >
                  {designMode === 'dark' ? 'Dark' : 'Light'}
                </button>
              </div>
            </div>
            <div className='mt-6 rounded-xl overflow-hidden border border-border'>
              <div
                className='px-8 py-12 with-texture'
                style={{
                  background:
                    designMode === 'dark'
                      ? `linear-gradient(180deg, ${design.colors[3]}, ${design.colors[3]}), repeating-linear-gradient(90deg, transparent, transparent 12px, ${design.colors[4]}22 12px, ${design.colors[4]}22 13px)`
                      : `repeating-linear-gradient(90deg, transparent, transparent 16px, ${design.colors[4]}11 16px, ${design.colors[4]}11 17px), ${design.colors[3]}`
                }}
              >
                <div className='max-w-2xl'>
                  <div
                    className='text-xs uppercase tracking-widest mb-3'
                    style={{ color: design.colors[4] }}
                  >
                    Case Study
                  </div>
                  <h3
                    className='font-sans text-4xl md:text-5xl font-black tracking-tight'
                    style={{
                      color:
                        designMode === 'dark' ? design.colors[2] : '#0b0b0b'
                    }}
                  >
                    Clarity by design
                  </h3>
                  <p
                    className='mt-3'
                    style={{
                      color: designMode === 'dark' ? '#374151' : '#374151'
                    }}
                  >
                    A system of constraints that makes good decisions the
                    default.
                  </p>
                  <div className='mt-6'>
                    <a
                      href='#'
                      className='inline-flex items-center gap-2 px-6 py-3 rounded-full font-semibold'
                      style={{
                        background: `linear-gradient(90deg, ${design.colors[0]}, ${design.colors[1]})`,
                        color: '#0b0b0b'
                      }}
                    >
                      Read the story
                    </a>
                  </div>
                  <div className='mt-4'>
                    <button
                      onClick={() =>
                        promote('Design Focused', designKey, designMode, {
                          display: 'inter',
                          sans: 'inter'
                        })
                      }
                      className='px-4 py-2 rounded-lg border border-electric text-electric hover:bg-electric hover:text-dark transition text-sm'
                    >
                      Promote to Site
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Corporate */}
          <section className='bg-surface border border-border rounded-2xl p-6'>
            <div className='flex items-start justify-between gap-4 mb-3'>
              <div>
                <h2 className='text-light font-theme-sans text-xl font-bold'>
                  Corporate
                </h2>
                <p className='text-muted text-sm'>
                  Trust-centric, structured, with emphasis on stability and
                  clarity.
                </p>
              </div>
              <div className='hidden md:flex gap-1'>
                {corp.colors.map((c) => (
                  <Swatch key={c} color={c} />
                ))}
              </div>
            </div>
            <div className='mb-2 text-[10px] uppercase tracking-widest text-light/60'>
              Linear + Repeating Grid
            </div>
            <div className='flex items-center justify-between gap-3'>
              <PalettePicker value={corpKey} onChange={setCorpKey} />
              <div className='shrink-0'>
                <span className='text-xs text-muted mr-2'>Mode</span>
                <button
                  onClick={() =>
                    setCorpMode((m) => (m === 'dark' ? 'light' : 'dark'))
                  }
                  className={`px-3 py-1 rounded-full border ${
                    corpMode === 'dark'
                      ? 'border-electric text-electric'
                      : 'border-border text-light/80'
                  }`}
                >
                  {corpMode === 'dark' ? 'Dark' : 'Light'}
                </button>
              </div>
            </div>
            <div className='mt-6 rounded-xl overflow-hidden border border-border'>
              <div
                className='px-8 py-12 with-texture'
                style={{
                  background:
                    corpMode === 'dark'
                      ? `repeating-linear-gradient(0deg, ${corp.colors[4]}14 0 1px, transparent 1px 14px), repeating-linear-gradient(90deg, ${corp.colors[4]}14 0 1px, transparent 1px 14px), linear-gradient(145deg, ${corp.colors[2]}, ${corp.colors[4]})`
                      : `repeating-linear-gradient(0deg, ${corp.colors[1]}11 0 1px, transparent 1px 16px), ${corp.colors[3]}`
                }}
              >
                <div className='max-w-2xl'>
                  <div
                    className='text-sm'
                    style={{
                      color: corpMode === 'dark' ? corp.colors[3] : '#0b0b0b'
                    }}
                  >
                    Trusted by teams at
                  </div>
                  <div
                    className='mt-2 flex gap-4 opacity-80'
                    style={{
                      color: corpMode === 'dark' ? corp.colors[3] : '#0b0b0b'
                    }}
                  >
                    <span>Acme Co</span>
                    <span>Globex</span>
                    <span>Umbrella</span>
                  </div>
                  <h3
                    className='mt-6 font-theme-sans text-4xl md:text-5xl font-black tracking-tight'
                    style={{
                      color: corpMode === 'dark' ? corp.colors[3] : '#0b0b0b'
                    }}
                  >
                    Partner for the long run
                  </h3>
                  <p
                    className='mt-3'
                    style={{
                      color:
                        corpMode === 'dark' ? `${corp.colors[3]}CC` : '#374151'
                    }}
                  >
                    Clear roadmaps, measurable outcomes, and predictable
                    delivery.
                  </p>
                  <div className='mt-6 flex gap-3'>
                    <a
                      href='#'
                      className='inline-flex items-center gap-2 px-6 py-3 rounded-full font-semibold'
                      style={{
                        background: `linear-gradient(90deg, ${corp.colors[0]}, ${corp.colors[1]})`,
                        color: '#0b0b0b'
                      }}
                    >
                      Contact Sales
                    </a>
                    <a
                      href='#'
                      className='inline-flex items-center gap-2 px-6 py-3 rounded-full font-semibold border'
                      style={{
                        borderColor: corp.colors[0],
                        color: corp.colors[0],
                        backgroundColor: `${corp.colors[3]}10`
                      }}
                    >
                      See Pricing
                    </a>
                  </div>
                  <div className='mt-4'>
                    <button
                      onClick={() =>
                        promote('Corporate', corpKey, corpMode, {
                          display: 'ibmPlex',
                          sans: 'ibmPlex'
                        })
                      }
                      className='px-4 py-2 rounded-lg border border-electric text-electric hover:bg-electric hover:text-dark transition text-sm'
                    >
                      Promote to Site
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </main>
  )
}

export default function ThemeExplorerPage() {
  return (
    <Suspense>
      <ThemeExplorerInner />
    </Suspense>
  )
}
