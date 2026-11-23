import { supabase } from "@/util/supabase";

export async function fetchEntitlements() {
  const { data, error } = await supabase
    .from("active_entitlements")
    .select("feature_key, feature_type, expires_at");

  if (error) {
    return {
      success: false as const,
      error,
    };
  }

  return {
    success: true as const,
    data,
  };
}
