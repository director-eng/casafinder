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
    listing.listing_type === 'rent' ? 'bg-emerald-600' : 'bg-amber-500'

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
    (listing as any).area_built_m2
      ? `${Number((listing as any).area_built_m2).toLocaleString()} m²`
      : (listing as any).area_construction_m2
        ? `${Number((listing as any).area_construction_m2).toLocaleString()} m²`
        : (listing as any).area_lot_m2
          ? `${Number((listing as any).area_lot_m2).toLocaleString()} m² lot`
          : null,
  ].filter(Boolean)

  // Short clean title — strip location noise after first comma if very long
  const rawTitle = (listing as any).title_en ?? listing.title ?? ''
  const displayTitle = rawTitle.length > 60 ? rawTitle.slice(0, 57) + '…' : rawTitle

  const location = [listing.district, listing.province].filter(Boolean).join(', ')

  return (
    <Link
      href={`/listing/${listing.slug}`}
      className="group block bg-white rounded-[12px] overflow-hidden border border-[#E5E7EB] shadow-[0_1px_4px_rgba(16,24,40,0.06)] hover:shadow-[0_6px_18px_rgba(16,24,40,0.11)] hover:scale-[1.01] transition-all duration-[180ms]"
    >
      {/* Image area */}
      <div className={`relative overflow-hidden bg-gradient-to-br from-[#d4e9d4] via-[#c8dfc0] to-[#a8c8a0] ${compact ? 'aspect-[4/3]' : 'aspect-[16/10]'}`}>
        {primaryImage ? (
          <img
            src={primaryImage.url}
            alt={primaryImage.alt_text ?? displayTitle}
            className="w-full h-full object-cover group-hover:scale-[1.04] transition-transform duration-500"
            loading="lazy"
          />
        ) : (
          /* Placeholder — tropical green gradient with subtle palm icon */
          <div className="w-full h-full flex items-center justify-center">
            <svg className="w-14 h-14 text-white/40" viewBox="0 0 64 64" fill="currentColor">
              <path d="M32 4C20 4 10 14 10 26c0 8 4 15 10 19.5V52h4v8h16v-8h4V45.5C50 41 54 34 54 26 54 14 44 4 32 4z" opacity=".35" />
              <rect x="28" y="36" width="8" height="24" rx="2" opacity=".5" />
            </svg>
          </div>
        )}

        {/* Type badge */}
        <span className={`absolute top-3 left-3 ${typeColor} text-white text-[11px] font-semibold px-2.5 py-1 rounded-[6px] tracking-[0.01em]`}>
          {typeLabel}
        </span>

        {/* Featured badge */}
        {listing.featured && (
          <span className="absolute top-3 right-3 bg-amber-500 text-white text-[11px] font-semibold px-2.5 py-1 rounded-[6px]">
            Featured
          </span>
        )}
      </div>

      {/* Info — Zillow-style: price first */}
      <div className="p-4 pb-5">
        {/* Price — largest element */}
        <div className="price-usd text-[22px] font-bold text-[#1F2937] tabular-nums leading-tight mb-1">
          {priceDisplay()}
        </div>

        {/* Specs row */}
        {specs.length > 0 && (
          <div className="text-[13px] text-[#5B6472] mb-1.5">
            {specs.join(' · ')}
          </div>
        )}

        {/* Title */}
        <div className={`text-[13px] text-[#374151] font-medium leading-snug mb-1 ${compact ? '' : 'line-clamp-1'}`}>
          {displayTitle}
        </div>

        {/* Location */}
        <div className="text-[12px] text-[#9CA3AF] truncate">
          {location}, Costa Rica
        </div>
      </div>
    </Link>
  )
}
