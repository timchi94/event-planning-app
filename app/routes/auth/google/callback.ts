import { LoaderFunction, redirect } from "@remix-run/node";
import { supabase } from "~/supabase.server"; 

export const loader: LoaderFunction = async ({ request }) => {
  const url = new URL(request.url);

  const accessToken = url.searchParams.get("access_token");
  const refreshToken = url.searchParams.get("refresh_token");

  if (accessToken && refreshToken) {
    const { user, session, error } = await supabase.auth.setSession({
      access_token: accessToken,
      refresh_token: refreshToken,
    });

    if (error) {
      return new Response(error.message, { status: 400 });
    }

    return redirect("/");
  }

  return new Response("Missing tokens in URL", { status: 400 });
};

