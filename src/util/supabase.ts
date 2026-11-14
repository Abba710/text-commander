import { chromeStorage } from "@/lib/chrome-storage";
import { createClient } from "@supabase/supabase-js";
import { AUTH_KEY } from "@/consts/supabase-consts";
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY;

export const supabase = createClient(supabaseUrl, supabaseKey, {
  auth: {
    storage: chromeStorage,
    storageKey: AUTH_KEY,
    persistSession: true,
    autoRefreshToken: true,
    detectSessionInUrl: false,
  },
});
