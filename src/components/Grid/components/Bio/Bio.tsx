import React from 'react'

const Bio = () => {
  return (
    <div className='bg-surface border border-border rounded-2xl p-8 hover:border-electric/50 transition-all duration-300'>
      <h3 className='text-light font-display font-bold text-2xl mb-6'>
        Hey! 👋🏽
      </h3>
      <div className='text-muted text-lg leading-relaxed space-y-4'>
        <p>
          I’m a{' '}
          <span className='text-electric font-semibold'>
            Senior Software Engineer
          </span>{' '}
          who blends product sense with pragmatic engineering to ship reliable,
          human‑centered software.
        </p>
        <p>
          For 10+ years, I’ve designed and delivered systems that scale—from
          advanced automation to unified product experiences. Recently, my focus
          has been on{' '}
          <span className='text-electric-secondary font-semibold'>
            building with generative AI models and systems on top of AI/ML
          </span>
          —turning powerful models into simple, observable, and production‑ready
          features.
        </p>
        <p>
          I mentor teams, teach workshops, and hold two patents in product
          innovation. When I’m not building, I’m exploring new tech, supporting
          developers, or spending time with family.
        </p>
      </div>
    </div>
  )
}

export default Bio
