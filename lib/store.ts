"use client"

import { create } from "zustand"
import { persist } from "zustand/middleware"

interface LocationState {
  location: string | null
  setLocation: (location: string) => void
}

export const useLocationStore = create<LocationState>()(
  persist(
    (set) => ({
      location: null,
      setLocation: (location) => set({ location }),
    }),
    {
      name: "location-storage",
    },
  ),
)

