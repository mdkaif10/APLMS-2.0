import React from 'react'
import SidebarLayout from './_components/sidebar-layout'

function DashboardLayout({
    children
}: {
    children: React.ReactNode
}) {
  return (
    <SidebarLayout>
      <div className="p-6">
        {children}
      </div>
    </SidebarLayout>
  )
}

export default DashboardLayout