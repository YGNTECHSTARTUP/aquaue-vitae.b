"use client"

import type React from "react"

import { useState } from "react"
import { useLocationStore } from "@/lib/store"
import Navbar from "@/components/navbar"
import Announcement from "@/components/announcement"
import { motion } from "framer-motion"

export default function ComplaintPage() {
  const { location } = useLocationStore()
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    orderNumber: "",
    complaintType: "",
    description: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false)
      setIsSubmitted(true)

      // Reset form after 3 seconds
      setTimeout(() => {
        setIsSubmitted(false)
        setFormData({
          name: "",
          email: "",
          phone: "",
          orderNumber: "",
          complaintType: "",
          description: "",
        })
      }, 3000)
    }, 1500)
  }

  return (
    <main>
      <div className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-2 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <span className="text-sm text-gray-600">Your Location: </span>
            <span className="font-medium">{location?.city}</span>
          </div>
          <div className="flex items-center space-x-6">
            <a href="tel:18001211007" className="flex items-center text-sm">
              <span className="mr-2">📞</span>
              7569232144
            </a>
            <a href="mailto:sagarkum.penki@gmail.com" className="flex items-center text-sm">
              <span className="mr-2">✉️</span>
              sagarkum.penki@gmail.com
            </a>
          </div>
        </div>
      </div>

      <Navbar />
      <Announcement />

      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-2 text-teal-600">Submit a Complaint</h1>
        <p className="text-gray-600 mb-8">
          We&apos;re sorry you&apos;re having an issue. Please fill out the form below and we&apos;ll address your concern as soon as
          possible.
        </p>

        {isSubmitted ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-green-100 border border-green-400 text-green-700 px-4 py-4 rounded mb-8"
          >
            <p className="font-medium">Thank you for your feedback!</p>
            <p>
              Your complaint has been submitted successfully. Our team will review it and get back to you within 24-48
              hours.
            </p>
          </motion.div>
        ) : (
          <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-md p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
                />
              </div>

              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                  Phone Number
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
                />
              </div>

              <div>
                <label htmlFor="orderNumber" className="block text-sm font-medium text-gray-700 mb-1">
                  Order Number (if applicable)
                </label>
                <input
                  type="text"
                  id="orderNumber"
                  name="orderNumber"
                  value={formData.orderNumber}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
                />
              </div>

              <div className="md:col-span-2">
                <label htmlFor="complaintType" className="block text-sm font-medium text-gray-700 mb-1">
                  Complaint Type
                </label>
                <select
                  id="complaintType"
                  name="complaintType"
                  value={formData.complaintType}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
                >
                  <option value="">Select a complaint type</option>
                  <option value="product">Product Quality</option>
                  <option value="delivery">Delivery Issue</option>
                  <option value="billing">Billing Problem</option>
                  <option value="customer-service">Customer Service</option>
                  <option value="other">Other</option>
                </select>
              </div>

              <div className="md:col-span-2">
                <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
                  Complaint Description
                </label>
                <textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  required
                  rows={5}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
                ></textarea>
              </div>
            </div>

            <div className="mt-6">
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-teal-500 text-white py-3 rounded-md font-medium hover:bg-teal-600 transition-colors disabled:opacity-70"
              >
                {isSubmitting ? "Submitting..." : "Submit Complaint"}
              </button>
            </div>
          </form>
        )}
      </div>
    </main>
  )
}

