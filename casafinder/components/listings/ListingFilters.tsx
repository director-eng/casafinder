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
      params.delete('page') // reset page on filter change
      router.push(`/search?${params.toString()}`)
    },
    [router, searchParams]
  )

  const clearAll = () => {
    router.push('/search')
  }

  const current = {
    type: searchParams.get('type') ?? '',
    propertyType: searchParams.get('propertyType') ?? '',
    priceMin: searchParams.get('priceMin') ?? '',
    priceMax: searchParams.get('priceMax') ?? '',
    bedroomsMin: searchParams.get('bedroomsMin') ?? '',
    bathroomsMin: searchParams.get('bathroomsMin') ?? '',
    features: searchParams.getAll('features'),
  }

  const hasFilters = Object.values(current).some(v => (Array.isArray(v) ? v.length > 0 : v !== ''))

  return (
    <aside className="w-full md:w-72 flex-shrink-0 space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="font-semibold text-gray-900">Filters</h2>
        {hasFilters && (
          <button onClick={clearAll} className="text-sm text-[#0F5AE5] hover:underline">
            Clear all
          </button>
        )}
      </div>

      {/* Listing type */}
      <fieldset>
        <legend className="text-sm font-medium text-gray-700 mb-2">Listing Type</legend>
        <div className="space-y-2">
          {[
            { value: '', label: 'All' },
            { value: 'sale', label: 'For Sale' },
            { value: 'rent', label: 'For Rent' },
            { value: 'rent_vacation', label: 'Vacation Rental' },
          ].map(({ value, label }) => (
            <label key={value} className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                name="type"
                value={value}
                checked={current.type === value}
                onChange={() => updateParam('type', value)}
                className="text-[#0F5AE5] focus:ring-[#0F5AE5]"
              />
              <span className="text-sm text-gray-700">{label}</span>
            </label>
          ))}
        </div>
      </fieldset>

      {/* Property type */}
      <fieldset>
        <legend className="text-sm font-medium text-gray-700 mb-2">Property Type</legend>
        <div className="space-y-2">
          {[
            { value: '', label: 'All' },
            { value: 'house', label: 'House' },
            { value: 'condo', label: 'Condo / Apartment' },
            { value: 'lot', label: 'Lot / Land' },
            { value: 'farm', label: 'Farm / Finca' },
            { value: 'commercial', label: 'Commercial' },
          ].map(({ value, label }) => (
            <label key={value} className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                name="propertyType"
                value={value}
                checked={current.propertyType === value}
                onChange={() => updateParam('propertyType', value)}
                className="text-[#0F5AE5] focus:ring-[#0F5AE5]"
              />
              <span className="text-sm text-gray-700">{label}</span>
            </label>
          ))}
        </div>
      </fieldset>

      {/* Price range */}
      <fieldset>
        <legend className="text-sm font-medium text-gray-700 mb-2">Price (USD)</legend>
        <div className="flex gap-2">
          <input
            type="number"
            placeholder="Min"
            value={current.priceMin}
            onChange={e => updateParam('priceMin', e.target.value)}
            className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#0F5AE5]"
          />
          <input
            type="number"
            placeholder="Max"
            value={current.priceMax}
            onChange={e => updateParam('priceMax', e.target.value)}
            className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#0F5AE5]"
          />
        </div>
      </fieldset>

      {/* Bedrooms */}
      <fieldset>
        <legend className="text-sm font-medium text-gray-700 mb-2">Min Bedrooms</legend>
        <div className="flex gap-2">
          {['', '1', '2', '3', '4+'].map((n) => (
            <button
              key={n}
              onClick={() => updateParam('bedroomsMin', n === '4+' ? '4' : n)}
              className={`flex-1 py-1.5 text-sm rounded-lg border transition-colors ${
                current.bedroomsMin === (n === '4+' ? '4' : n)
                  ? 'bg-[#0F5AE5] text-white border-[#0F5AE5]'
                  : 'border-gray-300 text-gray-700 hover:border-[#0F5AE5]'
              }`}
            >
              {n || 'Any'}
            </button>
          ))}
        </div>
      </fieldset>

      {/* Features */}
      <fieldset>
        <legend className="text-sm font-medium text-gray-700 mb-2">Features</legend>
        <div className="space-y-2">
          {[
            { value: 'ocean_view', label: 'Ocean View' },
            { value: 'pool', label: 'Pool' },
            { value: 'garage', label: 'Garage' },
            { value: 'furnished', label: 'Furnished' },
          ].map(({ value, label }) => (
            <label key={value} className="flex items-center gap-2 cursor-pointer">
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
              <span className="text-sm text-gray-700">{label}</span>
            </label>
          ))}
        </div>
      </fieldset>
    </aside>
  )
}
