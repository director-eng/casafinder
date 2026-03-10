'use client'

import dynamic from 'next/dynamic'
import type { ListingWithImage } from '@/lib/supabase/types'

const MapView = dynamic(() => import('./MapView').then(m => m.MapView), {
  ssr: false,
  loading: () => <div className="h-72 w-full rounded-xl bg-gray-100 animate-pulse" />,
})

interface ListingMapProps {
  listing: ListingWithImage
}

export function ListingMap({ listing }: ListingMapProps) {
  if (!listing.lat || !listing.lng) return null

  return (
    <div className="h-72">
      <MapView
        listings={[listing]}
        center={[listing.lat, listing.lng]}
        zoom={15}
        showSiriOverlay
      />
    </div>
  )
}
