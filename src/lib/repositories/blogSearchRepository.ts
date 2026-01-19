import { CardItem } from "@/components/test/MainContentCard";


export interface BlogSearchRepository {
  searchBlogs(
    keyword: string,
    limit?: number
  ): Promise<CardItem[]>;
}
