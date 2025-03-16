"use client";

import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

// Define the structure of the location data
export type LocationDetails = {
  leisure?: string;
  road?: string;
  suburb?: string;
  city?: string;
  county?: string;
  state_district?: string;
  state?: string;
  postcode?: string;
  country?: string;
  country_code?: string;
  [key: string]: string | undefined; // handles optional fields dynamically
};

// Define the store state and actions
interface LocationState {
  location: LocationDetails | null;
  setLocation: (location: LocationDetails) => void;
  clearLocation: () => void;
}

// Zustand store with persistent storage
export const useLocationStore = create<LocationState>()(
  persist(
    (set) => ({
      location: null,
      setLocation: (location) => set({ location }),
      clearLocation: () => set({ location: null }),
    }),
    {
      name: "location-storage", // key for localStorage
      storage: createJSONStorage(() => localStorage), // optional, safer in SSR
    }
  )
);
