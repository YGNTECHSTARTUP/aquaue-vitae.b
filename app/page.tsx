"use client"

import { useState, useEffect } from "react"
import LocationModal from "@/components/location-modal"
import Navbar from "@/components/navbar"
import Banner from "@/components/banner"
import Announcement from "@/components/announcement"
import { useLocationStore } from "@/lib/store"

export default function Home() {
  const { location, setLocation } = useLocationStore()
  const [showModal, setShowModal] = useState(true)

  useEffect(() => {
    // If location is already set, don't show the modal
    if (location) {
      setShowModal(false)
    }
  }, [location])

  const handleLocationSelect = (city: string) => {
    setLocation(city)
    setShowModal(false)
  }

  return (
    <main className="min-h-screen">
      {showModal && <LocationModal onLocationSelect={handleLocationSelect} onClose={() => setShowModal(false)} />}

      {!showModal && (
        <>
          <div className="bg-white shadow-sm">
            <div className="container mx-auto px-4 py-2 flex justify-between items-center">
              <div className="flex items-center space-x-2">
                <span className="text-sm text-gray-600">Your Location: </span>
                <span className="font-medium">{location}</span>
              </div>
              <div className="flex items-center space-x-6">
                <a href="tel:18001211007" className="flex items-center text-sm">
                  <span className="mr-2">📞</span>
                  7569232144
                </a>
                <a href="mailto:wecare@Aquae-vitae.co.in" className="flex items-center text-sm">
                  <span className="mr-2">✉️</span>
                  sagarkum.penki@gmail.com
                </a>
              </div>
            </div>
          </div>

          <Navbar />
          <Announcement />
          <Banner />

          <div className="container mx-auto px-4 py-12">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-teal-50 p-6 rounded-lg shadow-md text-center">
                <h3 className="text-xl font-semibold mb-4">Aquae-vitae&apos;s Alkaline With Added Minerals </h3>
                <p className="text-gray-600">Pure, safe and healthy balenced drinking water for your daily needs.</p>
                <button className="mt-4 bg-teal-500 text-white px-4 py-2 rounded hover:bg-teal-600 transition-colors">
                  Learn More
                </button>
              </div>

              <div className="bg-blue-50 p-6 rounded-lg shadow-md text-center">
                <h3 className="text-xl font-semibold mb-4">Aquae-vitae&apos;s B (Boiled) Water</h3>
                <p className="text-gray-600">Healthy & Purified Natural Water</p>
                <button className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors">
                  Learn More
                </button>
              </div>

              {/* <div className="bg-purple-50 p-6 rounded-lg shadow-md text-center">
                <h3 className="text-xl font-semibold mb-4">Carbonated Soft Drinks</h3>
                <p className="text-gray-600">Refreshing fizzy beverages for a perfect pick-me-up.</p>
                <button className="mt-4 bg-purple-500 text-white px-4 py-2 rounded hover:bg-purple-600 transition-colors">
                  Learn More
                </button>
              </div> */}
            </div>
          </div>
        </>
      )}
    </main>
  )
}

