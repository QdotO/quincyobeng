import React from 'react'

const Bio = () => {
  return (
    <div className='bg-surface border border-border rounded-2xl p-8 hover:border-electric/50 transition-all duration-300'>
      <h3 className='text-light font-display font-bold text-2xl mb-6'>
        Hey! 👋🏽
      </h3>
      <div className='text-muted text-lg leading-relaxed space-y-4'>
        <p>
          I&apos;m a{' '}
          <span className='text-electric font-semibold'>
            Senior Software Engineer
          </span>{' '}
          with over a decade of experience building innovation products at the
          intersection of technology, design and user experience. For the past
          two years I&apos;ve been focused on{' '}
          <span className='text-electric-secondary font-semibold'>
            AI/ML and Generative AI
          </span>
          , creating intelligent applications that leverage the latest
          advancements in machine learning to deliver personalized and impactful
          user experiences. I&apos;ve become passionate about the potential of
          AI to transform industries and improve lives. I&apos;ve taught
          workshops and mentored developers on integrating AI into their
          projects.
        </p>
        <p>
          I&apos;ve led teams building{' '}
          <span className='text-electric-secondary font-semibold'>
            advanced automation systems
          </span>
          , unified multiple applications into seamless platforms, and revamped
          tools for large-scale events. Oh, and I&apos;m also a{' '}
          <span className='text-electric font-semibold'>
            two-time patent holder
          </span>{' '}
        </p>
        <p>
          When I&apos;m not coding, you&apos;ll find me exploring the latest
          tech trends, building with an LLM, mentoring junior developers, or
          probably spending time with family.
        </p>
      </div>
    </div>
  )
}

export default Bio
