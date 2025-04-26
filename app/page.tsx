"use client"

import { MapPin, CalendarIcon, Search } from "lucide-react"
import Link from "next/link"
import Navigation from "@/components/navigation"
import SearchComponent from "@/components/search-component"
import Footer from "@/components/footer"

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navigation />

      <main className="flex-1 pt-16">
        {/* Hero Section */}
        <section className="relative bg-gradient-to-b from-gray-900 to-gray-800 text-white py-20">
          <div className="container mx-auto px-4">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="space-y-6">
                <h1 className="text-5xl font-bold leading-tight">
                  Find and Reserve Parking Spots with Ease
                </h1>
                <p className="text-xl text-gray-300">
                  No more running around looking for a parking spot. With APLMS, there is always a spot available.
                </p>
              </div>
              <SearchComponent />
            </div>
          </div>
        </section>

        {/* How It Works Section */}
        <section id="how-it-works" className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold mb-4">How It Works</h2>
              <p className="text-gray-600 text-lg">
                Finding and reserving a parking spot has never been easier
              </p>
            </div>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="bg-gray-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                  <MapPin className="h-8 w-8 text-gray-900" />
                </div>
                <h3 className="text-xl font-bold mb-2">1. Enter your destination</h3>
                <p className="text-gray-600">
                  Search for parking spots near your destination by entering an address or location.
                </p>
              </div>
              <div className="text-center">
                <div className="bg-gray-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                  <CalendarIcon className="h-8 w-8 text-gray-900" />
                </div>
                <h3 className="text-xl font-bold mb-2">2. Pick date and time</h3>
                <p className="text-gray-600">
                  Select when you'll arrive and how long you'll need the parking spot.
                </p>
              </div>
              <div className="text-center">
                <div className="bg-gray-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Search className="h-8 w-8 text-gray-900" />
                </div>
                <h3 className="text-xl font-bold mb-2">3. Pick a spot</h3>
                <p className="text-gray-600">
                  Choose from available parking spots and reserve instantly with secure payment.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="py-20 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold mb-4">Features</h2>
              <p className="text-gray-600 text-lg">
                Everything you need for hassle-free parking
              </p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                {
                  icon: <Search className="h-6 w-6" />,
                  title: "Easy Search",
                  description: "Find parking spots near your destination with our intuitive search interface."
                },
                {
                  icon: <MapPin className="h-6 w-6" />,
                  title: "Location Tracking",
                  description: "Get directions to your parking spot with integrated maps."
                },
                {
                  icon: <CalendarIcon className="h-6 w-6" />,
                  title: "Advance Booking",
                  description: "Reserve parking spots days, weeks, or even months in advance."
                },
                {
                  icon: <Search className="h-6 w-6" />,
                  title: "Flexible Duration",
                  description: "Book parking for as little as an hour or as long as you need."
                },
                {
                  icon: <MapPin className="h-6 w-6" />,
                  title: "Secure Payments",
                  description: "Pay securely online with multiple payment options."
                },
                {
                  icon: <Search className="h-6 w-6" />,
                  title: "Guaranteed Spots",
                  description: "Never worry about finding parking again with our guaranteed spot system."
                }
              ].map((feature, index) => (
                <div key={index} className="bg-white p-6 rounded-lg shadow-sm">
                  <div className="bg-gray-100 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                  <p className="text-gray-600">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-black text-white text-center">
          <div className="container mx-auto px-4">
            <h2 className="text-4xl font-bold mb-4">THERE IS ALWAYS A SPOT AVAILABLE</h2>
            <p className="text-xl text-gray-300 mb-8">
              No more running around looking for a parking spot
            </p>
            <Link
              href="#search"
              className="inline-flex items-center justify-center px-6 py-3 text-base font-medium text-black bg-white rounded-md hover:bg-gray-100"
            >
              Find Parking Now
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
} 