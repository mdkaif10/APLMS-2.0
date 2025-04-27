'use client'

import { Menu } from 'lucide-react'
import React, { useState } from 'react'
import MobileSidebar from './mobile-sidebar'
import DesktopSidebar from './desktop-sidebar'

export function SidebarLayout({ children }: { children: React.ReactNode }) {
    const [open, setOpen] = useState(false)

    return (
        <div className="flex min-h-screen">
                <MobileSidebar open={open} setOpen={setOpen} />
                <DesktopSidebar />
            <div className="flex-1">
                    {children}
            </div>
        </div>
    )
}

export default SidebarLayout