import Link from 'next/link'

function Footer() {
  return (
    <footer className="bg-white border-t py-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-600 text-sm">
            © 2025 APLMS. All rights reserved.
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <Link href="/terms" className="text-gray-600 hover:text-gray-900 text-sm">Terms</Link>
            <Link href="/privacy" className="text-gray-600 hover:text-gray-900 text-sm">Privacy</Link>
            <Link href="/about" className="text-gray-600 hover:text-gray-900 text-sm">Contact</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer