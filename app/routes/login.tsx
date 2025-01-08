import { ActionFunction, redirect } from "@remix-run/node";
import { supabase } from "~/supabase.client";
import { Form } from "@remix-run/react";


export const action: ActionFunction = async ({ request }) => {
  const { url } = await supabase.auth.signInWithOAuth({
    provider: "google",
    options: {
      redirectTo: "https://event-planning-app-nu.vercel.app/auth/google/callback", 
    },
  });

  return redirect(url); 
};


export default function LoginPage() {
  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", marginTop: "50px" }}>
      <h1>Login</h1>
      <Form method="post">
        <button type="submit" style={{ padding: "10px 20px", fontSize: "16px" }}>
          Login with Google
        </button>
      </Form>
    </div>
  );
}