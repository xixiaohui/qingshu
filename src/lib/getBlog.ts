import { CardItem } from "@/components/test/MainContentCard";
import { supabase } from "./supabaseClient"; // 你的 supabase 实例


export async function getBlog(identifier: string): Promise<CardItem | null> {
  const isId = /^\d+$/.test(identifier);
  const value = decodeURIComponent(identifier);

  const { data, error } = await supabase
    .from("blogs")
    .select("*")
    .order("created_at", { ascending: false })
    .eq(isId ? "id" : "slug", value)
    .maybeSingle();

  if (error) {
    console.error("Supabase getBlog error:", error);
    return null;
  }

  return data;
}
