'use client'

import Footer from "@/components/footer"
import SearchComponent from "@/components/search-component"
import { Button } from "@/components/ui/button"
import Image from "next/image"

export default function GuestPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <main className="sm:container flex-1">
        {/* Search form */}
        <SearchComponent />

        <h3 className="text-2xl sm:text-4xl font-bold text-slate-500 pt-16 pb-16 text-center uppercase tracking-wide">
          There is always a spot available.
        </h3>

        <section className="hidden lg:block pt-16 pb-32">
          <div className="grid grid-cols-3 place-items-center">
            <div className="flex flex-col items-center">
              <div className="flex flex-col bg-blue-500 text-white relative justify-center items-center rounded-full w-12 h-12">
                <p className="text-2xl font-bold
                after:content-[''] after:absolute after:-left-2 after:-top-2 after:w-16 after:h-16 after:-z-[1]
                after:rounded-full after:bg-gray-100
                ">1</p>
              </div>
              <p className="pt-2 text-slate-500 text-lg tracking-wide">
                Enter your destination
              </p>
            </div>

            <div className="flex flex-col items-center">
              <div className="flex flex-col bg-blue-500 text-white relative justify-center items-center rounded-full w-12 h-12">
                <p className="text-2xl font-bold
                after:content-[''] after:absolute after:-left-2 after:-top-2 after:w-16 after:h-16 after:-z-[1]
                after:rounded-full after:bg-gray-100
                ">2</p>
              </div>
              <p className="pt-2 text-slate-500 text-lg tracking-wide">
                Pick date and time
              </p>
            </div>

            <div className="flex flex-col items-center">
              <div className="flex flex-col bg-blue-500 text-white relative justify-center items-center rounded-full w-12 h-12">
                <p className="text-2xl font-bold
                after:content-[''] after:absolute after:-left-2 after:-top-2 after:w-16 after:h-16 after:-z-[1]
                after:rounded-full after:bg-gray-100
                ">3</p>
              </div>
              <p className="pt-2 text-slate-500 text-lg tracking-wide">
                Book and pay
              </p>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
} 