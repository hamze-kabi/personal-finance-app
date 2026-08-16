// In actions/budget.ts (or budgets.ts)
"use server";

import { createClient } from "@/lib/supabase/server";
import { UpdateBudgetSchema } from "@/schemas";
import { revalidatePath } from "next/cache";

export async function updateBudget(id: number, data: any) {
  const supabase = await createClient();

  // TEMPORARY: Hardcoded user ID for testing
  const TEST_USER_ID = "48da69c7-f18c-4f18-865d-8b1711fb82db";

  // Validate the data
  const validationResult = UpdateBudgetSchema.safeParse(data);
  if (!validationResult.success) {
    return {
      error: validationResult.error.issues.map((e) => e.message).join(", "),
    };
  }

  const validatedData = validationResult.data;

  const { data: updatedData, error } = await supabase
    .from("budgets")
    .update(validatedData)
    .eq("id", id)
    .eq("user_id", TEST_USER_ID)
    .select()
    .single();

  if (error) {
    return { error: error.message };
  }

  revalidatePath("/budgets");
  return { success: "Budget updated successfully", data: updatedData };
}
