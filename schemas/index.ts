export * from "./transactions";
export * from "./budgets";
export * from "./pots";

import { z } from "zod";
import { BudgetSchema } from "./budgets";
import { PotSchema } from "./pots";

export const BalanceSchema = z.object({
  current: z.number(),
  income: z.number(),
  expenses: z.number(),
});

export const BudgetSummarySchema = BudgetSchema.extend({
  spent: z.number(),
  remaining: z.number(),
  progressPercentage: z.number().min(0).max(100),
});

export const PotProgressSchema = PotSchema.extend({
  progressPercentage: z.number().min(0).max(100),
});

export type Balance = z.infer<typeof BalanceSchema>;
export type BudgetSummary = z.infer<typeof BudgetSummarySchema>;
export type PotProgress = z.infer<typeof PotProgressSchema>;
