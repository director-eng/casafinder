'use client'

import { useEffect, useRef } from 'react'
import type { ListingWithImage } from '@/lib/supabase/types'

interface MapViewProps {
  listings: ListingWithImage[]
  center?: [number, number]
  zoom?: number
  showSiriOverlay?: boolean
  onListingClick?: (listing: ListingWithImage) => void
  highlightedId?: string
}

// Ojochal default center
const DEFAULT_CENTER: [number, number] = [9.0885, -83.6499]
const DEFAULT_ZOOM = 12

export function MapView({
  listings,
  center = DEFAULT_CENTER,
  zoom = DEFAULT_ZOOM,
  showSiriOverlay = false,
  onListingClick,
  highlightedId,
}: MapViewProps) {
  const mapRef = useRef<HTMLDivElement>(null)
  const mapInstanceRef = useRef<any>(null)
  const markersRef = useRef<any[]>([])

  useEffect(() => {
    if (typeof window === 'undefined' || !mapRef.current) return
    if (mapInstanceRef.current) return // already initialized

    // Dynamic import to avoid SSR issues with Leaflet
    Promise.all([
      import('leaflet'),
      import('leaflet/dist/leaflet.css'),
    ]).then(([L]) => {
      // Fix default icon paths broken by webpack
      delete (L.default.Icon.Default.prototype as any)._getIconUrl
      L.default.Icon.Default.mergeOptions({
        iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
        iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
        shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
      })

      const map = L.default.map(mapRef.current!, {
        center,
        zoom,
        zoomControl: true,
      })

      // Base tile layer - OpenStreetMap
      L.default.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
        maxZoom: 19,
      }).addTo(map)

      // SIRI WMS overlay (Costa Rica cadastre)
      if (showSiriOverlay) {
        L.default.tileLayer.wms('/api/wms', {
          layers: 'CATASTRO_PARCELAS',
          format: 'image/png',
          transparent: true,
          opacity: 0.5,
          version: '1.1.1',
          attribution: 'Catastro © SIRI Costa Rica',
        } as any).addTo(map)
      }

      mapInstanceRef.current = map
    })

    return () => {
      mapInstanceRef.current?.remove()
      mapInstanceRef.current = null
    }
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  // Update markers when listings change
  useEffect(() => {
    const map = mapInstanceRef.current
    if (!map) return

    import('leaflet').then((L) => {
      // Clear old markers
      markersRef.current.forEach(m => m.remove())
      markersRef.current = []

      listings.forEach(listing => {
        if (!listing.lat || !listing.lng) return

        const isHighlighted = listing.id === highlightedId

        const icon = L.default.divIcon({
          className: '',
          html: `<div class="map-pin ${isHighlighted ? 'map-pin--active' : ''}" title="${listing.title_en ?? listing.title}">
            <span>$${listing.price_usd ? (listing.price_usd / 1000).toFixed(0) + 'k' : '?'}</span>
          </div>`,
          iconSize: [60, 28],
          iconAnchor: [30, 28],
        })

        const marker = L.default
          .marker([listing.lat, listing.lng], { icon })
          .addTo(map)

        marker.on('click', () => {
          onListingClick?.(listing)
        })

        markersRef.current.push(marker)
      })
    })
  }, [listings, highlightedId, onListingClick])

  return (
    <>
      <style>{`
        .map-pin {
          background: #1a6b3c;
          color: white;
          border-radius: 9999px;
          padding: 4px 10px;
          font-size: 12px;
          font-weight: 600;
          white-space: nowrap;
          box-shadow: 0 2px 6px rgba(0,0,0,0.3);
          cursor: pointer;
          transition: background 0.15s;
        }
        .map-pin--active {
          background: #d97706;
        }
        .map-pin:hover {
          background: #15803d;
        }
      `}</style>
      <div ref={mapRef} className="map-container w-full rounded-xl" />
    </>
  )
}
