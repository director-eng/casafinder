'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'

interface ListingSubmitFormProps {
  agentId: string
}

export function ListingSubmitForm({ agentId }: ListingSubmitFormProps) {
  const router = useRouter()
  const [status, setStatus] = useState<'idle' | 'saving' | 'error'>('idle')
  const [errorMsg, setErrorMsg] = useState('')

  const [form, setForm] = useState({
    title: '',
    title_en: '',
    description: '',
    listing_type: 'sale' as 'sale' | 'rent' | 'rent_vacation',
    property_type: 'house' as 'house' | 'condo' | 'lot' | 'farm' | 'commercial' | 'other',
    price_usd: '',
    bedrooms: '',
    bathrooms: '',
    area_lot_m2: '',
    area_construction_m2: '',
    lat: '',
    lng: '',
    province: 'Puntarenas',
    district: 'Osa',
    pool: false,
    garage: false,
    furnished: false,
    finca_number: '',
    year_built: '',
  })

  const set = (key: string, value: any) => setForm(f => ({ ...f, [key]: value }))

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('saving')
    setErrorMsg('')

    const body = {
      title: form.title,
      title_en: form.title_en || undefined,
      description: form.description || undefined,
      listing_type: form.listing_type,
      property_type: form.property_type,
      price_usd: form.price_usd ? parseFloat(form.price_usd) : undefined,
      bedrooms: form.bedrooms ? parseInt(form.bedrooms) : undefined,
      bathrooms: form.bathrooms ? parseFloat(form.bathrooms) : undefined,
      area_lot_m2: form.area_lot_m2 ? parseFloat(form.area_lot_m2) : undefined,
      area_construction_m2: form.area_construction_m2 ? parseFloat(form.area_construction_m2) : undefined,
      lat: form.lat ? parseFloat(form.lat) : undefined,
      lng: form.lng ? parseFloat(form.lng) : undefined,
      province: form.province,
      district: form.district,
      pool: form.pool,
      garage: form.garage,
      furnished: form.furnished,
      finca_number: form.finca_number || undefined,
      year_built: form.year_built ? parseInt(form.year_built) : undefined,
    }

    try {
      const res = await fetch('/api/listings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      })

      if (!res.ok) {
        const err = await res.json()
        throw new Error(JSON.stringify(err.error))
      }

      const listing = await res.json()
      router.push(`/dashboard?submitted=${listing.slug}`)
    } catch (err) {
      setStatus('error')
      setErrorMsg(err instanceof Error ? err.message : 'Something went wrong')
    }
  }

  const inputClass = 'w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#0F5AE5]'
  const labelClass = 'block text-sm font-medium text-gray-700 mb-1'

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-xl border border-gray-200 p-8 space-y-6">
      {/* Basic info */}
      <section>
        <h2 className="text-lg font-semibold text-gray-900 mb-4 pb-2 border-b border-gray-100">Basic Information</h2>
        <div className="space-y-4">
          <div>
            <label className={labelClass}>Title (Spanish) *</label>
            <input required value={form.title} onChange={e => set('title', e.target.value)} className={inputClass} placeholder="Casa con vista al mar en Ojochal" />
          </div>
          <div>
            <label className={labelClass}>Title (English)</label>
            <input value={form.title_en} onChange={e => set('title_en', e.target.value)} className={inputClass} placeholder="Ocean view house in Ojochal" />
          </div>
          <div>
            <label className={labelClass}>Description</label>
            <textarea rows={5} value={form.description} onChange={e => set('description', e.target.value)} className={`${inputClass} resize-none`} placeholder="Describe the property..." />
          </div>
        </div>
      </section>

      {/* Type + price */}
      <section>
        <h2 className="text-lg font-semibold text-gray-900 mb-4 pb-2 border-b border-gray-100">Listing Type & Price</h2>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className={labelClass}>Listing Type *</label>
            <select required value={form.listing_type} onChange={e => set('listing_type', e.target.value)} className={inputClass}>
              <option value="sale">For Sale</option>
              <option value="rent">For Rent</option>
              <option value="rent_vacation">Vacation Rental</option>
            </select>
          </div>
          <div>
            <label className={labelClass}>Property Type *</label>
            <select required value={form.property_type} onChange={e => set('property_type', e.target.value)} className={inputClass}>
              <option value="house">House</option>
              <option value="condo">Condo / Apartment</option>
              <option value="lot">Lot / Land</option>
              <option value="farm">Farm / Finca</option>
              <option value="commercial">Commercial</option>
              <option value="other">Other</option>
            </select>
          </div>
          <div>
            <label className={labelClass}>Price (USD)</label>
            <input type="number" value={form.price_usd} onChange={e => set('price_usd', e.target.value)} className={inputClass} placeholder="350000" />
          </div>
          <div>
            <label className={labelClass}>Year Built</label>
            <input type="number" value={form.year_built} onChange={e => set('year_built', e.target.value)} className={inputClass} placeholder="2018" />
          </div>
        </div>
      </section>

      {/* Specs */}
      <section>
        <h2 className="text-lg font-semibold text-gray-900 mb-4 pb-2 border-b border-gray-100">Property Specs</h2>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className={labelClass}>Bedrooms</label>
            <input type="number" min="0" value={form.bedrooms} onChange={e => set('bedrooms', e.target.value)} className={inputClass} placeholder="3" />
          </div>
          <div>
            <label className={labelClass}>Bathrooms</label>
            <input type="number" min="0" step="0.5" value={form.bathrooms} onChange={e => set('bathrooms', e.target.value)} className={inputClass} placeholder="2.5" />
          </div>
          <div>
            <label className={labelClass}>Lot Area (m²)</label>
            <input type="number" min="0" value={form.area_lot_m2} onChange={e => set('area_lot_m2', e.target.value)} className={inputClass} placeholder="1200" />
          </div>
          <div>
            <label className={labelClass}>Built Area (m²)</label>
            <input type="number" min="0" value={form.area_construction_m2} onChange={e => set('area_construction_m2', e.target.value)} className={inputClass} placeholder="280" />
          </div>
        </div>

        {/* Features */}
        <div className="flex gap-6 mt-4">
          {[
            { key: 'pool', label: 'Pool' },
            { key: 'garage', label: 'Garage' },
            { key: 'furnished', label: 'Furnished' },
          ].map(({ key, label }) => (
            <label key={key} className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={(form as any)[key]}
                onChange={e => set(key, e.target.checked)}
                className="rounded text-[#0F5AE5]"
              />
              <span className="text-sm text-gray-700">{label}</span>
            </label>
          ))}
        </div>
      </section>

      {/* Location */}
      <section>
        <h2 className="text-lg font-semibold text-gray-900 mb-4 pb-2 border-b border-gray-100">Location</h2>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className={labelClass}>Province</label>
            <input value={form.province} onChange={e => set('province', e.target.value)} className={inputClass} placeholder="Puntarenas" />
          </div>
          <div>
            <label className={labelClass}>District / Cantón</label>
            <input value={form.district} onChange={e => set('district', e.target.value)} className={inputClass} placeholder="Osa" />
          </div>
          <div>
            <label className={labelClass}>Latitude</label>
            <input type="number" step="any" value={form.lat} onChange={e => set('lat', e.target.value)} className={inputClass} placeholder="9.0885" />
          </div>
          <div>
            <label className={labelClass}>Longitude</label>
            <input type="number" step="any" value={form.lng} onChange={e => set('lng', e.target.value)} className={inputClass} placeholder="-83.6499" />
          </div>
          <div>
            <label className={labelClass}>Finca Number</label>
            <input value={form.finca_number} onChange={e => set('finca_number', e.target.value)} className={inputClass} placeholder="123456-000" />
          </div>
        </div>
      </section>

      {/* Error */}
      {status === 'error' && (
        <div className="p-4 bg-red-50 border border-red-200 rounded-lg text-sm text-red-700">
          {errorMsg || 'Failed to submit listing. Please check all required fields.'}
        </div>
      )}

      {/* Submit */}
      <div className="flex gap-4 pt-2">
        <Button type="submit" variant="primary" size="lg" loading={status === 'saving'}>
          Submit Listing
        </Button>
        <a href="/dashboard" className="px-6 py-3 text-sm font-medium text-gray-700 hover:text-gray-900">
          Cancel
        </a>
      </div>
    </form>
  )
}
