'use client'

import { useMemo, useRef, useState } from 'react'
import Link from 'next/link'
import BackButton from '@/components/BackButton'

type Adjective = 'modern' | 'trustworthy' | 'fun' | 'elegant' | 'bold' | 'calm'
type ColorSeed = 'blue' | 'green' | 'purple' | 'orange' | 'pink' | 'teal'

interface BrandConfig {
  adjectives: Adjective[]
  colorSeed: ColorSeed
  brandName: string
}

const ADJECTIVE_OPTIONS: { value: Adjective; label: string }[] = [
  { value: 'modern', label: 'Modern' },
  { value: 'trustworthy', label: 'Trustworthy' },
  { value: 'fun', label: 'Fun' },
  { value: 'elegant', label: 'Elegant' },
  { value: 'bold', label: 'Bold' },
  { value: 'calm', label: 'Calm' }
]

const COLOR_SEEDS: { value: ColorSeed; label: string; swatch: string }[] = [
  { value: 'blue', label: 'Ocean', swatch: 'bg-blue-500' },
  { value: 'green', label: 'Forest', swatch: 'bg-green-500' },
  { value: 'purple', label: 'Cosmic', swatch: 'bg-purple-500' },
  { value: 'orange', label: 'Sunset', swatch: 'bg-orange-500' },
  { value: 'pink', label: 'Bloom', swatch: 'bg-pink-500' },
  { value: 'teal', label: 'Mint', swatch: 'bg-teal-500' }
]

// Curated combinations based on adjectives + color seeds
const BRAND_COMBINATIONS: Record<
  string,
  {
    palette: {
      primary: string
      secondary: string
      accent: string
      neutral: string
    }
    typography: { heading: string; body: string }
    personality: string[]
  }
> = {
  'modern-blue': {
    palette: {
      primary: '#3b82f6',
      secondary: '#1e40af',
      accent: '#60a5fa',
      neutral: '#64748b'
    },
    typography: { heading: 'Inter', body: 'Inter' },
    personality: ['Clean', 'Professional', 'Tech-forward']
  },
  'trustworthy-green': {
    palette: {
      primary: '#059669',
      secondary: '#047857',
      accent: '#34d399',
      neutral: '#6b7280'
    },
    typography: { heading: 'Source Sans Pro', body: 'Source Sans Pro' },
    personality: ['Reliable', 'Growth-oriented', 'Sustainable']
  },
  'fun-orange': {
    palette: {
      primary: '#f97316',
      secondary: '#ea580c',
      accent: '#fb923c',
      neutral: '#78716c'
    },
    typography: { heading: 'Poppins', body: 'Inter' },
    personality: ['Playful', 'Energetic', 'Creative']
  },
  'elegant-purple': {
    palette: {
      primary: '#7c3aed',
      secondary: '#5b21b6',
      accent: '#a78bfa',
      neutral: '#6b7280'
    },
    typography: { heading: 'Playfair Display', body: 'Source Sans Pro' },
    personality: ['Sophisticated', 'Premium', 'Innovative']
  },
  'bold-pink': {
    palette: {
      primary: '#ec4899',
      secondary: '#be185d',
      accent: '#f472b6',
      neutral: '#737373'
    },
    typography: { heading: 'Montserrat', body: 'Inter' },
    personality: ['Confident', 'Dynamic', 'Disruptive']
  },
  'calm-teal': {
    palette: {
      primary: '#0d9488',
      secondary: '#0f766e',
      accent: '#5eead4',
      neutral: '#64748b'
    },
    typography: { heading: 'Lato', body: 'Lato' },
    personality: ['Peaceful', 'Mindful', 'Balanced']
  }
}

