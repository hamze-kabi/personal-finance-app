import { StateCreator } from "zustand";
import { PotUISlice } from "./types";

export const createPotSlice: StateCreator<PotUISlice> = (set) => ({
  isLoading: false,
  setIsLoading: (loading) => set({ isLoading: loading }),
});
