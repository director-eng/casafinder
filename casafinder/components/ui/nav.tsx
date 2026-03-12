'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'

export function Nav() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 12)
    window.addEventListener('scroll', handler, { passive: true })
    handler()
    return () => window.removeEventListener('scroll', handler)
  }, [])

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [mobileOpen])

  return (
    <>
      <nav
        className={`
          sticky top-0 z-40 bg-white border-b transition-all duration-200
          ${scrolled
            ? 'border-[#E5E7EB] shadow-[0_2px_8px_rgba(16,24,40,0.06)]'
            : 'border-[#E5E7EB]'}
        `}
      >
        <div className="max-w-[1280px] mx-auto px-6 flex items-center justify-between h-[76px]">

          {/* Logo */}
          <Link
            href="/"
            className="font-black text-[36px] text-[#1F2937] tracking-tight shrink-0"
          >
            Casa<span className="text-[#0F5AE5]">Finder</span>
          </Link>

          {/* Desktop nav links */}
          <div className="hidden md:flex items-center gap-1">
            {[
              { label: 'For Sale', href: '/search?type=sale' },
              { label: 'For Rent', href: '/search?type=rent' },
              { label: 'Land', href: '/search?type=sale&propertyType=lot' },
              { label: 'Vendors', href: '/vendors' },
              { label: 'Guides', href: '/how-to' },
            ].map(({ label, href }) => (
              <Link
                key={href}
                href={href}
                className="px-4 py-2 text-[16px] font-semibold text-[#374151] hover:text-[#0F5AE5] rounded-[6px] hover:bg-[#F5F7FA] transition-all duration-[120ms]"
              >
                {label}
              </Link>
            ))}
          </div>

          {/* Desktop right CTAs */}
          <div className="hidden md:flex items-center gap-2">
            <Link
              href="/login"
              className="px-3.5 py-2 text-[15px] font-medium text-[#5B6472] hover:text-[#0F5AE5] rounded-[6px] hover:bg-[#F5F7FA] transition-all duration-[120ms]"
            >
              Sign In
            </Link>
            <Link
              href="/signup"
              className="px-5 py-2.5 bg-[#0F5AE5] hover:bg-[#0B4CC4] active:bg-[#0A44B0] text-white text-[14px] font-semibold rounded-[9999px] transition-colors duration-[120ms] shadow-sm"
            >
              List a Property
            </Link>
          </div>

          {/* Mobile menu button */}
          <button
            className="md:hidden flex items-center justify-center w-10 h-10 rounded-[8px] text-[#1F2937] hover:bg-[#F5F7FA] transition-colors"
            onClick={() => setMobileOpen(v => !v)}
            aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={mobileOpen}
          >
            <svg className="w-[22px] h-[22px]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              {mobileOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 7h16M4 12h16M4 17h16" />
              )}
            </svg>
          </button>
        </div>
      </nav>

      {/* Mobile drawer backdrop */}
      {mobileOpen && (
        <div
          className="fixed inset-0 z-30 bg-black/20 backdrop-blur-[2px] md:hidden"
          onClick={() => setMobileOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* Mobile drawer */}
      <div
        className={`
          fixed top-[72px] right-0 bottom-0 z-40 w-[80vw] max-w-[320px]
          bg-white shadow-xl md:hidden
          transition-transform duration-300 ease-out
          ${mobileOpen ? 'translate-x-0' : 'translate-x-full'}
        `}
        aria-hidden={!mobileOpen}
      >
        <div className="flex flex-col h-full px-6 py-6">
          {/* Nav links */}
          <nav className="space-y-1 flex-1">
            {[
              { label: 'For Sale', href: '/search?type=sale' },
              { label: 'For Rent', href: '/search?type=rent' },
              { label: 'Land & Lots', href: '/search?type=sale&propertyType=lot' },
              { label: 'Vendors', href: '/vendors' },
              { label: 'How-To Guides', href: '/how-to' },
            ].map(({ label, href }) => (
              <Link
                key={href}
                href={href}
                onClick={() => setMobileOpen(false)}
                className="flex items-center gap-3 px-3 py-3 text-[16px] font-medium text-[#1F2937] hover:text-[#0F5AE5] hover:bg-[#F5F7FA] rounded-[8px] transition-colors"
              >
                {label}
              </Link>
            ))}
          </nav>

          {/* Bottom CTAs */}
          <div className="border-t border-[#F0F0F0] pt-5 space-y-3">
            <Link
              href="/login"
              onClick={() => setMobileOpen(false)}
              className="block text-center px-4 py-3 text-[15px] font-medium text-[#5B6472] hover:text-[#1F2937] transition-colors"
            >
              Sign In
            </Link>
            <Link
              href="/signup"
              onClick={() => setMobileOpen(false)}
              className="block text-center px-4 py-3 bg-[#0F5AE5] hover:bg-[#0B4CC4] text-white text-[14px] font-semibold rounded-[9999px] transition-colors"
            >
              List a Property
            </Link>
          </div>
        </div>
      </div>
    </>
  )
}
