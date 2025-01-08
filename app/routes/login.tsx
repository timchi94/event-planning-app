import { supabase } from "~/supabase.server";

export default function LoginPage() {
  const handleLogin = async () => {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: "https://event-planning-app-nu.vercel.app/auth/google/callback",
      },
    });

    if (error) {
      console.error("Error during sign-in:", error.message);
      return;
    }

    if (data.url) {
      window.location.href = data.url;
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
