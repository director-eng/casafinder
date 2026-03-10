import { NextResponse } from 'next/server'
import { getParcelByCoords, getParcelByFinca } from '@/lib/catastro/wfs'

// GET /api/catastro?lat=9.09&lng=-83.65
// GET /api/catastro?finca=123456
export async function GET(req: Request) {
  const { searchParams } = new URL(req.url)
  const finca = searchParams.get('finca')
  const lat = searchParams.get('lat')
  const lng = searchParams.get('lng')

  try {
    let parcel = null

    if (finca) {
      parcel = await getParcelByFinca(finca)
    } else if (lat && lng) {
      parcel = await getParcelByCoords(parseFloat(lat), parseFloat(lng))
    } else {
      return NextResponse.json(
        { error: 'Provide either finca or lat+lng query params' },
        { status: 400 }
      )
    }

    if (!parcel) {
      return NextResponse.json({ parcel: null, message: 'No parcel found at this location' })
    }

    return NextResponse.json({ parcel })
  } catch (err) {
    console.error('[catastro/GET]', err)
    return NextResponse.json({ error: 'Failed to fetch cadastre data' }, { status: 500 })
  }
}
