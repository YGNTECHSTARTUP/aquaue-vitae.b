"use client"

import { useState } from "react"
import Link from "next/link"
import { Menu, X } from "lucide-react"
import { motion } from "framer-motion"
// import { useLocationStore } from "@/lib/store"

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  // const { location, setLocation } = useLocationStore()

  const toggleMenu = () => setIsOpen(!isOpen)

  const navItems = [
    { name: "Home", path: "/" },
    { name: "Order Now", path: "/order" },
    { name: "Subscription", path: "/subscription" },
    { name: "Complaint", path: "/complaint" },
    { name: "Service/Product", path: "/services" },
  ]

  return (
    <nav className="bg-white shadow-md">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-20">
          <div className="flex items-center">
            <Link href="/" className="flex-shrink-0">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
                className="h-12 w-auto"
              >
                <svg width="220" height="40"  viewBox="0 0 120 40" className="fill-teal-500">
                  <path
                    d="M10.5,15.5c0,0,4.5-3.8,9.8-3.8c5.4,0,9.7,3.8,9.7,3.8s4.5,3.8,9.8,3.8c5.4,0,9.7-3.8,9.7-3.8"
                    strokeWidth="3"
                    stroke="currentColor"
                    fill="none"
                  />
                  <path
                    d="M20,20c0,0-4.5,3.8-9.8,3.8C4.8,23.8,0.5,20,0.5,20"
                    strokeWidth="3"
                    stroke="currentColor"
                    fill="none"
                  />
                  <text x="50" y="25" fontSize="20" fontWeight="bold" fill="currentColor">
                    Aquae Vitae
                  </text>
                </svg>
              </motion.div>
            </Link>
          </div>

          <div className="hidden md:block">
            <div className="ml-10 flex items-center space-x-8">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.path}
                  className="text-gray-700 hover:text-teal-500 px-3 py-2 rounded-md font-medium transition-colors"
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </div>

          <div className="hidden md:block">
            <div className="ml-4 flex items-center md:ml-6">
              <button className="bg-teal-500 text-white px-4 py-2 rounded-md hover:bg-teal-600 transition-colors">
                Login
              </button>
            </div>
          </div>

          <div className="md:hidden">
            <button
              onClick={toggleMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-teal-500 focus:outline-none"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          className="md:hidden"
        >
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.path}
                className="text-gray-700 hover:text-teal-500 block px-3 py-2 rounded-md text-base font-medium"
                onClick={() => setIsOpen(false)}
              >
                {item.name}
              </Link>
            ))}
          </div>
          <div className="pt-4 pb-3 border-t border-gray-200">
            <div className="flex items-center px-5">
              <button className="w-full bg-teal-500 text-white px-4 py-2 rounded-md hover:bg-teal-600 transition-colors">
                Login
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </nav>
  )
}

