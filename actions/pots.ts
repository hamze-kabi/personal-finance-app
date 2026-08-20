"use server";

import { createClient } from "@/lib/supabase/server";
import { CreatePotSchema, UpdatePotSchema } from "@/schemas";
import { revalidatePath } from "next/cache";

export async function createPot(data: any) {
  const supabase = await createClient();

  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError || !user) {
    return { error: "You must be logged in to create a pot" };
  }

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
      user_id: user.id,
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

  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError || !user) {
    return { error: "You must be logged in to update a pot" };
  }

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
    .eq("user_id", user.id)
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

  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError || !user) {
    return { error: "You must be logged in to delete a pot" };
  }

  const { error } = await supabase
    .from("pots")
    .delete()
    .eq("id", id)
    .eq("user_id", user.id);

  if (error) {
    return { error: error.message };
  }

  revalidatePath("/pots");
  return { success: "Pot deleted successfully" };
}
