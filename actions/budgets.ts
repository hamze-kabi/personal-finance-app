"use server";

import { createClient } from "@/lib/supabase/server";
import { CreateBudgetSchema, UpdateBudgetSchema } from "@/schemas";
import { revalidatePath } from "next/cache";

// TEMPORARY: Hardcoded user ID for testing
const TEST_USER_ID = "48da69c7-f18c-4f18-865d-8b1711fb82db";

export async function createBudget(data: any) {
  const supabase = await createClient();

  // Validate the data
  const validationResult = CreateBudgetSchema.safeParse(data);
  if (!validationResult.success) {
    return {
      error: validationResult.error.issues.map((e) => e.message).join(", "),
    };
  }

  const validatedData = validationResult.data;

  const { data: budget, error } = await supabase
    .from("budgets")
    .insert({
      ...validatedData,
      user_id: TEST_USER_ID,
    })
    .select()
    .single();

  if (error) {
    return { error: error.message };
  }

  revalidatePath("/budgets");
  return { success: "Budget created successfully", data: budget };
}

export async function updateBudget(id: number, data: any) {
  const supabase = await createClient();

  const validationResult = UpdateBudgetSchema.safeParse(data);
  if (!validationResult.success) {
    return {
      error: validationResult.error.issues.map((e) => e.message).join(", "),
    };
  }

  const validatedData = validationResult.data;

  const { data: budget, error } = await supabase
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
  return { success: "Budget updated successfully", data: budget };
}

export async function deleteBudget(id: number) {
  const supabase = await createClient();

  const { error } = await supabase
    .from("budgets")
    .delete()
    .eq("id", id)
    .eq("user_id", TEST_USER_ID);

  if (error) {
    return { error: error.message };
  }

  revalidatePath("/budgets");
  return { success: "Budget deleted successfully" };
}
