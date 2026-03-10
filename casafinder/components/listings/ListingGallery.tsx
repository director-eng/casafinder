'use client'

import { useState } from 'react'

interface Image {
  url: string
  alt_text?: string | null
}

interface ListingGalleryProps {
  images: Image[]
  title: string
}

export function ListingGallery({ images, title }: ListingGalleryProps) {
  const [activeIdx, setActiveIdx] = useState(0)
  const [lightboxOpen, setLightboxOpen] = useState(false)

  if (!images || images.length === 0) {
    return (
      <div className="aspect-video bg-gray-100 rounded-xl flex items-center justify-center">
        <span className="text-gray-400">No photos available</span>
      </div>
    )
  }

  return (
    <>
      {/* Main gallery */}
      <div className="space-y-2">
        {/* Hero image */}
        <button
          onClick={() => setLightboxOpen(true)}
          className="relative w-full aspect-video rounded-xl overflow-hidden bg-gray-100 cursor-zoom-in"
        >
          <img
            src={images[activeIdx].url}
            alt={images[activeIdx].alt_text ?? title}
            className="w-full h-full object-cover"
          />
          <span className="absolute bottom-3 right-3 bg-black/50 text-white text-xs px-2 py-1 rounded">
            {activeIdx + 1} / {images.length}
          </span>
        </button>

        {/* Thumbnails */}
        {images.length > 1 && (
          <div className="flex gap-2 overflow-x-auto pb-1">
            {images.map((img, i) => (
              <button
                key={i}
                onClick={() => setActiveIdx(i)}
                className={`flex-shrink-0 w-20 h-14 rounded-lg overflow-hidden border-2 transition-colors ${
                  i === activeIdx ? 'border-[#0F5AE5]' : 'border-transparent'
                }`}
              >
                <img
                  src={img.url}
                  alt={img.alt_text ?? `Photo ${i + 1}`}
                  className="w-full h-full object-cover"
                />
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Lightbox */}
      {lightboxOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
          onClick={() => setLightboxOpen(false)}
        >
          <button
            onClick={() => setLightboxOpen(false)}
            className="absolute top-4 right-4 text-white/70 hover:text-white p-2"
          >
            <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          {/* Prev */}
          {activeIdx > 0 && (
            <button
              onClick={(e) => { e.stopPropagation(); setActiveIdx(activeIdx - 1) }}
              className="absolute left-4 text-white/70 hover:text-white p-2"
            >
              <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
          )}

          <img
            src={images[activeIdx].url}
            alt={images[activeIdx].alt_text ?? title}
            className="max-h-full max-w-full object-contain rounded-lg"
            onClick={(e) => e.stopPropagation()}
          />

          {/* Next */}
          {activeIdx < images.length - 1 && (
            <button
              onClick={(e) => { e.stopPropagation(); setActiveIdx(activeIdx + 1) }}
              className="absolute right-4 text-white/70 hover:text-white p-2"
            >
              <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          )}
        </div>
      )}
    </>
  )
}
