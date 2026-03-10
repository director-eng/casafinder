import type { Metadata } from 'next'
import './globals.css'
import { Nav } from '@/components/ui/nav'

export const metadata: Metadata = {
  title: {
    default: 'CasaFinder — Costa Rica Real Estate',
    template: '%s | CasaFinder',
  },
  description: 'Find homes for sale and rent in Ojochal and the Southern Pacific coast of Costa Rica. Map-based search, verified listings, and local vendor directory.',
  metadataBase: new URL('https://casafinder.co'),
  openGraph: {
    siteName: 'CasaFinder',
    locale: 'en_US',
    alternateLocale: 'es_CR',
    type: 'website',
  },
  robots: { index: true, follow: true },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="antialiased">
        <Nav />
        {children}
      </body>
    </html>
  )
}
