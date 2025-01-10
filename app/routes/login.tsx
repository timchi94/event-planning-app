import { type LoaderFunctionArgs } from '@remix-run/node'
import { getSupabaseWithSessionHeaders } from "~/supabase.server";


export let loader = async ({ request }: LoaderFunctionArgs) => {
  const { headers, session } = await getSupabaseWithSessionHeaders({
    request,
  });

  if (session) {
    return redirect('/', { headers });
  }

  return json({ success: true }, { headers });
};




export default function LoginPage() {
   const handleLogin = async () => {
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google', 
        options: {
          redirectTo: `https://event-planning-app-nu.vercel.app/auth/callback`, 
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
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", marginTop: "50px" }}>
      <h1>Login</h1>
      <button
        onClick={handleLogin}
        style={{ padding: "10px 20px", fontSize: "16px", cursor: "pointer" }}
      >
        Login with Google
      </button>
    </div>
  );
}
