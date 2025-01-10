import { type MetaFunction } from "@remix-run/node";
import { useNavigate, useLoaderData } from "@remix-run/react";
import { createServerClient, parseCookieHeader, serializeCookieHeader } from "@supabase/ssr";
import { createBrowserClient } from "@supabase/ssr";
import { getEnvironmentVariables } from "~/supabase.server";
import { type LoaderFunctionArgs, json } from "@remix-run/node";

export async function loader({ request }: LoaderFunctionArgs) {
  const headers = new Headers();

  const supabase = createServerClient(
    process.env.SUPABASE_URL!,
    process.env.SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return parseCookieHeader(request.headers.get("Cookie") ?? "");
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) =>
            headers.append("Set-Cookie", serializeCookieHeader(name, value, options))
          );
        },
      },
    }
  );

  // Get environment variables to pass to the client
  const env = await getEnvironmentVariables();

  return json({ env }, { headers });
}

export async function action({ request }: LoaderFunctionArgs) {
  const headers = new Headers();

  const supabase = createServerClient(
    process.env.SUPABASE_URL!,
    process.env.SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return parseCookieHeader(request.headers.get("Cookie") ?? "");
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) =>
            headers.append("Set-Cookie", serializeCookieHeader(name, value, options))
          );
        },
      },
    }
  );

  return new Response("Action executed", { headers });
}

export const meta: MetaFunction = () => {
  return [
    { title: "Event Planning App" },
    { name: "description", content: "Use this app to plan events!" },
  ];
};

export default function Index() {
  const navigate = useNavigate();
  const { env } = useLoaderData<typeof loader>();

  const supabase = createBrowserClient(env.SUPABASE_URL, env.SUPABASE_ANON_KEY);

  const handleCreateEvent = () => {
    navigate("/create");
  };

  const handleProfile = () => {
    navigate("/profile");
  };

  return (
    <div>
      <h1>Event Planner!</h1>
      <button onClick={handleCreateEvent}>Create Event</button>
      <button onClick={handleProfile}>Go to Profile</button>
    </div>
  );
}
