import { StateCreator } from "zustand";
import { BudgetUISlice } from "./types";

export const createBudgetSlice: StateCreator<BudgetUISlice> = (set) => ({
  budgetsLoading: false,
  setBudgetsLoading: (loading) => set({ budgetsLoading: loading }),
});
