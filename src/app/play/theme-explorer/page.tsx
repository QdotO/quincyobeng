'use client'

import { Suspense, useEffect, useMemo, useState } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import Link from 'next/link'
import BackButton from '@/components/BackButton'

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
  const [grandKey, setGrandKey] = useState(params.get('grand') || 'electric')
  const [minimalKey, setMinimalKey] = useState(
    params.get('minimal') || 'violet'
  )
  const [militaryKey, setMilitaryKey] = useState(params.get('mil') || 'forest')
  const [sportyKey, setSportyKey] = useState(params.get('sporty') || 'electric')
  const [grittyKey, setGrittyKey] = useState(params.get('gritty') || 'sunset')
  const [grandMode, setGrandMode] = useState<'dark' | 'light'>(
    (params.get('grandm') as 'dark' | 'light') || 'dark'
  )
  const [minimalMode, setMinimalMode] = useState<'dark' | 'light'>(
    (params.get('minimalm') as 'dark' | 'light') || 'dark'
  )
  const [militaryMode, setMilitaryMode] = useState<'dark' | 'light'>(
    (params.get('milm') as 'dark' | 'light') || 'dark'
  )
  const [sportyMode, setSportyMode] = useState<'dark' | 'light'>(
    (params.get('sportym') as 'dark' | 'light') || 'dark'
  )
  const [grittyMode, setGrittyMode] = useState<'dark' | 'light'>(
    (params.get('grittym') as 'dark' | 'light') || 'dark'
  )

  const grand = useMemo(
    () => PALETTES.find((p) => p.key === grandKey)!,
    [grandKey]
  )
  const minimal = useMemo(
    () => PALETTES.find((p) => p.key === minimalKey)!,
    [minimalKey]
  )
  const military = useMemo(
    () => PALETTES.find((p) => p.key === militaryKey)!,
    [militaryKey]
  )
  const sporty = useMemo(
    () => PALETTES.find((p) => p.key === sportyKey)!,
    [sportyKey]
  )
  const gritty = useMemo(
    () => PALETTES.find((p) => p.key === grittyKey)!,
    [grittyKey]
  )

  // URL state sync
  useEffect(() => {
    const q = new URLSearchParams()
    q.set('grand', grandKey)
    q.set('minimal', minimalKey)
    q.set('mil', militaryKey)
    q.set('sporty', sportyKey)
    q.set('gritty', grittyKey)
    q.set('grandm', grandMode)
    q.set('minimalm', minimalMode)
    q.set('milm', militaryMode)
    q.set('sportym', sportyMode)
    q.set('grittym', grittyMode)
    router.replace(`?${q.toString()}`, { scroll: false })
  }, [
    grandKey,
    minimalKey,
    militaryKey,
    sportyKey,
    grittyKey,
    grandMode,
    minimalMode,
    militaryMode,
    sportyMode,
    grittyMode,
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
    <main className='px-4 py-8 md:py-10'>
      <BackButton href='/work' label='Back to Work' />
      <div className='max-w-6xl mx-auto'>
        <header className='mb-8 md:mb-10 text-center'>
          <h1 className='text-3xl md:text-4xl font-theme-display font-bold text-light mb-2'>
            Homepage Theme Explorer
          </h1>
          <p className='text-muted'>
            Preview radically different homepage hero styles. Each block uses
            the homepage content so you can judge the real look and feel.
          </p>
          <div className='mt-4 flex items-center justify-center gap-3'>
            <button
              onClick={resetTheme}
              className='text-sm px-3 py-1 rounded-md border border-border text-light hover:bg-dark/30'
            >
              Reset site theme
            </button>
          </div>
        </header>

        <div className='grid grid-cols-1 md:grid-cols-2 gap-8'>
          {/* Grand */}
          <section className='bg-surface border border-border rounded-2xl p-6'>
            <div className='flex items-start justify-between gap-4 mb-3'>
              <div>
                <h2 className='text-light font-serifDisplay text-xl font-bold'>
                  Grand
                </h2>
                <p className='text-muted text-sm'>
                  Elegant, oversized typography with ceremonial glow.
                </p>
              </div>
              <div className='hidden md:flex gap-1'>
                {grand.colors.map((c) => (
                  <Swatch key={c} color={c} />
                ))}
              </div>
            </div>
            <div className='flex items-center justify-between gap-3'>
              <PalettePicker value={grandKey} onChange={setGrandKey} />
              <div className='shrink-0'>
                <span className='text-xs text-muted mr-2'>Mode</span>
                <button
                  onClick={() =>
                    setGrandMode((m) => (m === 'dark' ? 'light' : 'dark'))
                  }
                  className={`px-3 py-1 rounded-full border ${
                    grandMode === 'dark'
                      ? 'border-electric text-electric'
                      : 'border-border text-light/80'
                  }`}
                >
                  {grandMode === 'dark' ? 'Dark' : 'Light'}
                </button>
              </div>
            </div>
            <div className='mt-3 rounded-xl overflow-hidden border border-border'>
              <div
                className='relative px-8 py-12 with-texture'
                style={{
                  background:
                    grandMode === 'dark'
                      ? `conic-gradient(from 200deg at 30% 10%, ${grand.colors[1]}22, transparent 40%), radial-gradient(900px 300px at 110% -10%, ${grand.colors[0]}22, transparent 60%), ${grand.colors[2]}`
                      : `conic-gradient(from 200deg at 30% 10%, ${grand.colors[1]}11, transparent 40%), ${grand.colors[3]}`
                }}
              >
                <div className='relative z-10 text-center max-w-3xl mx-auto'>
                  <h3
                    className='font-serifDisplay text-5xl md:text-6xl font-extrabold tracking-tight'
                    style={{
                      color: grandMode === 'dark' ? grand.colors[3] : '#0b0b0b'
                    }}
                  >
                    Quincy{' '}
                    <span className='bg-gradient-to-r from-electric to-electric-secondary bg-clip-text text-transparent'>
                      Obeng
                    </span>
                  </h3>
                  <p
                    className='mt-4 text-lg md:text-xl font-light'
                    style={{
                      color:
                        grandMode === 'dark'
                          ? `${grand.colors[3]}CC`
                          : '#374151'
                    }}
                  >
                    Senior Software Engineer crafting digital experiences that
                    matter.
                    <span style={{ color: grand.colors[0] }}>
                      {' '}
                      10+ years
                    </span>{' '}
                    of turning complex problems into elegant solutions.
                  </p>
                  <div className='mt-6 flex flex-col sm:flex-row gap-3 justify-center'>
                    <Link
                      href='/work'
                      className='inline-flex items-center gap-2 px-6 py-3 rounded-full font-semibold'
                      style={{
                        background: `linear-gradient(90deg, ${grand.colors[0]}, ${grand.colors[1]})`,
                        color: '#0b0b0b'
                      }}
                    >
                      View Samples
                    </Link>
                    <Link
                      href='/contact'
                      className='inline-flex items-center gap-2 px-6 py-3 rounded-full font-semibold border'
                      style={{
                        borderColor: grand.colors[0],
                        color: grand.colors[0],
                        backgroundColor: `${grand.colors[3]}10`
                      }}
                    >
                      Let’s Connect
                    </Link>
                  </div>
                  <div className='mt-5 text-[10px] uppercase tracking-widest text-light/60'>
                    Conic + Radial overlays
                  </div>
                  <div className='mt-4'>
                    <button
                      onClick={() =>
                        promote('Grand', grandKey, grandMode, {
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
            </div>
          </section>

          {/* Minimal */}
          <section className='bg-surface border border-border rounded-2xl p-6'>
            <div className='flex items-start justify-between gap-4 mb-3'>
              <div>
                <h2 className='text-light font-sans text-xl font-bold'>
                  Minimal
                </h2>
                <p className='text-muted text-sm'>
                  Quiet, ample whitespace, precise alignment and clarity.
                </p>
              </div>
              <div className='hidden md:flex gap-1'>
                {minimal.colors.map((c) => (
                  <Swatch key={c} color={c} />
                ))}
              </div>
            </div>
            <div className='flex items-center justify-between gap-3'>
              <PalettePicker value={minimalKey} onChange={setMinimalKey} />
              <div className='shrink-0'>
                <span className='text-xs text-muted mr-2'>Mode</span>
                <button
                  onClick={() =>
                    setMinimalMode((m) => (m === 'dark' ? 'light' : 'dark'))
                  }
                  className={`px-3 py-1 rounded-full border ${
                    minimalMode === 'dark'
                      ? 'border-electric text-electric'
                      : 'border-border text-light/80'
                  }`}
                >
                  {minimalMode === 'dark' ? 'Dark' : 'Light'}
                </button>
              </div>
            </div>
            <div className='mt-3 rounded-xl overflow-hidden border border-border'>
              <div
                className='px-8 py-12 with-texture'
                style={{
                  background:
                    minimalMode === 'dark'
                      ? `repeating-linear-gradient(0deg, ${minimal.colors[4]}22 0 1px, transparent 1px 16px), repeating-linear-gradient(90deg, ${minimal.colors[4]}22 0 1px, transparent 1px 16px), linear-gradient(180deg, ${minimal.colors[2]}, ${minimal.colors[2]})`
                      : `repeating-linear-gradient(0deg, ${minimal.colors[4]}11 0 1px, transparent 1px 12px), repeating-linear-gradient(90deg, ${minimal.colors[4]}11 0 1px, transparent 1px 12px), ${minimal.colors[3]}`
                }}
              >
                <div className='text-center max-w-3xl mx-auto'>
                  <h3
                    className='font-sans text-5xl md:text-6xl font-extrabold tracking-tight'
                    style={{
                      color:
                        minimalMode === 'dark' ? minimal.colors[3] : '#0b0b0b'
                    }}
                  >
                    Quincy{' '}
                    <span className='bg-gradient-to-r from-electric to-electric-secondary bg-clip-text text-transparent'>
                      Obeng
                    </span>
                  </h3>
                  <p
                    className='mt-4 text-base md:text-lg'
                    style={{
                      color:
                        minimalMode === 'dark'
                          ? `${minimal.colors[3]}CC`
                          : '#374151'
                    }}
                  >
                    Senior Software Engineer crafting digital experiences that
                    matter.
                    <span style={{ color: minimal.colors[0] }}>
                      {' '}
                      10+ years
                    </span>{' '}
                    of turning complex problems into elegant solutions.
                  </p>
                  <div className='mt-6 flex flex-col sm:flex-row gap-3 justify-center'>
                    <Link
                      href='/work'
                      className='inline-flex items-center gap-2 px-6 py-3 rounded-full font-semibold'
                      style={{
                        background: `linear-gradient(90deg, ${minimal.colors[0]}, ${minimal.colors[1]})`,
                        color: '#0b0b0b'
                      }}
                    >
                      View Samples
                    </Link>
                    <Link
                      href='/contact'
                      className='inline-flex items-center gap-2 px-6 py-3 rounded-full font-semibold border'
                      style={{
                        borderColor: minimal.colors[0],
                        color: minimal.colors[0],
                        backgroundColor: `${minimal.colors[3]}10`
                      }}
                    >
                      Let’s Connect
                    </Link>
                  </div>
                  <div className='mt-5 text-[10px] uppercase tracking-widest text-light/60'>
                    Flat + Subtle grid
                  </div>
                  <div className='mt-4'>
                    <button
                      onClick={() =>
                        promote('Minimal', minimalKey, minimalMode, {
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

          {/* Military */}
          <section className='bg-surface border border-border rounded-2xl p-6'>
            <div className='flex items-start justify-between gap-4 mb-3'>
              <div>
                <h2 className='text-light font-theme-sans text-xl font-bold'>
                  Military
                </h2>
                <p className='text-muted text-sm'>
                  Structured, rugged texture, disciplined geometry.
                </p>
              </div>
              <div className='hidden md:flex gap-1'>
                {military.colors.map((c) => (
                  <Swatch key={c} color={c} />
                ))}
              </div>
            </div>
            <div className='flex items-center justify-between gap-3'>
              <PalettePicker value={militaryKey} onChange={setMilitaryKey} />
              <div className='shrink-0'>
                <span className='text-xs text-muted mr-2'>Mode</span>
                <button
                  onClick={() =>
                    setMilitaryMode((m) => (m === 'dark' ? 'light' : 'dark'))
                  }
                  className={`px-3 py-1 rounded-full border ${
                    militaryMode === 'dark'
                      ? 'border-electric text-electric'
                      : 'border-border text-light/80'
                  }`}
                >
                  {militaryMode === 'dark' ? 'Dark' : 'Light'}
                </button>
              </div>
            </div>
            <div className='mt-3 rounded-xl overflow-hidden border border-border'>
              <div
                className='px-8 py-12 with-texture'
                style={{
                  background:
                    militaryMode === 'dark'
                      ? `repeating-linear-gradient(45deg, ${military.colors[4]}22 0 2px, transparent 2px 14px), linear-gradient(160deg, ${military.colors[2]}, ${military.colors[4]})`
                      : `repeating-linear-gradient(45deg, ${military.colors[0]}11 0 2px, transparent 2px 16px), ${military.colors[3]}`
                }}
              >
                <div className='max-w-3xl mx-auto text-center'>
                  <div
                    className='text-xs uppercase tracking-widest mb-2'
                    style={{ color: military.colors[4] }}
                  >
                    Discipline • Precision
                  </div>
                  <h3
                    className='font-theme-sans text-5xl md:text-6xl font-extrabold tracking-tight'
                    style={{
                      color:
                        militaryMode === 'dark' ? military.colors[3] : '#0b0b0b'
                    }}
                  >
                    Quincy{' '}
                    <span className='bg-gradient-to-r from-electric to-electric-secondary bg-clip-text text-transparent'>
                      Obeng
                    </span>
                  </h3>
                  <p
                    className='mt-4 text-base md:text-lg'
                    style={{
                      color:
                        militaryMode === 'dark'
                          ? `${military.colors[3]}CC`
                          : '#374151'
                    }}
                  >
                    Senior Software Engineer crafting reliable, robust systems.
                    <span style={{ color: military.colors[0] }}>
                      {' '}
                      10+ years
                    </span>{' '}
                    building under constraints.
                  </p>
                  <div className='mt-6 flex flex-col sm:flex-row gap-3 justify-center'>
                    <Link
                      href='/work'
                      className='inline-flex items-center gap-2 px-6 py-3 rounded font-semibold border'
                      style={{
                        borderColor: military.colors[0],
                        color: military.colors[0],
                        backgroundColor: `${military.colors[3]}10`
                      }}
                    >
                      View Samples
                    </Link>
                    <Link
                      href='/contact'
                      className='inline-flex items-center gap-2 px-6 py-3 rounded font-semibold'
                      style={{
                        background: `linear-gradient(90deg, ${military.colors[0]}, ${military.colors[1]})`,
                        color: '#0b0b0b'
                      }}
                    >
                      Let’s Connect
                    </Link>
                  </div>
                  <div className='mt-5 text-[10px] uppercase tracking-widest text-light/60'>
                    Diagonal stripes + Linear
                  </div>
                  <div className='mt-4'>
                    <button
                      onClick={() =>
                        promote('Military', militaryKey, militaryMode, {
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

          {/* Sporty */}
          <section className='bg-surface border border-border rounded-2xl p-6'>
            <div className='flex items-start justify-between gap-4 mb-3'>
              <div>
                <h2 className='text-light font-display text-xl font-bold'>
                  Sporty
                </h2>
                <p className='text-muted text-sm'>
                  Fast, slanted layers with energetic accents.
                </p>
              </div>
              <div className='hidden md:flex gap-1'>
                {sporty.colors.map((c) => (
                  <Swatch key={c} color={c} />
                ))}
              </div>
            </div>
            <div className='flex items-center justify-between gap-3'>
              <PalettePicker value={sportyKey} onChange={setSportyKey} />
              <div className='shrink-0'>
                <span className='text-xs text-muted mr-2'>Mode</span>
                <button
                  onClick={() =>
                    setSportyMode((m) => (m === 'dark' ? 'light' : 'dark'))
                  }
                  className={`px-3 py-1 rounded-full border ${
                    sportyMode === 'dark'
                      ? 'border-electric text-electric'
                      : 'border-border text-light/80'
                  }`}
                >
                  {sportyMode === 'dark' ? 'Dark' : 'Light'}
                </button>
              </div>
            </div>
            <div className='mt-3 rounded-xl overflow-hidden border border-border'>
              <div
                className='relative px-8 py-12 with-texture'
                style={{
                  background:
                    sportyMode === 'dark'
                      ? `repeating-conic-gradient(from 45deg at 0% 0%, ${sporty.colors[4]}22 0deg 6deg, transparent 6deg 18deg), linear-gradient(155deg, ${sporty.colors[2]}, ${sporty.colors[4]})`
                      : `repeating-linear-gradient(-20deg, ${sporty.colors[1]}11 0 2px, transparent 2px 10px), ${sporty.colors[3]}`
                }}
              >
                <div className='text-center max-w-3xl mx-auto'>
                  <h3
                    className='font-display text-5xl md:text-6xl font-extrabold tracking-tight'
                    style={{
                      color:
                        sportyMode === 'dark' ? sporty.colors[3] : '#0b0b0b'
                    }}
                  >
                    Quincy{' '}
                    <span className='bg-gradient-to-r from-electric to-electric-secondary bg-clip-text text-transparent'>
                      Obeng
                    </span>
                  </h3>
                  <p
                    className='mt-4 text-base md:text-lg'
                    style={{
                      color:
                        sportyMode === 'dark'
                          ? `${sporty.colors[3]}CC`
                          : '#374151'
                    }}
                  >
                    Senior Software Engineer, moving fast without breaking
                    things.
                    <span style={{ color: sporty.colors[0] }}>
                      {' '}
                      10+ years
                    </span>{' '}
                    shipping quality.
                  </p>
                  <div className='mt-6 flex flex-col sm:flex-row gap-3 justify-center'>
                    <Link
                      href='/work'
                      className='inline-flex items-center gap-2 px-6 py-3 rounded-full font-semibold'
                      style={{
                        background: `linear-gradient(90deg, ${sporty.colors[0]}, ${sporty.colors[1]})`,
                        color: '#0b0b0b'
                      }}
                    >
                      View Samples
                    </Link>
                    <Link
                      href='/contact'
                      className='inline-flex items-center gap-2 px-6 py-3 rounded-full font-semibold border'
                      style={{
                        borderColor: sporty.colors[0],
                        color: sporty.colors[0],
                        backgroundColor: `${sporty.colors[3]}10`
                      }}
                    >
                      Let’s Connect
                    </Link>
                  </div>
                  <div className='mt-5 text-[10px] uppercase tracking-widest text-light/60'>
                    Linear + Radial beam
                  </div>
                  <div className='mt-4'>
                    <button
                      onClick={() =>
                        promote('Sporty', sportyKey, sportyMode, {
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
            </div>
          </section>

          {/* Gritty / Moody / Discipline */}
          <section className='bg-surface border border-border rounded-2xl p-6 md:col-span-2'>
            <div className='flex items-start justify-between gap-4 mb-3'>
              <div>
                <h2 className='text-light font-display text-xl font-bold'>
                  Gritty • Moody • Discipline
                </h2>
                <p className='text-muted text-sm'>
                  Grain, low-saturation overlays, heavy weight and measured
                  cadence.
                </p>
              </div>
              <div className='hidden md:flex gap-1'>
                {gritty.colors.map((c) => (
                  <Swatch key={c} color={c} />
                ))}
              </div>
            </div>
            <div className='flex items-center justify-between gap-3'>
              <PalettePicker value={grittyKey} onChange={setGrittyKey} />
              <div className='shrink-0'>
                <span className='text-xs text-muted mr-2'>Mode</span>
                <button
                  onClick={() =>
                    setGrittyMode((m) => (m === 'dark' ? 'light' : 'dark'))
                  }
                  className={`px-3 py-1 rounded-full border ${
                    grittyMode === 'dark'
                      ? 'border-electric text-electric'
                      : 'border-border text-light/80'
                  }`}
                >
                  {grittyMode === 'dark' ? 'Dark' : 'Light'}
                </button>
              </div>
            </div>
            <div className='mt-3 rounded-xl overflow-hidden border border-border'>
              <div
                className='relative px-8 py-14 with-texture'
                style={{
                  background:
                    grittyMode === 'dark'
                      ? `repeating-radial-gradient(circle at 20% 30%, ${gritty.colors[4]}22 0 1px, transparent 1px 12px), repeating-radial-gradient(circle at 80% 70%, ${gritty.colors[4]}22 0 1px, transparent 1px 10px), linear-gradient(180deg, ${gritty.colors[2]}, ${gritty.colors[2]})`
                      : `radial-gradient(600px 200px at 50% -10%, ${gritty.colors[1]}0F, transparent 60%), ${gritty.colors[3]}`
                }}
              >
                <div className='text-center max-w-4xl mx-auto'>
                  <h3
                    className='font-display text-5xl md:text-6xl font-black tracking-tight'
                    style={{
                      color:
                        grittyMode === 'dark' ? gritty.colors[3] : '#0b0b0b'
                    }}
                  >
                    Quincy{' '}
                    <span className='bg-gradient-to-r from-electric to-electric-secondary bg-clip-text text-transparent'>
                      Obeng
                    </span>
                  </h3>
                  <p
                    className='mt-4 text-base md:text-lg'
                    style={{
                      color:
                        grittyMode === 'dark'
                          ? `${gritty.colors[3]}CC`
                          : '#374151'
                    }}
                  >
                    Senior Software Engineer with a builder’s mindset.
                    <span style={{ color: gritty.colors[0] }}>
                      {' '}
                      10+ years
                    </span>{' '}
                    shipping, learning, iterating.
                  </p>
                  <div className='mt-6 flex flex-col sm:flex-row gap-3 justify-center'>
                    <Link
                      href='/work'
                      className='inline-flex items-center gap-2 px-6 py-3 rounded-full font-semibold'
                      style={{
                        background: `linear-gradient(90deg, ${gritty.colors[0]}, ${gritty.colors[1]})`,
                        color: '#0b0b0b'
                      }}
                    >
                      View Samples
                    </Link>
                    <Link
                      href='/contact'
                      className='inline-flex items-center gap-2 px-6 py-3 rounded-full font-semibold border'
                      style={{
                        borderColor: gritty.colors[0],
                        color: gritty.colors[0],
                        backgroundColor: `${gritty.colors[3]}10`
                      }}
                    >
                      Let’s Connect
                    </Link>
                  </div>
                  <div className='mt-5 text-[10px] uppercase tracking-widest text-light/60'>
                    Grid texture + Flat
                  </div>
                  <div className='mt-4'>
                    <button
                      onClick={() =>
                        promote('Gritty', grittyKey, grittyMode, {
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
