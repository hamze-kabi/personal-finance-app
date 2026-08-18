import { StateCreator } from "zustand";
import { UISlice } from "./types";

export const createUISlice: StateCreator<UISlice> = (set) => ({
  isSidebarOpen: true,
  setIsSidebarOpen: (isOpen) => set({ isSidebarOpen: isOpen }),
  toggleSidebar: () =>
    set((state) => ({ isSidebarOpen: !state.isSidebarOpen })),
});
