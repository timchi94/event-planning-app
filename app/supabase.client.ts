import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.SUPABASE_URL || ""; 
const supabaseKey = process.env.SUPABASE_ANON_KEY || ""; 

console.log(supabaseUrl, supabaseKey)

if (!supabaseUrl || !supabaseKey) {
  throw new Error("supabaseUrl and supabaseKey must be set in environment variables");
}

export const supabase = createClient(supabaseUrl, supabaseKey);

