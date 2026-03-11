import type { Metadata } from 'next'
import { createServiceClient } from '@/lib/supabase/server'
import { ListingCard } from '@/components/listings/ListingCard'
import { ListingFilters } from '@/components/listings/ListingFilters'
import { SearchMap } from './SearchMap'
import { SortSelect } from '@/components/ui/sort-select'
import type { ListingWithImage } from '@/lib/supabase/types'

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: 'Search Properties | CasaFinder — Costa Rica Real Estate',
  description: 'Search homes for sale and rent in Ojochal, Uvita, Dominical and the Southern Pacific coast of Costa Rica.',
}

interface SearchParams {
  q?: string
  type?: string
  propertyType?: string
  priceMin?: string
  priceMax?: string
  bedroomsMin?: string
  bathroomsMin?: string
  features?: string | string[]
  sort?: string
  view?: string
  page?: string
}

const PAGE_SIZE = 24

export default async function SearchPage({
  searchParams,
}: {
  searchParams: Promise<SearchParams>
}) {
  const params = await searchParams
  const supabase = await createServiceClient()
  const page = parseInt(params.page ?? '1')
  const view = params.view ?? 'list'

  let query = supabase
    .from('listings')
    .select('*, listing_images(url, alt_text, is_primary)', { count: 'exact' })
    .eq('status', 'active')

  // Filters
  if (params.type) query = query.eq('listing_type', params.type)
  if (params.propertyType) query = query.eq('property_type', params.propertyType)
  if (params.priceMin) query = query.gte('price_usd', parseFloat(params.priceMin))
  if (params.priceMax) query = query.lte('price_usd', parseFloat(params.priceMax))
  if (params.bedroomsMin) query = query.gte('bedrooms', parseInt(params.bedroomsMin))
  if (params.bathroomsMin) query = query.gte('bathrooms', parseFloat(params.bathroomsMin))

  // Feature flags
  const features = Array.isArray(params.features) ? params.features : params.features ? [params.features] : []
  if (features.includes('pool')) query = query.eq('pool', true)
  if (features.includes('garage')) query = query.eq('garage', true)
  if (features.includes('furnished')) query = query.eq('furnished', true)
  if (features.includes('ocean_view')) query = query.contains('tags', ['ocean_view'])

  // Full text search
  if (params.q) {
    query = query.textSearch('fts', params.q, { type: 'websearch', config: 'english' })
  }

  // Sort
  switch (params.sort) {
    case 'price_asc':
      query = query.order('price_usd', { ascending: true, nullsFirst: false })
      break
    case 'price_desc':
      query = query.order('price_usd', { ascending: false, nullsFirst: false })
      break
    default:
      query = query.order('featured', { ascending: false }).order('created_at', { ascending: false })
  }

  // Pagination
  const from = (page - 1) * PAGE_SIZE
  query = query.range(from, from + PAGE_SIZE - 1)

  const { data: listings, count } = await query
  const totalPages = Math.ceil((count ?? 0) / PAGE_SIZE)
  const safeListings = (listings ?? []) as ListingWithImage[]

  return (
    <main className="min-h-screen bg-[#F5F7FA]">
      {/* Search header */}
      <div className="bg-white border-b border-[#E5E7EB] px-4 py-3 shadow-[0_1px_4px_rgba(16,24,40,0.06)]">
        <div className="max-w-7xl mx-auto flex items-center gap-3 flex-wrap">
          {/* Search bar */}
          <form action="/search" className="flex gap-2 flex-1 min-w-64">
            <div className="relative flex-1">
              <svg className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#9CA3AF]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <circle cx="11" cy="11" r="7" /><path d="M21 21l-4.35-4.35" strokeLinecap="round" />
              </svg>
              <input
                type="text"
                name="q"
                defaultValue={params.q}
                placeholder="Search by location, property type…"
                className="w-full pl-9 pr-4 py-2.5 border border-[#E5E7EB] rounded-[8px] text-[14px] text-[#1F2937] placeholder:text-[#9CA3AF] focus:outline-none focus:ring-2 focus:ring-[#0F5AE5] focus:border-transparent"
              />
            </div>
            <button
              type="submit"
              className="px-5 py-2.5 bg-[#0F5AE5] hover:bg-[#0B4CC4] text-white text-[14px] font-semibold rounded-[8px] transition-colors whitespace-nowrap"
            >
              Search
            </button>
          </form>

          {/* View toggle */}
          <div className="flex border border-[#E5E7EB] rounded-[8px] overflow-hidden text-[13px] font-medium">
            <a
              href={`/search?${new URLSearchParams({ ...params as Record<string, string>, view: 'list' }).toString()}`}
              className={`px-4 py-2.5 transition-colors ${view === 'list' ? 'bg-[#0F5AE5] text-white' : 'text-[#5B6472] hover:bg-[#F5F7FA]'}`}
            >
              List
            </a>
            <a
              href={`/search?${new URLSearchParams({ ...params as Record<string, string>, view: 'map' }).toString()}`}
              className={`px-4 py-2.5 border-l border-[#E5E7EB] transition-colors ${view === 'map' ? 'bg-[#0F5AE5] text-white' : 'text-[#5B6472] hover:bg-[#F5F7FA]'}`}
            >
              Map
            </a>
          </div>

          {/* Sort */}
          <SortSelect
            defaultValue={params.sort ?? ''}
            hiddenParams={Object.fromEntries(
              Object.entries(params).filter(([k]) => k !== 'sort').map(([k, v]) => [k, v as string])
            )}
          />

          {/* Result count */}
          <span className="text-[13px] text-[#7A8494] font-medium ml-auto whitespace-nowrap">
            {(count ?? 0).toLocaleString()} {count === 1 ? 'property' : 'properties'}
          </span>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-6">
        {view === 'map' ? (
          /* Map view — full width */
          <div className="h-[calc(100vh-180px)]">
            <SearchMap listings={safeListings} />
          </div>
        ) : (
          /* List view — filters sidebar + grid */
          <div className="flex gap-8">
            <ListingFilters />

            <div className="flex-1 min-w-0">
              {safeListings.length === 0 ? (
                <div className="text-center py-16 text-gray-500">
                  <p className="text-lg font-medium mb-2">No properties found</p>
                  <p className="text-sm">Try adjusting your search filters.</p>
                </div>
              ) : (
                <>
                  <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
                    {safeListings.map(listing => (
                      <ListingCard key={listing.id} listing={listing} />
                    ))}
                  </div>

                  {/* Pagination */}
                  {totalPages > 1 && (
                    <div className="flex justify-center gap-2 mt-10">
                      {page > 1 && (
                        <a
                          href={`/search?${new URLSearchParams({ ...params as Record<string, string>, page: String(page - 1) }).toString()}`}
                          className="px-4 py-2 border border-gray-300 rounded-lg text-sm text-gray-700 hover:bg-gray-50"
                        >
                          ← Previous
                        </a>
                      )}
                      <span className="px-4 py-2 text-sm text-gray-500">
                        Page {page} of {totalPages}
                      </span>
                      {page < totalPages && (
                        <a
                          href={`/search?${new URLSearchParams({ ...params as Record<string, string>, page: String(page + 1) }).toString()}`}
                          className="px-4 py-2 border border-gray-300 rounded-lg text-sm text-gray-700 hover:bg-gray-50"
                        >
                          Next →
                        </a>
                      )}
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </main>
  )
}
