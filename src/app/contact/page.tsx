import Link from 'next/link'

export default function Contact() {
  const contactMethods = [
    // TODO: Update these links with your actual profiles
    {
      name: 'Email',
      icon: '📧',
      href: 'mailto:quincyobeng@gmail.com',
      description: 'Send me an email directly',
      color: 'from-blue-500 to-blue-600'
    },
    {
      name: 'LinkedIn',
      icon: '💼',
      href: 'https://www.linkedin.com/in/quincy-obeng-9b871669',
      description: 'Connect professionally',
      color: 'from-blue-600 to-blue-700'
    },
    {
      name: 'GitHub',
      icon: '💻',
      href: 'https://github.com/QdotO',
      description: 'Check out my code',
      color: 'from-gray-700 to-gray-800'
    },
    {
      name: 'X (Twitter)',
      icon: '🐦',
      href: 'https://x.com/aiwithq',
      description: 'Follow for updates',
      color: 'from-sky-500 to-sky-600'
    }
  ]

  return (
    <main className='min-h-screen bg-gradient-to-br from-dark via-dark-secondary to-surface'>
      {/* Hero Section */}
      <section className='relative min-h-screen flex flex-col justify-center items-center px-8 overflow-hidden'>
        {/* Background gradient overlay */}
        <div className='absolute inset-0 bg-gradient-to-r from-electric/10 via-transparent to-electric-secondary/10 animate-pulse'></div>

        {/* Main content */}
        <div className='relative z-10 text-center max-w-4xl'>
          <h1 className='text-5xl md:text-7xl font-display font-black text-light mb-6 tracking-tight'>
            Let&apos;s
            <span className='bg-gradient-to-r from-electric to-electric-secondary bg-clip-text text-transparent'>
              {' '}
              Connect
            </span>
          </h1>

          <p className='text-lg md:text-xl text-muted mb-12 font-light max-w-2xl mx-auto leading-relaxed'>
            I&apos;m always interested in discussing new opportunities,
            collaborations, or just having a chat about technology and
            innovation.
          </p>
        </div>

        {/* Scroll indicator */}
        <div className='absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce'>
          <div className='w-6 h-10 border-2 border-muted rounded-full flex justify-center'>
            <div className='w-1 h-3 bg-electric rounded-full mt-2 animate-pulse'></div>
          </div>
        </div>
      </section>

      {/* Contact Methods Section */}
      <section className='relative py-20 px-8'>
        <div className='max-w-6xl mx-auto'>
          <div className='text-center mb-16'>
            <h2 className='text-3xl md:text-4xl font-display font-bold text-light mb-4'>
              Multiple Ways to Reach Me
            </h2>
            <p className='text-muted text-lg max-w-2xl mx-auto'>
              Choose the method that works best for you. I typically respond
              within 24 hours.
            </p>
          </div>

          {/* Contact Methods Grid */}
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20'>
            {contactMethods.map((method) => (
              <a
                key={method.name}
                href={method.href}
                target={method.href.startsWith('http') ? '_blank' : undefined}
                rel={
                  method.href.startsWith('http')
                    ? 'noopener noreferrer'
                    : undefined
                }
                className='group relative bg-gradient-to-br from-dark-secondary to-surface rounded-2xl p-6 border border-electric/20 hover:border-electric/40 transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-electric/25'
              >
                <div className='text-center'>
                  <div
                    className={`w-16 h-16 bg-gradient-to-r ${method.color} rounded-2xl flex items-center justify-center mb-4 mx-auto group-hover:scale-110 transition-transform duration-300`}
                  >
                    <span className='text-2xl'>{method.icon}</span>
                  </div>
                  <h3 className='text-lg font-semibold text-light mb-2'>
                    {method.name}
                  </h3>
                  <p className='text-muted text-sm'>{method.description}</p>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Back to Home */}
      <section className='relative py-20 px-8'>
        <div className='max-w-4xl mx-auto text-center'>
          <Link
            href='/'
            className='inline-flex items-center gap-2 px-8 py-4 border border-electric text-electric font-semibold rounded-full transition-all duration-300 hover:bg-electric hover:text-dark hover:scale-105'
          >
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
                d='M10 19l-7-7m0 0l7-7m-7 7h18'
              />
            </svg>
            Back to Home
          </Link>
        </div>
      </section>
    </main>
  )
}
