"use client"

import { motion } from "framer-motion"

export default function Announcement() {
  return (
    <div className="bg-teal-600 text-white py-2 overflow-hidden">
      <motion.div
        initial={{ x: "100%" }}
        animate={{ x: "-100%" }}
        transition={{
          repeat: Number.POSITIVE_INFINITY,
          duration: 20,
          ease: "linear",
        }}
        className="whitespace-nowrap"
      >
        <span className="inline-block px-4">
          🔔 Special Offer: Get 10% off on your first subscription order! Use code FIRST10
        </span>
        <span className="inline-block px-4">💧 Stay hydrated with Aquae-vitae - Pure, Safe and Healthy drinking water</span>
        <span className="inline-block px-4">🚚 Free delivery on orders above ₹500</span>
        <span className="inline-block px-4">⚠️ Beware of fake Aquae-vitae products. Look for the seal of authenticity.</span>
      </motion.div>
    </div>
  )
}

