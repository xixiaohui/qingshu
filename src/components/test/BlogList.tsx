"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";

import {
  Box,
  Grid,
  Card,
  CardMedia,
  CardContent,
  Typography,
  Pagination,
  CircularProgress,
  Container,
} from "@mui/material";
import AppAppBar from "../homepage/AppAppBar";
import Footer from "../homepage/Footer";
import MainContentCard from "./MainContentCard";
import FramePage from "../Frame";

const pageSize = 7; // 每页显示12篇文章

export default function BlogList() {
  const [blogs, setBlogs] = useState<any[]>([]);
  const [page, setPage] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const [loading, setLoading] = useState(false);

  // 获取总条数
  async function fetchCount() {
    const { count } = await supabase
      .from("blogs")
      .select("*", { count: "exact", head: true });

    if (count) setTotalCount(count);
  }

  // 加载分页数据
  async function fetchBlogs(page: number) {
    setLoading(true);

    const from = (page - 1) * pageSize;
    const to = from + pageSize - 1;

    const { data, error } = await supabase
      .from("blogs")
      .select("*")
      .order("id", { ascending: false })
      .range(from, to);

    if (error) console.error(error);
    else setBlogs(data || []);

    setLoading(false);
  }

  useEffect(() => {
    fetchCount();
  }, []);

  useEffect(() => {
    fetchBlogs(page);
  }, [page]);

  const pageCount = Math.ceil(totalCount / pageSize);

  return (
    <>
      <Box sx={{ py: 4 }}>
        {/* 加载中 */}
        {loading && (
          <Box sx={{ display: "flex", justifyContent: "center", py: 8 }}>
            <CircularProgress />
          </Box>
        )}

        {/* 博客列表 */}
        {!loading && (
          <Grid container spacing={2} columns={12}>
            <MainContentCard data={blogs} md={6}></MainContentCard>
          </Grid>
        )}

        {/* 分页控件 */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            mt: 4,
          }}
        >
          <Pagination
            color="primary"
            count={pageCount}
            page={page}
            onChange={(e, value) => setPage(value)}
            size="large"
          />
        </Box>
      </Box>
    </>
  );
}
