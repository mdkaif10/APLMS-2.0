import { NextResponse, NextRequest } from 'next/server'
import { getAuth } from '@clerk/nextjs/server'

export const dynamic = 'force-dynamic'

export async function GET(request: NextRequest) {
  try {
    const { userId } = getAuth(request)

    if (!userId) {
      return new NextResponse('Unauthorized', { status: 401 })
    }

    // TODO: Implement booking storage with a different solution
    // For now, return an empty array
    return NextResponse.json([])
  } catch (error) {
    console.error('[BOOKINGS_GET]', error)
    return new NextResponse('Internal error', { status: 500 })
  }
} 