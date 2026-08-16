import { z } from "zod";

export const BudgetSchema = z.object({
  id: z.number().optional(),
  user_id: z.string().uuid().optional(),
  category: z.string().min(1, "Category is required"),
  maximum: z
    .number()
    .positive("Maximum must be greater than 0")
    .multipleOf(0.01),
  theme: z
    .string()
    .regex(/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/, "Invalid hex color")
    .nullable()
    .optional(),
  created_at: z.string().datetime({ offset: true }).optional(),
});

export const CreateBudgetSchema = BudgetSchema.omit({
  id: true,
  user_id: true,
  created_at: true,
});

export const UpdateBudgetSchema = CreateBudgetSchema.partial();

export type Budget = z.infer<typeof BudgetSchema>;
export type CreateBudget = z.infer<typeof CreateBudgetSchema>;
export type UpdateBudget = z.infer<typeof UpdateBudgetSchema>;
