import { createClient } from "@supabase/supabase-js";
import { createServerClient, parseCookieHeader, serializeCookieHeader } from '@supabase/ssr';

const supabaseUrl = process.env.SUPABASE_URL || "";
const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY || "";
const supabaseAnonKey = process.env.SUPABASE_ANON_KEY || "";

export function getSupabaseWithHeaders({ request }: { request: Request }) {
  const headers = new Headers();

  const supabase = createServerClient(
    supabaseUrl,
    supabaseAnonKey,
    {
      cookies: {
        getAll() {
          return parseCookieHeader(request.headers.get('Cookie') ?? '');
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) => {
            headers.append('Set-Cookie', serializeCookieHeader(name, value, options));
          });
        },
      },
      auth: {
        detectSessionInUrl: true,
        flowType: 'pkce',
      },
    }
  );

  return { supabase, headers };
}

export async function getSupabaseWithSessionHeaders({
  request,
}: {
  request: Request;
}) {
  const { supabase, headers } = getSupabaseWithHeaders({
    request,
  });
  const {
    data: { session },
  } = await supabase.auth.getSession();

  return { session, headers, supabase };
}

export const supabase = createClient(supabaseUrl, supabaseServiceRoleKey);

// Function to pass environment variables to client
export async function getEnvironmentVariables() {
  return {
    SUPABASE_URL: supabaseUrl,
    SUPABASE_ANON_KEY: supabaseAnonKey, // Only pass anon key for client usage
  };
}

