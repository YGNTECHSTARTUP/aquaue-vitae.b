"use client"

import { useState } from "react"
import { useLocationStore } from "@/lib/store"
import Navbar from "@/components/navbar"
import Announcement from "@/components/announcement"
import { motion } from "framer-motion"
import { Check } from "lucide-react"

export default function SubscriptionPage() {
  const { location } = useLocationStore()
  const [selectedPlan, setSelectedPlan] = useState<number | null>(null)

  const plans = [
    {
      id: 1,
      name: "Basic",
      price: 599,
      period: "month",
      features: ["2 Aquae-vitae 20L cans per month", "Free delivery", "Scheduled delivery", "Email support"],
    },
    {
      id: 2,
      name: "Standard",
      price: 999,
      period: "month",
      features: [
        "4 Aquae-vitae 20L cans per month",
        "Free delivery",
        "Scheduled delivery",
        "Priority email & phone support",
        "Flexible rescheduling",
      ],
    },
    {
      id: 3,
      name: "Premium",
      price: 1499,
      period: "month",
      features: [
        "6 Aquae-vitae 20L cans per month",
        "Free delivery",
        "Scheduled delivery",
        "24/7 priority support",
        "Flexible rescheduling",
        "Emergency delivery",
      ],
    },
  ]

  return (
    <main>
      <div className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-2 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <span className="text-sm text-gray-600">Your Location: </span>
            <span className="font-medium">{location}</span>
          </div>
          <div className="flex items-center space-x-6">
            <a href="tel:18001211007" className="flex items-center text-sm">
              <span className="mr-2">📞</span>
              1800 121 1007
            </a>
            <a href="mailto:wecare@Aquae-vitae.co.in" className="flex items-center text-sm">
              <span className="mr-2">✉️</span>
              wecare@Aquae-vitae.co.in
            </a>
          </div>
        </div>
      </div>

      <Navbar />
      <Announcement />

      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-2 text-teal-600">Subscription Plans</h1>
        <p className="text-gray-600 mb-8">Choose a plan that works for you</p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {plans.map((plan) => (
            <motion.div
              key={plan.id}
              whileHover={{ y: -10 }}
              className={`bg-white rounded-lg shadow-lg overflow-hidden border-2 ${selectedPlan === plan.id ? "border-teal-500" : "border-transparent"}`}
            >
              <div className="p-6">
                <h3 className="text-2xl font-bold text-teal-600">{plan.name}</h3>
                <div className="mt-4 flex items-end">
                  <span className="text-4xl font-bold">₹{plan.price}</span>
                  <span className="text-gray-500 ml-2">/{plan.period}</span>
                </div>
                <ul className="mt-6 space-y-4">
                  {plan.features.map((feature, index) => (
                    <li key={index} className="flex items-start">
                      <Check className="h-5 w-5 text-teal-500 mr-2 flex-shrink-0 mt-0.5" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                <button
                  className={`w-full mt-8 py-3 rounded-md font-medium transition-colors ${
                    selectedPlan === plan.id
                      ? "bg-teal-600 text-white"
                      : "bg-teal-100 text-teal-700 hover:bg-teal-500 hover:text-white"
                  }`}
                  onClick={() => setSelectedPlan(plan.id)}
                >
                  {selectedPlan === plan.id ? "Selected" : "Select Plan"}
                </button>
              </div>
            </motion.div>
          ))}
        </div>

        {selectedPlan && (
          <div className="mt-12 text-center">
            <button className="bg-teal-500 text-white px-8 py-3 rounded-md font-medium hover:bg-teal-600 transition-colors">
              Proceed to Checkout
            </button>
          </div>
        )}
      </div>
    </main>
  )
}

