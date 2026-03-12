import type { Metadata } from 'next'
import { createServiceClient } from '@/lib/supabase/server'
import { HeroImage } from '@/components/ui/hero-image'

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: 'CasaFinder — Costa Rica Real Estate | Ojochal & Southern Pacific',
  description: 'Search homes for sale and rent in Ojochal and the Southern Pacific coast of Costa Rica. Map-based search with verified listings and cadastre data.',
}

const regions = [
  {
    name: 'Ojochal · Uvita',
    sub: 'Southern Pacific',
    count: 'Launching here',
    // Tropical Pacific coast beach — whale tail / Uvita area feel
    img: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=600&h=420&q=75',
    href: '/search?district=Ojochal',
  },
  {
    name: 'Manuel Antonio',
    sub: 'Pacific Coast',
    count: 'Coming soon',
    // Lush jungle meets Pacific beach — classic Manuel Antonio
    img: 'https://images.unsplash.com/photo-1518495973542-4542c06a5843?auto=format&fit=crop&w=600&h=420&q=75',
    href: '/search?district=Manuel+Antonio',
  },
  {
    name: 'Tamarindo',
    sub: 'Guanacaste',
    count: 'Coming soon',
    // Pacific beach at sunset — Guanacaste dry-forest coast
    img: 'https://images.unsplash.com/photo-1519046904884-53103b34b206?auto=format&fit=crop&w=600&h=420&q=75',
    href: '/search?district=Tamarindo',
  },
  {
    name: 'Escazú · Santa Ana',
    sub: 'Central Valley',
    count: 'Coming soon',
    // Central Valley — warm modern neighbourhood, lush green hills
    img: 'https://images.unsplash.com/photo-1516026672322-bc52d61a53d5?auto=format&fit=crop&w=600&h=420&q=75',
    href: '/search?district=Escazu',
  },
  {
    name: 'La Fortuna',
    sub: 'Northern Zone',
    count: 'Coming soon',
    // Arenal / Northern Zone — jungle waterfall + tropical green
    img: 'https://images.unsplash.com/photo-1586348943529-beaae6c28db9?auto=format&fit=crop&w=600&h=420&q=75',
    href: '/search?district=La+Fortuna',
  },
  {
    name: 'Jacó',
    sub: 'Central Pacific',
    count: 'Coming soon',
    // Jacó — Central Pacific surf beach, waves and palm shore
    img: 'https://images.unsplash.com/photo-1510414842594-a61c69b5ae57?auto=format&fit=crop&w=600&h=420&q=75',
    href: '/search?district=Jaco',
  },
]

const howItWorks = [
  {
    step: '01',
    title: 'Search the map',
    desc: 'Every listing lives on an interactive map with official cadastre parcel data. See exactly where a property sits — not just an approximate pin.',
  },
  {
    step: '02',
    title: 'Filter for what matters here',
    desc: 'Ocean view, road condition, water source, legal status — 20+ Costa Rica–specific fields that matter on the ground but most platforms ignore.',
  },
  {
    step: '03',
    title: 'Connect with the agent',
    desc: 'One tap reaches the listing agent directly by email or WhatsApp. No referral fees, no lead auctions, no middlemen between you and the person who knows the property.',
  },
]

