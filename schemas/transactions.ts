import { z } from "zod";

export const TransactionSchema = z.object({
  id: z.number().optional(),
  user_id: z.string().uuid().optional(),
  avatar: z.string().nullable().optional(),
  name: z.string().min(1, "Name is required"),
  category: z.string().min(1, "Category is required"),
  date: z.string().datetime({ offset: true }),
  amount: z
    .number()
    .multipleOf(0.01, "Amount must have up to 2 decimal places"),
  recurring: z.boolean().default(false),
  created_at: z.string().datetime({ offset: true }).optional(),
});

export const CreateTransactionSchema = TransactionSchema.omit({
  id: true,
  user_id: true,
  created_at: true,
});

export const UpdateTransactionSchema = CreateTransactionSchema.partial();

export type Transaction = z.infer<typeof TransactionSchema>;
export type CreateTransaction = z.infer<typeof CreateTransactionSchema>;
export type UpdateTransaction = z.infer<typeof UpdateTransactionSchema>;
