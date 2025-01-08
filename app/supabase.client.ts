import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.SUPABASE_URL || ""; 
const supabaseKey = process.env.SUPABASE_ANON_KEY || ""; 

console.log("Supabase URL:", process.env.SUPABASE_URL);
console.log("Supabase Key:", process.env.SUPABASE_ANON_KEY);

export const supabaseClient = createClient(supabaseUrl, supabaseKey);

