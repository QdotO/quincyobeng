'use client'

import { Suspense, useEffect, useMemo, useRef, useState } from 'react'
// import Link from 'next/link'
import BackButton from '@/components/BackButton'
import * as htmlToImage from 'html-to-image'
import { useRouter, useSearchParams } from 'next/navigation'

type Scheme =
  | 'mono'
  | 'analogous'
  | 'complementary'
  | 'triad'
  | 'split'
  | 'tetrad'
  | 'shades'

type RGB = { r: number; g: number; b: number }
type HSL = { h: number; s: number; l: number }

// --- Color utils ---
const clamp = (n: number, min = 0, max = 1) => Math.min(max, Math.max(min, n))

function hexToRgb(hex: string): RGB {
  const h = hex.replace('#', '')
  const bigint = parseInt(
    h.length === 3
      ? h
          .split('')
          .map((x) => x + x)
          .join('')
      : h,
    16
  )
  return { r: (bigint >> 16) & 255, g: (bigint >> 8) & 255, b: bigint & 255 }
}

function rgbToHex({ r, g, b }: RGB): string {
  const toHex = (v: number) => v.toString(16).padStart(2, '0')
  return `#${toHex(r)}${toHex(g)}${toHex(b)}`.toUpperCase()
}

function rgbToHsl({ r, g, b }: RGB): HSL {
  const r1 = r / 255,
    g1 = g / 255,
    b1 = b / 255
  const max = Math.max(r1, g1, b1),
    min = Math.min(r1, g1, b1)
  let h = 0,
    s = 0
  const l = (max + min) / 2
  const d = max - min
  if (d !== 0) {
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min)
    switch (max) {
      case r1:
        h = (g1 - b1) / d + (g1 < b1 ? 6 : 0)
        break
      case g1:
        h = (b1 - r1) / d + 2
        break
      case b1:
        h = (r1 - g1) / d + 4
        break
    }
    h /= 6
  }
  return { h: h * 360, s, l }
}

function hslToRgb({ h, s, l }: HSL): RGB {
  const c = (1 - Math.abs(2 * l - 1)) * s
  const hp = (h % 360) / 60
  const x = c * (1 - Math.abs((hp % 2) - 1))
  let r1 = 0,
    g1 = 0,
    b1 = 0
  if (0 <= hp && hp < 1) {
    r1 = c
    g1 = x
  } else if (1 <= hp && hp < 2) {
    r1 = x
    g1 = c
  } else if (2 <= hp && hp < 3) {
    g1 = c
    b1 = x
  } else if (3 <= hp && hp < 4) {
    g1 = x
    b1 = c
  } else if (4 <= hp && hp < 5) {
    r1 = x
    b1 = c
  } else if (5 <= hp && hp < 6) {
    r1 = c
    b1 = x
  }
  const m = l - c / 2
  return {
    r: Math.round((r1 + m) * 255),
    g: Math.round((g1 + m) * 255),
    b: Math.round((b1 + m) * 255)
  }
}

const hexToHsl = (hex: string) => rgbToHsl(hexToRgb(hex))
const hslToHex = (hsl: HSL) => rgbToHex(hslToRgb(hsl))

