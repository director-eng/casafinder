import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'About — CasaFinder',
  description: 'CasaFinder is a map-first real estate marketplace for Costa Rica, built for the Southern Pacific coast. Learn about our mission and how to get in touch.',
}

const values = [
  {
    title: 'Map first',
    desc: 'Location is everything in Costa Rica. Every listing lives on the map with cadastre parcel overlays from the official Registro Nacional — not just an approximate pin on a tile.',
  },
  {
    title: 'Agent-verified',
    desc: 'We work with licensed local agents and verified sources. No anonymous listings, no unvetted scraped data presented as fact. Every property links back to a real person.',
  },
  {
    title: 'Direct connection',
    desc: 'Buyers reach agents by email or WhatsApp — directly. No lead auction. No referral fee. No algorithm between the buyer and the agent who knows the property.',
  },
]

const contacts = [
  {
    label: 'General inquiries',
    value: 'contact@casafinder.co',
    href: 'mailto:contact@casafinder.co',
  },
  {
    label: 'Agent partnerships',
    value: 'agents@casafinder.co',
    href: 'mailto:agents@casafinder.co',
  },
  {
    label: 'WhatsApp',
    value: 'Message us directly',
    href: 'https://wa.me/50688880000',
  },
  {
    label: 'Based in',
    value: 'Ojochal, Puntarenas, Costa Rica',
    href: null,
  },
]

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-white">

      {/* ── Hero ──────────────────────────────────────────────────────────── */}
      <section className="py-24 px-6">
        <div className="max-w-2xl mx-auto text-center">
          <p className="text-[12px] font-semibold text-[#0F5AE5] uppercase tracking-[0.1em] mb-4">About</p>
          <h1 className="text-[clamp(2rem,4vw,2.75rem)] font-extrabold text-[#1F2937] leading-[1.1] tracking-tight mb-6">
            Built for Costa Rica.<br />Not just translated.
          </h1>
          <p className="text-[17px] text-[#5B6472] leading-relaxed max-w-xl mx-auto">
            A map-first real estate marketplace designed around how people actually search for property in Costa Rica — by region, view, road access, and lifestyle, not by zip code.
          </p>
        </div>
      </section>

      {/* ── Mission ───────────────────────────────────────────────────────── */}
      <section className="bg-[#F5F7FA] border-y border-[#E5E7EB] py-20 px-6">
        <div className="max-w-[680px] mx-auto">
          <h2 className="text-[1.5rem] font-bold text-[#1F2937] mb-7">Our mission</h2>
          <div className="space-y-5 text-[16px] text-[#5B6472] leading-[1.7]">
            <p>
              Real estate search in Costa Rica has historically meant fragmented agency websites, outdated PDFs, and WhatsApp messages. Buyers arriving from North America and Europe have no reliable way to compare properties, understand locations, or reach legitimate agents.
            </p>
            <p>
              CasaFinder changes that. We aggregate verified listings from licensed local agents, display them on an interactive map with official cadastre data, and let buyers connect directly — no lead farms, no middlemen, no upsells.
            </p>
            <p>
              We are starting in Ojochal and the Southern Pacific coast because it is one of the most active expat property markets in the country and one of the most underserved online. Our goal is to expand region by region as we build agent partnerships.
            </p>
          </div>
        </div>
      </section>

      {/* ── Values ────────────────────────────────────────────────────────── */}
      <section className="py-20 px-6">
        <div className="max-w-[1000px] mx-auto">
          <h2 className="text-[1.5rem] font-bold text-[#1F2937] mb-12 text-center">What we believe</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {values.map(({ title, desc }, i) => (
              <div key={title} className="bg-white border border-[#E5E7EB] rounded-[16px] p-8">
                <div className="text-[13px] font-bold text-[#0F5AE5] tracking-[0.05em] mb-4">
                  {String(i + 1).padStart(2, '0')}
                </div>
                <h3 className="text-[17px] font-bold text-[#1F2937] mb-3">{title}</h3>
                <p className="text-[14px] text-[#5B6472] leading-[1.65]">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Contact ───────────────────────────────────────────────────────── */}
      <section className="bg-[#F5F7FA] border-t border-[#E5E7EB] py-20 px-6" id="contact">
        <div className="max-w-[720px] mx-auto">
          <h2 className="text-[1.5rem] font-bold text-[#1F2937] mb-2">Get in touch</h2>
          <p className="text-[15px] text-[#5B6472] mb-10 leading-relaxed">
            Whether you are an agent interested in listing, a buyer with a question, or a vendor wanting to be in our directory — we want to hear from you.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-14">
            {contacts.map(({ label, value, href }) => (
              <div key={label} className="bg-white border border-[#E5E7EB] rounded-[14px] p-5">
                <div className="text-[11px] font-semibold text-[#9CA3AF] uppercase tracking-[0.08em] mb-2">{label}</div>
                {href ? (
                  <a href={href} className="text-[15px] font-medium text-[#0F5AE5] hover:text-[#0B4CC4] transition-colors">
                    {value}
                  </a>
                ) : (
                  <span className="text-[15px] text-[#1F2937]">{value}</span>
                )}
              </div>
            ))}
          </div>

          {/* Agent CTA */}
          <div className="bg-[#EAF2FF] border border-[#BFD7FF] rounded-[20px] p-8 text-center">
            <h3 className="text-[18px] font-bold text-[#1F2937] mb-2.5">Are you a real estate agent?</h3>
            <p className="text-[14px] text-[#5B6472] mb-7 max-w-md mx-auto leading-relaxed">
              CasaFinder is free for agents during our beta launch. List your properties, receive leads directly, and be part of the Southern Pacific's most modern property platform.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link
                href="/signup"
                className="px-7 py-3 bg-[#0F5AE5] hover:bg-[#0B4CC4] text-white text-[14px] font-semibold rounded-full transition-colors"
              >
                Create free agent account
              </Link>
              <Link
                href="/pricing"
                className="px-7 py-3 border border-[#0F5AE5] text-[#0F5AE5] hover:bg-white text-[14px] font-semibold rounded-full transition-colors"
              >
                See what's included
              </Link>
            </div>
          </div>
        </div>
      </section>

    </main>
  )
}
