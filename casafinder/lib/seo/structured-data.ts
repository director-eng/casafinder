// =============================================================================
// CasaFinder — Structured Data (JSON-LD)
// =============================================================================

import type { Listing, Agent, SeoPage } from '@/lib/supabase/types'

export function listingStructuredData(listing: Listing, agent?: Agent) {
  return {
    '@context': 'https://schema.org',
    '@type': 'RealEstateListing',
    name: listing.title_en || listing.title,
    description: listing.description,
    url: `https://casafinder.cr/listing/${listing.slug}`,
    datePosted: listing.created_at,
    price: listing.price_usd
      ? `${listing.price_usd} USD`
      : undefined,
    address: {
      '@type': 'PostalAddress',
      addressLocality: listing.district,
      addressRegion: listing.province,
      addressCountry: 'CR',
    },
    geo: listing.lat && listing.lng
      ? {
          '@type': 'GeoCoordinates',
          latitude: listing.lat,
          longitude: listing.lng,
        }
      : undefined,
    numberOfRooms: listing.bedrooms,
    floorSize: listing.area_construction_m2
      ? { '@type': 'QuantitativeValue', value: listing.area_construction_m2, unitCode: 'MTK' }
      : undefined,
    offeredBy: agent
      ? {
          '@type': 'RealEstateAgent',
          name: agent.agency_name ?? agent.full_name,
          telephone: agent.phone ?? agent.whatsapp,
        }
      : undefined,
  }
}

export function articleStructuredData(article: {
  title: string
  body?: string | null
  slug: string
  published_at?: string | null
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: article.title,
    url: `https://casafinder.cr/how-to/${article.slug}`,
    datePublished: article.published_at,
    publisher: {
      '@type': 'Organization',
      name: 'CasaFinder',
      url: 'https://casafinder.cr',
    },
  }
}

export function seoPageStructuredData(page: SeoPage) {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: page.h1 ?? page.title,
    description: page.meta_description,
    about: page.filter_district
      ? {
          '@type': 'Place',
          name: `${page.filter_district}, Costa Rica`,
          address: { '@type': 'PostalAddress', addressCountry: 'CR' },
        }
      : undefined,
  }
}
