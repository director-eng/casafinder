'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import { useCallback } from 'react'

export function ListingFilters() {
  const router = useRouter()
  const searchParams = useSearchParams()

  const updateParam = useCallback(
    (key: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString())
      if (value) {
        params.set(key, value)
      } else {
        params.delete(key)
      }
      params.delete('page')
      router.push(`/search?${params.toString()}`)
    },
    [router, searchParams]
  )

  const clearAll = () => router.push('/search')

  const current = {
    type: searchParams.get('type') ?? '',
    propertyType: searchParams.get('propertyType') ?? '',
    priceMin: searchParams.get('priceMin') ?? '',
    priceMax: searchParams.get('priceMax') ?? '',
    bedroomsMin: searchParams.get('bedroomsMin') ?? '',
    bathroomsMin: searchParams.get('bathroomsMin') ?? '',
    features: searchParams.getAll('features'),
    district: searchParams.get('district') ?? '',
  }

  const hasFilters = Object.values(current).some(v => (Array.isArray(v) ? v.length > 0 : v !== ''))

  return (
    <aside className="w-full md:w-64 flex-shrink-0 space-y-5">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-[15px] font-bold text-[#1F2937]">Filters</h2>
        {hasFilters && (
          <button onClick={clearAll} className="text-[13px] text-[#0F5AE5] hover:underline font-medium">
            Clear all
          </button>
        )}
      </div>

      {/* Location */}
      <fieldset className="border-b border-[#F0F2F5] pb-5">
        <legend className="text-[13px] font-semibold text-[#374151] mb-2.5">Location</legend>
        <div className="space-y-1.5">
          {[
            { value: '', label: 'All Areas' },
            { value: 'Ojochal', label: 'Ojochal' },
            { value: 'Uvita', label: 'Uvita' },
            { value: 'Dominical', label: 'Dominical' },
            { value: 'Bahia Ballena', label: 'Bahía Ballena' },
            { value: 'Tres Rios', label: 'Tres Ríos' },
          ].map(({ value, label }) => (
            <label key={label} className="flex items-center gap-2.5 cursor-pointer group">
              <input
                type="radio"
                name="district"
                value={value}
                checked={current.district === value}
                onChange={() => updateParam('district', value)}
                className="text-[#0F5AE5] focus:ring-[#0F5AE5]"
              />
              <span className="text-[13px] text-[#5B6472] group-hover:text-[#1F2937]">{label}</span>
            </label>
          ))}
        </div>
      </fieldset>

      {/* Listing type */}
      <fieldset className="border-b border-[#F0F2F5] pb-5">
        <legend className="text-[13px] font-semibold text-[#374151] mb-2.5">Listing Type</legend>
        <div className="space-y-1.5">
          {[
            { value: '', label: 'All Types' },
            { value: 'sale', label: 'For Sale' },
            { value: 'rent', label: 'For Rent' },
            { value: 'rent_vacation', label: 'Vacation Rental' },
          ].map(({ value, label }) => (
            <label key={value} className="flex items-center gap-2.5 cursor-pointer group">
              <input
                type="radio"
                name="type"
                value={value}
                checked={current.type === value}
                onChange={() => updateParam('type', value)}
                className="text-[#0F5AE5] focus:ring-[#0F5AE5]"
              />
              <span className="text-[13px] text-[#5B6472] group-hover:text-[#1F2937]">{label}</span>
            </label>
          ))}
        </div>
      </fieldset>

      {/* Property type */}
      <fieldset className="border-b border-[#F0F2F5] pb-5">
        <legend className="text-[13px] font-semibold text-[#374151] mb-2.5">Property Type</legend>
        <div className="space-y-1.5">
          {[
            { value: '', label: 'All' },
            { value: 'house', label: 'House' },
            { value: 'condo', label: 'Condo / Apartment' },
            { value: 'lot', label: 'Lot / Land' },
            { value: 'farm', label: 'Farm / Finca' },
            { value: 'commercial', label: 'Commercial' },
          ].map(({ value, label }) => (
            <label key={value} className="flex items-center gap-2.5 cursor-pointer group">
              <input
                type="radio"
                name="propertyType"
                value={value}
                checked={current.propertyType === value}
                onChange={() => updateParam('propertyType', value)}
                className="text-[#0F5AE5] focus:ring-[#0F5AE5]"
              />
              <span className="text-[13px] text-[#5B6472] group-hover:text-[#1F2937]">{label}</span>
            </label>
          ))}
        </div>
      </fieldset>

      {/* Price range */}
      <fieldset className="border-b border-[#F0F2F5] pb-5">
        <legend className="text-[13px] font-semibold text-[#374151] mb-2.5">Price (USD)</legend>
        <div className="flex gap-2">
          <input
            type="number"
            placeholder="Min"
            value={current.priceMin}
            onChange={e => updateParam('priceMin', e.target.value)}
            className="w-full px-3 py-2 text-[13px] border border-[#E5E7EB] rounded-[6px] focus:outline-none focus:ring-1 focus:ring-[#0F5AE5] placeholder:text-[#C0C4CC]"
          />
          <input
            type="number"
            placeholder="Max"
            value={current.priceMax}
            onChange={e => updateParam('priceMax', e.target.value)}
            className="w-full px-3 py-2 text-[13px] border border-[#E5E7EB] rounded-[6px] focus:outline-none focus:ring-1 focus:ring-[#0F5AE5] placeholder:text-[#C0C4CC]"
          />
        </div>
      </fieldset>

      {/* Bedrooms */}
      <fieldset className="border-b border-[#F0F2F5] pb-5">
        <legend className="text-[13px] font-semibold text-[#374151] mb-2.5">Min Bedrooms</legend>
        <div className="flex gap-1.5">
          {['', '1', '2', '3', '4+'].map((n) => (
            <button
              key={n}
              onClick={() => updateParam('bedroomsMin', n === '4+' ? '4' : n)}
              className={`flex-1 py-1.5 text-[13px] rounded-[6px] border transition-colors ${
                current.bedroomsMin === (n === '4+' ? '4' : n)
                  ? 'bg-[#0F5AE5] text-white border-[#0F5AE5]'
                  : 'border-[#E5E7EB] text-[#5B6472] hover:border-[#0F5AE5] hover:text-[#0F5AE5]'
              }`}
            >
              {n || 'Any'}
            </button>
          ))}
        </div>
      </fieldset>

      {/* Features */}
      <fieldset>
        <legend className="text-[13px] font-semibold text-[#374151] mb-2.5">Features</legend>
        <div className="space-y-1.5">
          {[
            { value: 'ocean_view', label: 'Ocean View' },
            { value: 'pool', label: 'Pool' },
            { value: 'garage', label: 'Garage' },
            { value: 'furnished', label: 'Furnished' },
          ].map(({ value, label }) => (
            <label key={value} className="flex items-center gap-2.5 cursor-pointer group">
              <input
                type="checkbox"
                value={value}
                checked={current.features.includes(value)}
                onChange={(e) => {
                  const params = new URLSearchParams(searchParams.toString())
                  const existing = params.getAll('features').filter(f => f !== value)
                  params.delete('features')
                  if (e.target.checked) existing.push(value)
                  existing.forEach(f => params.append('features', f))
                  router.push(`/search?${params.toString()}`)
                }}
                className="rounded text-[#0F5AE5] focus:ring-[#0F5AE5]"
              />
              <span className="text-[13px] text-[#5B6472] group-hover:text-[#1F2937]">{label}</span>
            </label>
          ))}
        </div>
      </fieldset>
    </aside>
  )
}