function rotateHue(h: number, deg: number) {
  return (h + deg + 360) % 360
}
function withL(hsl: HSL, l: number): HSL {
  return { ...hsl, l: clamp(l) }
}
function withS(hsl: HSL, s: number): HSL {
  return { ...hsl, s: clamp(s) }
}
function withH(hsl: HSL, h: number): HSL {
  return { ...hsl, h: (h + 360) % 360 }
}
// --- Seeded PRNG (deterministic per seed+scheme+variant) ---
function hashStringToInt(str: string) {
  let h = 2166136261 >>> 0 // FNV-1a
  for (let i = 0; i < str.length; i++) {
    h ^= str.charCodeAt(i)
    h = Math.imul(h, 16777619)
  }
  return h >>> 0
}
function mulberry32(a: number) {
  return function () {
    let t = (a += 0x6d2b79f5)
    t = Math.imul(t ^ (t >>> 15), t | 1)
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61)
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

function generateScheme(
  seedHex: string,
  scheme: Scheme,
  count = 5,
  existing?: string[],
  locks?: boolean[],
  variant = 0,
  varianceMultiplier = 1
): string[] {
  const seed = hexToHsl(seedHex)
  const rand = mulberry32(hashStringToInt(`${seedHex}|${scheme}|${variant}`))
  // Slightly widen jitter for more variety per regeneration
  const varianceFactor = 1.25 * varianceMultiplier
  const j = (n: number) => (rand() * 2 - 1) * n * varianceFactor
  const between = (min: number, max: number) => min + rand() * (max - min)
  const result = new Array<string>(count)
  const centerBase = Math.floor(count / 2)
  const centerShift = Math.round(between(-1, 1)) // -1, 0, or 1
  const center = clamp(centerBase + centerShift, 0, count - 1)
  for (let i = 0; i < count; i++) {
    if (locks && existing && locks[i] && existing[i]) {
      result[i] = existing[i]
      continue
    }
    let c: HSL = { ...seed }
    const step = i - center
    switch (scheme) {
      case 'mono': {
        const amp = between(0.08, 0.14)
        c = withS(seed, clamp(seed.s + j(0.05)))
        c = withL(c, clamp(seed.l + step * amp + j(0.02)))
        break
      }
      case 'analogous': {
        const deg = between(16, 28)
        c = withH(seed, rotateHue(seed.h, step * deg + j(4)))
        c = withS(c, clamp(seed.s + j(0.06)))
        c = withL(c, clamp(seed.l + step * between(0.035, 0.06) + j(0.02)))
        break
      }
      case 'complementary': {
        const isComp = i >= Math.ceil(count / 2)
        const baseH = isComp ? rotateHue(seed.h, 180 + j(6)) : seed.h
        const localStep = isComp ? i - Math.ceil(count / 2) : i
        c = withH(seed, baseH)
        c = withS(c, clamp(seed.s + j(0.05)))
        c = withL(
          c,
          clamp(seed.l + (localStep - 1) * between(0.05, 0.09) + j(0.015))
        )
        break
      }
      case 'triad': {
        const tri = [
          seed.h,
          rotateHue(seed.h, 120 + j(6)),
          rotateHue(seed.h, 240 + j(6))
        ]
        const h = tri[i % tri.length]
        const lAdjBase = [-0.08, -0.02, 0.06, -0.12, 0.12][i % 5]
        c = withH(seed, h)
        c = withS(c, clamp(seed.s + j(0.07)))
        c = withL(c, clamp(seed.l + lAdjBase + j(0.02)))
        break
      }
      case 'split': {
        const split = [
          rotateHue(seed.h, -150 + j(10)),
          seed.h,
          rotateHue(seed.h, 150 + j(10))
        ]
        const h = split[i % split.length]
        const sAdj = [0, -between(0.03, 0.08), between(0.03, 0.08)][i % 3]
        c = withH(seed, h)
        c = withS(c, clamp(seed.s + sAdj + j(0.03)))
        c = withL(c, clamp(seed.l + j(0.03)))
        break
      }
      case 'tetrad': {
        const tet = [
          seed.h,
          rotateHue(seed.h, 90 + j(8)),
          rotateHue(seed.h, 180 + j(8)),
          rotateHue(seed.h, 270 + j(8))
        ]
        const h = tet[i % tet.length]
        c = withH(seed, h)
        c = withS(c, clamp(seed.s + j(0.06)))
        c = withL(
          c,
          clamp(
            seed.l +
              (i % 2 === 0 ? -between(0.04, 0.08) : between(0.04, 0.08)) +
              j(0.02)
          )
        )
        break
      }
      case 'shades': {
        const sFactor = between(0.3, 0.6)
        const lStart = between(0.08, 0.18)
        const lEnd = between(0.75, 0.9)
        const lStep = (lEnd - lStart) / (count - 1)
        c = withS(seed, clamp(seed.s * sFactor))
        c = withL(c, clamp(lStart + i * lStep + j(0.015)))
        break
      }
    }
    result[i] = hslToHex(c)
  }
  return result
}

const DEFAULT_SEED = '#00D4FF'

// --- Palette naming ---
const HUE_NAMES = [
  'Crimson',
  'Coral',
  'Amber',
  'Lime',
  'Emerald',
  'Teal',
  'Azure',
  'Indigo',
  'Violet',
  'Magenta'
]
function nameFromHexes(hexes: string[]): string {
  if (!hexes.length) return 'Untitled Palette'
  const hues = hexes.map((h) => hexToHsl(h).h)
  const avg = hues.reduce((a, b) => a + b, 0) / hues.length
  const idx = Math.round(((avg % 360) / 360) * (HUE_NAMES.length - 1))
  const mood = averageLightness(hexes) > 0.5 ? 'Day' : 'Dusk'
  return `${HUE_NAMES[idx]} ${mood}`
}
function averageLightness(hexes: string[]) {
  return hexes.reduce((a, h) => a + hexToHsl(h).l, 0) / hexes.length
}

function PaletteClient() {
  const router = useRouter()
  const search = useSearchParams()

  const [seed, setSeed] = useState<string>(search.get('seed') || DEFAULT_SEED)
  const [scheme, setScheme] = useState<Scheme>(
    (search.get('scheme') as Scheme) || 'analogous'
  )
  const [variant, setVariant] = useState<number>(
    parseInt(search.get('v') || '0', 10) || 0
  )
  const [colors, setColors] = useState<string[]>(() =>
    generateScheme(seed, scheme, 5, undefined, undefined, variant, parseFloat(search.get('sp') || '1') || 1)
  )
  const [locks, setLocks] = useState<boolean[]>([
    false,
    false,
    false,
    false,
    false
  ])
  const [dark, setDark] = useState(true)
  const [name, setName] = useState<string>(
    decodeURIComponent(
      search.get('name') || nameFromHexes(generateScheme(seed, scheme, 5))
    )
  )

  const gridRef = useRef<HTMLDivElement>(null)
  const posterRef = useRef<HTMLDivElement>(null)
  const [scene, setScene] = useState<'Palette' | 'Poster'>('Palette')
  const [toast, setToast] = useState<string | undefined>(undefined)
  const [lastCopiedIndex, setLastCopiedIndex] = useState<number | null>(null)
  const [spice, setSpice] = useState<number>(
    () => parseFloat(search.get('sp') || '1') || 1
  )

  useEffect(() => {
    const params = new URLSearchParams()
    params.set('seed', seed)
    params.set('scheme', scheme)
    if (name) params.set('name', encodeURIComponent(name))
    if (variant) params.set('v', String(variant))
    if (spice !== 1) params.set('sp', String(spice))
    router.replace(`?${params.toString()}`, { scroll: false })
  }, [seed, scheme, name, variant, spice, router])

  const regenerate = () => {
    setVariant((v) => {
      const nextVariant = v + 1
      setColors((prev) => {
        const next = generateScheme(
          seed,
          scheme,
          prev.length,
          prev,
          locks,
          nextVariant,
          spice
        )
        setName(nameFromHexes(next))
        return next
      })
      return nextVariant
    })
  }

  const randomizeSeed = () => {
    const rand = `#${Math.floor(Math.random() * 0xffffff)
      .toString(16)
      .padStart(6, '0')
      .toUpperCase()}`
    setSeed(rand)
    setVariant(0)
    setColors((prev) =>
      generateScheme(rand, scheme, prev.length, prev, locks, 0, spice)
    )
  }

  const toggleLock = (idx: number) =>
    setLocks((l) => l.map((v, i) => (i === idx ? !v : v)))

  const copyHex = async (hex: string, idx?: number) => {
    await navigator.clipboard.writeText(hex)
    if (typeof idx === 'number') {
      setLastCopiedIndex(idx)
      setTimeout(() => setLastCopiedIndex(null), 900)
    }
    setToast(`${hex} copied`)
    setTimeout(() => setToast(undefined), 1400)
  }

  const copyJSON = async () => {
    await navigator.clipboard.writeText(
      JSON.stringify({ seed, scheme, variant, colors }, null, 2)
    )
  }

  const exportPNG = async () => {
    const node = scene === 'Poster' ? posterRef.current : gridRef.current
    if (!node) return
    const dataUrl = await htmlToImage.toPng(node, {
      backgroundColor: dark ? '#0a0a0a' : '#ffffff'
    })
    const a = document.createElement('a')
    a.href = dataUrl
    a.download = `palette-${seed.replace(
      '#',
      ''
    )}-${scheme}-${scene.toLowerCase()}.png`
    a.click()
  }

  // Keep colors in sync if seed/scheme change manually
  useEffect(() => {
    setVariant(0)
    setColors((prev) => {
      const next = generateScheme(seed, scheme, prev.length, prev, locks, 0)
      if (!search.get('name')) setName(nameFromHexes(next))
      return next
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [seed, scheme])

  const contrastText = (hex: string) => {
    const { r, g, b } = hexToRgb(hex)
    // perceptive luminance
    const pl = (0.299 * r + 0.587 * g + 0.114 * b) / 255
    return pl > 0.6 ? '#111827' : '#F8F8F2'
  }

  // WCAG contrast utilities
  const relativeLuminance = ({ r, g, b }: RGB) => {
    const toLin = (v: number) => {
      const s = v / 255
      return s <= 0.03928 ? s / 12.92 : Math.pow((s + 0.055) / 1.055, 2.4)
    }
    const rl = 0.2126 * toLin(r) + 0.7152 * toLin(g) + 0.0722 * toLin(b)
    return rl
  }
  const contrastRatio = (hexA: string, hexB: string) => {
    const LA = relativeLuminance(hexToRgb(hexA))
    const LB = relativeLuminance(hexToRgb(hexB))
    const [L1, L2] = LA > LB ? [LA, LB] : [LB, LA]
    return (L1 + 0.05) / (L2 + 0.05)
  }
  const contrastBadge = (bg: string) => {
    const light = '#ffffff',
      darkTxt = '#0a0a0a'
    const rLight = contrastRatio(bg, light)
    const rDark = contrastRatio(bg, darkTxt)
    const best =
      rLight >= rDark
        ? { fg: light, ratio: rLight }
        : { fg: darkTxt, ratio: rDark }
    const level = best.ratio >= 7 ? 'AAA' : best.ratio >= 4.5 ? 'AA' : 'Low'
    return { level, fg: best.fg, ratio: best.ratio }
  }

  // Stage gradient derived from first two colors
  const stageA = colors[0] ?? seed
  const stageB = colors[1] ?? seed
  const stageGradient = `radial-gradient(1200px 600px at 20% 10%, ${
    dark ? stageA : stageA
  }22, transparent 60%), radial-gradient(900px 500px at 80% 20%, ${
    dark ? stageB : stageB
  }22, transparent 60%), linear-gradient(135deg, ${
    dark ? '#0b0b0f' : '#f8fafc'
  } 0%, ${dark ? '#0f1117' : '#eef2f7'} 100%)`

  return (
  <main id='main' role='main' className='relative min-h-screen'>
      <BackButton href='/work' label='Back to Work' />
      {/* SR-only live region for announcements */}
      <div className='sr-only' role='status' aria-live='polite'>
        {toast || ''}
      </div>
      {/* Full-bleed stage */}
      <div
        aria-hidden
        className='pointer-events-none absolute inset-0 -z-10'
        style={{ background: stageGradient }}
      />
      {/* Subtle vignette */}
      <div
        aria-hidden
        className='pointer-events-none absolute inset-0 -z-10 mix-blend-multiply'
        style={{
          background: `radial-gradient(1200px 800px at 50% -10%, transparent 40%, ${
            dark ? 'rgba(0,0,0,0.25)' : 'rgba(0,0,0,0.06)'
          } 100%)`
        }}
      />

  <div className='px-6 py-10 pb-28 md:pb-10'>
        <div className='max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8'>
          {/* Controls */}
          <aside className='order-2 lg:order-1 lg:col-span-1 bg-surface border border-border rounded-2xl p-4 sm:p-6 h-fit lg:sticky lg:top-6'>
            <h1 className='text-light font-display text-xl font-bold mb-1'>
              Color Palette Generator
            </h1>
            <p className='text-muted text-sm mb-4'>
              Choose a base color and scheme, lock swatches, and export.
            </p>

            <div className='space-y-5'>
              <div>
                <label className='block text-sm text-muted mb-2'>
                  Base color
                </label>
                <div className='grid grid-cols-[48px_1fr] gap-3'>
                  <input
                    type='color'
                    value={seed}
                    onChange={(e) => setSeed(e.target.value.toUpperCase())}
                    className='h-12 w-12 rounded border border-border bg-transparent'
                  />
                  <input
                    value={seed}
                    onChange={(e) => setSeed(e.target.value.toUpperCase())}
                    className='rounded-lg bg-dark-secondary border border-border text-light px-3 py-3 text-base'
                    placeholder='#00D4FF'
                  />
                </div>
                <div className='mt-2 text-xs text-muted'>Tip: paste a hex or pick a color.</div>
              </div>

              <div>
                <label className='block text-sm text-muted mb-2'>Scheme</label>
                <select
                  value={scheme}
                  onChange={(e) => setScheme(e.target.value as Scheme)}
                  className='w-full rounded-lg bg-dark-secondary border border-border text-light p-2'
                >
                  <option value='mono'>Monochrome</option>
                  <option value='analogous'>Analogous</option>
                  <option value='complementary'>Complementary</option>
                  <option value='triad'>Triad</option>
                  <option value='split'>Split Complementary</option>
                  <option value='tetrad'>Tetrad</option>
                  <option value='shades'>Shades</option>
                </select>
              </div>

              <div className='flex items-center justify-between'>
                <span className='text-sm text-muted'>Dark preview</span>
                <button
                  onClick={() => setDark((d) => !d)}
                  className={`px-3 py-1 rounded-full border ${
                    dark
                      ? 'border-electric text-electric'
                      : 'border-border text-light/80'
                  }`}
                >
                  {dark ? 'On' : 'Off'}
                </button>
              </div>

              <div>
                <label className='block text-sm text-muted mb-2'>Scene</label>
                <div className='grid grid-cols-2 gap-2'>
                  {(['Palette', 'Poster'] as const).map((s) => (
                    <button
                      key={s}
                      onClick={() => setScene(s)}
                      className={`px-4 py-2 rounded-lg border text-sm ${
                        scene === s
                          ? 'border-electric text-electric'
                          : 'border-border text-light/80'
                      }`}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className='block text-sm text-muted mb-2'>Spice (variance)</label>
                <div className='flex items-center gap-3'>
                  <input
                    type='range'
                    min={0.8}
                    max={1.75}
                    step={0.05}
                    value={spice}
                    onChange={(e) => setSpice(parseFloat(e.target.value))}
                    aria-label='Palette variance'
                    className='flex-1 accent-electric'
                  />
                  <span className='text-xs text-muted tabular-nums w-12 text-right'>
                    x{spice.toFixed(2)}
                  </span>
                </div>
                <p className='mt-1 text-xs text-muted'>Higher spice increases variety between regenerations.</p>
              </div>

              <div className='hidden md:grid pt-2 grid-cols-2 gap-2'>
                <button
                  onClick={copyJSON}
                  className='px-4 py-2 rounded-lg border border-electric text-electric hover:bg-electric hover:text-dark transition'
                >
                  Copy JSON
                </button>
                <button
                  onClick={exportPNG}
                  className='px-4 py-2 rounded-lg bg-gradient-to-r from-electric to-electric-secondary text-dark font-semibold'
                >
                  Export PNG
                </button>
                {/* Hidden hook for mobile Random action */}
                <button
                  type='button'
                  onClick={randomizeSeed}
                  data-randomize
                  className='hidden'
                  aria-hidden
                  tabIndex={-1}
                />
              </div>
            </div>
          </aside>

          {/* Preview */}
          <section className='order-1 lg:order-2 lg:col-span-2'>
            <div
              className={`relative overflow-hidden md:rounded-2xl md:border md:border-border/60 md:backdrop-blur-sm ${
                dark ? 'md:bg-black/20' : 'md:bg-white/60'
              }`}
            >
              {/* Regenerate in top-right of preview card */}
              <div className='absolute top-3 right-3 z-10'>
                <button
                  onClick={regenerate}
                  className='px-4 py-2 rounded-full bg-gradient-to-r from-electric to-electric-secondary text-dark font-semibold shadow focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/80'
                  aria-label='Regenerate palette'
                  title='Regenerate palette'
                >
                  Regenerate
                </button>
              </div>
              <div className='px-8 pt-8'>
                <div className='text-sm text-muted mb-2'>Palette</div>
                <div className='flex flex-col md:flex-row md:items-center gap-2'>
                  <input
                    aria-label='Palette name'
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className={`font-display text-3xl md:text-4xl font-black tracking-tight bg-transparent outline-none border-b border-transparent focus:border-electric/60 ${
                      dark ? 'text-light' : 'text-gray-900'
                    }`}
                  />
                  <div className='text-muted text-sm'>
                    {scheme.toUpperCase()} — {seed}
                  </div>
                </div>
              </div>

              {scene === 'Palette' && (
                <div
                  ref={gridRef}
                  className='grid grid-cols-2 md:grid-cols-5 gap-4 p-6 sm:p-8'
                >
                  {colors.map((hex, idx) => {
                    const badge = contrastBadge(hex)
                    const isCopied = lastCopiedIndex === idx
                    return (
                      <div
                        key={idx}
                        className={`group rounded-xl border border-border overflow-hidden transition-transform duration-300 ${
                          locks[idx]
                            ? 'ring-2 ring-electric ring-offset-1 ring-offset-transparent'
                            : ''
                        }`}
                        style={{ transitionDelay: `${idx * 40}ms` }}
                      >
                        <div className='relative h-32 md:h-28'>
                          <button
                            type='button'
                            onClick={() => copyHex(hex, idx)}
                            aria-label={`Copy ${hex}`}
                            className='absolute inset-0 w-full h-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/80'
                            style={{ backgroundColor: hex }}
                          >
                            {/* bottom hex label (hover/focus only) */}
                            <span
                              className='absolute inset-x-2 bottom-1 text-[10px] font-mono text-center leading-none opacity-0 group-hover:opacity-100 group-active:opacity-100 focus-visible:opacity-100 transition-opacity duration-200'
                              style={{ color: contrastText(hex) }}
                            >
                              {hex}
                            </span>
                            {/* top pill tooltip (positioned inside to avoid clipping) */}
                            <span
                              className={`absolute left-1/2 -translate-x-1/2 top-2 z-10 px-2 py-0.5 rounded-full text-[10px] font-medium transition-all duration-200 pointer-events-none ${
                                isCopied
                                  ? 'opacity-100 translate-y-0 bg-black/60 text-white'
                                  : 'opacity-0 -translate-y-1 bg-black/50 text-white group-hover:opacity-100 group-focus-visible:opacity-100'
                              }`}
                            >
                              {isCopied ? 'Copied ✓' : 'Copy'}
                            </span>
                            {/* center checkmark burst */}
                            <span
                              className={`absolute inset-0 z-0 flex items-center justify-center transition-all duration-300 ${
                                isCopied
                                  ? 'opacity-100 scale-100'
                                  : 'opacity-0 scale-75'
                              }`}
                              aria-hidden
                            >
                              <svg
                                viewBox='0 0 24 24'
                                className='h-6 w-6 text-white drop-shadow'
                                fill='none'
                                stroke='currentColor'
                                strokeWidth='2'
                              >
                                <path
                                  strokeLinecap='round'
                                  strokeLinejoin='round'
                                  d='M5 12l4 4L19 6'
                                />
                              </svg>
                            </span>
                          </button>
                          {/* lock control (top-right, larger hit area, above copy layer) */}
                          <button
                            type='button'
                            onClick={() => toggleLock(idx)}
                            aria-pressed={locks[idx]}
                            aria-label={
                              locks[idx] ? 'Unlock color' : 'Lock color'
                            }
                            title={locks[idx] ? 'Unlock' : 'Lock'}
                            className={`absolute top-2 right-2 z-20 h-10 w-10 rounded-full flex items-center justify-center transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/80 ${
                              locks[idx]
                                ? 'bg-electric text-dark shadow'
                                : 'bg-black/45 text-white hover:bg-black/55'
                            }`}
                          >
                            {/* lock icon */}
                            <svg
                              viewBox='0 0 24 24'
                              className='h-5 w-5'
                              fill='none'
                              stroke='currentColor'
                              strokeWidth='1.8'
                              aria-hidden
                            >
                              {locks[idx] ? (
                                // closed lock
                                <>
                                  <path d='M7 11V9a5 5 0 0 1 10 0v2' />
                                  <rect
                                    x='5'
                                    y='11'
                                    width='14'
                                    height='10'
                                    rx='2'
                                  />
                                  <circle
                                    cx='12'
                                    cy='16'
                                    r='1.5'
                                    fill='currentColor'
                                    stroke='none'
                                  />
                                </>
                              ) : (
                                // open lock
                                <>
                                  <path d='M7 11V9a5 5 0 0 1 9.5-2' />
                                  <rect
                                    x='5'
                                    y='11'
                                    width='14'
                                    height='10'
                                    rx='2'
                                  />
                                  <circle
                                    cx='12'
                                    cy='16'
                                    r='1.5'
                                    fill='currentColor'
                                    stroke='none'
                                  />
                                </>
                              )}
                            </svg>
                            {/* tiny tooltip */}
                            <span className='absolute -bottom-6 left-1/2 -translate-x-1/2 px-2 py-0.5 rounded-full text-[10px] font-medium bg-black/60 text-white opacity-0 pointer-events-none transition-opacity duration-150 group-hover:opacity-100'>
                              {locks[idx] ? 'Locked' : 'Lock'}
                            </span>
                          </button>
                        </div>
                        <div
                          className='px-3 py-2 text-sm flex items-center justify-end'
                          style={{
                            color: contrastText(hex),
                            background: dark
                              ? 'rgba(0,0,0,0.2)'
                              : 'rgba(0,0,0,0.05)'
                          }}
                        >
                          <span
                            className={`ml-auto px-2 py-0.5 rounded text-[10px] font-semibold ${
                              badge.level === 'Low'
                                ? 'bg-red-500/20 text-red-300'
                                : badge.level === 'AA'
                                ? 'bg-green-500/20 text-green-300'
                                : 'bg-emerald-500/20 text-emerald-300'
                            }`}
                          >
                            {badge.level}
                          </span>
                        </div>
                      </div>
                    )
                  })}
                </div>
              )}

              {scene === 'Poster' && (
                <div ref={posterRef} className='p-8'>
                  <div
                    className='rounded-2xl overflow-hidden border border-border'
                    style={{
                      background: `linear-gradient(135deg, ${colors[0]} 0%, ${
                        colors[1] ?? colors[0]
                      } 50%, ${colors[2] ?? colors[0]} 100%)`
                    }}
                  >
                    <div className='p-10 md:p-16 min-h-[320px] flex flex-col justify-between'>
                      <div>
                        <div
                          className='text-xs uppercase tracking-widest opacity-80'
                          style={{ color: contrastText(colors[0] ?? seed) }}
                        >
                          Palette
                        </div>
                        <h3
                          className='font-display text-4xl md:text-6xl font-black drop-shadow-sm'
                          style={{ color: contrastText(colors[1] ?? seed) }}
                        >
                          {name}
                        </h3>
                      </div>
                      <div className='flex gap-2'>
                        {colors.map((c, i) => (
                          <button
                            key={i}
                            type='button'
                            onClick={() => copyHex(c, i)}
                            aria-label={`Copy ${c}`}
                            className='relative h-8 w-12 rounded shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/80 group'
                            style={{ backgroundColor: c }}
                          >
                            <span className='absolute inset-x-0 top-1 z-10 mx-auto w-max px-2 py-0.5 rounded-full text-[10px] text-white bg-black/50 opacity-0 -translate-y-1 transition-all duration-200 group-hover:opacity-100 group-focus-visible:opacity-100 pointer-events-none'>
                              Copy
                            </span>
                            <span
                              className={`absolute inset-0 flex items-center justify-center transition-all duration-300 ${
                                lastCopiedIndex === i
                                  ? 'opacity-100 scale-100'
                                  : 'opacity-0 scale-75'
                              }`}
                              aria-hidden
                            >
                              <svg
                                viewBox='0 0 24 24'
                                className='h-5 w-5 text-white drop-shadow'
                                fill='none'
                                stroke='currentColor'
                                strokeWidth='2'
                              >
                                <path
                                  strokeLinecap='round'
                                  strokeLinejoin='round'
                                  d='M5 12l4 4L19 6'
                                />
                              </svg>
                            </span>
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Regenerate moved to the top-right of the card */}
            </div>
          </section>
        </div>
        {/* Mobile sticky actions */}
        <MobileActions onCopy={copyJSON} onExport={exportPNG} />
      </div>
    </main>
  )
}

// Mobile sticky actions
// Place at bottom for quick export/copy on small screens
function MobileActions({ onCopy, onExport }: { onCopy: () => void; onExport: () => void }) {
  return (
    <div className='md:hidden fixed left-0 right-0 bottom-0 z-40 pb-[env(safe-area-inset-bottom)]'>
      <div className='mx-auto max-w-6xl px-4 pb-4'>
        <div className='backdrop-blur-md bg-black/40 border border-white/20 text-white rounded-2xl shadow-2xl p-3 grid grid-cols-3 gap-2'>
          <button
            onClick={() => {
              const btn = document.querySelector('[data-randomize]') as HTMLButtonElement | null
              btn?.click()
            }}
            className='px-3 py-2 rounded-lg border border-white/30 text-white/90 hover:bg-white/10 transition text-sm'
          >
            Random
          </button>
          <button
            onClick={onCopy}
            className='px-3 py-2 rounded-lg border border-white/30 text-white/90 hover:bg-white/10 transition text-sm'
          >
            Copy JSON
          </button>
          <button
            onClick={onExport}
            className='px-3 py-2 rounded-lg bg-gradient-to-r from-electric to-electric-secondary text-dark font-semibold text-sm'
          >
            Export PNG
          </button>
        </div>
      </div>
    </div>
  )
}

export default function PalettePage() {
  return (
    <Suspense
      fallback={
        <main className='min-h-screen flex items-center justify-center bg-gradient-to-br from-dark via-dark-secondary to-surface'>
          <div className='text-muted'>Loading palette…</div>
        </main>
      }
    >
      <PaletteClient />
    </Suspense>
  )
}
