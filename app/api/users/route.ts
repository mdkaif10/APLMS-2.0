import { NextResponse, NextRequest } from 'next/server'
import { getAuth } from '@clerk/nextjs/server'
import prisma from '@/lib/prisma'

export const dynamic = 'force-dynamic'

export async function GET(request: NextRequest) {
  try {
    const { userId } = getAuth(request)

    if (!userId) {
      return new NextResponse('Unauthorized', { status: 401 })
    }

    const users = await prisma.user.findMany({
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
      },
    })

    return NextResponse.json(users)
  } catch (error) {
    console.error('[USERS_GET]', error)
    return new NextResponse('Internal error', { status: 500 })
  }
} 