import { ActionFunction, redirect } from "@remix-run/node";

import { supabase } from "~/supabase.server";

export const action: ActionFunction = async ({ request }) => {
  const { url } = await supabase.auth.signInWithOAuth({
    provider: "google",
    options: {
      redirectTo: "https://event-planning-app-nu.vercel.app/auth/google/callback",
    },
  });

  return redirect(url);
};
