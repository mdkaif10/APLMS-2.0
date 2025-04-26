import { cn } from '@/lib/utils'
import Link from 'next/link'
import React from 'react'
import ActiveLink from './active-link'
import { UserButton } from '@clerk/nextjs'
import { Mail, Users } from 'lucide-react'

export interface MenuItem {
    id: string,
    href: string,
    title: string
}

function Sidebar() {


  return (
    <div className="flex flex-col z-10 w-[256px] bg-gray-800 text-white 
        h-full overflow-auto p-4">
        <h1 className='text-2xl pl-4'>
            <Link href="/dashboard">Dashboard</Link>
        </h1>
        <div className="flex flex-col justify-between h-full">
          <ul className='w-full pt-8 space-y-2 flex flex-col'>
            <li>
              <ActiveLink href='/dashboard/locations/tileview'>
                Locations
              </ActiveLink>
            </li>
            <li>
              <ActiveLink href='/dashboard/bookings'>
                Bookings
              </ActiveLink>
            </li>
            <li>
              <ActiveLink href='/dashboard/revenue'>
                Revenue
              </ActiveLink>
            </li>
            <li>
              <ActiveLink href='/dashboard/messages'>
                <div className="flex items-center">
                  <Mail className="h-4 w-4 mr-2" />
                  Messages
                </div>
              </ActiveLink>
            </li>
            <li>
              <ActiveLink href='/dashboard/users'>
                <div className="flex items-center">
                  <Users className="h-4 w-4 mr-2" />
                  Users
                </div>
              </ActiveLink>
            </li>
          </ul>

          <div className="pl-4 text-blue-600">
            <UserButton />
          </div>
        </div>
    </div>
  )
}

export default Sidebar