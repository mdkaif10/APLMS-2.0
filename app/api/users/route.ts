import { NextResponse, NextRequest } from 'next/server'
import { getAuth, clerkClient } from '@clerk/nextjs/server'
import { User } from '@clerk/nextjs/server'

export const dynamic = 'force-dynamic'

export async function GET(request: NextRequest) {
  try {
    const { userId } = getAuth(request)

    if (!userId) {
      return new NextResponse('Unauthorized', { status: 401 })
    }

    const { data: users } = await clerkClient.users.getUserList({
      limit: 100,
    })

    const formattedUsers = users.map((user: User) => ({
      id: user.id,
      name: `${user.firstName} ${user.lastName}`.trim(),
      email: user.emailAddresses[0]?.emailAddress,
      role: user.publicMetadata?.role || 'user',
    }))

    return NextResponse.json(formattedUsers)
  } catch (error) {
    console.error('[USERS_GET]', error)
    return new NextResponse('Internal error', { status: 500 })
  }
} 