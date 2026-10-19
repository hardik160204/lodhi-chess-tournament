import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "https://placeholder.supabase.co";
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "placeholder-key";

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export interface Registration {
  id?: string;
  name: string;
  phone: string;
  email: string;
  fide_id?: string;
  amount: number;
  utr: string;
  status: "PENDING" | "CONFIRMED" | "REJECTED";
  created_at?: string;
}