// Fallback combinations for other adjective-color pairings
const getFallbackCombo = (adj: Adjective, color: ColorSeed) => {
  const baseColors: Record<
    ColorSeed,
    { primary: string; secondary: string; accent: string }
  > = {
    blue: { primary: '#3b82f6', secondary: '#1e40af', accent: '#60a5fa' },
    green: { primary: '#10b981', secondary: '#059669', accent: '#34d399' },
    purple: { primary: '#8b5cf6', secondary: '#7c3aed', accent: '#a78bfa' },
    orange: { primary: '#f97316', secondary: '#ea580c', accent: '#fb923c' },
    pink: { primary: '#ec4899', secondary: '#be185d', accent: '#f472b6' },
    teal: { primary: '#14b8a6', secondary: '#0d9488', accent: '#5eead4' }
  }

  const typeMap: Record<Adjective, { heading: string; body: string }> = {
    modern: { heading: 'Inter', body: 'Inter' },
    trustworthy: { heading: 'Source Sans Pro', body: 'Source Sans Pro' },
    fun: { heading: 'Poppins', body: 'Inter' },
    elegant: { heading: 'Playfair Display', body: 'Source Sans Pro' },
    bold: { heading: 'Montserrat', body: 'Inter' },
    calm: { heading: 'Lato', body: 'Lato' }
  }

  return {
    palette: { ...baseColors[color], neutral: '#6b7280' },
    typography: typeMap[adj],
    personality: ['Creative', 'Unique', 'Memorable']
  }
}

