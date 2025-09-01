'use client'

import { useEffect, useState } from 'react'

type Toast = { id: number; text: string }

export default function ThemeToast() {
  const [toasts, setToasts] = useState<Toast[]>([])
  useEffect(() => {
    let idCounter = 1
    const push = (text: string) => {
      const id = idCounter++
      setToasts((t) => [...t, { id, text }])
      setTimeout(() => {
        setToasts((t) => t.filter((x) => x.id !== id))
      }, 2200)
    }

    const onApply = () => {
      try {
        const raw = localStorage.getItem('siteTheme')
        if (raw) {
          const parsed = JSON.parse(raw) as { paletteName?: string }
          push(
            `Theme applied${
              parsed.paletteName ? `: ${parsed.paletteName}` : ''
            }`
          )
          return
        }
      } catch {}
      push('Theme applied')
    }
    const onReset = () => push('Theme reset')

    window.addEventListener('siteTheme:apply', onApply)
    window.addEventListener('siteTheme:reset', onReset)
    return () => {
      window.removeEventListener('siteTheme:apply', onApply)
      window.removeEventListener('siteTheme:reset', onReset)
    }
  }, [])

  if (toasts.length === 0) return null

  return (
    <div className='pointer-events-none fixed inset-0 z-[100] flex flex-col items-center justify-end gap-2 p-4'>
      {toasts.map((t) => (
        <div
          key={t.id}
          className='pointer-events-auto mb-1 max-w-[90vw] rounded-xl border border-border bg-surface/90 px-4 py-2 text-sm text-light shadow-lg backdrop-blur-md'
          role='status'
          aria-live='polite'
        >
          {t.text}
        </div>
      ))}
    </div>
  )
}
