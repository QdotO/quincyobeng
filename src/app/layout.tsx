import type { Metadata } from 'next'
import {
  Inter,
  Playfair_Display,
  Space_Grotesk,
  IBM_Plex_Sans
} from 'next/font/google'
import './globals.css'
import ThemeRuntime from '@/components/ThemeRuntime'
import ThemeToast from '@/components/ThemeToast'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter'
})

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair'
})

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-space-grotesk'
})

const ibmPlexSans = IBM_Plex_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-ibm-plex-sans'
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
    <html
      lang='en'
      className={`${inter.variable} ${playfair.variable} ${spaceGrotesk.variable} ${ibmPlexSans.variable}`}
    >
      <body className='font-theme-sans antialiased'>
        <ThemeRuntime />
        <ThemeToast />
        {children}
      </body>
    </html>
  )
}
