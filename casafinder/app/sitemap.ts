import type { MetadataRoute } from 'next'
import { createClient } from '@/lib/supabase/server'

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://casafinder.cr'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const supabase = await createClient()

  // Static pages
  const staticPages: MetadataRoute.Sitemap = [
    { url: BASE_URL, lastModified: new Date(), changeFrequency: 'daily', priority: 1 },
    { url: `${BASE_URL}/search`, lastModified: new Date(), changeFrequency: 'hourly', priority: 0.9 },
    { url: `${BASE_URL}/search?type=sale`, lastModified: new Date(), changeFrequency: 'daily', priority: 0.8 },
    { url: `${BASE_URL}/search?type=rent`, lastModified: new Date(), changeFrequency: 'daily', priority: 0.8 },
    { url: `${BASE_URL}/vendors`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.6 },
    { url: `${BASE_URL}/how-to`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.6 },
  ]

  // Active listings
  const { data: listingsRaw } = await supabase
    .from('listings')
    .select('slug, updated_at')
    .eq('status', 'active')
    .order('updated_at', { ascending: false })
  const listings = listingsRaw as { slug: string; updated_at: string }[] | null

  const listingPages: MetadataRoute.Sitemap = (listings ?? []).map(l => ({
    url: `${BASE_URL}/listing/${l.slug}`,
    lastModified: new Date(l.updated_at),
    changeFrequency: 'weekly',
    priority: 0.7,
  }))

  // SEO pages
  const { data: seoPagesRaw } = await supabase
    .from('seo_pages')
    .select('slug, updated_at')
    .eq('active', true)
  const seoPages = seoPagesRaw as { slug: string; updated_at: string }[] | null

  const seoPageUrls: MetadataRoute.Sitemap = (seoPages ?? []).map(p => ({
    url: `${BASE_URL}/${p.slug}`,
    lastModified: new Date(p.updated_at),
    changeFrequency: 'weekly',
    priority: 0.75,
  }))

  // Articles
  const { data: articlesRaw } = await supabase
    .from('articles')
    .select('slug, updated_at')
    .eq('status', 'published')
  const articles = articlesRaw as { slug: string; updated_at: string }[] | null

  const articlePages: MetadataRoute.Sitemap = (articles ?? []).map(a => ({
    url: `${BASE_URL}/how-to/${a.slug}`,
    lastModified: new Date(a.updated_at),
    changeFrequency: 'monthly',
    priority: 0.5,
  }))

  return [...staticPages, ...seoPageUrls, ...listingPages, ...articlePages]
}
