/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import type React from "react"

import { useState } from "react"
import { useLocationStore } from "@/lib/store"
import Navbar from "@/components/navbar"
import Announcement from "@/components/announcement"
import { motion } from "framer-motion"
import { Check, Download, ChevronRight, Plus, Minus } from "lucide-react"
import { jsPDF } from "jspdf"
import autoTable from "jspdf-autotable"

// Define types for TypeScript
interface OrderItem {
  id: number
  name: string
  price500ml: number
  price1000ml: number
  quantity500ml: number
  quantity1000ml: number
}

interface LocationDetails {
  country: string
  state: string
  district: string
  mandal: string
  village: string
}

export default function OrderPage() {
  const { location } = useLocationStore()
  const [step, setStep] = useState(1)
  const [locationDetails, setLocationDetails] = useState<LocationDetails>({
    country: "India",
    state: "",
    district: "",
    mandal: "",
    village: "",
  })

  const [orderItems, setOrderItems] = useState<OrderItem[]>([
    {
      id: 1,
      name: "Aquae-vitae Natural Mineral Water",
      price500ml: 10,
      price1000ml: 20,
      quantity500ml: 0,
      quantity1000ml: 0,
    },
    {
      id: 2,
      name: "Aquae-vitae Vedica",
      price500ml: 15,
      price1000ml: 30,
      quantity500ml: 0,
      quantity1000ml: 0,
    },
    {
      id: 3,
      name: "Aquae-vitae Soda",
      price500ml: 12,
      price1000ml: 22,
      quantity500ml: 0,
      quantity1000ml: 0,
    },
  ])

  // Calculate totals
  const total500ml = orderItems.reduce((sum, item) => sum + item.quantity500ml, 0)
  const total1000ml = orderItems.reduce((sum, item) => sum + item.quantity1000ml, 0)
  const totalAmount = orderItems.reduce(
    (sum, item) => sum + item.quantity500ml * item.price500ml + item.quantity1000ml * item.price1000ml,
    0,
  )

  const handleLocationChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setLocationDetails((prev) => ({ ...prev, [name]: value }))
  }

  const handleQuantityChange = (id: number, size: "500ml" | "1000ml", value: number) => {
    setOrderItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, [`quantity${size}`]: Math.max(0, value) } : item)),
    )
  }

  const handleBulkQuantityChange = (size: "500ml" | "1000ml", value: number) => {
    setOrderItems((prev) =>
      prev.map((item) => ({
        ...item,
        [`quantity${size}`]: value,
      })),
    )
  }

  const isLocationFormValid = () => {
    return locationDetails.state && locationDetails.district && locationDetails.mandal && locationDetails.village
  }

  const isOrderValid = () => {
    return orderItems.some((item) => item.quantity500ml > 0 || item.quantity1000ml > 0)
  }

  const generateReceipt = () => {
    const doc = new jsPDF()

    // Add header
    doc.setFontSize(20)
    doc.setTextColor(0, 161, 154) // Aquae-vitae teal color
    doc.text("Aquae-vitae Order Receipt", 105, 20, { align: "center" })

    // Add date and order info
    doc.setFontSize(12)
    doc.setTextColor(0, 0, 0)
    doc.text(`Date: ${new Date().toLocaleDateString()}`, 20, 40)
    doc.text(`Order ID: ORD-${Math.floor(Math.random() * 10000)}`, 20, 50)

    // Add customer details
    doc.setFontSize(14)
    doc.text("Delivery Address:", 20, 70)
    doc.setFontSize(12)
    doc.text(`Country: ${locationDetails.country}`, 30, 80)
    doc.text(`State: ${locationDetails.state}`, 30, 90)
    doc.text(`District: ${locationDetails.district}`, 30, 100)
    doc.text(`Mandal: ${locationDetails.mandal}`, 30, 110)
    doc.text(`Village: ${locationDetails.village}`, 30, 120)

    // Add order items table
    const tableColumn = ["S.No", "Product", "500ml Qty", "500ml Price", "1000ml Qty", "1000ml Price", "Total"]
    const tableRows = orderItems
      .filter((item) => item.quantity500ml > 0 || item.quantity1000ml > 0)
      .map((item, index) => [
        index + 1,
        item.name,
        item.quantity500ml,
        `₹${item.price500ml}`,
        item.quantity1000ml,
        `₹${item.price1000ml}`,
        `₹${item.quantity500ml * item.price500ml + item.quantity1000ml * item.price1000ml}`,
      ])

    // Add summary row
    tableRows.push(["", "Total", total500ml, "", total1000ml, "", `₹${totalAmount}`])

    autoTable(doc, {
      head: [tableColumn],
      body: tableRows,
      startY: 140,
      theme: "grid",
      headStyles: { fillColor: [0, 161, 154] },
    })

    // Add footer
    const finalY = (doc as any).lastAutoTable.finalY || 200
    doc.text("Thank you for your order!", 105, finalY + 20, { align: "center" })
    doc.text("For any queries, please contact: 1800 121 1007", 105, finalY + 30, { align: "center" })

    // Save the PDF
    doc.save("Aquae-vitae-order-receipt.pdf")
  }

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
        <h1 className="text-3xl font-bold mb-4 text-teal-600">Order Now</h1>

        {/* Progress Steps */}
        <div className="mb-8">
          <div className="flex items-center">
            <div
              className={`flex items-center justify-center w-10 h-10 rounded-full ${step >= 1 ? "bg-teal-500 text-white" : "bg-gray-200"}`}
            >
              1
            </div>
            <div className={`flex-1 h-1 mx-2 ${step >= 2 ? "bg-teal-500" : "bg-gray-200"}`}></div>
            <div
              className={`flex items-center justify-center w-10 h-10 rounded-full ${step >= 2 ? "bg-teal-500 text-white" : "bg-gray-200"}`}
            >
              2
            </div>
            <div className={`flex-1 h-1 mx-2 ${step >= 3 ? "bg-teal-500" : "bg-gray-200"}`}></div>
            <div
              className={`flex items-center justify-center w-10 h-10 rounded-full ${step >= 3 ? "bg-teal-500 text-white" : "bg-gray-200"}`}
            >
              3
            </div>
          </div>
          <div className="flex justify-between mt-2">
            <div className="text-center w-20">Location</div>
            <div className="text-center w-20">Order</div>
            <div className="text-center w-20">Checkout</div>
          </div>
        </div>

        {/* Step 1: Location Form */}
        {step === 1 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-lg shadow-md p-6 mb-8"
          >
            <h2 className="text-xl font-semibold mb-4">Delivery Location Details</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="country" className="block text-sm font-medium text-gray-700 mb-1">
                  Country
                </label>
                <input
                  type="text"
                  id="country"
                  name="country"
                  value={locationDetails.country}
                  onChange={handleLocationChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
                  readOnly
                />
              </div>

              <div>
                <label htmlFor="state" className="block text-sm font-medium text-gray-700 mb-1">
                  State
                </label>
                <select
                  id="state"
                  name="state"
                  value={locationDetails.state}
                  onChange={handleLocationChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
                >
                  <option value="">Select State</option>
                  <option value="Andhra Pradesh">Andhra Pradesh</option>
                  <option value="Telangana">Telangana</option>
                  <option value="Karnataka">Karnataka</option>
                  <option value="Tamil Nadu">Tamil Nadu</option>
                  <option value="Maharashtra">Maharashtra</option>
                  <option value="Gujarat">Gujarat</option>
                </select>
              </div>

              <div>
                <label htmlFor="district" className="block text-sm font-medium text-gray-700 mb-1">
                  District
                </label>
                <input
                  type="text"
                  id="district"
                  name="district"
                  value={locationDetails.district}
                  onChange={handleLocationChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
                />
              </div>

              <div>
                <label htmlFor="mandal" className="block text-sm font-medium text-gray-700 mb-1">
                  Mandal
                </label>
                <input
                  type="text"
                  id="mandal"
                  name="mandal"
                  value={locationDetails.mandal}
                  onChange={handleLocationChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
                />
              </div>

              <div>
                <label htmlFor="village" className="block text-sm font-medium text-gray-700 mb-1">
                  Village
                </label>
                <input
                  type="text"
                  id="village"
                  name="village"
                  value={locationDetails.village}
                  onChange={handleLocationChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
                />
              </div>
            </div>

            <div className="mt-6 flex justify-end">
              <button
                onClick={() => setStep(2)}
                disabled={!isLocationFormValid()}
                className="flex items-center bg-teal-500 text-white px-6 py-2 rounded-md hover:bg-teal-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Next <ChevronRight className="ml-2 h-4 w-4" />
              </button>
            </div>
          </motion.div>
        )}

        {/* Step 2: Order Form */}
        {step === 2 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-lg shadow-md p-6 mb-8"
          >
            <h2 className="text-xl font-semibold mb-4">Place Your Order</h2>

            {/* Bulk quantity inputs */}
            <div className="mb-6 p-4 bg-gray-50 rounded-lg">
              <h3 className="text-lg font-medium mb-3">Quick Order (All Products)</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="bulk500ml" className="block text-sm font-medium text-gray-700 mb-1">
                    Set quantity for all 500ml bottles
                  </label>
                  <div className="flex">
                    <input
                      type="number"
                      id="bulk500ml"
                      min="0"
                      value={orderItems[0].quantity500ml}
                      onChange={(e) => handleBulkQuantityChange("500ml", Number.parseInt(e.target.value) || 0)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-teal-500"
                    />
                    <button
                      onClick={() => handleBulkQuantityChange("500ml", 0)}
                      className="bg-gray-200 px-4 py-2 rounded-r-md hover:bg-gray-300"
                    >
                      Reset
                    </button>
                  </div>
                </div>

                <div>
                  <label htmlFor="bulk1000ml" className="block text-sm font-medium text-gray-700 mb-1">
                    Set quantity for all 1000ml bottles
                  </label>
                  <div className="flex">
                    <input
                      type="number"
                      id="bulk1000ml"
                      min="0"
                      value={orderItems[0].quantity1000ml}
                      onChange={(e) => handleBulkQuantityChange("1000ml", Number.parseInt(e.target.value) || 0)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-teal-500"
                    />
                    <button
                      onClick={() => handleBulkQuantityChange("1000ml", 0)}
                      className="bg-gray-200 px-4 py-2 rounded-r-md hover:bg-gray-300"
                    >
                      Reset
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Product cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              {orderItems.map((item) => (
                <motion.div
                  key={item.id}
                  whileHover={{ y: -5 }}
                  className="bg-white rounded-lg border border-gray-200 overflow-hidden"
                >
                  <div className="p-4">
                    <h3 className="text-lg font-semibold mb-2">{item.name}</h3>

                    <div className="mb-4">
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm">500ml (₹{item.price500ml})</span>
                        <div className="flex items-center border rounded-md">
                          <button
                            className="px-2 py-1 border-r"
                            onClick={() => handleQuantityChange(item.id, "500ml", item.quantity500ml - 1)}
                          >
                            <Minus className="h-4 w-4" />
                          </button>
                          <input
                            type="number"
                            min="0"
                            value={item.quantity500ml}
                            onChange={(e) =>
                              handleQuantityChange(item.id, "500ml", Number.parseInt(e.target.value) || 0)
                            }
                            className="w-16 text-center py-1 border-0 focus:outline-none focus:ring-0"
                          />
                          <button
                            className="px-2 py-1 border-l"
                            onClick={() => handleQuantityChange(item.id, "500ml", item.quantity500ml + 1)}
                          >
                            <Plus className="h-4 w-4" />
                          </button>
                        </div>
                      </div>

                      <div className="flex justify-between items-center">
                        <span className="text-sm">1000ml (₹{item.price1000ml})</span>
                        <div className="flex items-center border rounded-md">
                          <button
                            className="px-2 py-1 border-r"
                            onClick={() => handleQuantityChange(item.id, "1000ml", item.quantity1000ml - 1)}
                          >
                            <Minus className="h-4 w-4" />
                          </button>
                          <input
                            type="number"
                            min="0"
                            value={item.quantity1000ml}
                            onChange={(e) =>
                              handleQuantityChange(item.id, "1000ml", Number.parseInt(e.target.value) || 0)
                            }
                            className="w-16 text-center py-1 border-0 focus:outline-none focus:ring-0"
                          />
                          <button
                            className="px-2 py-1 border-l"
                            onClick={() => handleQuantityChange(item.id, "1000ml", item.quantity1000ml + 1)}
                          >
                            <Plus className="h-4 w-4" />
                          </button>
                        </div>
                      </div>
                    </div>

                    <div className="text-right font-medium">
                      Total: ₹{item.quantity500ml * item.price500ml + item.quantity1000ml * item.price1000ml}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Spreadsheet view */}
            <div className="mb-8 overflow-x-auto">
              <h3 className="text-lg font-medium mb-3">Order Summary</h3>
              <table className="min-w-full border border-gray-200">
                <thead>
                  <tr className="bg-gray-50">
                    <th className="py-3 px-4 border-b border-r text-left">S.No</th>
                    <th className="py-3 px-4 border-b border-r text-left">Product</th>
                    <th className="py-3 px-4 border-b border-r text-center">
                      <div>500ml</div>
                      <div className="text-xs text-gray-500">₹10-15 per unit</div>
                    </th>
                    <th className="py-3 px-4 border-b border-r text-center">
                      <div>1000ml</div>
                      <div className="text-xs text-gray-500">₹20-30 per unit</div>
                    </th>
                    <th className="py-3 px-4 border-b border-r text-center">Total 500ml</th>
                    <th className="py-3 px-4 border-b border-r text-center">Total 1000ml</th>
                    <th className="py-3 px-4 border-b text-center">Total Amount</th>
                  </tr>
                </thead>
                <tbody>
                  {orderItems.map((item, index) => (
                    <tr key={item.id} className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                      <td className="py-3 px-4 border-b border-r">{index + 1}</td>
                      <td className="py-3 px-4 border-b border-r">{item.name}</td>
                      <td className="py-3 px-4 border-b border-r">
                        <input
                          type="number"
                          min="0"
                          value={item.quantity500ml}
                          onChange={(e) => handleQuantityChange(item.id, "500ml", Number.parseInt(e.target.value) || 0)}
                          className="w-20 px-2 py-1 border rounded text-center"
                        />
                      </td>
                      <td className="py-3 px-4 border-b border-r">
                        <input
                          type="number"
                          min="0"
                          value={item.quantity1000ml}
                          onChange={(e) =>
                            handleQuantityChange(item.id, "1000ml", Number.parseInt(e.target.value) || 0)
                          }
                          className="w-20 px-2 py-1 border rounded text-center"
                        />
                      </td>
                      <td className="py-3 px-4 border-b border-r text-center">
                        ₹{item.quantity500ml * item.price500ml}
                      </td>
                      <td className="py-3 px-4 border-b border-r text-center">
                        ₹{item.quantity1000ml * item.price1000ml}
                      </td>
                      <td className="py-3 px-4 border-b text-center">
                        ₹{item.quantity500ml * item.price500ml + item.quantity1000ml * item.price1000ml}
                      </td>
                    </tr>
                  ))}
                  <tr className="bg-teal-50 font-medium">
                    <td className="py-3 px-4 border-b border-r" colSpan={2}>
                      Total
                    </td>
                    <td className="py-3 px-4 border-b border-r text-center">{total500ml}</td>
                    <td className="py-3 px-4 border-b border-r text-center">{total1000ml}</td>
                    <td className="py-3 px-4 border-b border-r text-center">
                      ₹{orderItems.reduce((sum, item) => sum + item.quantity500ml * item.price500ml, 0)}
                    </td>
                    <td className="py-3 px-4 border-b border-r text-center">
                      ₹{orderItems.reduce((sum, item) => sum + item.quantity1000ml * item.price1000ml, 0)}
                    </td>
                    <td className="py-3 px-4 border-b text-center">₹{totalAmount}</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="flex justify-between">
              <button
                onClick={() => setStep(1)}
                className="flex items-center bg-gray-200 text-gray-700 px-6 py-2 rounded-md hover:bg-gray-300 transition-colors"
              >
                Back
              </button>
              <button
                onClick={() => setStep(3)}
                disabled={!isOrderValid()}
                className="flex items-center bg-teal-500 text-white px-6 py-2 rounded-md hover:bg-teal-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Next <ChevronRight className="ml-2 h-4 w-4" />
              </button>
            </div>
          </motion.div>
        )}

        {/* Step 3: Checkout */}
        {step === 3 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-lg shadow-md p-6 mb-8"
          >
            <h2 className="text-xl font-semibold mb-4">Order Summary</h2>

            <div className="mb-6">
              <h3 className="text-lg font-medium mb-2">Delivery Address</h3>
              <div className="bg-gray-50 p-4 rounded-lg">
                <p>
                  <span className="font-medium">Country:</span> {locationDetails.country}
                </p>
                <p>
                  <span className="font-medium">State:</span> {locationDetails.state}
                </p>
                <p>
                  <span className="font-medium">District:</span> {locationDetails.district}
                </p>
                <p>
                  <span className="font-medium">Mandal:</span> {locationDetails.mandal}
                </p>
                <p>
                  <span className="font-medium">Village:</span> {locationDetails.village}
                </p>
              </div>
            </div>

            <div className="mb-6">
              <h3 className="text-lg font-medium mb-2">Order Details</h3>
              <div className="overflow-x-auto">
                <table className="min-w-full border border-gray-200">
                  <thead>
                    <tr className="bg-gray-50">
                      <th className="py-3 px-4 border-b border-r text-left">Product</th>
                      <th className="py-3 px-4 border-b border-r text-center">500ml Qty</th>
                      <th className="py-3 px-4 border-b border-r text-center">1000ml Qty</th>
                      <th className="py-3 px-4 border-b text-center">Amount</th>
                    </tr>
                  </thead>
                  <tbody>
                    {orderItems
                      .filter((item) => item.quantity500ml > 0 || item.quantity1000ml > 0)
                      .map((item, index) => (
                        <tr key={item.id} className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                          <td className="py-3 px-4 border-b border-r">{item.name}</td>
                          <td className="py-3 px-4 border-b border-r text-center">{item.quantity500ml}</td>
                          <td className="py-3 px-4 border-b border-r text-center">{item.quantity1000ml}</td>
                          <td className="py-3 px-4 border-b text-center">
                            ₹{item.quantity500ml * item.price500ml + item.quantity1000ml * item.price1000ml}
                          </td>
                        </tr>
                      ))}
                    <tr className="bg-teal-50 font-medium">
                      <td className="py-3 px-4 border-b border-r">Total</td>
                      <td className="py-3 px-4 border-b border-r text-center">{total500ml}</td>
                      <td className="py-3 px-4 border-b border-r text-center">{total1000ml}</td>
                      <td className="py-3 px-4 border-b text-center">₹{totalAmount}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="mb-6">
              <h3 className="text-lg font-medium mb-2">Payment Method</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="border rounded-lg p-4 flex items-center cursor-pointer bg-teal-50 border-teal-500">
                  <input type="radio" id="cod" name="payment" checked readOnly className="mr-2" />
                  <label htmlFor="cod" className="cursor-pointer">
                    Cash on Delivery
                  </label>
                </div>
                <div className="border rounded-lg p-4 flex items-center cursor-pointer">
                  <input type="radio" id="online" name="payment" disabled className="mr-2" />
                  <label htmlFor="online" className="cursor-pointer text-gray-500">
                    Online Payment (Coming Soon)
                  </label>
                </div>
                <div className="border rounded-lg p-4 flex items-center cursor-pointer">
                  <input type="radio" id="wallet" name="payment" disabled className="mr-2" />
                  <label htmlFor="wallet" className="cursor-pointer text-gray-500">
                    Wallet (Coming Soon)
                  </label>
                </div>
              </div>
            </div>

            <div className="flex justify-between">
              <button
                onClick={() => setStep(2)}
                className="flex items-center bg-gray-200 text-gray-700 px-6 py-2 rounded-md hover:bg-gray-300 transition-colors"
              >
                Back
              </button>
              <div className="flex space-x-4">
                <button
                  onClick={generateReceipt}
                  className="flex items-center bg-blue-500 text-white px-6 py-2 rounded-md hover:bg-blue-600 transition-colors"
                >
                  <Download className="mr-2 h-4 w-4" /> Download Receipt
                </button>
                <button
                  onClick={() => alert("Order placed successfully!")}
                  className="flex items-center bg-teal-500 text-white px-6 py-2 rounded-md hover:bg-teal-600 transition-colors"
                >
                  Place Order <Check className="ml-2 h-4 w-4" />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </main>
  )
}

