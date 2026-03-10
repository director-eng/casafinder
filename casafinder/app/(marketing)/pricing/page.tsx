import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Pricing — CasaFinder',
  description: 'CasaFinder is free for agents during our beta. List your properties, receive leads, and reach buyers across Costa Rica.',
}

const features = [
  'Unlimited property listings',
  'Direct buyer leads to your email',
  'WhatsApp contact button on every listing',
  'Agent profile page',
  'Map-based search placement',
  'Listing photo gallery',
  'Costa Rica–specific fields (ocean view, paved road, water source…)',
  'Lead history dashboard',
  'Priority placement for early partners',
]

const faqs = [
  {
    q: 'How long is the beta free?',
    a: 'The free beta runs while we establish our first agent partnerships in the Ojochal / Southern Pacific region. Early partners lock in a discounted rate when paid plans launch — we will give at least 60 days notice before any charges.',
  },
  {
    q: 'Do I need to be a licensed Costa Rican agent?',
    a: 'We strongly prefer listings from licensed agents (CCCBR or equivalent). Unlicensed sellers can list under a "Private Seller" category. Your license number is optional but increases buyer trust significantly.',
  },
  {
    q: 'How do leads work?',
    a: 'When a buyer fills the contact form on your listing, you receive an immediate email notification with their name, email, phone, and message. Their inquiry also appears in your dashboard. No lead sharing — it goes only to you.',
  },
  {
    q: 'Can I list properties outside Ojochal?',
    a: 'Yes. We are launching with a focus on the Southern Pacific zone (Ojochal, Uvita, Dominical, Bahía Ballena) but accept listings from across Costa Rica.',
  },
  {
    q: 'What happens when paid plans launch?',
    a: 'We plan a simple flat monthly fee per agent with no per-listing charges or lead fees. Early beta partners will get a permanent discount. We will never charge per lead.',
  },
]

export default function PricingPage() {
  return (
    <main className="min-h-screen bg-white">

      {/* Hero */}
      <section className="bg-[#F5F7FA] border-b border-[#E5E7EB] py-20 px-4 text-center">
        <div className="max-w-2xl mx-auto">
          <span className="inline-block bg-[#EAF2FF] text-[#0F5AE5] text-[13px] font-700 px-4 py-1.5 rounded-[9999px] mb-6 font-semibold">
            Beta — Free for agents
          </span>
          <h1 className="text-4xl font-extrabold text-[#1F2937] mb-4 leading-tight">
            List your properties.<br />Reach more buyers.
          </h1>
          <p className="text-lg text-[#5B6472] leading-relaxed">
            CasaFinder is free for all agents during our launch phase.
            No credit card. No per-lead fees. No fine print.
          </p>
          <div className="mt-8 flex items-center justify-center gap-4 flex-wrap">
            <Link
              href="/signup"
              className="px-8 py-3 bg-[#0F5AE5] hover:bg-[#0B4CC4] text-white font-semibold rounded-[9999px] transition-colors"
            >
              Create free account
            </Link>
            <Link
              href="/contact"
              className="px-8 py-3 border border-[#E5E7EB] hover:border-[#0F5AE5] hover:text-[#0F5AE5] text-[#1F2937] font-semibold rounded-[9999px] transition-colors"
            >
              Talk to us first
            </Link>
          </div>
        </div>
      </section>

      {/* Plan card */}
      <section className="max-w-lg mx-auto px-4 py-16">
        <div className="border-2 border-[#0F5AE5] rounded-2xl overflow-hidden">
          {/* Card header */}
          <div className="bg-[#0F5AE5] px-8 py-6 text-white text-center">
            <div className="text-[13px] font-semibold uppercase tracking-wider opacity-80 mb-1">Agent Plan</div>
            <div className="text-5xl font-extrabold">$0</div>
            <div className="text-sm opacity-80 mt-1">Free during beta · No card required</div>
          </div>

          {/* Features */}
          <div className="bg-white px-8 py-6">
            <ul className="space-y-3">
              {features.map(f => (
                <li key={f} className="flex items-start gap-3">
                  <svg className="w-5 h-5 text-[#1F8F5F] flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-[14px] text-[#1F2937]">{f}</span>
                </li>
              ))}
            </ul>

            <div className="mt-8">
              <Link
                href="/signup"
                className="block w-full text-center py-3 bg-[#0F5AE5] hover:bg-[#0B4CC4] text-white font-semibold rounded-[9999px] transition-colors"
              >
                Get started free
              </Link>
              <p className="text-[12px] text-[#7A8494] text-center mt-3">
                Early partners lock in discounted pricing when paid plans launch.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Social proof strip */}
      <section className="bg-[#F5F7FA] border-y border-[#E5E7EB] py-12 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-[#5B6472] text-sm font-medium uppercase tracking-wider mb-8">
            Serving agents across the Southern Pacific
          </p>
          <div className="grid grid-cols-3 gap-8">
            {[
              { n: '52', label: 'verified listing sources' },
              { n: 'EN + ES', label: 'bilingual platform' },
              { n: '0', label: 'fees to get started' },
            ].map(({ n, label }) => (
              <div key={label}>
                <div className="text-3xl font-extrabold text-[#0F5AE5]">{n}</div>
                <div className="text-sm text-[#5B6472] mt-1">{label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="max-w-2xl mx-auto px-4 py-16">
        <h2 className="text-2xl font-bold text-[#1F2937] mb-10 text-center">Frequently asked questions</h2>
        <div className="space-y-6">
          {faqs.map(({ q, a }) => (
            <div key={q} className="border-b border-[#E5E7EB] pb-6">
              <h3 className="text-[15px] font-700 text-[#1F2937] mb-2 font-semibold">{q}</h3>
              <p className="text-[14px] text-[#5B6472] leading-relaxed">{a}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA footer */}
      <section className="bg-[#0F5AE5] py-16 px-4 text-center text-white">
        <h2 className="text-2xl font-bold mb-3">Ready to reach more buyers?</h2>
        <p className="text-white/80 mb-8">Free to join. Takes 3 minutes. Your listings live on the map today.</p>
        <Link
          href="/signup"
          className="inline-block px-10 py-3 bg-white text-[#0F5AE5] font-semibold rounded-[9999px] hover:bg-[#EAF2FF] transition-colors"
        >
          Create your free agent account
        </Link>
        <div className="mt-4">
          <Link href="/contact" className="text-white/70 text-sm hover:text-white underline">
            Have questions? Contact us directly.
          </Link>
        </div>
      </section>

    </main>
  )
}
