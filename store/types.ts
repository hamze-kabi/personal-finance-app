// ============================================
// UI SLICE TYPES
// ============================================
export interface UISlice {
  isSidebarOpen: boolean;
  setIsSidebarOpen: (isOpen: boolean) => void;
  toggleSidebar: () => void;
}

// ============================================
// TRANSACTION UI SLICE TYPES
// ============================================
export interface TransactionUISlice {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  selectedCategory: string;
  setSelectedCategory: (category: string) => void;
  sortOption: string;
  setSortOption: (option: string) => void;
  isLoading: boolean;
  setIsLoading: (loading: boolean) => void;
}

// ============================================
// BUDGET UI SLICE TYPES
// ============================================
export interface BudgetUISlice {
  isLoading: boolean;
  setIsLoading: (loading: boolean) => void;
}

// ============================================
// POT UI SLICE TYPES
// ============================================
export interface PotUISlice {
  isLoading: boolean;
  setIsLoading: (loading: boolean) => void;
}

// ============================================
// RECURRING BILL UI SLICE TYPES
// ============================================
export interface RecurringBillUISlice {
  isLoading: boolean;
  setIsLoading: (loading: boolean) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

// ============================================
// COMBINED STORE TYPE
// ============================================
export type StoreState = UISlice &
  TransactionUISlice &
  BudgetUISlice &
  PotUISlice &
  RecurringBillUISlice;
