"use server";

import { createClient } from "@/lib/supabase/server";
import { CreateBudgetSchema, UpdateBudgetSchema } from "@/schemas";
import { revalidatePath } from "next/cache";

export async function createBudget(data: any) {
  const supabase = await createClient();

  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError || !user) {
    return { error: "You must be logged in to create a budget" };
  }

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
      user_id: user.id,
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

  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError || !user) {
    return { error: "You must be logged in to update a budget" };
  }

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
    .eq("user_id", user.id)
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

  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError || !user) {
    return { error: "You must be logged in to delete a budget" };
  }

  const { error } = await supabase
    .from("budgets")
    .delete()
    .eq("id", id)
    .eq("user_id", user.id);

  if (error) {
    return { error: error.message };
  }

  revalidatePath("/budgets");
  return { success: "Budget deleted successfully" };
}
