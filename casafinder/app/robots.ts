import type { MetadataRoute } from 'next'

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://casafinder.cr'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/dashboard', '/api/', '/listings/new', '/leads'],
      },
    ],
    sitemap: `${BASE_URL}/sitemap.xml`,
  }
}
