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

  // Parse lot boundary GeoJSON if stored on the listing
  let geojson: GeoJSON.Feature | null = null
  if ((listing as any).boundary_geojson) {
    try {
      const raw = (listing as any).boundary_geojson
      geojson = typeof raw === 'string' ? JSON.parse(raw) : raw
    } catch {
      // ignore malformed geojson
    }
  }

  return (
    <div className="h-72">
      <MapView
        listings={[listing]}
        center={[listing.lat, listing.lng]}
        zoom={15}
        showSiriOverlay
        geojson={geojson}
      />
    </div>
  )
}
