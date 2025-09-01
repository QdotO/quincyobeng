import Link from 'next/link'

export default function Work() {
  return (
    <main className='min-h-screen bg-gradient-to-br from-dark via-dark-secondary to-surface'>
      {/* Back to Home */}
      <div className='fixed top-3 left-3 md:top-6 md:left-6 z-50'>
        <Link href='/' className='inline-flex items-center gap-2 px-3 py-1.5 md:px-4 md:py-2 rounded-full bg-black/40 text-white border border-white/20 backdrop-blur-md hover:bg-black/50 transition'>
          <svg viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='1.5' className='h-5 w-5' aria-hidden>
            <path strokeLinecap='round' strokeLinejoin='round' d='M15 19l-7-7 7-7' />
          </svg>
          <span className='hidden sm:inline'>Back to Home</span>
        </Link>
      </div>
      {/* Hero Section */}
      <section className='relative min-h-screen flex flex-col justify-center items-center px-8 overflow-hidden'>
        {/* Background gradient overlay */}
        <div className='absolute inset-0 bg-gradient-to-r from-electric/10 via-transparent to-electric-secondary/10 animate-pulse'></div>

        {/* Main content */}
        <div className='relative z-10 text-center max-w-4xl'>
          <h1 className='text-5xl md:text-7xl font-display font-black text-light mb-6 tracking-tight'>
            Sample
            <span className='bg-gradient-to-r from-electric to-electric-secondary bg-clip-text text-transparent'>
              {' '}
              Projects
            </span>
          </h1>

          <p className='text-lg md:text-xl text-muted mb-12 font-light max-w-2xl mx-auto leading-relaxed'>
            A showcase of interactive experiences and tools I&apos;ve built to
            demonstrate my approach to product development and engineering.
          </p>
        </div>

        {/* Scroll indicator */}
        <div className='absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce'>
          <div className='w-6 h-10 border-2 border-muted rounded-full flex justify-center'>
            <div className='w-1 h-3 bg-electric rounded-full mt-2 animate-pulse'></div>
          </div>
        </div>
      </section>

      {/* Featured Work Section */}
      <section className='relative py-20 px-8'>
        <div className='max-w-6xl mx-auto'>
          <div className='text-center mb-16'>
            <h2 className='text-3xl md:text-4xl font-display font-bold text-light mb-4'>
              Sample Projects
            </h2>
            <p className='text-muted text-lg max-w-2xl mx-auto'>
              Interactive experiences and tools I&apos;ve built to demonstrate
              my approach to product development and engineering.
            </p>
          </div>

          {/* Work Grid */}
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
            {/* Color Palette Generator - New */}
            <div className='group relative bg-gradient-to-br from-dark-secondary to-surface rounded-2xl p-8 border border-electric/20 hover:border-electric/40 transition-all duration-300 hover:scale-105'>
              <div className='absolute inset-0 bg-gradient-to-br from-electric/5 to-electric-secondary/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300'></div>

              <div className='relative z-10'>
                <div className='w-12 h-12 bg-gradient-to-r from-electric to-electric-secondary rounded-xl flex items-center justify-center mb-6'>
                  <span className='text-2xl'>🎨</span>
                </div>

                <h3 className='text-xl font-semibold text-light mb-3'>
                  Color Palette Generator
                </h3>

                <p className='text-muted text-sm mb-6 leading-relaxed'>
                  Generate beautiful color schemes from a base color. Lock,
                  copy, and export your palette.
                </p>

                <div className='flex flex-wrap gap-2 mb-6'>
                  <span className='px-3 py-1 bg-electric/10 text-electric text-xs rounded-full border border-electric/20'>
                    Design Tools
                  </span>
                  <span className='px-3 py-1 bg-electric-secondary/10 text-electric-secondary text-xs rounded-full border border-electric-secondary/20'>
                    Colors
                  </span>
                </div>

                <Link
                  href='/play/palette'
                  className='inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-electric to-electric-secondary text-dark font-semibold rounded-full transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-electric/25'
                >
                  Try It Out
                  <svg
                    className='w-4 h-4'
                    fill='none'
                    stroke='currentColor'
                    viewBox='0 0 24 24'
                  >
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      strokeWidth={2}
                      d='M9 5l7 7-7 7'
                    />
                  </svg>
                </Link>
              </div>
            </div>
            {/* Palette Studio - New */}
            <div className='group relative bg-gradient-to-br from-dark-secondary to-surface rounded-2xl p-8 border border-electric/20 hover:border-electric/40 transition-all duration-300 hover:scale-105'>
              <div className='absolute inset-0 bg-gradient-to-br from-electric/5 to-electric-secondary/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300'></div>

              <div className='relative z-10'>
                <div className='w-12 h-12 bg-gradient-to-r from-electric to-electric-secondary rounded-xl flex items-center justify-center mb-6'>
                  <span className='text-2xl'>🖼️</span>
                </div>

                <h3 className='text-xl font-semibold text-light mb-3'>
                  Palette Studio (Poster)
                </h3>

                <p className='text-muted text-sm mb-6 leading-relaxed'>
                  A poster-first, immersive way to explore palettes. Optimized
                  for desktop and mobile with exportable posters.
                </p>

                <div className='flex flex-wrap gap-2 mb-6'>
                  <span className='px-3 py-1 bg-electric/10 text-electric text-xs rounded-full border border-electric/20'>
                    Design Tools
                  </span>
                  <span className='px-3 py-1 bg-electric-secondary/10 text-electric-secondary text-xs rounded-full border border-electric-secondary/20'>
                    Poster
                  </span>
                </div>

                <Link
                  href='/play/palette-studio'
                  className='inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-electric to-electric-secondary text-dark font-semibold rounded-full transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-electric/25'
                >
                  Try It Out
                  <svg
                    className='w-4 h-4'
                    fill='none'
                    stroke='currentColor'
                    viewBox='0 0 24 24'
                  >
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      strokeWidth={2}
                      d='M9 5l7 7-7 7'
                    />
                  </svg>
                </Link>
              </div>
            </div>
            {/* Brand Moodboard - New */}
            <div className='group relative bg-gradient-to-br from-dark-secondary to-surface rounded-2xl p-8 border border-electric/20 hover:border-electric/40 transition-all duration-300 hover:scale-105'>
              <div className='absolute inset-0 bg-gradient-to-br from-electric/5 to-electric-secondary/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300'></div>

              <div className='relative z-10'>
                <div className='w-12 h-12 bg-gradient-to-r from-electric to-electric-secondary rounded-xl flex items-center justify-center mb-6'>
                  <span className='text-2xl'>🧩</span>
                </div>

                <h3 className='text-xl font-semibold text-light mb-3'>
                  Brand Moodboard
                </h3>

                <p className='text-muted text-sm mb-6 leading-relaxed'>
                  Pick adjectives, palettes, and type pairings to generate a
                  quick brand moodboard with exportable tokens.
                </p>

                <div className='flex flex-wrap gap-2 mb-6'>
                  <span className='px-3 py-1 bg-electric/10 text-electric text-xs rounded-full border border-electric/20'>
                    Visual Design
                  </span>
                  <span className='px-3 py-1 bg-electric-secondary/10 text-electric-secondary text-xs rounded-full border border-electric-secondary/20'>
                    Branding
                  </span>
                </div>

                <Link
                  href='/play/moodboard'
                  className='inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-electric to-electric-secondary text-dark font-semibold rounded-full transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-electric/25'
                >
                  Try It Out
                  <svg
                    className='w-4 h-4'
                    fill='none'
                    stroke='currentColor'
                    viewBox='0 0 24 24'
                  >
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      strokeWidth={2}
                      d='M9 5l7 7-7 7'
                    />
                  </svg>
                </Link>
              </div>
            </div>
            {/* Hero Composer - New */}
            <div className='group relative bg-gradient-to-br from-dark-secondary to-surface rounded-2xl p-8 border border-electric/20 hover:border-electric/40 transition-all duration-300 hover:scale-105'>
              <div className='absolute inset-0 bg-gradient-to-br from-electric/5 to-electric-secondary/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300'></div>

              <div className='relative z-10'>
                <div className='w-12 h-12 bg-gradient-to-r from-electric to-electric-secondary rounded-xl flex items-center justify-center mb-6'>
                  <span className='text-2xl'>🎨</span>
                </div>

                <h3 className='text-xl font-semibold text-light mb-3'>
                  Landing Page Hero Composer
                </h3>

                <p className='text-muted text-sm mb-6 leading-relaxed'>
                  Pick a vibe, palette, and CTA — watch a polished hero come to
                  life instantly. Export a snippet and share your idea.
                </p>

                <div className='flex flex-wrap gap-2 mb-6'>
                  <span className='px-3 py-1 bg-electric/10 text-electric text-xs rounded-full border border-electric/20'>
                    Visual Builder
                  </span>
                  <span className='px-3 py-1 bg-electric-secondary/10 text-electric-secondary text-xs rounded-full border border-electric-secondary/20'>
                    Landing Pages
                  </span>
                </div>

                <Link
                  href='/play/hero-composer'
                  className='inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-electric to-electric-secondary text-dark font-semibold rounded-full transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-electric/25'
                >
                  Try It Out
                  <svg
                    className='w-4 h-4'
                    fill='none'
                    stroke='currentColor'
                    viewBox='0 0 24 24'
                  >
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      strokeWidth={2}
                      d='M9 5l7 7-7 7'
                    />
                  </svg>
                </Link>
              </div>
            </div>
            {/* Product Simulator - Featured */}
            <div className='group relative bg-gradient-to-br from-dark-secondary to-surface rounded-2xl p-8 border border-electric/20 hover:border-electric/40 transition-all duration-300 hover:scale-105'>
              <div className='absolute inset-0 bg-gradient-to-br from-electric/5 to-electric-secondary/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300'></div>

              <div className='relative z-10'>
                <div className='w-12 h-12 bg-gradient-to-r from-electric to-electric-secondary rounded-xl flex items-center justify-center mb-6'>
                  <span className='text-2xl'>🧠</span>
                </div>

                <h3 className='text-xl font-semibold text-light mb-3'>
                  Product Sense Simulator
                </h3>

                <p className='text-muted text-sm mb-6 leading-relaxed'>
                  An interactive simulation of product decision-making under
                  pressure. Experience real strategic choices that affect user
                  satisfaction, business value, technical health, and timeline.
                </p>

                <div className='flex flex-wrap gap-2 mb-6'>
                  <span className='px-3 py-1 bg-electric/10 text-electric text-xs rounded-full border border-electric/20'>
                    Product Strategy
                  </span>
                  <span className='px-3 py-1 bg-electric-secondary/10 text-electric-secondary text-xs rounded-full border border-electric-secondary/20'>
                    Decision Making
                  </span>
                  <span className='px-3 py-1 bg-accent/10 text-accent text-xs rounded-full border border-accent/20'>
                    Interactive
                  </span>
                </div>

                <Link
                  href='/play/simulator'
                  className='inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-electric to-electric-secondary text-dark font-semibold rounded-full transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-electric/25'
                >
                  Try It Out
                  <svg
                    className='w-4 h-4'
                    fill='none'
                    stroke='currentColor'
                    viewBox='0 0 24 24'
                  >
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      strokeWidth={2}
                      d='M9 5l7 7-7 7'
                    />
                  </svg>
                </Link>
              </div>
            </div>

            {/* Placeholder for future projects */}
            <div className='group relative bg-gradient-to-br from-dark-secondary to-surface rounded-2xl p-8 border border-muted/20 hover:border-muted/40 transition-all duration-300'>
              <div className='relative z-10'>
                <div className='w-12 h-12 bg-gradient-to-r from-muted to-muted/50 rounded-xl flex items-center justify-center mb-6'>
                  <span className='text-2xl'>🚀</span>
                </div>

                <h3 className='text-xl font-semibold text-light mb-3'>
                  Coming Soon
                </h3>

                <p className='text-muted text-sm mb-6 leading-relaxed'>
                  More sample projects and technical demonstrations are in
                  development. Stay tuned for additional examples of my work.
                </p>

                <div className='flex flex-wrap gap-2 mb-6'>
                  <span className='px-3 py-1 bg-muted/10 text-muted text-xs rounded-full border border-muted/20'>
                    In Development
                  </span>
                </div>

                <button
                  disabled
                  className='inline-flex items-center gap-2 px-6 py-3 bg-muted/20 text-muted font-semibold rounded-full cursor-not-allowed'
                >
                  Coming Soon
                </button>
              </div>
            </div>

            {/* Another placeholder */}
            <div className='group relative bg-gradient-to-br from-dark-secondary to-surface rounded-2xl p-8 border border-muted/20 hover:border-muted/40 transition-all duration-300'>
              <div className='relative z-10'>
                <div className='w-12 h-12 bg-gradient-to-r from-muted to-muted/50 rounded-xl flex items-center justify-center mb-6'>
                  <span className='text-2xl'>⚡</span>
                </div>

                <h3 className='text-xl font-semibold text-light mb-3'>
                  More Projects
                </h3>

                <p className='text-muted text-sm mb-6 leading-relaxed'>
                  Additional sample projects and portfolio examples will be
                  added here. Each demonstrates different aspects of my
                  engineering approach and problem-solving skills.
                </p>

                <div className='flex flex-wrap gap-2 mb-6'>
                  <span className='px-3 py-1 bg-muted/10 text-muted text-xs rounded-full border border-muted/20'>
                    Planned
                  </span>
                </div>

                <button
                  disabled
                  className='inline-flex items-center gap-2 px-6 py-3 bg-muted/20 text-muted font-semibold rounded-full cursor-not-allowed'
                >
                  In Progress
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className='relative py-20 px-8'>
        <div className='max-w-4xl mx-auto text-center'>
          <h2 className='text-3xl md:text-4xl font-display font-bold text-light mb-6'>
            Interested in My Professional Work?
          </h2>

          <p className='text-muted text-lg mb-8 max-w-2xl mx-auto'>
            These samples showcase my approach to building products. I&apos;d
            love to discuss your specific needs and how I can contribute to your
            organization.
          </p>

          <div className='flex flex-col sm:flex-row gap-4 justify-center'>
            <Link
              href='/'
              className='px-8 py-4 border border-electric text-electric font-semibold rounded-full transition-all duration-300 hover:bg-electric hover:text-dark hover:scale-105'
            >
              Back to Home
            </Link>

            <Link
              href='/contact'
              className='px-8 py-4 bg-gradient-to-r from-electric to-electric-secondary text-dark font-semibold rounded-full transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-electric/25'
            >
              Let&apos;s Connect
            </Link>
          </div>
        </div>
      </section>
    </main>
  )
}
