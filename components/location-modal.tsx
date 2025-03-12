"use client"

import { useState } from "react"
import { MapPin, Navigation } from "lucide-react"
import { motion } from "framer-motion"

interface LocationModalProps {
  onLocationSelect: (city: string) => void
  onClose: () => void
}

const cities = [
  { name: "Mumbai", icon: <MapPin className="h-6 w-6" /> },
  { name: "Delhi", icon: <MapPin className="h-6 w-6" /> },
  { name: "Bangalore", icon: <MapPin className="h-6 w-6" /> },
  { name: "Hyderabad", icon: <MapPin className="h-6 w-6" /> },
  { name: "Chennai", icon: <MapPin className="h-6 w-6" /> },
  { name: "Visakhapatnam", icon: <MapPin className="h-6 w-6" /> },
]

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default function LocationModal({ onLocationSelect, onClose }: LocationModalProps) {
  const [isDetecting, setIsDetecting] = useState(false)

  const detectLocation = () => {
    setIsDetecting(true)

    // Simulate geolocation API
    setTimeout(() => {
      // Default to Mumbai if geolocation fails or for demo purposes
      onLocationSelect("Mumbai")
      setIsDetecting(false)
    }, 2000)
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="bg-white rounded-lg shadow-xl max-w-md w-full p-6"
      >
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold text-teal-600">Select Your Location</h2>
          <p className="text-gray-600 mt-2">Choose your city to get started</p>
        </div>

        <button
          onClick={detectLocation}
          disabled={isDetecting}
          className="w-full flex items-center justify-center space-x-2 bg-teal-500 text-white py-3 rounded-lg mb-6 hover:bg-teal-600 transition-colors"
        >
          {isDetecting ? (
            <span>Detecting...</span>
          ) : (
            <>
              <Navigation className="h-5 w-5" />
              <span>Detect My Location</span>
            </>
          )}
        </button>

        <div className="grid grid-cols-2 gap-4">
          {cities.map((city) => (
            <motion.button
              key={city.name}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => onLocationSelect(city.name)}
              className="flex flex-col items-center justify-center p-4 border border-gray-200 rounded-lg hover:border-teal-500 hover:bg-teal-50 transition-colors"
            >
              <div className="text-teal-500 mb-2">{city.icon}</div>
              <span className="font-medium">{city.name}</span>
            </motion.button>
          ))}
        </div>
      </motion.div>
    </div>
  )
}

