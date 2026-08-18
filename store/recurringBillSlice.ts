import { StateCreator } from "zustand";
import { RecurringBillUISlice } from "./types";

export const createRecurringBillSlice: StateCreator<RecurringBillUISlice> = (
  set,
) => ({
  recurringBillsLoading: false,
  setRecurringBillsLoading: (loading) =>
    set({ recurringBillsLoading: loading }),
  searchQuery: "",
  setSearchQuery: (query) => set({ searchQuery: query }),
});
