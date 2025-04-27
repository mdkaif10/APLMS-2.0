import { NextResponse, NextRequest } from 'next/server'
import { getAuth } from '@clerk/nextjs/server'
import { connectToDB } from '@/lib/db'
import { BookingModel } from '@/schemas/booking'

export const dynamic = 'force-dynamic'

export async function GET(request: NextRequest) {
  try {
    const { userId } = getAuth(request)

    if (!userId) {
      return new NextResponse('Unauthorized', { status: 401 })
    }

    await connectToDB()

    // Fetch all bookings
    const bookings = await BookingModel.find().lean()

    // Format bookings for the dashboard
    const formatted = bookings.map(b => ({
      id: (b as any)._id.toString(),
      userId: b.userid,
      userName: b.phone || b.plate || '', // Use phone or plate as a fallback for userName
      date: b.bookingdate ? new Date(b.bookingdate).toLocaleDateString() : '',
      time: b.starttime ? new Date(b.starttime).toLocaleTimeString() : '',
      status: b.status,
    }))

    return NextResponse.json(formatted)
  } catch (error) {
    console.error('[BOOKINGS_GET]', error)
    return new NextResponse('Internal error', { status: 500 })
  }
} 