export default async function HomePage() {
  const supabase = await createServiceClient()

  const { data: featured } = await supabase
    .from('listings')
    .select('*, listing_images(url, alt_text, is_primary)')
    .eq('status', 'active')
    .eq('featured', true)
    .order('created_at', { ascending: false })
    .limit(6)

  return (
    <main className="min-h-screen bg-white">

      {/* ── Hero ──────────────────────────────────────────────────────────── */}
      <section className="relative min-h-[88vh] flex items-center justify-center overflow-hidden">
        {/* Background photo */}
        {/* Hero photo — client component handles onError fallback to Unsplash */}
        <HeroImage />
        {/* Gradient overlay — bottom up, very controlled */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-black/10" />

        {/* Content */}
        <div className="relative z-10 text-center px-6 max-w-3xl mx-auto">
          {/* Eyebrow */}
          <div className="inline-flex items-center gap-2 bg-white/15 backdrop-blur-sm border border-white/25 text-white/90 text-[13px] font-medium px-4 py-1.5 rounded-full mb-8 tracking-wide">
            <span className="w-1.5 h-1.5 rounded-full bg-[#4ADE80] inline-block" />
            Now live in the Southern Pacific
          </div>

          {/* Headline */}
          <h1 className="text-[clamp(2.5rem,6vw,4rem)] font-extrabold text-white leading-[1.08] tracking-tight mb-5">
            Find your place<br />in Costa Rica.
          </h1>

          {/* Sub */}
          <p className="text-[clamp(1rem,2.2vw,1.2rem)] text-white/75 mb-10 leading-relaxed max-w-xl mx-auto">
            Homes for sale and rent in Ojochal, the Pacific Coast,<br className="hidden sm:block" /> and the Central Valley.
          </p>

          {/* Search bar */}
          <form
            action="/search"
            className="flex items-center bg-white rounded-[9999px] shadow-2xl overflow-hidden max-w-[640px] mx-auto h-[60px] group"
          >
            <div className="flex-1 flex items-center gap-3 pl-5">
              <svg className="w-[18px] h-[18px] text-[#7A8494] flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <circle cx="11" cy="11" r="7" /><path d="M21 21l-4.35-4.35" strokeLinecap="round" />
              </svg>
              <input
                type="text"
                name="q"
                placeholder="Search Ojochal, Uvita, Dominical…"
                className="flex-1 bg-transparent border-none outline-none text-[15px] text-[#1F2937] placeholder:text-[#9CA3AF] min-w-0"
                autoComplete="off"
              />
            </div>
            <div className="border-l border-[#E5E7EB] mx-1 h-7" />
            <select
              name="type"
              className="border-none outline-none bg-transparent text-[13px] font-medium text-[#5B6472] px-3 cursor-pointer"
            >
              <option value="sale">For Sale</option>
              <option value="rent">For Rent</option>
              <option value="rent_vacation">Vacation</option>
            </select>
            <div className="p-1.5 pr-2">
              <button
                type="submit"
                className="h-[46px] px-7 bg-[#0F5AE5] hover:bg-[#0B4CC4] active:bg-[#0A44B0] text-white text-[14px] font-semibold rounded-[9999px] transition-colors duration-[120ms] whitespace-nowrap"
              >
                Search
              </button>
            </div>
          </form>

          {/* Quick-access chips */}
          <div className="flex flex-wrap items-center justify-center gap-2 mt-5">
            {[
              { label: 'Homes for Sale', href: '/search?type=sale&propertyType=house' },
              { label: 'Land & Lots', href: '/search?type=sale&propertyType=lot' },
              { label: 'For Rent', href: '/search?type=rent' },
              { label: 'Vacation Rentals', href: '/search?type=rent_vacation' },
            ].map(({ label, href }) => (
              <a
                key={href}
                href={href}
                className="px-4 py-1.5 bg-white/15 hover:bg-white/25 backdrop-blur-sm border border-white/25 text-white/90 text-[13px] font-medium rounded-full transition-all duration-[120ms]"
              >
                {label}
              </a>
            ))}
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <svg className="w-5 h-5 text-white/50" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </section>

      {/* ── Featured Properties ────────────────────────────────────────────── */}
      {featured && featured.length > 0 ? (
        <section className="max-w-[1280px] mx-auto px-6 py-20">
          {/* Section header */}
          <div className="flex items-end justify-between mb-10">
            <div>
              <p className="text-[12px] font-semibold text-[#0F5AE5] uppercase tracking-[0.1em] mb-2">Featured</p>
              <h2 className="text-[2rem] font-bold text-[#1F2937] leading-tight">Recently listed properties</h2>
            </div>
            <a href="/search" className="hidden sm:inline-flex items-center gap-1.5 text-[14px] font-medium text-[#0F5AE5] hover:text-[#0B4CC4] transition-colors">
              View all
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </a>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {featured.map((listing: any) => {
              const primaryImg = listing.listing_images?.find((i: any) => i.is_primary) ?? listing.listing_images?.[0]
              const typeLabel = listing.listing_type === 'rent_vacation' ? 'Vacation Rental'
                : listing.listing_type === 'rent' ? 'For Rent' : 'For Sale'
              const price = listing.price_usd
                ? `$${listing.price_usd.toLocaleString()}${listing.listing_type !== 'sale' ? '/mo' : ''}`
                : 'Price on request'
              const facts = [
                listing.bedrooms && `${listing.bedrooms} bd`,
                listing.bathrooms && `${listing.bathrooms} ba`,
                listing.area_built_m2 && `${listing.area_built_m2.toLocaleString()} m²`,
              ].filter(Boolean).join(' · ')

              return (
                <a
                  key={listing.id}
                  href={`/listing/${listing.slug}`}
                  className="group block bg-white border border-[#E5E7EB] rounded-[12px] overflow-hidden shadow-[0_2px_4px_rgba(16,24,40,0.07)] hover:shadow-[0_4px_10px_rgba(16,24,40,0.10)] hover:scale-[1.01] transition-all duration-[180ms]"
                >
                  {/* Photo */}
                  <div className="aspect-[16/10] bg-gradient-to-br from-[#d4e9d4] via-[#c8dfc0] to-[#a8c8a0] relative overflow-hidden">
                    {primaryImg ? (
                      <img
                        src={primaryImg.url}
                        alt={primaryImg.alt_text || listing.title}
                        className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-500"
                        loading="lazy"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <svg className="w-12 h-12 text-white/40" viewBox="0 0 64 64" fill="currentColor">
                          <path d="M32 4C20 4 10 14 10 26c0 8 4 15 10 19.5V52h4v8h16v-8h4V45.5C50 41 54 34 54 26 54 14 44 4 32 4z" opacity=".35" />
                          <rect x="28" y="36" width="8" height="24" rx="2" opacity=".5" />
                        </svg>
                      </div>
                    )}
                    {/* Type badge */}
                    <span className="absolute top-3 left-3 bg-[#0F5AE5] text-white text-[11px] font-semibold px-2.5 py-1 rounded-[8px] tracking-[0.01em]">
                      {typeLabel}
                    </span>
                    {/* Heart */}
                    <button
                      type="button"
                      aria-label="Save listing"
                      className="absolute top-3 right-3 w-8 h-8 flex items-center justify-center bg-white/80 hover:bg-white rounded-full transition-colors"
                    >
                      <svg className="w-4 h-4 text-[#5B6472]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                      </svg>
                    </button>
                  </div>

                  {/* Details */}
                  <div className="p-4 pb-5">
                    <div className="text-[22px] font-bold text-[#1F2937] tabular-nums leading-tight mb-1">{price}</div>
                    {facts && <div className="text-[13px] text-[#5B6472] mb-1.5">{facts}</div>}
                    <div className="text-[13px] text-[#374151] font-medium leading-snug mb-1 line-clamp-1">
                      {listing.title_en ?? listing.title}
                    </div>
                    <div className="text-[12px] text-[#9CA3AF]">
                      {[listing.district, listing.province].filter(Boolean).join(', ')}, Costa Rica
                    </div>
                  </div>
                </a>
              )
            })}
          </div>

          <div className="text-center mt-12 sm:hidden">
            <a href="/search" className="inline-flex items-center gap-2 text-[14px] font-medium text-[#0F5AE5]">
              View all listings
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </a>
          </div>
        </section>
      ) : (
        /* Empty state — shown until agent listings go live */
        <section className="max-w-[1280px] mx-auto px-6 py-20">
          <div className="flex items-end justify-between mb-10">
            <div>
              <p className="text-[12px] font-semibold text-[#0F5AE5] uppercase tracking-[0.1em] mb-2">Properties</p>
              <h2 className="text-[2rem] font-bold text-[#1F2937] leading-tight">Listings coming soon</h2>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map(i => (
              <div key={i} className="bg-[#F5F7FA] border border-[#E5E7EB] rounded-[12px] overflow-hidden">
                <div className="aspect-[16/10] bg-gradient-to-br from-[#E5E7EB] to-[#F5F7FA]" />
                <div className="p-4 space-y-2.5">
                  <div className="h-6 bg-[#E5E7EB] rounded-full w-1/2" />
                  <div className="h-4 bg-[#E5E7EB] rounded-full w-3/4" />
                  <div className="h-4 bg-[#E5E7EB] rounded-full w-2/3" />
                </div>
              </div>
            ))}
          </div>
          <div className="mt-10 text-center">
            <p className="text-[#7A8494] text-[15px] mb-4">Be among the first to list in the Southern Pacific.</p>
            <a href="/signup" className="inline-flex items-center gap-2 px-7 py-3 bg-[#0F5AE5] hover:bg-[#0B4CC4] text-white text-[14px] font-semibold rounded-full transition-colors">
              List a property
            </a>
          </div>
        </section>
      )}

      {/* ── Why the Southern Pacific ──────────────────────────────────────── */}
      <section className="max-w-[1280px] mx-auto px-6 py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left — editorial */}
          <div>
            <p className="text-[12px] font-semibold text-[#0F5AE5] uppercase tracking-[0.1em] mb-4">The Southern Pacific</p>
            <h2 className="text-[2.25rem] font-bold text-[#1F2937] leading-[1.1] tracking-tight mb-6">
              Unlike anywhere<br />else in Costa Rica.
            </h2>
            <p className="text-[16px] text-[#5B6472] leading-[1.7] mb-4">
              Nestled between the Osa Peninsula and Ballena Marine National Park, Ojochal is a bilingual expat community famous for world-class dining, ocean views, sustainable living, and direct access to pristine beaches and primary jungle.
            </p>
            <p className="text-[16px] text-[#5B6472] leading-[1.7] mb-8">
              Property here is unlike anywhere else in the country — shaped by topography, microclimates, and a community that chose this coast deliberately. CasaFinder is built to capture that nuance.
            </p>
            <a
              href="/search?district=Ojochal"
              className="inline-flex items-center gap-2 px-7 py-3 bg-[#0F5AE5] hover:bg-[#0B4CC4] text-white text-[14px] font-semibold rounded-full transition-colors"
            >
              Explore Ojochal properties
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </a>
          </div>

          {/* Right — stats */}
          <div className="grid grid-cols-2 gap-6">
            {[
              { stat: '4h', label: 'From San José', detail: 'Via the Costanera Sur highway' },
              { stat: '260', label: 'Days of sun/year', detail: 'Warm Pacific sunshine year-round' },
              { stat: '26', label: 'Restaurants', detail: 'International cuisine in the jungle' },
              { stat: '50km', label: 'Of coastline', detail: 'Ballena National Marine Park' },
            ].map(({ stat, label, detail }) => (
              <div key={label} className="bg-white border border-[#E5E7EB] rounded-[16px] p-6">
                <div className="text-[2.5rem] font-extrabold text-[#0F5AE5] leading-none mb-2">{stat}</div>
                <div className="text-[15px] font-semibold text-[#1F2937] mb-1">{label}</div>
                <div className="text-[13px] text-[#7A8494] leading-snug">{detail}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── How It Works ──────────────────────────────────────────────────── */}
      <section className="bg-[#F5F7FA] border-y border-[#E5E7EB] py-24 px-6">
        <div className="max-w-[1280px] mx-auto">
          <div className="text-center max-w-xl mx-auto mb-16">
            <p className="text-[12px] font-semibold text-[#0F5AE5] uppercase tracking-[0.1em] mb-3">How it works</p>
            <h2 className="text-[2rem] font-bold text-[#1F2937] leading-tight">
              Built for the way people<br />actually find property here.
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {howItWorks.map(({ step, title, desc }) => (
              <div key={step} className="bg-white border border-[#E5E7EB] rounded-[16px] p-8">
                <div className="text-[13px] font-bold text-[#0F5AE5] tracking-[0.05em] mb-5">{step}</div>
                <h3 className="text-[18px] font-bold text-[#1F2937] mb-3">{title}</h3>
                <p className="text-[14px] text-[#5B6472] leading-[1.65]">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Agent CTA ─────────────────────────────────────────────────────── */}
      <section className="py-24 px-6">
        <div className="max-w-[720px] mx-auto text-center">
          <p className="text-[12px] font-semibold text-[#0F5AE5] uppercase tracking-[0.1em] mb-4">For Agents</p>
          <h2 className="text-[2rem] font-bold text-[#1F2937] leading-tight mb-4">
            The Southern Pacific's first map-first<br className="hidden sm:block" /> real estate platform. Free to join.
          </h2>
          <p className="text-[16px] text-[#5B6472] leading-relaxed mb-10 max-w-lg mx-auto">
            List your properties and receive leads directly. No per-lead fees. No fine print.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="/signup"
              className="px-8 py-3.5 bg-[#0F5AE5] hover:bg-[#0B4CC4] text-white text-[14px] font-semibold rounded-full transition-colors"
            >
              Create free agent account
            </a>
            <a
              href="/pricing"
              className="px-8 py-3.5 border border-[#E5E7EB] hover:border-[#0F5AE5] hover:text-[#0F5AE5] text-[#5B6472] text-[14px] font-medium rounded-full transition-colors"
            >
              See what's included
            </a>
          </div>
        </div>
      </section>

      {/* ── Footer ────────────────────────────────────────────────────────── */}
      <footer className="bg-[#F5F7FA] border-t border-[#E5E7EB] pt-14 pb-10 px-6">
        <div className="max-w-[1280px] mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-10 mb-12">
            {/* Brand */}
            <div className="col-span-2 md:col-span-1">
              <div className="text-[#1F2937] font-extrabold text-xl tracking-tight mb-3">
                Casa<span className="text-[#0F5AE5]">Finder</span>
              </div>
              <p className="text-[13px] text-[#7A8494] leading-relaxed max-w-[200px]">
                Costa Rica real estate for the Southern Pacific coast and beyond.
              </p>
            </div>

            {/* Search */}
            <div>
              <div className="text-[12px] font-semibold text-[#1F2937] uppercase tracking-[0.08em] mb-4">Search</div>
              <ul className="space-y-3">
                {[
                  { label: 'Homes for Sale', href: '/search?type=sale' },
                  { label: 'Rentals', href: '/search?type=rent' },
                  { label: 'Vacation Rentals', href: '/search?type=rent_vacation' },
                  { label: 'Lots & Land', href: '/search?type=sale&propertyType=lot' },
                ].map(({ label, href }) => (
                  <li key={href}>
                    <a href={href} className="text-[13px] text-[#7A8494] hover:text-[#1F2937] transition-colors">{label}</a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Discover */}
            <div>
              <div className="text-[12px] font-semibold text-[#1F2937] uppercase tracking-[0.08em] mb-4">Discover</div>
              <ul className="space-y-3">
                {[
                  { label: 'Vendor Directory', href: '/vendors' },
                  { label: 'How-To Guides', href: '/how-to' },
                  { label: 'Ojochal Real Estate', href: '/ojochal-real-estate' },
                ].map(({ label, href }) => (
                  <li key={href}>
                    <a href={href} className="text-[13px] text-[#7A8494] hover:text-[#1F2937] transition-colors">{label}</a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Company */}
            <div>
              <div className="text-[12px] font-semibold text-[#1F2937] uppercase tracking-[0.08em] mb-4">Company</div>
              <ul className="space-y-3">
                {[
                  { label: 'For Agents', href: '/signup' },
                  { label: 'Pricing', href: '/pricing' },
                  { label: 'About', href: '/about' },
                  { label: 'Contact', href: '/about#contact' },
                ].map(({ label, href }) => (
                  <li key={href}>
                    <a href={href} className="text-[13px] text-[#7A8494] hover:text-[#1F2937] transition-colors">{label}</a>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Bottom bar */}
          <div className="border-t border-[#E5E7EB] pt-6 flex flex-col sm:flex-row items-center justify-between gap-3">
            <p className="text-[12px] text-[#9CA3AF]">
              © {new Date().getFullYear()} CasaFinder. All rights reserved.
            </p>
            <div className="flex items-center gap-5">
              <a href="/about" className="text-[12px] text-[#9CA3AF] hover:text-[#5B6472] transition-colors">About</a>
              <a href="/about#contact" className="text-[12px] text-[#9CA3AF] hover:text-[#5B6472] transition-colors">Contact</a>
              <span className="text-[12px] text-[#9CA3AF]">casafinder.co</span>
            </div>
          </div>
        </div>
      </footer>
    </main>
  )
}
