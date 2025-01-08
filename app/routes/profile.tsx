import { useLoaderData } from "@remix-run/react";
import { supabase } from "~/supabase.server";

export const loader = async () => {
  const { data, error } = await supabase.from("timothy-chiu-supabase").select("*");
  if (error) {
    throw new Error(error.message);
  }
  return data;
};

export default function Profile() {
  const data = useLoaderData();
  return <pre>{JSON.stringify(data, null, 2)}</pre>;
}