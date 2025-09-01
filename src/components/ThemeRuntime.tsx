'use client'

import { useEffect } from 'react'

type SiteTheme = {
  paletteName: string
  colors: string[] // [accent, accentSecondary, dark, light, border]
  mode: 'dark' | 'light'
  fonts?: {
    display?: 'playfair' | 'spaceGrotesk' | 'inter' | 'ibmPlex'
    sans?: 'inter' | 'ibmPlex' | 'spaceGrotesk'
  }
}

export default function ThemeRuntime() {
  useEffect(() => {
    const apply = () => {
      try {
        const raw = localStorage.getItem('siteTheme')
        if (!raw) return
        const t = JSON.parse(raw) as SiteTheme
        if (!Array.isArray(t.colors) || t.colors.length < 5) return
        const [accent, accentSecondary, dark, light, border] = t.colors
        const root = document.documentElement
        root.style.setProperty('--accent-color', accent)
        root.style.setProperty('--accent-secondary-color', accentSecondary)
        // Map extended color tokens
        root.style.setProperty('--color-dark', dark)
        root.style.setProperty('--color-dark-secondary', 'rgb(26,26,26)')
        root.style.setProperty('--color-light', light)
        root.style.setProperty('--color-border', border)
        // Derive surface from dark
        root.style.setProperty('--color-surface', dark)
        root.style.setProperty(
          '--background-start-rgb',
          t.mode === 'dark' ? '10, 10, 10' : '255, 255, 255'
        )
        root.style.setProperty(
          '--foreground-rgb',
          t.mode === 'dark' ? '248, 248, 242' : '17, 24, 39'
        )
        if (t.mode === 'light') {
          root.style.setProperty('--background-end-rgb', '255, 255, 255')
        }
        // Fonts
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
        if (t.fonts?.display)
          root.style.setProperty(
            '--font-display-active',
            mapDisplay[t.fonts.display]
          )
        if (t.fonts?.sans)
          root.style.setProperty('--font-sans-active', mapSans[t.fonts.sans])
      } catch {}
    }
    apply()
    const onReset = () => {
      const root = document.documentElement
      root.style.removeProperty('--accent-color')
      root.style.removeProperty('--accent-secondary-color')
      root.style.removeProperty('--background-start-rgb')
      root.style.removeProperty('--foreground-rgb')
      root.style.removeProperty('--background-end-rgb')
      root.style.removeProperty('--font-display-active')
      root.style.removeProperty('--font-sans-active')
      // Also clear color token overrides to fall back to globals.css defaults
      root.style.removeProperty('--color-dark')
      root.style.removeProperty('--color-dark-secondary')
      root.style.removeProperty('--color-light')
      root.style.removeProperty('--color-surface')
      root.style.removeProperty('--color-border')
    }
    window.addEventListener('siteTheme:apply', apply)
    window.addEventListener('siteTheme:reset', onReset)
    window.addEventListener('storage', (e) => {
      if (e.key === 'siteTheme') apply()
    })
    return () => {
      window.removeEventListener('siteTheme:apply', apply)
      window.removeEventListener('siteTheme:reset', onReset)
    }
  }, [])
  return null
}
