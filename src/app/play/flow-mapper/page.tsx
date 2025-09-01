'use client'

import Link from 'next/link'
import BackButton from '@/components/BackButton'

export default function FlowMapperPlaceholder() {
  return (
    <main className='min-h-screen bg-gradient-to-br from-dark via-dark-secondary to-surface px-6 py-10'>
      <BackButton href='/work' label='Back to Work' />
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
