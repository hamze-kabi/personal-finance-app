"use server";

import { createClient } from "@/lib/supabase/server";
import { CreateTransactionSchema } from "@/schemas";
import { revalidatePath } from "next/cache";

export async function createTransaction(formData: FormData) {
  const supabase = await createClient();

  // Get the current user
  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError || !user) {
    return { error: "You must be logged in to create a transaction" };
  }

  // Extract and validate data
  const rawData = {
    avatar: formData.get("avatar") as string | null,
    name: formData.get("name") as string,
    category: formData.get("category") as string,
    date: formData.get("date") as string,
    amount: parseFloat(formData.get("amount") as string),
    recurring: formData.get("recurring") === "true",
  };

  const validationResult = CreateTransactionSchema.safeParse(rawData);

  if (!validationResult.success) {
    return {
      error: validationResult.error.issues.map((e) => e.message).join(", "),
    };
  }

  const validatedData = validationResult.data;

  // Insert with the logged-in user's ID
  const { data, error } = await supabase
    .from("transactions")
    .insert({
      user_id: user.id,
      avatar: validatedData.avatar,
      name: validatedData.name,
      category: validatedData.category,
      date: validatedData.date,
      amount: validatedData.amount,
      recurring: validatedData.recurring,
    })
    .select()
    .single();

  if (error) {
    return { error: error.message };
  }

  revalidatePath("/transactions");
  return { success: "Transaction created successfully", data };
}

export async function getTransactions() {
  const supabase = await createClient();

  // Get the current user
  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError || !user) {
    return { error: "You must be logged in to view transactions" };
  }

  const { data, error } = await supabase
    .from("transactions")
    .select("*")
    .eq("user_id", user.id)
    .order("date", { ascending: false });

  if (error) {
    return { error: error.message };
  }

  return { data };
}

export async function getBudgets() {
  const supabase = await createClient();

  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError || !user) {
    return { error: "You must be logged in to view budgets" };
  }

  const { data, error } = await supabase
    .from("budgets")
    .select("*")
    .eq("user_id", user.id)
    .order("category", { ascending: true });

  if (error) {
    return { error: error.message };
  }

  return { data };
}

export async function getPots() {
  const supabase = await createClient();

  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError || !user) {
    return { error: "You must be logged in to view pots" };
  }

  const { data, error } = await supabase
    .from("pots")
    .select("*")
    .eq("user_id", user.id)
    .order("name", { ascending: true });

  if (error) {
    return { error: error.message };
  }

  return { data };
}
