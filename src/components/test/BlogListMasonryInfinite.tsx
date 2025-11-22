"use client";

import { useEffect, useRef, useState } from "react";
import { supabase } from "@/lib/supabaseClient";

import {
  Box,
  Card,
  CardMedia,
  CardContent,
  Typography,
  CircularProgress,
  Link,
} from "@mui/material";
import Masonry from "@mui/lab/Masonry";
import FramePage from "../Frame";


const pageSize = 12;

function BlogListMasonryInfiniteMain() {
  const [blogs, setBlogs] = useState<any[]>([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  const loadMoreRef = useRef<HTMLDivElement | null>(null);

  // 加载一页数据
  async function fetchBlogs(page: number) {
    if (loading) return;
    setLoading(true);

    const from = (page - 1) * pageSize;
    const to = from + pageSize - 1;

    const { data, error } = await supabase
      .from("blogs")
      .select("*")
      .order("id", { ascending: false })
      .range(from, to);

    if (error) {
      console.error(error);
      setLoading(false);
      return;
    }

    // 如果返回的数据条数 < pageSize，说明已经到最后一页
    if (!data || data.length < pageSize) {
      setHasMore(false);
    }

    setBlogs((prev) => [...data,...prev]);
    setLoading(false);
  }

  // 首次加载第一页
  useEffect(() => {
    fetchBlogs(1);
  }, []);

  // 监听底部元素，触发加载下一页
  useEffect(() => {
    if (!loadMoreRef.current || !hasMore) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !loading) {
          setPage((prev) => prev + 1);
        }
      },
      { threshold: 1 }
    );

    observer.observe(loadMoreRef.current);

    return () => {
      observer.disconnect();
    };
  }, [hasMore, loading]);

  // 页面变化 → 加载更多
  useEffect(() => {
    if (page !== 1) fetchBlogs(page);
  }, [page]);

  return (
    <Box sx={{ py: 4 }}>
      {/* Masonry 瀑布流 */}
      <Masonry columns={{ xs: 1, sm: 2, md: 3 }} spacing={2}>
        {blogs.map((item) => (
          <Card key={item.id} sx={{ overflow: "hidden" }}>
            <Link
              href={`/blog/${item.slug}`}
              style={{ textDecoration: "none" }}
            >
              <CardMedia
                component="img"
                image={item.img || "/placeholder.jpg"}
                alt={item.title}
                sx={{
                  width: "100%",
                  height: "auto",
                  display: "block",
                }}
                loading="lazy"
              />
            </Link>

            <CardContent>
              <Typography variant="h6" fontWeight="bold">
                {item.title}
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                {item.summary || item.content?.slice(0, 90) + "..."}
              </Typography>
            </CardContent>
          </Card>
        ))}
      </Masonry>

      {/* 无限滚动触发器 */}
      <Box
        ref={loadMoreRef}
        sx={{
          height: "60px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          mt: 3,
        }}
      >
        {loading && <CircularProgress />}
        {!hasMore && (
          <Typography variant="body2" color="text.secondary">
            — 没有更多QS了 —
          </Typography>
        )}
      </Box>
    </Box>
  );
}

export default function BlogListMasonryInfinite() {
  return (
    <FramePage>
      <BlogListMasonryInfiniteMain></BlogListMasonryInfiniteMain>
    </FramePage>
  );
}
