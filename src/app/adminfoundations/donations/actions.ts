"use server";

import { createClient } from "@supabase/supabase-js";
import { revalidatePath } from "next/cache";

const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function getDonations() {
  const { data, error } = await supabaseAdmin
    .from("donations")
    .select("*, cause_items(title)")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error fetching donations:", error.message);
    return [];
  }
  return data;
}

export async function getApprovedGeneralFundTotals() {
  const { data, error } = await supabaseAdmin
    .from("foundation_donations")
    .select("amount")
    .eq("status", "approved")
    .like("payment_proof_url", "general-fund/%");

  if (error) {
    console.error("Error fetching approved General Fund totals:", error.message);
    throw new Error("Failed to load approved General Fund totals.");
  }

  return {
    count: data.length,
    amount: data.reduce((sum, donation) => sum + Number(donation.amount), 0),
  };
}

export async function deleteDonation(id: number) {
  const { error } = await supabaseAdmin
    .from("donations")
    .delete()
    .eq("id", id);

  if (error) {
    console.error("Error deleting donation:", error.message);
    throw new Error(error.message);
  }
  revalidatePath("/adminfoundations/donations");
}

export async function updateDonationStatus(id: number, isDonated: boolean) {
  const { error } = await supabaseAdmin
    .from("donations")
    .update({ is_donated: isDonated })
    .eq("id", id);

  if (error) {
    console.error("Error updating donation status:", error.message);
    throw new Error(error.message);
  }
  revalidatePath("/adminfoundations/donations");
}
