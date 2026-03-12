/**
 * /api/wfs — Server-side proxy to SIRI (Costa Rica national cadastre) WFS
 *
 * Used by lib/catastro/wfs.ts to look up parcel boundaries and finca data
 * by lat/lng or finca number without hitting browser CORS restrictions.
 *
 * Usage:
 *   fetch('/api/wfs?SERVICE=WFS&REQUEST=GetFeature&...')
 */

const SIRI_WFS = 'https://geos.siri.go.cr/Geoservicios/wfs'

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url)

  const upstream = `${SIRI_WFS}?${searchParams.toString()}`

  try {
    const res = await fetch(upstream, {
      headers: {
        'User-Agent': 'CasaFinder/1.0 (casafinder.co)',
        'Accept': 'application/json',
      },
      next: { revalidate: 3600 }, // parcel data is stable — cache 1 hour
    })

    if (!res.ok) {
      return new Response(`WFS upstream error: ${res.status}`, { status: res.status })
    }

    const text = await res.text()
    const contentType = res.headers.get('content-type') ?? 'application/json'

    return new Response(text, {
      status: 200,
      headers: {
        'Content-Type': contentType,
        'Cache-Control': 'public, max-age=3600',
        'Access-Control-Allow-Origin': '*',
      },
    })
  } catch (err) {
    console.error('[api/wfs] proxy error:', err)
    return new Response('WFS proxy error', { status: 502 })
  }
}
