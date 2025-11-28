"use client";

import { use, useEffect, useState } from "react";
import {
  Box,
  Typography,
  Stack,
  CircularProgress,
  Card,
  CardContent,
  Pagination,
} from "@mui/material";
import Link from "next/link";
import { supabase } from "@/lib/supabaseClient";
import FramePage from "@/components/Frame";

function AuthorPageContent({ name }: { name: string }) {
  const [posts, setPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const [page, setPage] = useState(1);
  const pageSize = 10;

  const [total, setTotal] = useState(0);

  const fetchPosts = async (pageNum: number) => {
    setLoading(true);

    const from = (pageNum - 1) * pageSize;
    const to = from + pageSize - 1;

    // 主查询
    const { data, error, count } = await supabase
      .from("blogs")
      .select("id, tag, img, title, slug, created_at, authors, description", {
        count: "exact",
      })
      .ilike("authors->0->>name", `%${name}%`)
      .order("created_at", { ascending: false })
      .range(from, to);

    if (!error && data) {
      setPosts(data);
      setTotal(count ?? 0);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchPosts(page);
  }, [name, page]);

  if (loading) {
    return (
      <Box mt={10} display="flex" justifyContent="center">
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box maxWidth="800px" mx="auto" py={6}>
      <Typography variant="h4" fontWeight="bold" gutterBottom>
        作者：{name}
      </Typography>

      {posts.length === 0 ? (
        <Typography color="text.secondary">暂无文章。</Typography>
      ) : (
        <>
          <Stack spacing={2}>
            {posts.map((post) => (
              <Card key={post.id} variant="outlined">
                <CardContent>
                  <Link href={`/blog/${post.slug}`}>
                    <Typography
                      variant="h6"
                      sx={{
                        cursor: "pointer",
                        "&:hover": { textDecoration: "underline" },
                      }}
                    >
                      {post.title}
                    </Typography>
                  </Link>

                  <Typography color="text.secondary" variant="caption">
                    {new Date(post.created_at).toLocaleDateString()}
                  </Typography>

                  {post.authors?.length > 0 && (
                    <Typography variant="body2" mt={1}>
                      作者：{post.authors.map((a: any) => a.name).join(", ")}
                    </Typography>
                  )}

                  <Typography color="text.secondary" variant="caption">
                    {post.description}
                  </Typography>
                </CardContent>
              </Card>
            ))}
          </Stack>
          {/* 分页器 */}
          <Box mt={4} display="flex" justifyContent="center">
            <Pagination
              count={Math.ceil(total / pageSize)}
              page={page}
              onChange={(_, value) => setPage(value)}
              color="primary"
              shape="rounded"
            />
          </Box>
        </>
      )}
    </Box>
  );
}

export default function AuthorPage({
  params,
}: {
  params: Promise<{ name: string }>;
}) {
  const { name } = use(params);
  const author_name = decodeURIComponent(name);
  return (
    <FramePage>
      <AuthorPageContent name={author_name}></AuthorPageContent>
    </FramePage>
  );
}
