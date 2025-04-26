import { NextResponse, NextRequest } from 'next/server'
import { getAuth } from '@clerk/nextjs/server'
import prisma from '@/lib/prisma'

interface BookingWithUser {
  id: string
  userId: string
  date: Date
  time: string
  status: string
  user: {
    name: string
  }
}

export async function GET(request: NextRequest) {
  try {
    const { userId } = getAuth(request)

    if (!userId) {
      return new NextResponse('Unauthorized', { status: 401 })
    }

    const bookings = await prisma.booking.findMany({
      include: {
        user: {
          select: {
            name: true,
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    })

    const formattedBookings = bookings.map((booking: BookingWithUser) => ({
      id: booking.id,
      userId: booking.userId,
      userName: booking.user.name,
      date: booking.date.toISOString().split('T')[0],
      time: booking.time,
      status: booking.status,
    }))

    return NextResponse.json(formattedBookings)
  } catch (error) {
    console.error('[BOOKINGS_GET]', error)
    return new NextResponse('Internal error', { status: 500 })
  }
} 