import { create } from "zustand";
import { persist, StateStorage, createJSONStorage } from "zustand/middleware";

const hashStorage: StateStorage = {
  getItem: (key): string => {
    const searchParams = new URLSearchParams(window.location.hash.slice(1));
    const storedValue = searchParams.get(key) ?? "";
    return storedValue ? JSON.parse(storedValue) : window.localStorage.getItem(key);
  },
  setItem: (key, newValue): void => {
    const searchParams = new URLSearchParams(window.location.hash.slice(1));
    searchParams.set(key, JSON.stringify(newValue));
    window.location.hash = searchParams.toString();
    window.localStorage.setItem(key, JSON.stringify(newValue));
  },
  removeItem: (key): void => {
    const searchParams = new URLSearchParams(window.location.hash.slice(1));
    searchParams.delete(key);
    window.location.hash = searchParams.toString();
    window.localStorage.removeItem(key);
  }
};

export const useStore = create<{
  filters: { age: string, gender: string, startDate: Date, endDate: Date };
  setFilters: (category: string, value: string | Date) => void;
}>()(
  persist(
    (set) => ({
      filters: { age: "All", gender: "All", startDate: new Date(), endDate: new Date() },
      setFilters: (category, value) => {
        set((state) => ({ ...state, filters: { ...state.filters, [category]: value } }));
        window.localStorage.setItem(category, JSON.stringify(value));
      }
    }),
    {
      name: "filters-hash-storage",
      storage: createJSONStorage(() => hashStorage)
    }
  )
);
