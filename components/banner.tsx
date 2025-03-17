"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import Link from "next/link"

export default function Banner() {
  return (
    <div className="bg-[#326872] overflow-hidden">
      <div className="container mx-auto px-4 py-12 md:py-20">
        <div className="flex flex-col md:flex-row items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="md:w-1/2 text-white mb-8 md:mb-0"
          >
            <h1 className="text-4xl md:text-6xl font-bold mb-4">#AQUAREVIVE</h1>
            <p className="text-xl md:text-2xl mb-6"> Providing Safe and Healthy Drinking Water for Communities</p>
            <div className="flex flex-col sm:flex-row gap-4">
             <Link href="/order">
             <button className="bg-white text-teal-600 px-6 py-3 rounded-md font-medium hover:bg-gray-100 transition-colors">
                Order Now
              </button>
             </Link>
              
              <button className="bg-transparent border-2 border-white text-white px-6 py-3 rounded-md font-medium hover:bg-white hover:text-teal-600 transition-colors">
                Learn More
              </button>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="md:w-1/2 flex justify-center"
          >
            <div className=" ">
              <Image src="/ban1.jpg" alt="Aquae-vitae Bottle"  className="object-contain" height={300} width={350} />
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}

