'use client'

/**
 * HeroImage — client component so onError (fallback to Unsplash)
 * can be used without violating React Server Component rules.
 *
 * Drop your aerial Ojochal/Dominical photo at:
 *   casafinder/public/images/hero-ojochal.jpg
 * The component will use it automatically; Unsplash is the fallback.
 */
export function HeroImage() {
  return (
    <img
      src="/images/hero-ojochal.jpg"
      alt="Aerial view of the Southern Pacific coast of Costa Rica — jungle mountains, river, and Pacific waves"
      className="absolute inset-0 w-full h-full object-cover object-center"
      loading="eager"
      onError={(e) => {
        ;(e.currentTarget as HTMLImageElement).src =
          'https://images.unsplash.com/photo-1501854140801-50d01698950b?auto=format&fit=crop&w=2000&q=80'
      }}
    />
  )
}
