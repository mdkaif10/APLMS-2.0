import { Menu } from 'lucide-react'
import { useState } from 'react'
import Link from 'next/link'

export function Sidebar() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      {/* Mobile Header */}
      <div className="lg:hidden fixed top-0 left-0 right-0 z-50 bg-blue-500 h-12 p-2 text-white flex items-center">
        <Menu onClick={() => setIsOpen(!isOpen)} className="cursor-pointer" />
        <h1 className="text-2xl pl-4">Dashboard</h1>
      </div>

      {/* Mobile Sidebar */}
      <div className={`lg:hidden fixed inset-0 z-40 ${isOpen ? 'block' : 'hidden'}`}>
        <div className="fixed inset-0 bg-black bg-opacity-50" onClick={() => setIsOpen(false)} />
        <div className="fixed inset-y-0 left-0 w-64 bg-white shadow-lg">
          <div className="p-4">
            <nav className="space-y-2">
              <Link href="/dashboard" className="block p-2 hover:bg-gray-100 rounded">
                Overview
              </Link>
              <Link href="/dashboard/students" className="block p-2 hover:bg-gray-100 rounded">
                Students
              </Link>
              <Link href="/dashboard/teachers" className="block p-2 hover:bg-gray-100 rounded">
                Teachers
              </Link>
              <Link href="/dashboard/courses" className="block p-2 hover:bg-gray-100 rounded">
                Courses
              </Link>
            </nav>
          </div>
        </div>
      </div>

      {/* Desktop Sidebar */}
      <div className="hidden lg:block w-64 min-h-screen bg-white shadow-lg">
        <div className="p-4">
          <h1 className="text-2xl font-bold mb-6">Dashboard</h1>
          <nav className="space-y-2">
            <Link href="/dashboard" className="block p-2 hover:bg-gray-100 rounded">
              Overview
            </Link>
            <Link href="/dashboard/students" className="block p-2 hover:bg-gray-100 rounded">
              Students
            </Link>
            <Link href="/dashboard/teachers" className="block p-2 hover:bg-gray-100 rounded">
              Teachers
            </Link>
            <Link href="/dashboard/courses" className="block p-2 hover:bg-gray-100 rounded">
              Courses
            </Link>
          </nav>
        </div>
      </div>
    </>
  )
} 