'use client'

import { Suspense, useEffect, useRef, useState } from 'react'
import type { RefObject, MutableRefObject } from 'react'
import * as htmlToImage from 'html-to-image'
import { useRouter, useSearchParams } from 'next/navigation'
import BackButton from '@/components/BackButton'

// Borrow types from palette page
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
type GradientKind =
  | 'linear'
  | 'radial'
  | 'conic'
  | 'repeating-linear'
  | 'repeating-radial'

// --- Color utils (copied minimally to keep file self-contained) ---
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
function rgbToHex({ r, g, b }: RGB) {
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
function withL(h: HSL, l: number): HSL {
  return { ...h, l: clamp(l) }
}
function withS(h: HSL, s: number): HSL {
  return { ...h, s: clamp(s) }
}
function withH(h: HSL, hh: number): HSL {
  return { ...h, h: (hh + 360) % 360 }
}

// PRNG + jitter like palette page
function hashStringToInt(str: string) {
  let h = 2166136261 >>> 0
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
  variant = 0
): string[] {
  const seed = hexToHsl(seedHex)
  const rand = mulberry32(hashStringToInt(`${seedHex}|${scheme}|${variant}`))
  const j = (n: number) => (rand() * 2 - 1) * n
  const between = (min: number, max: number) => min + rand() * (max - min)
  const result = new Array<string>(count)
  const center = Math.floor(count / 2) + Math.round(between(-1, 1))
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

const HUE_NAMES = [
  'Ruby',
  'Coral',
  'Amber',
  'Citrine',
  'Lime',
  'Jade',
  'Teal',
  'Aqua',
  'Azure',
  'Cerulean',
  'Indigo',
  'Violet',
  'Fuchsia',
  'Magenta'
]
function nameFromHexes(hexes: string[], scheme?: Scheme): string {
  if (!hexes.length) return 'Untitled Palette'
  const hues = hexes.map((h) => hexToHsl(h).h)
  const sats = hexes.map((h) => hexToHsl(h).s)
  const lights = hexes.map((h) => hexToHsl(h).l)
  const avgH = hues.reduce((a, b) => a + b, 0) / hues.length
  const avgS = sats.reduce((a, b) => a + b, 0) / sats.length
  const avgL = lights.reduce((a, b) => a + b, 0) / lights.length

  // Core tokens
  const hueIdx = Math.round(((avgH % 360) / 360) * (HUE_NAMES.length - 1))
  const hueName = HUE_NAMES[hueIdx]

  const mood =
    avgL < 0.2
      ? 'Midnight'
      : avgL < 0.35
      ? 'Dusk'
      : avgL < 0.65
      ? 'Day'
      : 'Dawn'
  const intensity =
    avgS > 0.65
      ? 'Electric'
      : avgS > 0.5
      ? 'Vivid'
      : avgS > 0.35
      ? 'Bold'
      : avgS > 0.2
      ? 'Soft'
      : 'Muted'
  const temperature =
    avgH < 70 || avgH >= 330
      ? 'Warm'
      : avgH >= 160 && avgH < 300
      ? 'Cool'
      : 'Neutral'

  const schemeWord = (
    {
      mono: 'Monochrome',
      analogous: 'Analog',
      complementary: 'Complement',
      triad: 'Triad',
      split: 'Split',
      tetrad: 'Tetrad',
      shades: 'Shades'
    } as const
  )[scheme || 'analogous']

  const suffixes = [
    'Harmony',
    'Blend',
    'Pulse',
    'Echo',
    'Flux',
    'Aura',
    'Drift',
    'Bloom',
    'Glow',
    'Weave',
    'Storm',
    'Tone'
  ]

  // Deterministic variety using seeded PRNG
  const seedStr = hexes.join('|') + '|' + (scheme || 'analogous')
  const rand = mulberry32(hashStringToInt(seedStr))
  const pick = <T,>(arr: T[]) =>
    arr[Math.max(0, Math.min(arr.length - 1, Math.floor(rand() * arr.length)))]

  const suffix = pick(suffixes)

  const patterns = [
    () => `${intensity} ${hueName} ${suffix}`,
    () => `${temperature} ${hueName} ${suffix}`,
    () => `${mood} ${hueName} ${schemeWord}`,
    () => `${hueName} ${schemeWord} ${suffix}`,
    () => `${intensity} ${schemeWord} ${suffix}`,
    () => `${mood} ${hueName} ${suffix}`
  ]

  const name = pick(patterns)().replace(/\s+/g, ' ').trim()
  return name
}
function averageLightness(hexes: string[]) {
  return hexes.reduce((a, h) => a + hexToHsl(h).l, 0) / hexes.length
}

function StudioClient() {
  const router = useRouter()
  const search = useSearchParams()
  const [seed, setSeed] = useState<string>(search.get('seed') || DEFAULT_SEED)
  const [scheme, setScheme] = useState<Scheme>(
    (search.get('scheme') as Scheme) || 'analogous'
  )
  const [variant, setVariant] = useState<number>(
    parseInt(search.get('v') || '0', 10) || 0
  )
  const [gradient, setGradient] = useState<GradientKind>(
    ((search.get('g') as GradientKind) || 'linear') as GradientKind
  )
  const [colors, setColors] = useState<string[]>(() =>
    generateScheme(seed, scheme, 5, undefined, undefined, variant)
  )
  const [name, setName] = useState<string>(
    decodeURIComponent(search.get('name') || nameFromHexes(colors, scheme))
  )
  const [dark, setDark] = useState(true)
  const [showColors, setShowColors] = useState(false)
  const [toast, setToast] = useState<string | undefined>(undefined)
  // Motion controls (mobile-first)
  const [animate, setAnimate] = useState(false)
  const [speed, setSpeed] = useState(1) // 0.25–2 recommended
  const [settingsOpen, setSettingsOpen] = useState(false)

  // Reveal state to animate swatches left-to-right on color changes
  const [revealed, setRevealed] = useState(false)

  const posterRefFull = useRef<HTMLDivElement>(null)
  const posterRefCard = useRef<HTMLDivElement>(null)
  // Gradient layers for imperative style updates (avoid re-render every frame)
  const bgFullRef = useRef<HTMLDivElement>(null)
  const bgCardRef = useRef<HTMLDivElement>(null)
  const prefersReducedMotion = useRef(false)

  useEffect(() => {
    const p = new URLSearchParams()
    p.set('seed', seed)
    p.set('scheme', scheme)
    if (variant) p.set('v', String(variant))
    if (name) p.set('name', encodeURIComponent(name))
    if (gradient && gradient !== 'linear') p.set('g', gradient)
    router.replace(`?${p.toString()}`)
  }, [seed, scheme, variant, name, gradient, router])

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    setVariant(0)
    setColors((prev) => {
      const next = generateScheme(seed, scheme, prev.length, prev, undefined, 0)
      if (!search.get('name')) setName(nameFromHexes(next, scheme))
      return next
    })
  }, [seed, scheme, search])

  // Re-trigger reveal animation when the colors array changes
  useEffect(() => {
    // Reset then enable on next tick to ensure transition applies
    setRevealed(false)
    const t = setTimeout(() => setRevealed(true), 30)
    return () => clearTimeout(t)
  }, [colors])

  const regenerate = () => {
    setVariant((v) => {
      const nv = v + 1
      setColors((prev) => {
        const next = generateScheme(
          seed,
          scheme,
          prev.length,
          prev,
          undefined,
          nv
        )
        setName(nameFromHexes(next, scheme))
        return next
      })
      return nv
    })
  }

  const randomizeSeed = () => {
    const rand = `#${Math.floor(Math.random() * 0xffffff)
      .toString(16)
      .padStart(6, '0')
      .toUpperCase()}`
    setSeed(rand)
    setVariant(0)
    setColors((prev) => {
      const next = generateScheme(rand, scheme, prev.length, prev, undefined, 0)
      setName(nameFromHexes(next, scheme))
      return next
    })
  }

  const exportPoster = async () => {
    const node = posterRefCard.current ?? posterRefFull.current
    if (!node) return
    const dataUrl = await htmlToImage.toPng(node, {
      backgroundColor: dark ? '#0a0a0a' : '#ffffff'
    })
    const a = document.createElement('a')
    a.href = dataUrl
    a.download = `palette-studio-${seed.replace('#', '')}-${scheme}.png`
    a.click()
    setToast('Poster exported')
    setTimeout(() => setToast(undefined), 1800)
  }

  // Full-screen poster gradient background
  const c0 = colors[0] ?? seed
  const c1 = colors[1] ?? c0
  const c2 = colors[2] ?? c1
  const posterGradient = (() => {
    switch (gradient) {
      case 'linear':
        return `linear-gradient(135deg, ${c0} 0%, ${c1} 50%, ${c2} 100%)`
      case 'radial':
        return `radial-gradient(900px 700px at 45% 35%, ${c0} 0%, ${c1} 55%, ${c2} 100%)`
      case 'conic':
        return `conic-gradient(from 0deg at 50% 50%, ${c0} 0deg, ${c1} 140deg, ${c2} 260deg, ${c0} 360deg)`
      case 'repeating-linear':
        return `repeating-linear-gradient(45deg, ${c0} 0, ${c0} 24px, ${c1} 24px, ${c1} 48px, ${c2} 48px, ${c2} 72px)`
      case 'repeating-radial':
        return `repeating-radial-gradient(circle at 50% 50%, ${c0} 0, ${c0} 14px, ${c1} 14px, ${c1} 28px, ${c2} 28px, ${c2} 42px)`
      default:
        return `linear-gradient(135deg, ${c0} 0%, ${c1} 50%, ${c2} 100%)`
    }
  })()

  const copyHex = async (hex: string) => {
    await navigator.clipboard.writeText(hex)
    setToast(`${hex} copied`)
    setTimeout(() => setToast(undefined), 1500)
  }

  // Choose readable text color for hex labels on swatches
  const contrastText = (hex: string) => {
    const { r, g, b } = hexToRgb(hex)
    const pl = (0.299 * r + 0.587 * g + 0.114 * b) / 255 // perceptive luminance
    return pl > 0.6 ? '#0b0b0b' : '#F8F8F2'
  }

  // Inline icons (no external deps)
  const Icon = {
    Sun: (p: any) => (
      <svg
        viewBox='0 0 24 24'
        fill='none'
        stroke='currentColor'
        strokeWidth='1.5'
        className={'h-5 w-5 ' + (p.className || '')}
        aria-hidden
      >
        <path
          strokeLinecap='round'
          strokeLinejoin='round'
          d='M12 3v2m0 14v2m9-9h-2M5 12H3m15.364-6.364-1.414 1.414M7.05 16.95 5.636 18.364m12.728 0L16.95 16.95M7.05 7.05 5.636 5.636M12 8a4 4 0 1 1 0 8 4 4 0 0 1 0-8Z'
        />
      </svg>
    ),
    Moon: (p: any) => (
      <svg
        viewBox='0 0 24 24'
        fill='none'
        stroke='currentColor'
        strokeWidth='1.5'
        className={'h-5 w-5 ' + (p.className || '')}
        aria-hidden
      >
        <path
          strokeLinecap='round'
          strokeLinejoin='round'
          d='M21 12.79A9 9 0 1 1 11.21 3a7 7 0 1 0 9.79 9.79Z'
        />
      </svg>
    ),
    Download: (p: any) => (
      <svg
        viewBox='0 0 24 24'
        fill='none'
        stroke='currentColor'
        strokeWidth='1.5'
        className={'h-5 w-5 ' + (p.className || '')}
        aria-hidden
      >
        <path
          strokeLinecap='round'
          strokeLinejoin='round'
          d='M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5M16.5 12 12 16.5 7.5 12M12 16.5V3'
        />
      </svg>
    ),
    Dice: (p: any) => (
      <svg
        viewBox='0 0 24 24'
        fill='none'
        stroke='currentColor'
        strokeWidth='1.5'
        className={'h-5 w-5 ' + (p.className || '')}
        aria-hidden
      >
        <rect x='3' y='3' width='18' height='18' rx='3' />
        <circle cx='8' cy='8' r='1.25' fill='currentColor' stroke='none' />
        <circle cx='12' cy='12' r='1.25' fill='currentColor' stroke='none' />
        <circle cx='16' cy='16' r='1.25' fill='currentColor' stroke='none' />
      </svg>
    ),
    Refresh: (p: any) => (
      <svg
        viewBox='0 0 24 24'
        fill='none'
        stroke='currentColor'
        strokeWidth='1.5'
        className={'h-5 w-5 ' + (p.className || '')}
        aria-hidden
      >
        <path
          strokeLinecap='round'
          strokeLinejoin='round'
          d='M16 8a6 6 0 1 0 2.472 11.5M16 8V3m0 5h5'
        />
      </svg>
    )
  }

  // Drive background animation (imperative) on both desktop and mobile layers
  useGradientAnimation({
    gradient,
    colors,
    animate,
    speed,
    bgCardRef,
    bgFullRef,
    prefersReducedMotion,
    baseGradient: posterGradient
  })

  return (
    <main id='main' role='main' className='relative min-h-screen'>
      <BackButton href='/work' label='Back to Work' />
      {/* SR-only live region for announcements */}
      <div className='sr-only' role='status' aria-live='polite'>
        {toast || ''}
      </div>
      {/* Desktop: Full-screen poster */}
      <div className='hidden md:block absolute inset-0 z-0'>
        <div ref={posterRefFull} className='absolute inset-0'>
          <div
            ref={bgFullRef}
            className='absolute inset-0 pointer-events-none'
            style={{ background: posterGradient }}
          />
          <div
            aria-hidden
            className='absolute inset-0 mix-blend-multiply pointer-events-none'
            style={{
              background: `radial-gradient(1200px 800px at 50% -10%, transparent 40%, ${
                dark ? 'rgba(0,0,0,0.25)' : 'rgba(0,0,0,0.06)'
              } 100%)`
            }}
          />
          <div className='relative z-10 h-full flex flex-col'>
            <div className='px-6 pt-10'>
              <div className='flex items-baseline gap-3'>
                <input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  aria-label='Palette name'
                  className={`font-display text-5xl md:text-7xl font-black tracking-tight bg-transparent outline-none ${
                    dark
                      ? 'text-light drop-shadow-[0_1px_8px_rgba(0,0,0,0.4)]'
                      : 'text-dark'
                  }`}
                />
                <div
                  className={`${
                    dark
                      ? 'text-light/80 drop-shadow-[0_1px_6px_rgba(0,0,0,0.4)]'
                      : 'text-dark/80'
                  }`}
                >
                  {scheme.toUpperCase()} — {seed}
                </div>
              </div>
            </div>
            <div className='mt-auto px-6 pb-32 md:pb-40'>
              <div className='flex gap-2'>
                {colors.map((c, i) => (
                  <button
                    type='button'
                    onClick={() => copyHex(c)}
                    aria-label={`Copy ${c}`}
                    key={i}
                    className={`relative group cursor-pointer h-12 w-20 md:h-16 md:w-28 rounded-xl shadow-lg ring-1 ring-black/10 transition-all duration-700 hover:scale-105 hover:shadow-xl hover:ring-2 hover:ring-white/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70 ${
                      revealed
                        ? 'opacity-100 translate-y-0'
                        : 'opacity-0 translate-y-1'
                    }`}
                    style={{
                      backgroundColor: c,
                      transitionDelay: `${i * 140}ms`
                    }}
                  >
                    {/* bottom hex label (hover/focus only) */}
                    <span
                      className='absolute inset-x-1 bottom-1 text-[10px] font-mono text-center leading-none opacity-0 group-hover:opacity-100 group-active:opacity-100 group-focus-within:opacity-100 transition-opacity duration-300'
                      style={{ color: contrastText(c) }}
                    >
                      {c}
                    </span>
                    {/* top pill tooltip (placed inside swatch to avoid clipping) */}
                    <span className='absolute left-1/2 -translate-x-1/2 top-1 px-2 py-0.5 rounded-full text-[10px] font-medium transition-all duration-200 pointer-events-none opacity-0 -translate-y-1 bg-black/50 text-white group-hover:opacity-100 group-focus-visible:opacity-100'>
                      Copy
                    </span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile: Poster in a rounded card */}
      <div
        className={`md:hidden relative z-0 min-h-screen bg-gradient-to-b ${
          dark
            ? 'from-dark via-dark-secondary to-surface'
            : 'from-white via-accent-1 to-accent-2'
        }`}
      >
        <div className='px-4 pt-8 pb-36'>
          <div
            ref={posterRefCard}
            className='rounded-3xl overflow-hidden border border-white/15 shadow-2xl'
          >
            <div
              className='p-6 min-h-[60vh] flex flex-col justify-between'
              style={{ background: posterGradient }}
              ref={bgCardRef}
            >
              <div>
                <div
                  className={`text-xs uppercase tracking-widest opacity-90 ${
                    dark ? 'text-light' : 'text-dark'
                  }`}
                >
                  Palette
                </div>
                {/* Mobile compact controls: gradient + animate */}
                <div className='mt-2 flex items-center gap-2'>
                  <label className='flex items-center gap-1.5 text-xs'>
                    <span
                      className={`${dark ? 'text-light/80' : 'text-dark/80'}`}
                    >
                      Gradient
                    </span>
                    <select
                      value={gradient}
                      onChange={(e) =>
                        setGradient(e.target.value as GradientKind)
                      }
                      className={`bg-black/20 ${
                        dark ? 'text-white' : 'text-dark'
                      } text-xs rounded-full px-2 py-1 outline-none`}
                      aria-label='Gradient type'
                    >
                      <option value='linear'>Linear</option>
                      <option value='radial'>Radial</option>
                      <option value='conic'>Conic</option>
                      <option value='repeating-linear'>Repeating Linear</option>
                      <option value='repeating-radial'>Repeating Radial</option>
                    </select>
                  </label>
                  <button
                    type='button'
                    onClick={() => setAnimate((a) => !a)}
                    aria-pressed={animate}
                    aria-label='Toggle animation'
                    className={`ml-auto inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs transition ${
                      dark
                        ? 'border-white/30 text-white/90'
                        : 'border-black/20 text-dark/90'
                    }`}
                  >
                    <span>Animate</span>
                    <span
                      className={`h-4 w-7 rounded-full relative transition-colors ${
                        animate ? 'bg-emerald-400/80' : 'bg-white/30'
                      }`}
                      aria-hidden
                    >
                      <span
                        className={`absolute top-1/2 -translate-y-1/2 h-3 w-3 rounded-full bg-white transition-transform ${
                          animate ? 'translate-x-4' : 'translate-x-1'
                        }`}
                      />
                    </span>
                  </button>
                </div>
                <input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  aria-label='Palette name'
                  className={`font-display text-4xl font-black tracking-tight bg-transparent outline-none ${
                    dark
                      ? 'text-light drop-shadow-[0_1px_8px_rgba(0,0,0,0.4)]'
                      : 'text-dark'
                  }`}
                />
                <div
                  className={`${
                    dark
                      ? 'text-light/80 drop-shadow-[0_1px_6px_rgba(0,0,0,0.4)]'
                      : 'text-dark/80'
                  } mt-1`}
                >
                  {scheme.toUpperCase()} — {seed}
                </div>
              </div>
              <div>
                <div className='flex gap-2'>
                  {colors.map((c, i) => (
                    <button
                      type='button'
                      onClick={() => copyHex(c)}
                      aria-label={`Copy ${c}`}
                      key={i}
                      className={`relative group cursor-pointer h-10 w-16 rounded-xl shadow-lg ring-1 ring-black/10 transition-all duration-700 hover:scale-105 hover:shadow-xl hover:ring-2 hover:ring-white/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70 ${
                        revealed
                          ? 'opacity-100 translate-y-0'
                          : 'opacity-0 translate-y-1'
                      }`}
                      style={{
                        backgroundColor: c,
                        transitionDelay: `${i * 140}ms`
                      }}
                    >
                      {/* bottom hex label (hover/focus only) */}
                      <span
                        className='absolute inset-x-1 bottom-1 text-[10px] font-mono text-center leading-none opacity-0 group-hover:opacity-100 group-active:opacity-100 group-focus-within:opacity-100 transition-opacity duration-300'
                        style={{ color: contrastText(c) }}
                      >
                        {c}
                      </span>
                      {/* top pill tooltip (placed inside swatch to avoid clipping) */}
                      <span className='absolute left-1/2 -translate-x-1/2 top-1 px-2 py-0.5 rounded-full text-[10px] font-medium transition-all duration-200 pointer-events-none opacity-0 -translate-y-1 bg-black/50 text-white group-hover:opacity-100 group-focus-visible:opacity-100'>
                        Copy
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Top-right actions (not included in export) */}
      <div className='pointer-events-auto fixed top-3 right-3 md:top-6 md:right-6 flex flex-col md:flex-row items-end md:items-center gap-1.5 md:gap-2 z-50'>
        <button
          onClick={() => setDark((d) => !d)}
          aria-label='Toggle dark mode'
          title='Toggle dark mode'
          className={`h-9 w-9 md:h-10 md:w-auto md:px-3 rounded-full border backdrop-blur-md flex items-center justify-center md:justify-start gap-2 transition-transform hover:scale-105 ${
            dark ? 'border-white/30 text-white' : 'border-white/70 text-white'
          }`}
        >
          {dark ? <Icon.Moon /> : <Icon.Sun />}
          <span className='hidden md:inline'>{dark ? 'Dark' : 'Light'}</span>
        </button>
        {/* Desktop-only gradient type selector */}
        <label className='hidden md:flex items-center gap-2 h-10 rounded-full border border-white/20 backdrop-blur-md text-white px-2'>
          <span className='text-xs opacity-80'>Gradient</span>
          <select
            value={gradient}
            onChange={(e) => setGradient(e.target.value as GradientKind)}
            className='bg-black/20 text-white text-sm rounded-full px-2 py-1 outline-none'
            aria-label='Gradient type'
          >
            <option value='linear'>Linear</option>
            <option value='radial'>Radial</option>
            <option value='conic'>Conic</option>
            <option value='repeating-linear'>Repeating Linear</option>
            <option value='repeating-radial'>Repeating Radial</option>
          </select>
        </label>
        {/* Desktop: keep layout unchanged (no speed/animate here) */}
        <button
          onClick={exportPoster}
          aria-label='Export poster'
          title='Export poster'
          className='h-9 w-9 md:h-10 md:w-auto md:px-4 rounded-full border border-white/20 backdrop-blur-md text-white shadow-lg flex items-center justify-center md:justify-start gap-2 transition-transform hover:scale-105'
        >
          <Icon.Download />
          <span className='hidden md:inline'>Export</span>
        </button>
      </div>

      {/* Floating controls at bottom center (not in export) */}
      <div className='pointer-events-auto fixed left-4 right-4 md:inset-x-0 bottom-4 md:bottom-6 flex justify-center z-50 pb-[env(safe-area-inset-bottom)]'>
        <div className='w-full md:w-auto max-w-xl backdrop-blur-md bg-black/30 border border-white/20 text-white rounded-2xl shadow-lg px-3 py-3 sm:px-4 sm:py-3'>
          <div className='grid grid-cols-1 gap-2'>
            {/* Row 1: inputs */}
            <div className='grid grid-cols-[auto_1fr] gap-2 items-center'>
              <input
                type='color'
                value={seed}
                onChange={(e) => setSeed(e.target.value.toUpperCase())}
                className='h-9 w-11 rounded border border-white/30 bg-transparent'
                aria-label='Base color'
              />
              <select
                value={scheme}
                onChange={(e) => setScheme(e.target.value as Scheme)}
                className='rounded bg-transparent border border-white/30 text-white px-2 py-2 text-sm md:text-base'
                aria-label='Color scheme'
              >
                <option value='mono'>Monochrome</option>
                <option value='analogous'>Analogous</option>
                <option value='complementary'>Complementary</option>
                <option value='triad'>Triad</option>
                <option value='split'>Split</option>
                <option value='tetrad'>Tetrad</option>
                <option value='shades'>Shades</option>
              </select>
            </div>
            {/* Row 2: actions */}
            <div className='flex gap-2 flex-wrap'>
              <button
                onClick={() => setShowColors((s) => !s)}
                className='inline-flex items-center justify-center gap-2 px-3 py-2 rounded-lg border border-white/30 text-white/90 hover:bg-white/10 transition text-sm md:text-base'
                aria-expanded={showColors}
                aria-controls='colors-panel'
              >
                {/* Palette icon */}
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
                    d='M12 3a9 9 0 1 0 0 18c1.657 0 3-1.343 3-3 0-1.105.895-2 2-2h1a3 3 0 0 0 0-6h-1a2 2 0 0 1-2-2c0-1.657-1.343-3-3-3Z'
                  />
                </svg>
                <span>{showColors ? 'Hide Colors' : 'Show Colors'}</span>
              </button>
              {/* Mobile only: open overflow sheet for Speed */}
              <button
                onClick={() => setSettingsOpen(true)}
                className='inline-flex items-center justify-center gap-2 px-3 py-2 rounded-lg border border-white/30 text-white/90 hover:bg-white/10 transition text-sm md:hidden'
                aria-haspopup='dialog'
                aria-controls='settings-sheet'
              >
                {/* Dots icon */}
                <svg
                  viewBox='0 0 24 24'
                  fill='currentColor'
                  className='h-5 w-5'
                  aria-hidden
                >
                  <circle cx='5' cy='12' r='1.6' />
                  <circle cx='12' cy='12' r='1.6' />
                  <circle cx='19' cy='12' r='1.6' />
                </svg>
                <span>More</span>
              </button>
              <button
                onClick={randomizeSeed}
                className='inline-flex items-center justify-center gap-2 px-3 py-2 rounded-lg border border-white/30 text-white/90 hover:bg-white/10 transition text-sm md:text-base'
                aria-label='Randomize seed'
              >
                <Icon.Dice />
                <span>Randomize</span>
              </button>
              <button
                onClick={regenerate}
                className='inline-flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-r from-electric to-electric-secondary text-dark font-semibold flex-1 md:flex-none'
                aria-label='Regenerate palette'
              >
                <Icon.Refresh />
                <span>Regenerate</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Colors Panel */}
      {showColors && (
        <div
          id='colors-panel'
          className='fixed left-4 right-4 md:left-1/2 md:right-auto md:-translate-x-1/2 md:w-[600px] bottom-28 md:bottom-32 z-50'
        >
          <div className='backdrop-blur-md bg-black/40 border border-white/20 text-white rounded-2xl shadow-2xl p-4'>
            <div className='flex items-center justify-between mb-3'>
              <div className='text-sm text-white/70'>Palette colors</div>
              <button
                onClick={() => setShowColors(false)}
                className='h-8 w-8 rounded-full border border-white/30 flex items-center justify-center hover:bg-white/10'
                aria-label='Close colors'
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
                    d='M6 18 18 6M6 6l12 12'
                  />
                </svg>
              </button>
            </div>
            <div className='grid grid-cols-1 sm:grid-cols-2 gap-2'>
              {colors.map((c, i) => (
                <button
                  key={i}
                  onClick={() => copyHex(c)}
                  className={`group w-full flex items-center gap-3 rounded-xl border border-white/20 bg-white/5 hover:bg-white/10 p-3 text-left transition-all duration-700 hover:scale-[1.02] ${
                    revealed
                      ? 'opacity-100 translate-y-0'
                      : 'opacity-0 translate-y-1'
                  }`}
                  style={{ transitionDelay: `${i * 120}ms` }}
                >
                  <span
                    className='h-6 w-6 rounded-md ring-1 ring-black/10 transition-transform duration-300 group-hover:scale-110'
                    style={{ backgroundColor: c }}
                  />
                  <span className='font-mono text-sm tracking-tight'>{c}</span>
                  <span className='ml-auto opacity-70 group-hover:opacity-100 text-xs'>
                    Tap to copy
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Settings Sheet (mobile) */}
      {settingsOpen && (
        <div
          id='settings-sheet'
          role='dialog'
          aria-modal='true'
          className='fixed inset-0 z-[60] md:hidden'
        >
          <button
            aria-label='Close settings'
            className='absolute inset-0 bg-black/40'
            onClick={() => setSettingsOpen(false)}
          />
          <div className='absolute left-0 right-0 bottom-0 rounded-t-2xl bg-zinc-900 text-white border-t border-white/20 p-4 shadow-2xl'>
            <div className='mx-auto max-w-md'>
              <div className='flex items-center justify-between'>
                <h2 className='text-sm font-medium text-white/80'>Playback</h2>
                <button
                  onClick={() => setSettingsOpen(false)}
                  className='h-9 w-9 rounded-full border border-white/30 flex items-center justify-center'
                  aria-label='Close'
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
                      d='M6 18 18 6M6 6l12 12'
                    />
                  </svg>
                </button>
              </div>
              <div className='mt-4'>
                <label className='flex items-center justify-between text-sm'>
                  <span className='text-white/80'>Speed</span>
                  <span className='tabular-nums text-white/60'>
                    x{speed.toFixed(2)}
                  </span>
                </label>
                <input
                  type='range'
                  min={0.25}
                  max={2}
                  step={0.25}
                  value={speed}
                  onChange={(e) => setSpeed(parseFloat(e.target.value))}
                  className='w-full accent-emerald-400'
                  aria-label='Animation speed'
                />
                <p className='mt-2 text-xs text-white/60'>
                  Repeating Linear scrolls left-to-right. Other gradients subtly
                  drift or rotate.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Toast */}
      {toast && (
        <div className='fixed top-4 left-1/2 -translate-x-1/2 z-50'>
          <div className='px-3 py-1.5 rounded-full bg-black/70 text-white text-sm border border-white/20 shadow-lg'>
            {toast}
          </div>
        </div>
      )}
    </main>
  )
}

export default function PaletteStudioPage() {
  return (
    <Suspense
      fallback={
        <main className='min-h-screen flex items-center justify-center'>
          <div className='text-muted'>Loading…</div>
        </main>
      }
    >
      <StudioClient />
    </Suspense>
  )
}

// Animation engine: keep modest CPU by imperative style updates.
// Applies to mobile card and desktop layer when present.
function useGradientAnimation(params: {
  gradient: GradientKind
  colors: string[]
  animate: boolean
  speed: number
  bgCardRef: RefObject<HTMLDivElement>
  bgFullRef: RefObject<HTMLDivElement>
  prefersReducedMotion: MutableRefObject<boolean>
  baseGradient: string
}) {
  const {
    gradient,
    colors,
    animate,
    speed,
    bgCardRef,
    bgFullRef,
    prefersReducedMotion,
    baseGradient
  } = params
  const rafRef = useRef<number | null>(null)

  // Reset to static when inputs change
  useEffect(() => {
    const nodes = [bgCardRef.current, bgFullRef.current].filter(
      Boolean
    ) as HTMLDivElement[]
    nodes.forEach((n) => {
      n.style.background = baseGradient
      n.style.backgroundPosition = ''
    })
  }, [baseGradient, bgCardRef, bgFullRef])

  useEffect(() => {
    const m = window.matchMedia('(prefers-reduced-motion: reduce)')
    prefersReducedMotion.current = m.matches
    const onChange = (e: MediaQueryListEvent) =>
      (prefersReducedMotion.current = e.matches)
    m.addEventListener('change', onChange)
    return () => m.removeEventListener('change', onChange)
  }, [prefersReducedMotion])

  // Build animated frame
  useEffect(() => {
    if (!animate || prefersReducedMotion.current) {
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
      const nodes = [bgCardRef.current, bgFullRef.current].filter(
        Boolean
      ) as HTMLDivElement[]
      nodes.forEach((n) => {
        n.style.background = baseGradient
        n.style.backgroundPosition = ''
      })
      return
    }
    let start = performance.now()
    const c0 = colors[0] ?? '#000000'
    const c1 = colors[1] ?? c0
    const c2 = colors[2] ?? c1
    // Capture current nodes once for this effect lifetime
    const n1 = bgCardRef.current
    const n2 = bgFullRef.current
    const nodes = [n1, n2].filter(Boolean) as HTMLDivElement[]
    const loop = (t: number) => {
      const dt = (t - start) * 0.001 * Math.max(0.1, Math.min(3, speed || 1))
      if (gradient === 'repeating-linear') {
        const background = `repeating-linear-gradient(45deg, ${c0} 0, ${c0} 24px, ${c1} 24px, ${c1} 48px, ${c2} 48px, ${c2} 72px)`
        const backgroundPosition = `${(dt * 64) % 64}px 0px`
        nodes.forEach((n) => {
          n.style.background = background
          n.style.backgroundPosition = backgroundPosition
        })
      } else if (gradient === 'linear') {
        const angle = 135 + Math.sin(dt * 1.2) * 12
        const background = `linear-gradient(${angle}deg, ${c0} 0%, ${c1} 50%, ${c2} 100%)`
        nodes.forEach((n) => (n.style.background = background))
      } else if (gradient === 'conic') {
        const from = (dt * 40) % 360
        const background = `conic-gradient(from ${from}deg at 50% 50%, ${c0} 0deg, ${c1} 140deg, ${c2} 260deg, ${c0} 360deg)`
        nodes.forEach((n) => (n.style.background = background))
      } else if (gradient === 'radial') {
        const cx = 50 + Math.sin(dt * 0.8) * 6
        const cy = 50 + Math.cos(dt * 0.6) * 6
        const rx = 900 + Math.sin(dt * 0.9) * 60
        const ry = 700 + Math.cos(dt * 0.7) * 60
        const background = `radial-gradient(${rx}px ${ry}px at ${cx}% ${cy}%, ${c0} 0%, ${c1} 55%, ${c2} 100%)`
        nodes.forEach((n) => (n.style.background = background))
      } else if (gradient === 'repeating-radial') {
        const cx = 50 + Math.sin(dt * 0.9) * 4
        const cy = 50 + Math.cos(dt * 0.7) * 4
        const background = `repeating-radial-gradient(circle at ${cx}% ${cy}%, ${c0} 0, ${c0} 14px, ${c1} 14px, ${c1} 28px, ${c2} 28px, ${c2} 42px)`
        nodes.forEach((n) => (n.style.background = background))
      }
      rafRef.current = requestAnimationFrame(loop)
    }
    rafRef.current = requestAnimationFrame(loop)
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
      if (n1) {
        n1.style.background = baseGradient
        n1.style.backgroundPosition = ''
      }
      if (n2) {
        n2.style.background = baseGradient
        n2.style.backgroundPosition = ''
      }
    }
  }, [
    animate,
    speed,
    gradient,
    colors,
    baseGradient,
    bgCardRef,
    bgFullRef,
    prefersReducedMotion
  ])
}
