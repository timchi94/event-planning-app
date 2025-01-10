import { type LoaderFunctionArgs } from '@remix-run/node';
import { getSupabaseWithSessionHeaders } from '~/supabase.server';
import { redirect } from '@remix-run/node';  // Only import `redirect` now
import { useLoaderData } from "@remix-run/react";
import { createBrowserClient } from "@supabase/ssr";

export let loader = async ({ request }: LoaderFunctionArgs) => {
  const { headers, session } = await getSupabaseWithSessionHeaders({
    request,
  });

  if (session) {
    return redirect('/', { headers });
  }

  // Use the standard Response.json method
  return new Response(JSON.stringify({ success: true }), {
    headers: {
      ...headers,
      'Content-Type': 'application/json', // Make sure to set Content-Type header
    },
  });
};

export default function LoginPage() {
  const { SUPABASE_URL, SUPABASE_ANON_KEY } = useLoaderData();

  const supabase = createBrowserClient(SUPABASE_URL, SUPABASE_ANON_KEY);

  const handleLogin = async () => {
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: `https://event-planning-app-nu.vercel.app/auth/callback`,
        },
      });

      if (error) {
        console.error('Error during login:', error.message);
        alert('Login failed. Please try again.');
      }
    } catch (err) {
      console.error('Unexpected error during login:', err);
      alert('Something went wrong. Please try again.');
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '50px' }}>
      <h1>Login</h1>
      <button
        onClick={handleLogin}
        style={{ padding: '10px 20px', fontSize: '16px', cursor: 'pointer' }}
      >
        Login with Google
      </button>
    </div>
  );
}




