'use client'

import { useState } from 'react'
import Link from 'next/link'

export function Nav() {
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <nav className="bg-white border-b border-gray-200 sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between h-[72px]">
        {/* Logo */}
        <Link href="/" className="font-extrabold text-xl text-[#1F2937] tracking-tight">
          Casa<span className="text-[#0F5AE5]">Finder</span>
        </Link>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-7 text-[13px] font-medium text-[#5B6472]">
          <Link href="/search?type=sale"                      className="hover:text-[#0F5AE5] transition-colors duration-[120ms]">For Sale</Link>
          <Link href="/search?type=rent"                      className="hover:text-[#0F5AE5] transition-colors duration-[120ms]">For Rent</Link>
          <Link href="/search?type=sale&propertyType=lot"     className="hover:text-[#0F5AE5] transition-colors duration-[120ms]">Land</Link>
          <Link href="/vendors"                               className="hover:text-[#0F5AE5] transition-colors duration-[120ms]">Vendors</Link>
          <Link href="/how-to"                                className="hover:text-[#0F5AE5] transition-colors duration-[120ms]">How-To</Link>
        </div>

        {/* Desktop CTA */}
        <div className="hidden md:flex items-center gap-3">
          <Link
            href="/login"
            className="text-[13px] font-medium text-[#5B6472] hover:text-[#0F5AE5] transition-colors duration-[120ms]"
          >
            Sign In
          </Link>
          <Link
            href="/listings/new"
            className="px-4 py-2 bg-[#0F5AE5] hover:bg-[#0B4CC4] active:bg-[#0A44B0] text-white text-[13px] font-semibold rounded-[9999px] transition-colors duration-[120ms]"
          >
            List a Property
          </Link>
        </div>

        {/* Mobile hamburger */}
        <button
          className="md:hidden p-2 rounded-md text-[#1F2937] hover:text-[#0F5AE5] transition-colors"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
          aria-expanded={mobileOpen}
        >
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            {mobileOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile drawer */}
      {mobileOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 px-6 py-5 space-y-4">
          <Link href="/search?type=sale"                   className="block text-[15px] font-medium text-[#1F2937] hover:text-[#0F5AE5]" onClick={() => setMobileOpen(false)}>For Sale</Link>
          <Link href="/search?type=rent"                   className="block text-[15px] font-medium text-[#1F2937] hover:text-[#0F5AE5]" onClick={() => setMobileOpen(false)}>For Rent</Link>
          <Link href="/search?type=sale&propertyType=lot"  className="block text-[15px] font-medium text-[#1F2937] hover:text-[#0F5AE5]" onClick={() => setMobileOpen(false)}>Land &amp; Lots</Link>
          <Link href="/vendors"                            className="block text-[15px] font-medium text-[#1F2937] hover:text-[#0F5AE5]" onClick={() => setMobileOpen(false)}>Vendors</Link>
          <Link href="/how-to"                             className="block text-[15px] font-medium text-[#1F2937] hover:text-[#0F5AE5]" onClick={() => setMobileOpen(false)}>How-To Guides</Link>

          <div className="pt-4 border-t border-gray-100 flex flex-col gap-3">
            <Link
              href="/login"
              className="text-[15px] font-medium text-[#1F2937]"
              onClick={() => setMobileOpen(false)}
            >
              Sign In
            </Link>
            <Link
              href="/listings/new"
              className="px-4 py-2 bg-[#0F5AE5] hover:bg-[#0B4CC4] text-white text-[14px] font-semibold rounded-[9999px] text-center transition-colors"
              onClick={() => setMobileOpen(false)}
            >
              List a Property
            </Link>
          </div>
        </div>
      )}
    </nav>
  )
}
