import Link from 'next/link'

type BackButtonProps = {
  href: string
  label?: string
  className?: string
}

export default function BackButton({
  href,
  label = 'Back',
  className
}: BackButtonProps) {
  return (
    <div
      className={`fixed top-3 left-3 md:top-6 md:left-6 z-50 ${
        className ?? ''
      }`}
    >
      <Link
        href={href}
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
        <span className='hidden sm:inline'>{label}</span>
      </Link>
    </div>
  )
}
