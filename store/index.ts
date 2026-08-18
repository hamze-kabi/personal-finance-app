import { create } from "zustand";
import { StoreState } from "./types";
import { createUISlice } from "./uiSlice";
import { createTransactionSlice } from "./transactionSlice";
import { createBudgetSlice } from "./budgetSlice";
import { createPotSlice } from "./potSlice";
import { createRecurringBillSlice } from "./recurringBillSlice";

export const useStore = create<StoreState>()((...args) => {
  const store = {
    ...createUISlice(...args),
    ...createTransactionSlice(...args),
    ...createBudgetSlice(...args),
    ...createPotSlice(...args),
    ...createRecurringBillSlice(...args),
  };

  console.log("🔵 Zustand Store Created:", Object.keys(store));
  return store;
});
