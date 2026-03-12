import type { Metadata } from 'next'
import { createServiceClient } from '@/lib/supabase/server'

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: 'Vendor Directory | CasaFinder — Southern Pacific Costa Rica',
  description: 'Find trusted contractors, solar installers, lawyers, and service providers in Ojochal, Uvita, and the Southern Pacific zone of Costa Rica.',
}

const CATEGORY_LABELS: Record<string, string> = {
  solar: '☀️ Solar',
  contractor: '🔨 Contractor',
  lawyer: '⚖️ Lawyer',
  architect: '📐 Architect',
  property_management: '🏠 Property Mgmt',
  internet: '📡 Internet / ISP',
  moving: '📦 Moving',
  landscaping: '🌿 Landscaping',
  cleaning: '🧹 Cleaning',
  mechanic: '🔧 Mechanic',
  other: '📋 Other',
}

export default async function VendorsPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string; q?: string }>
}) {
  const params = await searchParams
  const supabase = await createServiceClient()

  let query = supabase
    .from('vendors')
    .select('*')
    .eq('active', true)
    .order('featured', { ascending: false })
    .order('name')

  if (params.category) query = query.eq('category', params.category)

  const { data: vendors } = await query
  const { data: categories } = await supabase
    .from('vendors')
    .select('category')
    .eq('active', true)

  const uniqueCategories = [...new Set((categories ?? []).map(c => c.category))]

  // Client-side filter by search term (applied in render)
  const q = params.q?.toLowerCase() ?? ''
  const filtered = (vendors ?? []).filter(v =>
    !q ||
    v.name.toLowerCase().includes(q) ||
    v.description?.toLowerCase().includes(q) ||
    v.category.toLowerCase().includes(q)
  )

  return (
    <main className="min-h-screen bg-gray-50">
      {/* Hero */}
      <section className="bg-gradient-to-br from-green-800 to-teal-700 text-white py-14 px-4">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold mb-3">Vendor Directory</h1>
          <p className="text-xl text-white/80">
            Trusted contractors, services, and professionals in the Southern Pacific zone.
          </p>

          {/* Search */}
          <form className="flex gap-2 max-w-lg mt-6">
            <input
              type="text"
              name="q"
              defaultValue={params.q}
              placeholder="Search vendors, services..."
              className="flex-1 px-4 py-2.5 rounded-lg text-gray-900 text-sm focus:outline-none focus:ring-2 focus:ring-[#0F5AE5]"
            />
            <button
              type="submit"
              className="px-5 py-2.5 bg-amber-500 hover:bg-amber-400 text-white font-semibold rounded-lg transition-colors text-sm"
            >
              Search
            </button>
          </form>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 py-10 flex gap-8">
        {/* Category sidebar */}
        <aside className="hidden md:block w-56 flex-shrink-0">
          <h2 className="font-semibold text-gray-900 mb-3">Categories</h2>
          <div className="space-y-1">
            <a
              href="/vendors"
              className={`block px-3 py-2 rounded-lg text-sm transition-colors ${!params.category ? 'bg-[#0F5AE5] text-white' : 'text-gray-700 hover:bg-gray-100'}`}
            >
              All Categories
            </a>
            {uniqueCategories.map(cat => (
              <a
                key={cat}
                href={`/vendors?category=${cat}`}
                className={`block px-3 py-2 rounded-lg text-sm transition-colors ${params.category === cat ? 'bg-[#0F5AE5] text-white' : 'text-gray-700 hover:bg-gray-100'}`}
              >
                {CATEGORY_LABELS[cat] ?? cat}
              </a>
            ))}
          </div>
        </aside>

        {/* Vendor grid */}
        <div className="flex-1 min-w-0">
          <p className="text-sm text-gray-500 mb-5">{filtered.length} vendors found</p>

          {filtered.length === 0 ? (
            <div className="text-center py-16 text-gray-500">
              <p>No vendors found. Try a different search or category.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {filtered.map(vendor => (
                <div
                  key={vendor.id}
                  className="bg-white rounded-xl border border-gray-200 p-5 hover:shadow-md transition-shadow"
                >
                  <div className="flex items-start gap-4">
                    {vendor.logo_url ? (
                      <img src={vendor.logo_url} alt={vendor.name} className="w-14 h-14 rounded-xl object-cover flex-shrink-0" />
                    ) : (
                      <div className="w-14 h-14 rounded-xl bg-[#EAF2FF] flex items-center justify-center text-2xl flex-shrink-0">
                        {CATEGORY_LABELS[vendor.category]?.split(' ')[0] ?? '📋'}
                      </div>
                    )}
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center justify-between gap-2">
                        <h3 className="font-semibold text-gray-900">{vendor.name}</h3>
                        {vendor.featured && (
                          <span className="text-xs bg-amber-100 text-amber-700 px-2 py-0.5 rounded-full font-medium flex-shrink-0">Featured</span>
                        )}
                      </div>
                      <span className="text-xs text-gray-400 capitalize">{CATEGORY_LABELS[vendor.category] ?? vendor.category}</span>
                      {vendor.description && (
                        <p className="text-sm text-gray-600 mt-2 line-clamp-3">{vendor.description}</p>
                      )}
                      <div className="flex flex-wrap gap-3 mt-3">
                        {vendor.phone && (
                          <a href={`tel:${vendor.phone}`} className="text-xs text-gray-600 hover:text-[#0F5AE5] flex items-center gap-1">
                            📞 {vendor.phone}
                          </a>
                        )}
                        {vendor.whatsapp && (
                          <a
                            href={`https://wa.me/${vendor.whatsapp.replace(/\D/g, '')}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-xs text-[#0F5AE5] hover:underline flex items-center gap-1"
                          >
                            💬 WhatsApp
                          </a>
                        )}
                        {vendor.email && (
                          <a href={`mailto:${vendor.email}`} className="text-xs text-gray-600 hover:text-[#0F5AE5] flex items-center gap-1">
                            ✉️ Email
                          </a>
                        )}
                        {vendor.website && (
                          <a
                            href={vendor.website}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-xs text-blue-600 hover:underline flex items-center gap-1"
                          >
                            🌐 Website
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </main>
  )
}
