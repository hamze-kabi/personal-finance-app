"use server";

import { createClient } from "@/lib/supabase/server";
import { CreatePotSchema, UpdatePotSchema } from "@/schemas";
import { revalidatePath } from "next/cache";

// TEMPORARY: Hardcoded user ID for testing
const TEST_USER_ID = "48da69c7-f18c-4f18-865d-8b1711fb82db";

export async function createPot(data: any) {
  const supabase = await createClient();

  const validationResult = CreatePotSchema.safeParse(data);
  if (!validationResult.success) {
    return {
      error: validationResult.error.issues.map((e) => e.message).join(", "),
    };
  }

  const validatedData = validationResult.data;

  const { data: pot, error } = await supabase
    .from("pots")
    .insert({
      ...validatedData,
      user_id: TEST_USER_ID,
    })
    .select()
    .single();

  if (error) {
    return { error: error.message };
  }

  revalidatePath("/pots");
  return { success: "Pot created successfully", data: pot };
}

export async function updatePot(id: number, data: any) {
  const supabase = await createClient();

  const validationResult = UpdatePotSchema.safeParse(data);
  if (!validationResult.success) {
    return {
      error: validationResult.error.issues.map((e) => e.message).join(", "),
    };
  }

  const validatedData = validationResult.data;

  const { data: pot, error } = await supabase
    .from("pots")
    .update(validatedData)
    .eq("id", id)
    .eq("user_id", TEST_USER_ID)
    .select()
    .single();

  if (error) {
    return { error: error.message };
  }

  revalidatePath("/pots");
  return { success: "Pot updated successfully", data: pot };
}

export async function deletePot(id: number) {
  const supabase = await createClient();

  const { error } = await supabase
    .from("pots")
    .delete()
    .eq("id", id)
    .eq("user_id", TEST_USER_ID);

  if (error) {
    return { error: error.message };
  }

  revalidatePath("/pots");
  return { success: "Pot deleted successfully" };
}
