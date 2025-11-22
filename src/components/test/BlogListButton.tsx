"use client";
import { useState, useEffect } from "react";
import {
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  CircularProgress,
  Link,
  Typography,
} from "@mui/material";
import Masonry from "@mui/lab/Masonry";
import { supabase } from "@/lib/supabaseClient";
import FramePage from "../Frame";
import {
  Author,
  StyledCard,
  StyledCardContent,
  StyledTypography,
} from "./MainContentCard";
import { motion } from "framer-motion";

export default function BlogListButton() {
  const [blogs, setBlogs] = useState<any[]>([]);
  const [page, setPage] = useState(0);
  const [loading, setLoading] = useState(false);
  
  const LIMIT = 7;

  const fetchBlogs = async () => {
    setLoading(true);

    // 1. 记录加载前 scrollHeight
    const prevScrollHeight = document.documentElement.scrollHeight;

    const start = page * LIMIT;
    const end = start + LIMIT - 1;

    const { data, error } = await supabase
      .from("blogs")
      .select("*")
      .range(start, end)
      .order("id", { ascending: true });

    if (error) {
      console.error(error);
      setLoading(false);
      return;
    }

    // 2. 更新 state（新增数据放后面）
    setBlogs((prev) => [...prev, ...data]);

    // 3. 等待 DOM 渲染后恢复滚动位置
    requestAnimationFrame(() => {
      const newScrollHeight = document.documentElement.scrollHeight;
      const diff = newScrollHeight - prevScrollHeight;
      window.scrollTo(0, window.scrollY + diff);
    });

    setLoading(false);
  };

  // 初次加载
  useEffect(() => {
    fetchBlogs();
  }, [page]);

  const handleLoadMore = () => {
    setPage((p) => p + 1);
  };

  return (
    <FramePage>
      <Box sx={{ px: 2, pt: 4 }}>
        <Masonry columns={{ xs: 1, sm: 2, md: 3 }} spacing={2}>
          {blogs.map((data, index) => (
            <Card key={index} variant="outlined" tabIndex={0}>
              <Link
                href={`/blog/${data.slug}`}
                style={{ textDecoration: "none" }}
              >
                <CardMedia
                  component="img"
                  image={data.img || "/placeholder.jpg"}
                  alt={data.title}
                  sx={{
                    width: "100%",
                    height: "auto",
                    display: "block",
                  }}
                />
              </Link>
              <StyledCardContent>
                <Typography gutterBottom variant="caption" component="div">
                  {data.tag}
                </Typography>
                <Typography gutterBottom variant="h6" component="div">
                  {data.title}
                </Typography>
                <StyledTypography
                  variant="body2"
                  color="text.secondary"
                  gutterBottom
                >
                  {data.description}
                </StyledTypography>
              </StyledCardContent>
              <Author authors={data.authors} time={data.created_at} />
            </Card>
          ))}
        </Masonry>

        <Box sx={{ textAlign: "center", mt: 3 }}>
          <Button
            variant="contained"
            onClick={handleLoadMore}
            disabled={loading}
          >
            {loading ? (
              <CircularProgress size={22} sx={{ color: "primary" }} />
            ) : (
              "加载更多"
            )}
          </Button>
        </Box>
      </Box>
    </FramePage>
  );
}
