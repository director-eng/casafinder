import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { createServiceClient } from '@/lib/supabase/server'
import { ListingGallery } from '@/components/listings/ListingGallery'
import { LeadForm } from '@/components/forms/LeadForm'
import { ListingMap } from '@/components/map/ListingMap'
import { ShareButton } from '@/components/ui/share-button'
import { listingStructuredData } from '@/lib/seo/structured-data'
import type { ListingWithImage } from '@/lib/supabase/types'

export const dynamic = 'force-dynamic'

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const supabase = await createServiceClient()
  const { data } = await supabase
    .from('listings')
    .select('title, title_en, description, district, province, price_usd, listing_images(url)')
    .eq('slug', slug)
    .single()

  if (!data) return {}

  const title = data.title_en ?? data.title
  const image = data.listing_images?.[0]?.url

  return {
    title: `${title} | CasaFinder`,
    description: data.description?.slice(0, 160) ?? `${title} in ${data.district}, ${data.province}`,
    openGraph: {
      title,
      images: image ? [{ url: image }] : [],
    },
  }
}

export default async function ListingPage({ params }: Props) {
  const { slug } = await params
  const supabase = await createServiceClient()

  const { data: listing } = await supabase
    .from('listings')
    .select('*, listing_images(url, alt_text, is_primary, sort_order), agents(full_name, phone, email, whatsapp, photo_url, agency_name)')
    .eq('slug', slug)
    .eq('status', 'active')
    .single()

  if (!listing) notFound()

  const images = (listing.listing_images ?? []).sort((a: any, b: any) => {
    if (a.is_primary) return -1
    if (b.is_primary) return 1
    return (a.sort_order ?? 99) - (b.sort_order ?? 99)
  })

  const agent = (listing as any).agents

  const typeLabel =
    listing.listing_type === 'rent_vacation' ? 'Vacation Rental' :
    listing.listing_type === 'rent' ? 'For Rent' : 'For Sale'

  const priceDisplay = () => {
    if (!listing.price_usd) return 'Price on Request'
    const f = `$${listing.price_usd.toLocaleString()}`
    if (listing.listing_type === 'rent') return `${f}/mo`
    if (listing.listing_type === 'rent_vacation') return `${f}/night`
    return f
  }

  const structuredData = listingStructuredData(listing as any)

  return (
    <main className="min-h-screen bg-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <nav className="text-sm text-gray-500 mb-6 flex gap-2 items-center">
          <a href="/" className="hover:text-gray-700">Home</a>
          <span>›</span>
          <a href="/search" className="hover:text-gray-700">Search</a>
          <span>›</span>
          <span className="text-gray-900 line-clamp-1">{listing.title_en ?? listing.title}</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* Left: gallery + details */}
          <div className="lg:col-span-2 space-y-8">
            {/* Gallery */}
            <ListingGallery images={images} title={listing.title_en ?? listing.title} />

            {/* Title + price */}
            <div>
              <div className="flex items-start justify-between gap-4 flex-wrap">
                <div>
                  <span className="inline-block bg-[#EAF2FF] text-[#0F5AE5] text-xs font-semibold px-2.5 py-0.5 rounded-full mb-3">
                    {typeLabel}
                  </span>
                  <h1 className="text-3xl font-bold text-gray-900 mb-2">
                    {listing.title_en ?? listing.title}
                  </h1>
                  <p className="text-gray-500">
                    {listing.district}, {listing.province}, Costa Rica
                  </p>
                </div>
                <div className="text-right">
                  <div className="price-usd text-3xl font-bold text-gray-900">
                    {priceDisplay()}
                  </div>
                </div>
              </div>

              {/* Quick stats */}
              <div className="flex gap-6 mt-6 flex-wrap">
                {listing.bedrooms && (
                  <div className="text-center">
                    <div className="text-2xl font-bold text-gray-900">{listing.bedrooms}</div>
                    <div className="text-xs text-gray-500 mt-0.5">Bedrooms</div>
                  </div>
                )}
                {listing.bathrooms && (
                  <div className="text-center">
                    <div className="text-2xl font-bold text-gray-900">{listing.bathrooms}</div>
                    <div className="text-xs text-gray-500 mt-0.5">Bathrooms</div>
                  </div>
                )}
                {listing.area_construction_m2 && (
                  <div className="text-center">
                    <div className="text-2xl font-bold text-gray-900">{listing.area_construction_m2.toLocaleString()}</div>
                    <div className="text-xs text-gray-500 mt-0.5">m² Built</div>
                  </div>
                )}
                {listing.area_lot_m2 && (
                  <div className="text-center">
                    <div className="text-2xl font-bold text-gray-900">{listing.area_lot_m2.toLocaleString()}</div>
                    <div className="text-xs text-gray-500 mt-0.5">m² Lot</div>
                  </div>
                )}
              </div>
            </div>

            {/* Description */}
            {listing.description && (
              <div>
                <h2 className="text-xl font-semibold text-gray-900 mb-3">Description</h2>
                <div className="text-gray-700 leading-relaxed whitespace-pre-line">
                  {listing.description}
                </div>
              </div>
            )}

            {/* Property details */}
            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Property Details</h2>
              <dl className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                {[
                  { label: 'Listing Type', value: typeLabel },
                  { label: 'Property Type', value: listing.property_type },
                  listing.year_built && { label: 'Year Built', value: listing.year_built },
                  listing.finca_number && { label: 'Finca #', value: listing.finca_number },
                  { label: 'Pool', value: listing.pool ? 'Yes' : 'No' },
                  { label: 'Garage', value: listing.garage ? 'Yes' : 'No' },
                  { label: 'Furnished', value: listing.furnished ? 'Yes' : 'No' },
                ].filter(Boolean).map((item: any) => (
                  <div key={item.label} className="bg-gray-50 rounded-lg p-3">
                    <dt className="text-xs text-gray-500 mb-1">{item.label}</dt>
                    <dd className="text-sm font-medium text-gray-900 capitalize">{item.value}</dd>
                  </div>
                ))}
              </dl>
            </div>

            {/* Map */}
            {listing.lat && listing.lng && (
              <div>
                <h2 className="text-xl font-semibold text-gray-900 mb-4">Location</h2>
                <ListingMap listing={listing} />
                <p className="text-xs text-gray-400 mt-2">
                  Cadastre overlay from SIRI Costa Rica (SINAC). Parcel boundaries are approximate.
                </p>
              </div>
            )}
          </div>

          {/* Right: contact form + agent card */}
          <div className="space-y-6">
            {/* Lead form */}
            <LeadForm
              listingId={listing.id}
              listingTitle={listing.title_en ?? listing.title}
              agentId={listing.agent_id ?? undefined}
            />

            {/* Agent card */}
            {agent && (
              <div className="bg-white border border-gray-200 rounded-xl p-5">
                <div className="flex items-center gap-4 mb-4">
                  {agent.photo_url ? (
                    <img
                      src={agent.photo_url}
                      alt={agent.full_name}
                      className="w-14 h-14 rounded-full object-cover"
                    />
                  ) : (
                    <div className="w-14 h-14 rounded-full bg-[#EAF2FF] flex items-center justify-center text-[#0F5AE5] font-bold text-xl">
                      {agent.full_name?.[0] ?? 'A'}
                    </div>
                  )}
                  <div>
                    <div className="font-semibold text-gray-900">{agent.full_name}</div>
                    {agent.agency_name && (
                      <div className="text-sm text-gray-500">{agent.agency_name}</div>
                    )}
                  </div>
                </div>
                <div className="space-y-2">
                  {agent.phone && (
                    <a href={`tel:${agent.phone}`} className="flex items-center gap-2 text-sm text-gray-700 hover:text-[#0F5AE5]">
                      <span>📞</span> {agent.phone}
                    </a>
                  )}
                  {agent.whatsapp && (
                    <a
                      href={`https://wa.me/${agent.whatsapp.replace(/\D/g, '')}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-sm text-[#0F5AE5] hover:underline"
                    >
                      <span>💬</span> WhatsApp
                    </a>
                  )}
                  {agent.email && (
                    <a href={`mailto:${agent.email}`} className="flex items-center gap-2 text-sm text-gray-700 hover:text-[#0F5AE5]">
                      <span>✉️</span> {agent.email}
                    </a>
                  )}
                </div>
              </div>
            )}

            {/* Share */}
            <ShareButton title={listing.title_en ?? listing.title} />
          </div>
        </div>
      </div>
    </main>
  )
}
