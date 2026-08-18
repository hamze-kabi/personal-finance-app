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
  transactionsLoading: boolean;
  setTransactionsLoading: (loading: boolean) => void;
}

// ============================================
// BUDGET UI SLICE TYPES
// ============================================
export interface BudgetUISlice {
  budgetsLoading: boolean;
  setBudgetsLoading: (loading: boolean) => void;
}

// ============================================
// POT UI SLICE TYPES
// ============================================
export interface PotUISlice {
  potsLoading: boolean;
  setPotsLoading: (loading: boolean) => void;
}

// ============================================
// RECURRING BILL UI SLICE TYPES
// ============================================
export interface RecurringBillUISlice {
  recurringBillsLoading: boolean;
  setRecurringBillsLoading: (loading: boolean) => void;
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
