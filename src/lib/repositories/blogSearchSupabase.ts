
import { CardItem } from "@/components/test/MainContentCard";
import { BlogSearchRepository } from "./blogSearchRepository";
import { supabase } from "../supabaseClient";


export const blogSearchSupabaseRepo: BlogSearchRepository = {
  async searchBlogs(
    keyword: string,
    limit = 50
  ): Promise<CardItem[]> {
    const like = `%${keyword}%`;

    // 1️⃣ tag
    let { data, error } = await supabase
      .from("blogs")
      .select("id,img,tag,title,description,authors,slug")
      .ilike("tag", like)
      .order("id", { ascending: true })
      .range(0, limit - 1);

    // 2️⃣ title
    if ((!data || data.length === 0) && !error) {
      const res = await supabase
        .from("blogs")
        .select("id,img,tag,title,description,authors,slug")
        .ilike("title", like)
        .order("id", { ascending: true })
        .range(0, limit - 1);

      data = res.data;
      error = res.error;
    }

    // 3️⃣ content
    if ((!data || data.length === 0) && !error) {
      const res = await supabase
        .from("blogs")
        .select("id,img,tag,title,description,authors,slug")
        .ilike("content", like)
        .order("id", { ascending: true })
        .range(0, limit - 1);

      data = res.data;
    }

    return data ?? [];
  }
};
