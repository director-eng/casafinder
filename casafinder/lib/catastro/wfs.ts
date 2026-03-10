// =============================================================================
// CasaFinder — SIRI WFS Client
// Fetches parcel data from Costa Rica's national cadastre
// =============================================================================

const SIRI_WFS = 'https://geos.siri.go.cr/Geoservicios/wfs'
const SIRI_WMS = 'https://geos.siri.go.cr/Geoservicios/wms'

export interface ParcelData {
  catastral_id?: string
  finca_number?: string
  area_m2?: number
  province?: string
  canton?: string
  district?: string
  geometry?: GeoJSON.Geometry
  raw?: Record<string, unknown>
}

/**
 * Get parcel data by lat/lng coordinates using WFS GetFeature
 */
export async function getParcelByCoords(
  lat: number,
  lng: number,
  bufferDegrees = 0.0001
): Promise<ParcelData | null> {
  const bbox = [
    lng - bufferDegrees,
    lat - bufferDegrees,
    lng + bufferDegrees,
    lat + bufferDegrees,
  ].join(',')

  const params = new URLSearchParams({
    SERVICE: 'WFS',
    REQUEST: 'GetFeature',
    VERSION: '2.0.0',
    TYPENAMES: 'SIRI:catastro',
    BBOX: `${bbox},EPSG:4326`,
    OUTPUTFORMAT: 'application/json',
    COUNT: '1',
  })

  try {
    // Use our Next.js proxy route to avoid CORS
    const res = await fetch(`/api/wfs?${params}`, {
      next: { revalidate: 3600 }, // cache 1 hour
    })
    if (!res.ok) return null

    const geojson = await res.json()
    const feature = geojson?.features?.[0]
    if (!feature) return null

    return normalizeParcel(feature)
  } catch (err) {
    console.error('[catastro] WFS error:', err)
    return null
  }
}

/**
 * Get parcel data by finca number
 */
export async function getParcelByFinca(fincaNumber: string): Promise<ParcelData | null> {
  const params = new URLSearchParams({
    SERVICE: 'WFS',
    REQUEST: 'GetFeature',
    VERSION: '2.0.0',
    TYPENAMES: 'SIRI:catastro',
    CQL_FILTER: `num_finca='${fincaNumber}'`,
    OUTPUTFORMAT: 'application/json',
    COUNT: '1',
  })

  try {
    const res = await fetch(`/api/wfs?${params}`, {
      next: { revalidate: 3600 },
    })
    if (!res.ok) return null

    const geojson = await res.json()
    const feature = geojson?.features?.[0]
    if (!feature) return null

    return normalizeParcel(feature)
  } catch (err) {
    console.error('[catastro] WFS finca error:', err)
    return null
  }
}

function normalizeParcel(feature: GeoJSON.Feature): ParcelData {
  const props = feature.properties || {}
  return {
    catastral_id: props.id_catastral || props.cod_catastral,
    finca_number: props.num_finca || props.numero_finca,
    area_m2: props.area_m2 || props.area,
    province: props.provincia || props.nom_provincia,
    canton: props.canton || props.nom_canton,
    district: props.distrito || props.nom_distrito,
    geometry: feature.geometry,
    raw: props,
  }
}

/**
 * Get WMS tile URL for parcel overlay on Leaflet map
 */
export function getSiriWmsUrl(): string {
  return '/api/wms'
}

export const SIRI_WMS_PARAMS = {
  layers: 'SIRI:catastro',
  format: 'image/png',
  transparent: true,
  version: '1.3.0',
  crs: 'EPSG:4326',
}
