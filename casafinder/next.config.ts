import type { NextConfig } from 'next'
import createNextIntlPlugin from 'next-intl/plugin'

const withNextIntl = createNextIntlPlugin('./lib/i18n.ts')

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'wlusrkrnwwxaozqouqhn.supabase.co' },
      { protocol: 'https', hostname: '*.supabase.co' },
      { protocol: 'https', hostname: 'images.unsplash.com' },
    ],
  },
  async rewrites() {
    return [
      // Proxy SIRI WMS/WFS to avoid CORS on client
      {
        source: '/api/wms/:path*',
        destination: 'https://geos.siri.go.cr/Geoservicios/wms/:path*',
      },
      {
        source: '/api/wfs/:path*',
        destination: 'https://geos.siri.go.cr/Geoservicios/wfs/:path*',
      },
    ]
  },
}

export default withNextIntl(nextConfig)
