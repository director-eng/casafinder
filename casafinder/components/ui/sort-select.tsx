'use client'

interface SortSelectProps {
  defaultValue?: string
  hiddenParams: Record<string, string>
}

export function SortSelect({ defaultValue = '', hiddenParams }: SortSelectProps) {
  return (
    <form>
      {Object.entries(hiddenParams).map(([k, v]) => (
        <input key={k} type="hidden" name={k} value={v} />
      ))}
      <select
        name="sort"
        defaultValue={defaultValue}
        onChange={e => (e.target.form as HTMLFormElement).submit()}
        className="px-3 py-2 border border-gray-300 rounded-lg text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#0F5AE5]"
      >
        <option value="">Sort: Newest</option>
        <option value="price_asc">Price: Low to High</option>
        <option value="price_desc">Price: High to Low</option>
      </select>
    </form>
  )
}
