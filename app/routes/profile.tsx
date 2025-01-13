import { useLoaderData } from "@remix-run/react";
import { createServerClient } from "@supabase/ssr";
import { type LoaderFunctionArgs } from "@remix-run/node";

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const supabase = createServerClient(
    process.env.SUPABASE_URL!,
    process.env.SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return parse(request.headers.get("Cookie") ?? "");
        },
      },
    }
  );

  // Get the authenticated user's session
  const {
    data: { session },
    error: sessionError,
  } = await supabase.auth.getSession();

  if (sessionError) {
    throw new Error(sessionError.message);
  }

  if (!session) {
    throw new Response("Unauthorized", { status: 401 });
  }

  // Fetch the user's profile from the "users" table based on their authenticated user ID
  const { data: profile, error: profileError } = await supabase
    .from("users")
    .select("*")
    .eq("id", session.user.id)
    .single();

  if (profileError) {
    throw new Error(profileError.message);
  }

  return new Response(
    JSON.stringify({ profile }),
    {
      headers: { "Content-Type": "application/json" },
    }
  );
};

export default function Profile() {
  const { profile } = useLoaderData<typeof loader>();
  return (
    <div>
      <h1>User Profile</h1>
      <pre>{JSON.stringify(profile, null, 2)}</pre>
    </div>
  );
}


