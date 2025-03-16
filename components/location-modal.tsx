"use client";

import { useState } from "react";
import { MapPin, Navigation, ChevronDown, ChevronUp } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useLocationStore } from "@/lib/store";
import type { LocationDetails } from "@/lib/store";

interface LocationModalProps {
  onLocationSelect: (city: string) => void;
  onClose: () => void;
}

const cities = [
  "Bobbili",
  "Ramabhadrapuram",
  "Salur",
  "PachiPenta",
  "Parvathipuram",
  "Seethanagaram",
  "Rajam",
  "Terlam",
  "Pottangi",
  "Manapuram",
  "Gajapatinagaram",
  "Sunki_(ODISHA)"
];

async function getCityFromCoordinates(lat: number, lon: number): Promise<LocationDetails | null> {
  try {
    const res = await fetch(
      `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}`
    );
    const data = await res.json();
    if (!data.address) return null;

    console.log("Fetched location data:", data.address);
    return data.address as LocationDetails;
  } catch (error) {
    console.error("Error fetching location:", error);
    return null;
  }
}

export default function LocationModal({ onLocationSelect, onClose }: LocationModalProps) {
  const [isDetecting, setIsDetecting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showAll, setShowAll] = useState(false);
  const { setLocation } = useLocationStore();

  const detectLocation = () => {
    setIsDetecting(true);
    setError(null);

    if (!navigator.geolocation) {
      setError("Geolocation is not supported by your browser.");
      setIsDetecting(false);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;
        const locationDetails = await getCityFromCoordinates(latitude, longitude);

        if (locationDetails) {
          // Update Zustand store
          // console.log(locationDetails)
          setLocation(locationDetails);

          // Determine the city name to display
          const detectedCity =
            locationDetails.village ||
            locationDetails.town ||
            locationDetails.city ||
            locationDetails.suburb ||
            "Unknown City";

          const matchedCity = cities.find((city) =>
            detectedCity.toLowerCase().includes(city.toLowerCase())
          );

          // Trigger callback with matched or detected city
          onLocationSelect(matchedCity || detectedCity);
        } else {
          setError("Unable to detect city.");
        }

        setIsDetecting(false);
      },
      (err) => {
        setError(err.message);
        setIsDetecting(false);
      }
    );
  };

  const visibleCities = showAll ? cities : cities.slice(0, 6);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="bg-white rounded-lg shadow-xl max-w-md w-full p-6 overflow-y-auto max-h-[90vh]"
      >
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold text-teal-600">Select Your Location</h2>
          <p className="text-gray-600 mt-2">Choose your city or detect automatically</p>
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

        {error && <p className="text-red-500 text-center mb-4">{error}</p>}

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
          <AnimatePresence>
            {visibleCities.map((city) => (
              <motion.button
                key={city}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => onLocationSelect(city)}
                className="flex flex-col items-center justify-center p-4 border border-gray-200 rounded-lg hover:border-teal-500 hover:bg-teal-50 transition-colors"
              >
                <MapPin className="h-6 w-6 text-teal-500 mb-1" />
                <span className="font-medium text-sm text-center">{city}</span>
              </motion.button>
            ))}
          </AnimatePresence>
        </div>

        <div className="mt-4 flex justify-center">
          <button
            onClick={() => setShowAll((prev) => !prev)}
            className="flex items-center space-x-1 text-sm text-teal-600 hover:underline"
          >
            <span>{showAll ? "Show Less" : "Show More"}</span>
            {showAll ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
          </button>
        </div>

        <div className="mt-6 flex justify-center">
          <button
            onClick={onClose}
            className="text-sm text-gray-500 hover:text-gray-700 hover:underline"
          >
            Cancel
          </button>
        </div>
      </motion.div>
    </div>
  );
}
