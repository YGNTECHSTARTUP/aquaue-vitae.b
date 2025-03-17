"use client"
import { useLocationStore } from "@/lib/store"
import Navbar from "@/components/navbar"
import Announcement from "@/components/announcement"
import { motion } from "framer-motion"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Image from "next/image"
import { Button } from "@/components/ui/button"
export default function ServicesPage() {
  const { location } = useLocationStore()

  const products = [
    {
      id: 1,
      name: "Aquae-vitae's Alkaline With Added Minerals ",
      description: "Pure, safe and healthy drinking water for your daily needs.",
      sizes: [ "500ml", "1L"],
      image: "/ban1.jpg",
    },
    {
      id: 2,
      name: "Aquae-vitae's B (Boiled) Water",
      description: "Boiled Water for your balenced needs",
      sizes: ["500ml", "1L"],
      image: "/ban2.jpg",
    },
   
  ]

  const services = [
    {
      id: 1,
      name: "Free Delivery",
      description: "Get Aquae-vitae products delivered right to your doorstep with our convenient home delivery service.",
      image: "/placeholder.svg?height=200&width=200",
    },
    {
      id: 2,
      name: "Subscription Service",
      description:
        "Never run out of water with our subscription service. Schedule regular deliveries at your convenience.",
      image: "/placeholder.svg?height=200&width=200",
    },
    {
      id: 3,
      name: "Corporate Supply",
      description: "Bulk water supply for offices, events, and corporate functions with customized delivery schedules.",
      image: "/placeholder.svg?height=200&width=200",
    },
  ]

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
        <h1 className="text-3xl font-bold mb-8 text-teal-600">Our Products & Services</h1>

        <Tabs defaultValue="products" className="mb-12">
          <TabsList className="grid w-full grid-cols-2 mb-8">
            <TabsTrigger value="products">Products</TabsTrigger>
            <TabsTrigger value="services">Services</TabsTrigger>
          </TabsList>

          <TabsContent value="products">
            <div className="space-y-12">
              {products.map((product) => (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5 }}
                  className="flex flex-col md:flex-row gap-8 bg-white rounded-lg shadow-md p-6"
                >
                  <div className="md:w-1/3 flex justify-center">
                    <Image src={product.image || "/placeholder.svg"} width={500} height={500} alt={product.name} className="h-64 object-contain" />
                  </div>
                  <div className="md:w-2/3">
                    <h2 className="text-2xl font-bold text-teal-600 mb-2">{product.name}</h2>
                    <p className="text-gray-600 mb-4">{product.description}</p>
                    <div className="mb-6">
                      <h3 className="font-medium mb-2">Available Sizes:</h3>
                      <div className="flex flex-wrap gap-2">
                        {product.sizes.map((size) => (
                          <span key={size} className="bg-teal-100 text-teal-800 px-3 py-1 rounded-full text-sm">
                            {size}
                          </span>
                        ))}
                      </div>
                    </div>
                    <Button className="bg-teal-500 text-white px-6 py-2 rounded-md hover:bg-teal-600 transition-colors">
                      View Details
                    </Button>
                  </div>
                </motion.div>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="services">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {services.map((service) => (
                <motion.div
                  key={service.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5 }}
                  className="bg-white rounded-lg shadow-md overflow-hidden"
                >
                  <div className="p-6">
                    <div className="flex justify-center mb-4">
                      <Image
                        src={service.image || "/placeholder.svg"}
                        alt={service.name}
                        className="h-32 object-contain"
                      />
                    </div>
                    <h3 className="text-xl font-bold text-teal-600 mb-2">{service.name}</h3>
                    <p className="text-gray-600 mb-4">{service.description}</p>
                    <Button className="w-full bg-teal-100 text-teal-800 py-2 rounded-md font-medium hover:bg-teal-200 transition-colors">
                      Learn More
                    </Button>
                  </div>
                </motion.div>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </main>
  )
}

