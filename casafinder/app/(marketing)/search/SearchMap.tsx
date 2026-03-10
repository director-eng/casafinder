'use client'

import { useState } from 'react'
import dynamic from 'next/dynamic'
import type { ListingWithImage } from '@/lib/supabase/types'
import { ListingCard } from '@/components/listings/ListingCard'

// Dynamic import to avoid SSR issues
const MapView = dynamic(() => import('@/components/map/MapView').then(m => m.MapView), {
  ssr: false,
  loading: () => <div className="map-container w-full rounded-xl bg-gray-100 animate-pulse" />,
})

interface SearchMapProps {
  listings: ListingWithImage[]
}

export function SearchMap({ listings }: SearchMapProps) {
  const [active, setActive] = useState<ListingWithImage | null>(null)

  return (
    <div className="relative h-full flex gap-0">
      {/* Map */}
      <div className="flex-1 h-full">
        <MapView
          listings={listings}
          highlightedId={active?.id}
          onListingClick={setActive}
          showSiriOverlay={false}
          zoom={11}
        />
      </div>

      {/* Popup card when a pin is clicked */}
      {active && (
        <div className="absolute bottom-4 left-4 right-4 md:left-auto md:right-4 md:w-80 z-10">
          <div className="relative">
            <button
              onClick={() => setActive(null)}
              className="absolute top-2 right-2 z-20 bg-white rounded-full p-1 shadow text-gray-500 hover:text-gray-800"
              aria-label="Close"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            <ListingCard listing={active} compact />
          </div>
        </div>
      )}
    </div>
  )
}
