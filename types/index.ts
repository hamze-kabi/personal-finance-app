// Export all types from individual files
export * from "./transactions";
export * from "./budgets";
export * from "./pots";

// ============================================
// DERIVED TYPES (Calculated from database data)
// ============================================

export interface Balance {
  current: number;
  income: number;
  expenses: number;
}

export interface BudgetSummary extends Budget {
  spent: number;
  remaining: number;
  progressPercentage: number;
}

export interface PotProgress extends Pot {
  progressPercentage: number;
}
