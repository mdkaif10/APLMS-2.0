import Banner from '@/components/banner'
import React from 'react'

function GuestLayout({
    children
}: { children: React.ReactNode}) {
  return (
    <div className="flex flex-col min-h-screen">
        <Banner />
        <main className="flex-1 pt-16">
        {children}
        </main>
    </div>
  )
}

export default GuestLayout