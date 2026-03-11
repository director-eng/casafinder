import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { createServiceClient } from '@/lib/supabase/server'
import { ListingCard } from '@/components/listings/ListingCard'
import { seoPageStructuredData } from '@/lib/seo/structured-data'
import type { ListingWithImage, SeoPage } from '@/lib/supabase/types'

export const dynamic = 'force-dynamic'
export const revalidate = 3600 // ISR: revalidate every hour

interface Props {
  params: Promise<{ 'seo-slug': string }>
}

export async function generateStaticParams() {
  try {
    const supabase = await createServiceClient()
    const { data } = await supabase.from('seo_pages').select('slug').eq('active', true)
    return ((data as { slug: string }[] | null) ?? []).map(p => ({ 'seo-slug': p.slug }))
  } catch {
    // DB not available at build time — pages will be rendered on-demand
    return []
  }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { 'seo-slug': slug } = await params
  const supabase = await createServiceClient()

  const { data } = await supabase
    .from('seo_pages')
    .select('title, meta_description, og_image')
    .eq('slug', slug)
    .eq('active', true)
    .single()
  const typedData = data as Pick<SeoPage, 'title' | 'meta_description' | 'og_image'> | null

  if (!typedData) return {}

  return {
    title: `${typedData.title} | CasaFinder`,
    description: typedData.meta_description ?? undefined,
    openGraph: {
      title: typedData.title,
      description: typedData.meta_description ?? undefined,
      images: typedData.og_image ? [typedData.og_image] : [],
    },
  }
}

export default async function SeoPage({ params }: Props) {
  const { 'seo-slug': slug } = await params
  const supabase = await createServiceClient()

  const { data: pageRaw } = await supabase
    .from('seo_pages')
    .select('*')
    .eq('slug', slug)
    .eq('active', true)
    .single()
  const page = pageRaw as SeoPage | null

  if (!page) notFound()

  // Build listing query from seo_page filters
  let query = supabase
    .from('listings')
    .select('*, listing_images(url, alt_text, is_primary)')
    .eq('status', 'active')

  if (page.filter_listing_type) query = query.eq('listing_type', page.filter_listing_type)
  if (page.filter_property_type) query = query.eq('property_type', page.filter_property_type)
  if (page.filter_district) query = query.eq('district', page.filter_district)

  query = query.order('featured', { ascending: false }).order('created_at', { ascending: false }).limit(24)

  const { data: listings } = await query
  const safeListings = (listings ?? []) as ListingWithImage[]

  const structuredData = seoPageStructuredData(page)

  return (
    <main className="min-h-screen bg-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      {/* Hero */}
      <section className="bg-gradient-to-br from-green-800 to-teal-700 text-white py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold mb-4">{page.h1 ?? page.title}</h1>
          {page.intro && (
            <p className="text-xl text-white/80 max-w-2xl">{page.intro}</p>
          )}
        </div>
      </section>

      {/* Listings */}
      <section className="max-w-7xl mx-auto px-4 py-12">
        {safeListings.length === 0 ? (
          <div className="text-center py-16 text-gray-500">
            <p>No listings currently available. Check back soon!</p>
            <a href="/search" className="mt-4 inline-block text-[#0F5AE5] hover:underline">Browse all properties →</a>
          </div>
        ) : (
          <>
            <p className="text-gray-500 text-sm mb-6">{safeListings.length} properties found</p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {safeListings.map(listing => (
                <ListingCard key={listing.id} listing={listing} />
              ))}
            </div>
            <div className="text-center mt-10">
              <a
                href={`/search?${page.filter_listing_type ? `type=${page.filter_listing_type}` : ''}${page.filter_property_type ? `&propertyType=${page.filter_property_type}` : ''}`}
                className="inline-block px-8 py-3 bg-[#0F5AE5] hover:bg-[#0B4CC4] text-white font-semibold rounded-lg transition-colors"
              >
                View All Listings
              </a>
            </div>
          </>
        )}
      </section>

      {/* Body content (long-form SEO copy) */}
      {page.body_html && (
        <section className="max-w-4xl mx-auto px-4 py-12 border-t border-gray-100">
          <div
            className="prose prose-lg prose-green max-w-none"
            dangerouslySetInnerHTML={{ __html: page.body_html }}
          />
        </section>
      )}
    </main>
  )
}
