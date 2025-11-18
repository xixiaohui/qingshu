"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";

import {
  Box,
  Card,
  CardMedia,
  CardContent,
  Typography,
  CircularProgress,
  Pagination,
  Link,
} from "@mui/material";
import Masonry from "@mui/lab/Masonry";
import FramePage from "../Frame";
import { slugify } from "./Latest";

const pageSize = 7;

function BlogListMasonryMain() {
  const [blogs, setBlogs] = useState<any[]>([]);
  const [page, setPage] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const [loading, setLoading] = useState(false);

  // 获取总条数
  async function fetchCount() {
    const { count } = await supabase
      .from("blogs")
      .select("*", { count: "exact", head: true });

    setTotalCount(count || 0);
  }

  // 分页读取数据
  async function fetchBlogs(page: number) {
    setLoading(true);

    const from = (page - 1) * pageSize;
    const to = from + pageSize - 1;

    const { data, error } = await supabase
      .from("blogs")
      .select("*")
      .order("id", { ascending: false })
      .range(from, to);

    if (!error) setBlogs(data || []);

    setLoading(false);
  }

  useEffect(() => {
    fetchCount(); // 页面首次加载统计总数
  }, []);

  useEffect(() => {
    fetchBlogs(page); // 页面变化时加载新页数据
  }, [page]);

  const pageCount = Math.ceil(totalCount / pageSize);

  return (
    <Box sx={{ py: 4 }}>
      {loading && (
        <Box sx={{ display: "flex", justifyContent: "center", py: 8 }}>
          <CircularProgress />
        </Box>
      )}

      {!loading && (
        <Masonry
          columns={{ xs: 1, sm: 2, md: 3 }}
          spacing={2}
          sx={{ mx: "auto" }}
        >
          {blogs.map((item) => (
            <Card key={item.id} sx={{ overflow: "hidden" }}>
              <Link
                href={`/blog/${slugify(item.title)}`}
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
                />
              </Link>

              <CardContent>
                <Typography variant="h6" fontWeight="bold">
                  {item.title}
                </Typography>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{ mt: 1 }}
                >
                  {item.summary || item.content?.slice(0, 90) + "..."}
                </Typography>
              </CardContent>
            </Card>
          ))}
        </Masonry>
      )}

      {/* 分页 */}
      <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
        <Pagination
          count={pageCount}
          page={page}
          onChange={(e, v) => setPage(v)}
          size="large"
        />
      </Box>
    </Box>
  );
}

export default function BlogListMasonry() {
  return (
    <FramePage>
      <BlogListMasonryMain></BlogListMasonryMain>
    </FramePage>
  );
}
