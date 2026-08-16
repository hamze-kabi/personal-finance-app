// In actions/pots.ts
"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";

export async function deletePot(id: number) {
  const supabase = await createClient();

  // TEMPORARY: Hardcoded user ID for testing
  const TEST_USER_ID = "48da69c7-f18c-4f18-865d-8b1711fb82db";

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
