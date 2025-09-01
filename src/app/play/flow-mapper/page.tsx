'use client'

import Link from 'next/link'

export default function FlowMapperPlaceholder() {
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
      <div className='max-w-3xl mx-auto bg-surface border border-border rounded-2xl p-8 text-center'>
        <h1 className='text-light font-display text-2xl font-bold mb-2'>
          App Flow Mapper
        </h1>
        <p className='text-muted'>
          Coming soon — drag screens, connect flows, and export a clean diagram.
        </p>
      </div>
    </main>
  )
}
