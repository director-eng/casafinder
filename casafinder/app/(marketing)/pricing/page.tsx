import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Pricing — CasaFinder',
  description: 'CasaFinder is free for agents during our beta. List your properties, receive leads, and reach buyers across Costa Rica.',
}

const features = [
  { label: 'Unlimited property listings', highlight: false },
  { label: 'Direct buyer leads to your email', highlight: true },
  { label: 'WhatsApp contact button on every listing', highlight: false },
  { label: 'Agent profile page', highlight: false },
  { label: 'Interactive map placement', highlight: true },
  { label: 'Full photo gallery per listing', highlight: false },
  { label: 'Costa Rica–specific fields (ocean view, water source, road…)', highlight: false },
  { label: 'Lead history dashboard', highlight: false },
  { label: 'Priority placement for early partners', highlight: true },
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
    a: 'We plan a simple flat monthly fee per agent — no per-listing charges, no lead fees. Early beta partners receive a permanent discount. We will never charge per lead.',
  },
]

export default function PricingPage() {
  return (
    <main className="min-h-screen bg-white">

      {/* ── Hero ──────────────────────────────────────────────────────────── */}
      <section className="py-24 px-6 text-center">
        <div className="max-w-2xl mx-auto">
          <span className="inline-flex items-center gap-2 bg-[#EAF2FF] text-[#0F5AE5] text-[12px] font-semibold px-4 py-1.5 rounded-full mb-7 tracking-wide uppercase">
            <span className="w-1.5 h-1.5 rounded-full bg-[#4ADE80] inline-block" />
            Beta — Free for agents
          </span>
          <h1 className="text-[clamp(2rem,4vw,2.75rem)] font-extrabold text-[#1F2937] mb-5 leading-[1.1] tracking-tight">
            List your properties.<br />Reach more buyers.
          </h1>
          <p className="text-[17px] text-[#5B6472] leading-relaxed max-w-lg mx-auto">
            CasaFinder is free for all agents during our launch phase.
            No credit card. No per-lead fees. No fine print.
          </p>
          <div className="mt-10 flex items-center justify-center gap-4 flex-wrap">
            <Link
              href="/signup"
              className="px-8 py-3.5 bg-[#0F5AE5] hover:bg-[#0B4CC4] text-white text-[14px] font-semibold rounded-full transition-colors shadow-sm"
            >
              Create free account
            </Link>
            <Link
              href="/about#contact"
              className="px-8 py-3.5 border border-[#E5E7EB] hover:border-[#0F5AE5] hover:text-[#0F5AE5] text-[#5B6472] text-[14px] font-medium rounded-full transition-colors"
            >
              Talk to us first
            </Link>
          </div>
        </div>
      </section>

      {/* ── Plan card ─────────────────────────────────────────────────────── */}
      <section className="bg-[#F5F7FA] border-y border-[#E5E7EB] py-20 px-6">
        <div className="max-w-md mx-auto">
          <div className="bg-white rounded-[20px] border border-[#E5E7EB] overflow-hidden shadow-[0_4px_24px_rgba(16,24,40,0.08)]">
            {/* Card header */}
            <div className="bg-[#0F5AE5] px-8 py-8 text-white text-center">
              <div className="text-[11px] font-bold uppercase tracking-[0.12em] text-white/70 mb-2">Agent Plan</div>
              <div className="text-[4rem] font-extrabold leading-none">$0</div>
              <div className="text-[13px] text-white/65 mt-2">Free during beta · No card required</div>
            </div>

            {/* Features list */}
            <div className="px-8 py-7">
              <ul className="space-y-4">
                {features.map(({ label, highlight }) => (
                  <li key={label} className="flex items-start gap-3">
                    <svg
                      className={`w-5 h-5 flex-shrink-0 mt-0.5 ${highlight ? 'text-[#0F5AE5]' : 'text-[#1F8F5F]'}`}
                      fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                    <span className={`text-[14px] leading-snug ${highlight ? 'text-[#1F2937] font-medium' : 'text-[#5B6472]'}`}>{label}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-8 pt-6 border-t border-[#F5F7FA]">
                <Link
                  href="/signup"
                  className="block w-full text-center py-3.5 bg-[#0F5AE5] hover:bg-[#0B4CC4] text-white text-[14px] font-semibold rounded-full transition-colors"
                >
                  Get started free
                </Link>
                <p className="text-[12px] text-[#9CA3AF] text-center mt-3 leading-snug">
                  Early partners lock in discounted pricing when paid plans launch.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Stats strip ───────────────────────────────────────────────────── */}
      <section className="py-16 px-6">
        <div className="max-w-2xl mx-auto">
          <div className="grid grid-cols-3 gap-8 text-center">
            {[
              { n: '52', label: 'verified listing sources' },
              { n: 'EN + ES', label: 'bilingual platform' },
              { n: '$0', label: 'to get started' },
            ].map(({ n, label }) => (
              <div key={label}>
                <div className="text-[2rem] font-extrabold text-[#1F2937] leading-none">{n}</div>
                <div className="text-[13px] text-[#7A8494] mt-2 leading-snug">{label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQ ───────────────────────────────────────────────────────────── */}
      <section className="bg-[#F5F7FA] border-t border-[#E5E7EB] py-20 px-6">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-[1.75rem] font-bold text-[#1F2937] mb-12 text-center">
            Frequently asked questions
          </h2>
          <div className="space-y-0 divide-y divide-[#E5E7EB]">
            {faqs.map(({ q, a }) => (
              <div key={q} className="py-7">
                <h3 className="text-[15px] font-semibold text-[#1F2937] mb-2.5">{q}</h3>
                <p className="text-[14px] text-[#5B6472] leading-[1.65]">{a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Bottom CTA ────────────────────────────────────────────────────── */}
      <section className="py-24 px-6 text-center">
        <div className="max-w-lg mx-auto">
          <h2 className="text-[1.75rem] font-bold text-[#1F2937] mb-3 leading-tight">
            Ready to reach more buyers?
          </h2>
          <p className="text-[15px] text-[#7A8494] mb-8 leading-relaxed">
            Free to join. Takes 3 minutes. Your listings live on the map today.
          </p>
          <Link
            href="/signup"
            className="inline-block px-10 py-3.5 bg-[#0F5AE5] hover:bg-[#0B4CC4] text-white text-[14px] font-semibold rounded-full transition-colors"
          >
            Create your free agent account
          </Link>
          <div className="mt-5">
            <Link href="/about#contact" className="text-[13px] text-[#9CA3AF] hover:text-[#5B6472] transition-colors">
              Have questions? Contact us directly.
            </Link>
          </div>
        </div>
      </section>

    </main>
  )
}
