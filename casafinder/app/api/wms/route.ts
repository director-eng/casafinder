/**
 * /api/wms — Server-side proxy to SIRI (Costa Rica national cadastre) WMS
 *
 * Leaflet's tileLayer.wms() makes tile requests to this endpoint, which
 * forwards them to geos.siri.go.cr to avoid browser CORS restrictions.
 *
 * Usage in Leaflet:
 *   L.tileLayer.wms('/api/wms', { layers: 'SIRI:catastro', ... })
 */

const SIRI_WMS = 'https://geos.siri.go.cr/Geoservicios/wms'

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url)

  // Forward all query parameters (SERVICE, REQUEST, BBOX, WIDTH, HEIGHT, LAYERS, etc.)
  const upstream = `${SIRI_WMS}?${searchParams.toString()}`

  try {
    const res = await fetch(upstream, {
      headers: {
        'User-Agent': 'CasaFinder/1.0 (casafinder.co)',
      },
      // WMS tiles don't need to be cached long — 30 min is plenty
      next: { revalidate: 1800 },
    })

    if (!res.ok) {
      return new Response(`WMS upstream error: ${res.status}`, { status: res.status })
    }

    const buffer = await res.arrayBuffer()
    const contentType = res.headers.get('content-type') ?? 'image/png'

    return new Response(buffer, {
      status: 200,
      headers: {
        'Content-Type': contentType,
        'Cache-Control': 'public, max-age=1800',
        'Access-Control-Allow-Origin': '*',
      },
    })
  } catch (err) {
    console.error('[api/wms] proxy error:', err)
    return new Response('WMS proxy error', { status: 502 })
  }
}
