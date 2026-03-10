import { redirect } from 'next/navigation'
import type { Metadata } from 'next'
import Link from 'next/link'
import { createClient } from '@/lib/supabase/server'
import type { Agent, Listing, Lead } from '@/lib/supabase/types'

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: 'Agent Dashboard | CasaFinder',
}

export default async function DashboardPage() {
  const supabase = await createClient()

  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/login')

  // Get agent profile
  const { data: agentRaw } = await supabase
    .from('agents')
    .select('id, full_name, agency_name, active_listings_count, photo_url')
    .eq('user_id', user.id)
    .single()
  const agent = agentRaw as Pick<Agent, 'id' | 'full_name' | 'agency_name' | 'active_listings_count' | 'photo_url'> | null

  if (!agent) redirect('/dashboard/setup')

  // Get agent's listings
  const { data: listingsRaw } = await supabase
    .from('listings')
    .select('id, slug, title, title_en, status, listing_type, price_usd, lead_count, created_at')
    .eq('agent_id', agent.id)
    .order('created_at', { ascending: false })
    .limit(50)
  const listings = listingsRaw as Pick<Listing, 'id' | 'slug' | 'title' | 'title_en' | 'status' | 'listing_type' | 'price_usd' | 'lead_count' | 'created_at'>[] | null

  // Get recent leads
  const { data: leadsRaw } = await supabase
    .from('leads')
    .select('id, name, email, phone, message, status, created_at, listings(title, title_en, slug)')
    .eq('agent_id', agent.id)
    .order('created_at', { ascending: false })
    .limit(20)
  const leads = leadsRaw as (Pick<Lead, 'id' | 'name' | 'email' | 'phone' | 'message' | 'status' | 'created_at'> & { listings: { title: string; title_en: string | null; slug: string } | null })[] | null

  const stats = {
    total: listings?.length ?? 0,
    active: listings?.filter(l => l.status === 'active').length ?? 0,
    leads: leads?.length ?? 0,
    newLeads: leads?.filter(l => l.status === 'new').length ?? 0,
  }

  return (
    <main className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              Welcome back, {agent.full_name}
            </h1>
            {agent.agency_name && (
              <p className="text-gray-500">{agent.agency_name}</p>
            )}
          </div>
          <Link
            href="/listings/new"
            className="px-5 py-2.5 bg-[#0F5AE5] hover:bg-[#0B4CC4] text-white font-semibold rounded-lg transition-colors"
          >
            + New Listing
          </Link>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {[
            { label: 'Active Listings', value: stats.active, color: 'green' },
            { label: 'Total Listings', value: stats.total, color: 'gray' },
            { label: 'Total Leads', value: stats.leads, color: 'blue' },
            { label: 'New Leads', value: stats.newLeads, color: 'amber' },
          ].map(({ label, value, color }) => (
            <div key={label} className="bg-white rounded-xl border border-gray-200 p-5">
              <div className={`text-3xl font-bold text-${color}-600 mb-1`}>{value}</div>
              <div className="text-sm text-gray-500">{label}</div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Listings */}
          <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
              <h2 className="font-semibold text-gray-900">Your Listings</h2>
              <Link href="/listings/new" className="text-sm text-[#0F5AE5] hover:underline">+ Add New</Link>
            </div>
            <div className="divide-y divide-gray-50">
              {(listings ?? []).length === 0 ? (
                <div className="px-6 py-8 text-center text-gray-500">
                  <p className="mb-3">No listings yet.</p>
                  <Link href="/listings/new" className="text-[#0F5AE5] hover:underline text-sm">Create your first listing →</Link>
                </div>
              ) : (
                (listings ?? []).slice(0, 10).map((listing) => (
                  <div key={listing.id} className="px-6 py-4 flex items-center justify-between gap-4">
                    <div className="min-w-0">
                      <a
                        href={`/listing/${listing.slug}`}
                        className="font-medium text-gray-900 hover:text-[#0F5AE5] line-clamp-1 text-sm"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {listing.title_en ?? listing.title}
                      </a>
                      <div className="text-xs text-gray-500 mt-0.5">
                        {listing.listing_type} · {listing.price_usd ? `$${listing.price_usd.toLocaleString()}` : 'No price'} · {listing.lead_count ?? 0} leads
                      </div>
                    </div>
                    <span className={`flex-shrink-0 text-xs font-medium px-2 py-1 rounded-full ${
                      listing.status === 'active' ? 'bg-[#EAF2FF] text-[#0F5AE5]' :
                      listing.status === 'review' ? 'bg-amber-100 text-amber-700' :
                      'bg-gray-100 text-gray-600'
                    }`}>
                      {listing.status}
                    </span>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Leads */}
          <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-100">
              <h2 className="font-semibold text-gray-900">Recent Leads</h2>
            </div>
            <div className="divide-y divide-gray-50">
              {(leads ?? []).length === 0 ? (
                <div className="px-6 py-8 text-center text-gray-500 text-sm">
                  No leads yet. They&apos;ll appear here when buyers contact you.
                </div>
              ) : (
                (leads ?? []).slice(0, 10).map((lead: any) => (
                  <div key={lead.id} className="px-6 py-4">
                    <div className="flex items-start justify-between gap-4">
                      <div className="min-w-0">
                        <div className="flex items-center gap-2">
                          <span className="font-medium text-sm text-gray-900">{lead.name}</span>
                          {lead.status === 'new' && (
                            <span className="text-xs bg-[#EAF2FF] text-[#0F5AE5] px-1.5 py-0.5 rounded-full font-medium">New</span>
                          )}
                        </div>
                        <a href={`mailto:${lead.email}`} className="text-xs text-blue-600 hover:underline">
                          {lead.email}
                        </a>
                        {lead.listings && (
                          <div className="text-xs text-gray-400 mt-0.5 truncate">
                            Re: {lead.listings.title_en ?? lead.listings.title}
                          </div>
                        )}
                        {lead.message && (
                          <p className="text-xs text-gray-500 mt-1 line-clamp-2">{lead.message}</p>
                        )}
                      </div>
                      <span className="text-xs text-gray-400 flex-shrink-0">
                        {new Date(lead.created_at).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
