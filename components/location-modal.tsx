"use client";

import { useState } from "react";
import { MapPin, Navigation } from "lucide-react";
import { motion } from "framer-motion";

interface LocationModalProps {
  onLocationSelect: (city: string) => void;
  onClose: () => void;
}

const cities = [
  "Bobbili",
  "Ramabhadrapuram",
  "Salur",
  "Badangi",
  "Mettavalasa",
  "Busayavalasa",
];

// Function to get city from latitude & longitude using OpenStreetMap API
async function getCityFromCoordinates(lat: number, lon: number) {
  try {
    const res = await fetch(
      `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}`
    );
    const data = await res.json();
    return data.address?.village || data.address?.town || data.address?.city;
  } catch (error) {
    console.error("Error fetching location:", error);
    return null;
  }
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default function LocationModal({ onLocationSelect, onClose }: LocationModalProps) {
  const [isDetecting, setIsDetecting] = useState(false);
  const [error, setError] = useState<string | null>(null);

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
        const detectedCity = await getCityFromCoordinates(latitude, longitude);

        if (detectedCity) {
          // Match detected city with the predefined list
          const matchedCity = cities.find((city) =>
            detectedCity.toLowerCase().includes(city.toLowerCase())
          );
          onLocationSelect(matchedCity || detectedCity); // Select the closest match
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

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="bg-white rounded-lg shadow-xl max-w-md w-full p-6"
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

        <div className="grid grid-cols-2 gap-4">
          {cities.map((city) => (
            <motion.button
              key={city}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => onLocationSelect(city)}
              className="flex flex-col items-center justify-center p-4 border border-gray-200 rounded-lg hover:border-teal-500 hover:bg-teal-50 transition-colors"
            >
              <MapPin className="h-6 w-6 text-teal-500 mb-2" />
              <span className="font-medium">{city}</span>
            </motion.button>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
