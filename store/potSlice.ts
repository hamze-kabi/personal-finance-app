import { StateCreator } from "zustand";
import { PotUISlice } from "./types";

export const createPotSlice: StateCreator<PotUISlice> = (set) => ({
  potsLoading: false,
  setPotsLoading: (loading) => set({ potsLoading: loading }),
});
