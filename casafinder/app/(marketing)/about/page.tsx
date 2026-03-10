import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'About — CasaFinder',
  description: 'CasaFinder is a map-first real estate marketplace for Costa Rica, built for the Southern Pacific coast. Learn about our mission and how to get in touch.',
}

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-white">

      {/* Hero */}
      <section className="bg-[#F5F7FA] border-b border-[#E5E7EB] py-20 px-4">
        <div className="max-w-2xl mx-auto text-center">
          <h1 className="text-4xl font-extrabold text-[#1F2937] mb-4 leading-tight">
            Built for Costa Rica.<br />Not just translated.
          </h1>
          <p className="text-lg text-[#5B6472] leading-relaxed">
            CasaFinder is a map-first real estate marketplace designed around the way people actually search for property in Costa Rica — by region, view, road access, and lifestyle, not by zip code.
          </p>
        </div>
      </section>

      {/* Mission */}
      <section className="max-w-2xl mx-auto px-4 py-16">
        <h2 className="text-2xl font-bold text-[#1F2937] mb-5">Our mission</h2>
        <p className="text-[15px] text-[#5B6472] leading-relaxed mb-4">
          Real estate search in Costa Rica has historically meant fragmented agency websites, outdated PDFs, and WhatsApp messages. Buyers — especially those relocating from North America and Europe — arrive with no reliable way to compare properties, understand locations, or reach legitimate agents.
        </p>
        <p className="text-[15px] text-[#5B6472] leading-relaxed mb-4">
          CasaFinder changes that. We aggregate verified listings from licensed local agents, display them on an interactive map with official cadastre data, and let buyers connect directly with the agent — no lead farms, no middlemen, no upsells.
        </p>
        <p className="text-[15px] text-[#5B6472] leading-relaxed">
          We are starting in Ojochal and the Southern Pacific coast because it is one of the most active expat property markets in the country and one of the most underserved online. Our goal is to expand region by region as we build agent partnerships.
        </p>
      </section>

      {/* Values */}
      <section className="bg-[#F5F7FA] border-y border-[#E5E7EB] py-16 px-4">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl font-bold text-[#1F2937] mb-10 text-center">What we believe</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: '🗺️',
                title: 'Map first',
                desc: 'Location is everything in Costa Rica. Every listing lives on the map, with cadastre parcel overlays from the official Registro Nacional.',
              },
              {
                icon: '✅',
                title: 'Agent-verified',
                desc: 'We work with licensed local agents and verified sources. No anonymous listings, no unvetted scraped data presented as fact.',
              },
              {
                icon: '🤝',
                title: 'Direct connection',
                desc: 'Buyers reach agents directly — by email or WhatsApp. No lead auction, no referral fee, no algorithm between buyer and agent.',
              },
            ].map(({ icon, title, desc }) => (
              <div key={title} className="text-center">
                <div className="w-12 h-12 bg-[#EAF2FF] rounded-xl flex items-center justify-center mx-auto mb-4 text-2xl">{icon}</div>
                <h3 className="font-bold text-[#1F2937] mb-2">{title}</h3>
                <p className="text-[14px] text-[#5B6472] leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact */}
      <section className="max-w-2xl mx-auto px-4 py-16" id="contact">
        <h2 className="text-2xl font-bold text-[#1F2937] mb-2">Get in touch</h2>
        <p className="text-[#5B6472] text-[15px] mb-8">
          Whether you are an agent interested in listing, a buyer with a question, or a vendor wanting to be in our directory — we want to hear from you.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          {[
            {
              label: 'General inquiries',
              value: 'contact@casafinder.cr',
              href: 'mailto:contact@casafinder.cr',
              icon: '✉️',
            },
            {
              label: 'Agent partnerships',
              value: 'agents@casafinder.cr',
              href: 'mailto:agents@casafinder.cr',
              icon: '🏡',
            },
            {
              label: 'WhatsApp',
              value: 'Message us directly',
              href: 'https://wa.me/50688880000',
              icon: '💬',
            },
            {
              label: 'Based in',
              value: 'Ojochal, Puntarenas, Costa Rica',
              href: null,
              icon: '📍',
            },
          ].map(({ label, value, href, icon }) => (
            <div key={label} className="flex items-start gap-4 p-4 border border-[#E5E7EB] rounded-xl">
              <div className="w-10 h-10 bg-[#EAF2FF] rounded-lg flex items-center justify-center text-lg flex-shrink-0">{icon}</div>
              <div>
                <div className="text-[12px] font-semibold text-[#7A8494] uppercase tracking-wide mb-0.5">{label}</div>
                {href ? (
                  <a href={href} className="text-[15px] font-medium text-[#0F5AE5] hover:underline">{value}</a>
                ) : (
                  <span className="text-[15px] text-[#1F2937]">{value}</span>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Agent CTA */}
        <div className="bg-[#EAF2FF] rounded-2xl p-8 text-center">
          <h3 className="text-lg font-bold text-[#1F2937] mb-2">Are you a real estate agent?</h3>
          <p className="text-[14px] text-[#5B6472] mb-6">
            CasaFinder is free for agents during our beta launch. List your properties, receive leads directly, and be part of the Southern Pacific's most modern property search platform.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              href="/signup"
              className="px-6 py-2.5 bg-[#0F5AE5] hover:bg-[#0B4CC4] text-white font-semibold rounded-[9999px] text-sm transition-colors"
            >
              Create free agent account
            </Link>
            <Link
              href="/pricing"
              className="px-6 py-2.5 border border-[#0F5AE5] text-[#0F5AE5] hover:bg-white font-semibold rounded-[9999px] text-sm transition-colors"
            >
              See what's included
            </Link>
          </div>
        </div>
      </section>

    </main>
  )
}
