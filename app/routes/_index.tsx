import { useNavigate, useLoaderData } from "@remix-run/react";
import { createServerClient, parseCookieHeader, serializeCookieHeader,createBrowserClient } from "@supabase/ssr";
import { getEnvironmentVariables } from "~/supabase.server";
import { type LoaderFunctionArgs, redirect, type MetaFunction } from "@remix-run/node";

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

  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (session) {
    // Redirect to the profile page if a session is active
    return redirect("/profile");
  }

  // Get environment variables to pass to the client
  const env = await getEnvironmentVariables();

  return new Response(
    JSON.stringify({ env }),
    {
      headers: {
        ...Object.fromEntries(headers.entries()),
        "Content-Type": "application/json",
      },
    }
  );
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

  const handleLogin = () => {
    navigate("/login")
  }

  return (
    <div className="bg-greenPrimary">
      <div className="py-8 mx-8 min-h-screen md:py-12 md:mx-12 xl:w-desktop xl:mx-auto">
        <div>
          <h1 className="text-4xl font-bold pb-4 text-grayPrimary font-serif md:text-5xl md:pb-8">Event Planner!</h1>
            <div className="w-screen flex justify-evenly">
              <button className="px-4 py-2 rounded shadow-md transition-shadow duration-300 hover:shadow-lg" onClick={handleCreateEvent}>Create Event</button>
              <button className="px-4 py-2 rounded shadow-md transition-shadow duration-300 hover:shadow-lg" onClick={handleProfile}>Go to Profile</button>
              <button className="px-4 py-2 rounded shadow-md transition-shadow duration-300 hover:shadow-lg" onClick={handleLogin}>Go to Login</button>
            </div>
        </div>
      </div>
    </div>
  );
}
