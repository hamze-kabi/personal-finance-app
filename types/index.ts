export * from "./transactions";
export * from "./budgets";
export * from "./pots";

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
