"use server";

import { createClient } from "@/lib/supabase/server";
import { CreateTransactionSchema } from "@/schemas";
import { revalidatePath } from "next/cache";

export async function createTransaction(formData: FormData) {
  // TEMPORARY: Use a hardcoded user ID for testing
  // TODO: Replace with actual authentication when Phase 4 is complete
  const TEST_USER_ID = "48da69c7-f18c-4f18-865d-8b1711fb82db"; // Your UUID from Supabase

  // Comment out the authentication check for now
  // const supabase = await createClient();
  // const {
  //   data: { user },
  //   error: userError,
  // } = await supabase.auth.getUser();
  // if (userError || !user) {
  //   return { error: "You must be logged in to create a transaction" };
  // }

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

  // Insert with hardcoded user ID
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("transactions")
    .insert({
      user_id: TEST_USER_ID, // Using hardcoded ID instead of user.id
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
