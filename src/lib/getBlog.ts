import { CardItem } from "@/components/test/MainContentCard";
import { supabase } from "./supabaseClient"; // 你的 supabase 实例
import pool from "./db";


export interface BlogRepository {
  getBlog(identifier: string): Promise<CardItem | null>
}


export const blogSupabaseRepo: BlogRepository = {
  async getBlog(identifier: string): Promise<CardItem | null> {
    const isId = /^\d+$/.test(identifier);
    const value = decodeURIComponent(identifier);

    const { data, error } = await supabase
      .from("blogs")
      .select("*")
      .eq(isId ? "id" : "slug", value)
      .maybeSingle();

    if (error) {
      console.error("Supabase getBlog error:", error);
      return null;
    }

    return data;
  },
};

export const blogPostgresRepo: BlogRepository = {
  async getBlog(identifier: string): Promise<CardItem | null> {
    const isId = /^\d+$/.test(identifier)
    const value = decodeURIComponent(identifier)

    const { rows } = await pool.query<CardItem>(
      `
      SELECT *
      FROM blogs
      WHERE ${isId ? "blog_index = $1" : "slug = $1"}
      LIMIT 1
      `,
      [value]
    )

    return rows[0] ?? null
  }
}