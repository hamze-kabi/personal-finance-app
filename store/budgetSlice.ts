import { StateCreator } from "zustand";
import { BudgetUISlice } from "./types";

export const createBudgetSlice: StateCreator<BudgetUISlice> = (set) => ({
  isLoading: false,
  setIsLoading: (loading) => set({ isLoading: loading }),
});
