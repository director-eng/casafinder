'use client'

// Unsplash fallback — aerial Costa Rica coast (lush green mountains, Pacific)
const UNSPLASH_HERO =
  'https://images.unsplash.com/photo-1501854140801-50d01698950b?auto=format&fit=crop&w=2000&q=80'

/**
 * HeroImage — 'use client' so onError can run in the browser.
 *
 * Primary: /images/hero-ojochal.jpg (drop your Dominical/Ojochal aerial here)
 * Fallback: Unsplash aerial — shown until the local photo is in place.
 */
export function HeroImage() {
  return (
    <img
      // Start directly from Unsplash so there is no broken-image flash.
      // Once you place hero-ojochal.jpg in public/images/, change this line to:
      //   src="/images/hero-ojochal.jpg"
      src={UNSPLASH_HERO}
      alt="Aerial view of the Southern Pacific coast of Costa Rica — jungle mountains, river, and Pacific waves"
      className="absolute inset-0 w-full h-full object-cover object-center"
      loading="eager"
      onError={(e) => {
        // Belt-and-suspenders fallback if Unsplash ever fails
        ;(e.currentTarget as HTMLImageElement).src =
          'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=2000&q=80'
      }}
    />
  )
}
