import { CardItem } from "@/components/test/MainContentCard";
import { BlogSearchRepository } from "./blogSearchRepository";


export const blogSearchPostgresRepo: BlogSearchRepository = {
  async searchBlogs(
    keyword: string,
    limit = 50
  ): Promise<CardItem[]> {
    const res = await fetch(
      `/api/blogs/search?q=${encodeURIComponent(keyword)}&limit=${limit}`,
      {
        method: "GET",
      }
    );

    if (!res.ok) {
      throw new Error("PostgreSQL search API failed");
    }

    return res.json();
  },
};
