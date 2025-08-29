import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter'
})

export const metadata: Metadata = {
  title: 'Quincy Obeng - Senior Software Engineer',
  description:
    'Senior Software Engineer with 10+ years of experience building innovative products at the intersection of technology, design, and user experience.'
}

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang='en' className={inter.variable}>
      <body className='font-sans antialiased'>{children}</body>
    </html>
  )
}
