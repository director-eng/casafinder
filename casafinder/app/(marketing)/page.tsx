import type { Metadata } from 'next'
import { createClient } from '@/lib/supabase/server'
import type { ListingWithImage } from '@/lib/supabase/types'

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: 'CasaFinder — Costa Rica Real Estate | Ojochal & Southern Pacific',
  description: 'Search homes for sale and rent in Ojochal and the Southern Pacific coast of Costa Rica. Map-based search with verified listings and catastro data.',
}

export default async function HomePage() {
  const supabase = await createClient()

  // Fetch featured listings for homepage
  const { data: featured } = await supabase
    .from('listings')
    .select('*, listing_images(url, alt_text, is_primary)')
    .eq('status', 'active')
    .eq('featured', true)
    .order('created_at', { ascending: false })
    .limit(6)

  return (
    <main className="min-h-screen bg-white">
      {/* Hero */}
      <section className="relative bg-gradient-to-br from-green-800 to-teal-700 text-white py-24 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl font-bold mb-4">
            Find Your Place in Costa Rica
          </h1>
          <p className="text-xl text-white/80 mb-8">
            Homes for sale and rent in Ojochal and the Southern Pacific coast.
            Map-based search with verified listings and official cadastre data.
          </p>

          {/* Quick search */}
          <form action="/search" className="flex gap-2 max-w-2xl mx-auto">
            <input
              type="text"
              name="q"
              placeholder="Search Ojochal, Uvita, Dominical..."
              className="flex-1 px-4 py-3 rounded-lg text-gray-900 text-lg focus:outline-none focus:ring-2 focus:ring-[#0F5AE5]"
            />
            <button
              type="submit"
              className="px-8 py-3 bg-amber-500 hover:bg-amber-400 text-white font-semibold rounded-lg transition-colors"
            >
              Search
            </button>
          </form>

          {/* Quick filters */}
          <div className="flex gap-3 justify-center mt-4 flex-wrap">
            {[
              { label: 'Homes for Sale', href: '/search?type=sale&propertyType=house' },
              { label: 'Lots & Land', href: '/search?type=sale&propertyType=lot' },
              { label: 'Rentals', href: '/search?type=rent' },
              { label: 'Vacation Rentals', href: '/search?type=rent_vacation' },
            ].map(({ label, href }) => (
              <a
                key={href}
                href={href}
                className="px-4 py-2 bg-white/20 hover:bg-white/30 rounded-full text-sm font-medium transition-colors"
              >
                {label}
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Featured listings */}
      {featured && featured.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 py-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Featured Properties</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featured.map((listing: any) => (
              <a
                key={listing.id}
                href={`/listing/${listing.slug}`}
                className="listing-card rounded-xl overflow-hidden border border-gray-100 bg-white"
              >
                <div className="aspect-video bg-gray-100 relative">
                  {listing.listing_images?.[0] && (
                    <img
                      src={listing.listing_images[0].url}
                      alt={listing.listing_images[0].alt_text || listing.title}
                      className="w-full h-full object-cover"
                    />
                  )}
                  <span className="absolute top-3 left-3 bg-[#0F5AE5] text-white text-xs font-semibold px-2 py-1 rounded capitalize">
                    {listing.listing_type === 'rent_vacation' ? 'Vacation Rental' :
                     listing.listing_type === 'rent' ? 'For Rent' : 'For Sale'}
                  </span>
                </div>
                <div className="p-4">
                  <h3 className="font-semibold text-gray-900 mb-1 line-clamp-2">
                    {listing.title_en || listing.title}
                  </h3>
                  <p className="text-gray-500 text-sm mb-2">
                    {listing.district}, {listing.province}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="price-usd text-xl">
                      {listing.price_usd
                        ? `$${listing.price_usd.toLocaleString()}`
                        : listing.listing_type === 'rent' || listing.listing_type === 'rent_vacation'
                          ? `$${listing.price_usd?.toLocaleString()}/mo`
                          : 'Price on request'}
                    </span>
                    <span className="text-gray-400 text-sm">
                      {[
                        listing.bedrooms && `${listing.bedrooms}bd`,
                        listing.bathrooms && `${listing.bathrooms}ba`,
                        listing.area_lot_m2 && `${listing.area_lot_m2.toLocaleString()}m²`,
                      ].filter(Boolean).join(' · ')}
                    </span>
                  </div>
                </div>
              </a>
            ))}
          </div>
          <div className="text-center mt-10">
            <a
              href="/search"
              className="inline-block px-8 py-3 bg-[#0F5AE5] hover:bg-[#0B4CC4] text-white font-semibold rounded-lg transition-colors"
            >
              View All Listings
            </a>
          </div>
        </section>
      )}

      {/* Region intro */}
      <section className="bg-[#EAF2FF] py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Why Ojochal?</h2>
          <p className="text-gray-600 text-lg leading-relaxed">
            Nestled between the Osa Peninsula and Ballena Marine National Park,
            Ojochal is Costa Rica's hidden gem — a bilingual expat community
            famous for world-class dining, stunning ocean views, sustainable
            living, and proximity to pristine beaches and jungle.
          </p>
          <div className="grid grid-cols-3 gap-8 mt-12 text-center">
            {[
              { stat: '2hr', label: 'From San José' },
              { stat: '30+', label: 'Restaurants' },
              { stat: '300+', label: 'Days of Sun/Year' },
            ].map(({ stat, label }) => (
              <div key={label}>
                <div className="text-4xl font-bold text-[#0F5AE5]">{stat}</div>
                <div className="text-gray-600 mt-1">{label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-400 py-12 px-4">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8">
          <div>
            <div className="text-white font-bold text-xl mb-3">CasaFinder</div>
            <p className="text-sm">Costa Rica real estate for the Southern Pacific zone.</p>
          </div>
          <div>
            <div className="text-white font-semibold mb-3">Search</div>
            <ul className="space-y-2 text-sm">
              <li><a href="/search?type=sale" className="hover:text-white">Homes for Sale</a></li>
              <li><a href="/search?type=rent" className="hover:text-white">Rentals</a></li>
              <li><a href="/search?type=sale&propertyType=lot" className="hover:text-white">Lots & Land</a></li>
            </ul>
          </div>
          <div>
            <div className="text-white font-semibold mb-3">Discover</div>
            <ul className="space-y-2 text-sm">
              <li><a href="/vendors" className="hover:text-white">Vendor Directory</a></li>
              <li><a href="/how-to" className="hover:text-white">How-To Guides</a></li>
              <li><a href="/ojochal-real-estate" className="hover:text-white">Ojochal Real Estate</a></li>
            </ul>
          </div>
          <div>
            <div className="text-white font-semibold mb-3">Agents</div>
            <ul className="space-y-2 text-sm">
              <li><a href="/dashboard" className="hover:text-white">Agent Portal</a></li>
              <li><a href="/listings/new" className="hover:text-white">List a Property</a></li>
            </ul>
          </div>
        </div>
        <div className="max-w-7xl mx-auto mt-8 pt-8 border-t border-gray-800 text-sm text-center">
          © {new Date().getFullYear()} CasaFinder. All rights reserved.
        </div>
      </footer>
    </main>
  )
}
