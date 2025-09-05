import Grid from '@/components/Grid'
import Link from 'next/link'

export default function Home() {
  return (
    <main
      id='main'
      role='main'
      className='min-h-screen bg-gradient-to-br from-dark via-dark-secondary to-surface'
    >
      {/* Hero Section */}
      <section className='relative min-h-screen flex flex-col justify-center items-center px-8 overflow-hidden'>
        {/* Background gradient overlay */}
        <div className='absolute inset-0 bg-gradient-to-r from-electric/20 via-transparent to-electric-secondary/20 animate-pulse'></div>

        {/* Main content */}
        <div className='relative z-10 text-center max-w-4xl'>
          <h1 className='text-6xl md:text-8xl font-display font-black text-light mb-6 tracking-tight'>
            Quincy
            <span className='bg-gradient-to-r from-electric to-electric-secondary bg-clip-text text-transparent'>
              {' '}
              Obeng
            </span>
          </h1>

          <p className='text-xl md:text-2xl text-muted mb-8 font-light max-w-2xl mx-auto leading-relaxed'>
            Senior Software Engineer crafting digital experiences that matter.
            <span className='text-electric'> 10+ years</span> of turning complex
            problems into elegant solutions.
          </p>

          <div className='flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center'>
            <Link
              href='/work'
              className='group relative px-8 py-4 bg-gradient-to-r from-electric to-electric-secondary text-dark font-semibold rounded-full transition-all duration-200 hover:scale-[1.02] hover:shadow-lg hover:shadow-electric/15'
            >
              <span className='relative z-10'>View Samples</span>
            </Link>

            <Link
              href='/contact'
              className='px-8 py-4 border border-electric text-electric font-semibold rounded-full transition-all duration-300 hover:bg-electric hover:text-dark'
            >
              💼 Let&apos;s Connect
            </Link>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className='absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce'>
          <div className='w-6 h-10 border-2 border-muted rounded-full flex justify-center'>
            <div className='w-1 h-3 bg-electric rounded-full mt-2 animate-pulse'></div>
          </div>
        </div>
      </section>

      {/* Content Section */}
      <section className='relative'>
        <Grid />
      </section>
    </main>
  )
}
