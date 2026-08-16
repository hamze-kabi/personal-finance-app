import { z } from "zod";

export const PotSchema = z.object({
  id: z.number().optional(),
  user_id: z.string().uuid().optional(),
  name: z.string().min(1, "Pot name is required"),
  target: z.number().positive("Target must be greater than 0").multipleOf(0.01),
  total: z
    .number()
    .min(0, "Total cannot be negative")
    .multipleOf(0.01)
    .default(0),
  theme: z
    .string()
    .regex(/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/, "Invalid hex color")
    .nullable()
    .optional(),
  created_at: z.string().datetime({ offset: true }).optional(),
});

export const CreatePotSchema = PotSchema.omit({
  id: true,
  user_id: true,
  created_at: true,
});

export const UpdatePotSchema = CreatePotSchema.partial();

export type Pot = z.infer<typeof PotSchema>;
export type CreatePot = z.infer<typeof CreatePotSchema>;
export type UpdatePot = z.infer<typeof UpdatePotSchema>;
