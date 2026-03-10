import Link from 'next/link'
import type { ListingWithImage } from '@/lib/supabase/types'

interface ListingCardProps {
  listing: ListingWithImage
  compact?: boolean
}

export function ListingCard({ listing, compact = false }: ListingCardProps) {
  const primaryImage = listing.listing_images?.find(img => img.is_primary) ?? listing.listing_images?.[0]

  const typeLabel =
    listing.listing_type === 'rent_vacation' ? 'Vacation Rental' :
    listing.listing_type === 'rent' ? 'For Rent' : 'For Sale'

  const typeColor =
    listing.listing_type === 'sale' ? 'bg-[#0F5AE5]' :
    listing.listing_type === 'rent' ? 'bg-blue-700' : 'bg-amber-600'

  const priceDisplay = () => {
    if (!listing.price_usd) return 'Price on Request'
    const formatted = `$${listing.price_usd.toLocaleString()}`
    if (listing.listing_type === 'rent') return `${formatted}/mo`
    if (listing.listing_type === 'rent_vacation') return `${formatted}/night`
    return formatted
  }

  const specs = [
    listing.bedrooms ? `${listing.bedrooms} bd` : null,
    listing.bathrooms ? `${listing.bathrooms} ba` : null,
    listing.area_construction_m2
      ? `${listing.area_construction_m2.toLocaleString()} m²`
      : listing.area_lot_m2
        ? `${listing.area_lot_m2.toLocaleString()} m² lot`
        : null,
  ].filter(Boolean)

  return (
    <Link
      href={`/listing/${listing.slug}`}
      className={`listing-card block rounded-xl overflow-hidden border border-gray-100 bg-white hover:shadow-md transition-shadow ${compact ? '' : ''}`}
    >
      {/* Image */}
      <div className={`relative bg-gray-100 ${compact ? 'aspect-[4/3]' : 'aspect-video'}`}>
        {primaryImage ? (
          <img
            src={primaryImage.url}
            alt={primaryImage.alt_text ?? listing.title}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <svg className="w-12 h-12 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
              <polyline strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} points="9,22 9,12 15,12 15,22" />
            </svg>
          </div>
        )}

        {/* Type badge */}
        <span className={`absolute top-3 left-3 ${typeColor} text-white text-xs font-semibold px-2 py-1 rounded`}>
          {typeLabel}
        </span>

        {/* Featured badge */}
        {listing.featured && (
          <span className="absolute top-3 right-3 bg-amber-500 text-white text-xs font-semibold px-2 py-1 rounded">
            Featured
          </span>
        )}
      </div>

      {/* Info */}
      <div className="p-4">
        <h3 className={`font-semibold text-gray-900 mb-1 line-clamp-2 ${compact ? 'text-sm' : ''}`}>
          {listing.title_en ?? listing.title}
        </h3>
        <p className="text-gray-500 text-sm mb-2 truncate">
          {listing.district}, {listing.province}
        </p>
        <div className="flex items-center justify-between">
          <span className="price-usd text-xl font-bold">
            {priceDisplay()}
          </span>
          {specs.length > 0 && (
            <span className="text-gray-400 text-sm">
              {specs.join(' · ')}
            </span>
          )}
        </div>
      </div>
    </Link>
  )
}