export default function BrandMoodboardPage() {
  const [adjectives, setAdjectives] = useState<Adjective[]>([
    'modern',
    'trustworthy'
  ])
  const [colorSeed, setColorSeed] = useState<ColorSeed>('blue')
  const [brandName, setBrandName] = useState('Your Brand')
  const [mobileMode, setMobileMode] = useState<'preview' | 'build'>('preview')
  const [showDetails, setShowDetails] = useState(false)

  const brandCardRef = useRef<HTMLDivElement>(null)

  const brandCombo = useMemo(() => {
    // Try to find a perfect match first
    const primaryAdj = adjectives[0]
    const comboKey = `${primaryAdj}-${colorSeed}`

    if (BRAND_COMBINATIONS[comboKey]) {
      return BRAND_COMBINATIONS[comboKey]
    }

    // Fallback to generated combination
    return getFallbackCombo(primaryAdj, colorSeed)
  }, [adjectives, colorSeed])

  const toggleAdjective = (adj: Adjective) => {
    setAdjectives((prev) => {
      if (prev.includes(adj)) {
        return prev.filter((a) => a !== adj).slice(0, 3) // Keep max 3
      } else {
        return [...prev, adj].slice(0, 3) // Add and limit to 3
      }
    })
  }

  const copyTokens = async () => {
    const tokens = {
      colors: brandCombo.palette,
      fonts: brandCombo.typography,
      personality: brandCombo.personality,
      adjectives: adjectives
    }
    await navigator.clipboard.writeText(JSON.stringify(tokens, null, 2))
  }

  const copyBrandCard = async () => {
    const node = brandCardRef.current
    if (!node) return
    const html = node.outerHTML
    await navigator.clipboard.writeText(html)
  }

  return (
    <main
      id='main'
      role='main'
      className='min-h-screen bg-gradient-to-br from-dark via-dark-secondary to-surface px-6 py-10'
    >
      <BackButton href='/work' label='Back to Work' />
      <div className='max-w-6xl mx-auto pb-28 lg:pb-0'>
        {/* Header */}
        <div className='text-center mb-6 md:mb-12'>
          <h1 className='text-4xl md:text-5xl font-display font-bold text-light mb-4'>
            Brand <span className='text-electric'>Moodboard</span>
          </h1>
          <p className='hidden md:block text-muted text-lg max-w-2xl mx-auto'>
            Pick 3 adjectives and a color seed. Watch your brand personality
            come to life with colors, typography, and personality traits in
            under a minute.
          </p>
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

        <div className='grid grid-cols-1 lg:grid-cols-5 gap-8'>
          {/* Controls (mobile: show after preview) */}
          <aside
            className={`order-2 lg:order-none lg:col-span-2 bg-surface border border-border rounded-2xl p-6 h-fit ${
              mobileMode === 'preview' ? 'hidden' : ''
            } lg:block`}
          >
            <h2 className='text-light font-display text-xl font-bold mb-6'>
              Brand Builder
            </h2>

            <div className='space-y-6'>
              {/* Brand Name */}
              <div>
                <label className='block text-sm text-muted mb-2'>
                  Brand Name
                </label>
                <input
                  className='w-full rounded-lg bg-dark-secondary border border-border text-light p-3 text-base'
                  value={brandName}
                  onChange={(e) => setBrandName(e.target.value)}
                  placeholder='Enter your brand name'
                />
              </div>

              {/* Adjectives */}
              <div>
                <label className='block text-sm text-muted mb-3'>
                  Brand Adjectives ({adjectives.length}/3)
                </label>
                <div className='grid grid-cols-2 gap-2'>
                  {ADJECTIVE_OPTIONS.map(({ value, label }) => (
                    <button
                      key={value}
                      onClick={() => toggleAdjective(value)}
                      className={`px-3.5 py-2.5 rounded-lg border transition text-base md:text-sm md:py-2 ${
                        adjectives.includes(value)
                          ? 'border-electric text-electric bg-electric/10'
                          : 'border-border text-light/80 hover:border-electric/50'
                      }`}
                    >
                      {label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Color Seed */}
              <div>
                <label className='block text-sm text-muted mb-3'>
                  Color Inspiration
                </label>
                <div className='grid grid-cols-3 gap-3'>
                  {COLOR_SEEDS.map(({ value, label, swatch }) => (
                    <button
                      key={value}
                      onClick={() => setColorSeed(value)}
                      className={`relative rounded-lg border transition p-3 ${
                        colorSeed === value
                          ? 'border-electric'
                          : 'border-border hover:border-electric/50'
                      }`}
                    >
                      <div
                        className={`w-full h-10 rounded ${swatch} mb-2`}
                      ></div>
                      <span className='text-sm md:text-xs text-light'>
                        {label}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Actions (hide on mobile; moved to sticky bar) */}
              <div className='pt-4 space-y-3 hidden lg:block'>
                <button
                  onClick={copyTokens}
                  className='w-full px-4 py-2 rounded-lg border border-electric text-electric hover:bg-electric hover:text-dark transition'
                >
                  Copy Design Tokens
                </button>
                <button
                  onClick={copyBrandCard}
                  className='w-full px-4 py-2 rounded-lg bg-gradient-to-r from-electric to-electric-secondary text-dark font-semibold hover:scale-105 transition-transform'
                >
                  Copy Brand Card
                </button>
              </div>
            </div>
          </aside>

          {/* Preview (mobile: show first) */}
          <section
            className={`order-1 lg:order-none lg:col-span-3 space-y-6 md:space-y-8 ${
              mobileMode === 'build' ? 'hidden' : ''
            } lg:block`}
          >
            {/* Brand Card Preview (first on mobile) */}
            <div
              ref={brandCardRef}
              className='bg-white rounded-2xl p-8 border border-border shadow-xl md:shadow-2xl'
              style={{ backgroundColor: brandCombo.palette.primary + '15' }}
            >
              <div className='text-center space-y-4'>
                <div
                  className='w-16 h-16 rounded-full mx-auto flex items-center justify-center text-white font-bold text-xl'
                  style={{ backgroundColor: brandCombo.palette.primary }}
                >
                  {brandName.charAt(0).toUpperCase()}
                </div>
                <h2
                  className='text-3xl font-bold'
                  style={{
                    fontFamily: brandCombo.typography.heading,
                    color: brandCombo.palette.secondary
                  }}
                >
                  {brandName}
                </h2>
                <div className='flex justify-center gap-2 flex-wrap'>
                  {brandCombo.personality.map((trait, idx) => (
                    <span
                      key={idx}
                      className='px-3 py-1 text-xs font-medium rounded-full'
                      style={{
                        backgroundColor: brandCombo.palette.accent + '30',
                        color: brandCombo.palette.secondary
                      }}
                    >
                      {trait}
                    </span>
                  ))}
                </div>
                <p
                  className='text-sm max-w-xs mx-auto'
                  style={{
                    fontFamily: brandCombo.typography.body,
                    color: brandCombo.palette.neutral
                  }}
                >
                  {adjectives
                    .map((adj) => adj.charAt(0).toUpperCase() + adj.slice(1))
                    .join(' • ')}
                </p>
              </div>
            </div>

            {/* Mobile: Details toggle */}
            <div className='lg:hidden'>
              <button
                onClick={() => setShowDetails((s) => !s)}
                className='w-full px-4 py-2 rounded-lg border border-white/30 text-white/90 hover:bg-white/10 transition'
              >
                {showDetails ? 'Hide details' : 'Show details'}
              </button>
            </div>

            {/* Color Palette (second on mobile) */}
            <div
              className={`bg-surface border border-border rounded-2xl p-6 ${
                !showDetails ? 'hidden lg:block' : ''
              }`}
            >
              <h3 className='text-light font-semibold text-lg mb-4'>
                Color Palette
              </h3>
              <div className='grid grid-cols-4 gap-4'>
                <div className='text-center'>
                  <div
                    className='w-full h-16 rounded-lg mb-2 border border-border'
                    style={{ backgroundColor: brandCombo.palette.primary }}
                  ></div>
                  <p className='text-xs text-muted'>Primary</p>
                  <p className='text-xs text-light font-mono'>
                    {brandCombo.palette.primary}
                  </p>
                </div>
                <div className='text-center'>
                  <div
                    className='w-full h-16 rounded-lg mb-2 border border-border'
                    style={{ backgroundColor: brandCombo.palette.secondary }}
                  ></div>
                  <p className='text-xs text-muted'>Secondary</p>
                  <p className='text-xs text-light font-mono'>
                    {brandCombo.palette.secondary}
                  </p>
                </div>
                <div className='text-center'>
                  <div
                    className='w-full h-16 rounded-lg mb-2 border border-border'
                    style={{ backgroundColor: brandCombo.palette.accent }}
                  ></div>
                  <p className='text-xs text-muted'>Accent</p>
                  <p className='text-xs text-light font-mono'>
                    {brandCombo.palette.accent}
                  </p>
                </div>
                <div className='text-center'>
                  <div
                    className='w-full h-16 rounded-lg mb-2 border border-border'
                    style={{ backgroundColor: brandCombo.palette.neutral }}
                  ></div>
                  <p className='text-xs text-muted'>Neutral</p>
                  <p className='text-xs text-light font-mono'>
                    {brandCombo.palette.neutral}
                  </p>
                </div>
              </div>
            </div>

            {/* Typography (third on mobile) */}
            <div
              className={`bg-surface border border-border rounded-2xl p-6 ${
                !showDetails ? 'hidden lg:block' : ''
              }`}
            >
              <h3 className='text-light font-semibold text-lg mb-4'>
                Typography
              </h3>
              <div className='space-y-4'>
                <div>
                  <p className='text-sm text-muted mb-1'>Heading Font</p>
                  <p
                    className='text-2xl font-bold text-light'
                    style={{ fontFamily: brandCombo.typography.heading }}
                  >
                    {brandCombo.typography.heading}
                  </p>
                </div>
                <div>
                  <p className='text-sm text-muted mb-1'>Body Font</p>
                  <p
                    className='text-lg text-light'
                    style={{ fontFamily: brandCombo.typography.body }}
                  >
                    {brandCombo.typography.body}
                  </p>
                </div>
              </div>
            </div>
          </section>
        </div>
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
            onClick={copyBrandCard}
            className='flex-1 px-4 py-3 rounded-lg bg-gradient-to-r from-electric to-electric-secondary text-dark font-semibold'
          >
            Copy Card
          </button>
        </div>
      </div>
    </main>
  )
}
