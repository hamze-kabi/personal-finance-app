import { StateCreator } from "zustand";
import { TransactionUISlice } from "./types";

export const createTransactionSlice: StateCreator<TransactionUISlice> = (
  set,
) => ({
  searchQuery: "",
  setSearchQuery: (query) => set({ searchQuery: query }),
  selectedCategory: "",
  setSelectedCategory: (category) => set({ selectedCategory: category }),
  sortOption: "newest",
  setSortOption: (option) => set({ sortOption: option }),
  transactionsLoading: false,
  setTransactionsLoading: (loading) => set({ transactionsLoading: loading }),
});
