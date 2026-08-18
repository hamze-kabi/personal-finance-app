import { StateCreator } from "zustand";
import { RecurringBillUISlice } from "./types";

export const createRecurringBillSlice: StateCreator<RecurringBillUISlice> = (
  set,
) => ({
  isLoading: false,
  setIsLoading: (loading) => set({ isLoading: loading }),
  searchQuery: "",
  setSearchQuery: (query) => set({ searchQuery: query }),
});
