"use client";

import CatalogePage from "@/components/test/CatalogePage";
import { CardItem } from "@/components/test/MainContentCard";
import { Box, Grid, Link } from "@mui/material";
import { useEffect, useState } from "react";

import { Stack } from "@mui/material";

export default function BlogZhPage() {
  const [blogs, setBlogs] = useState<CardItem[]>([]);

  useEffect(() => {
    fetch("/gutenberg_metadata_by_id_zh.json")
      .then((res) => res.json())
      .then((data) => {
        const blogsArray = Object.keys(data).map((id) => ({
          id,
          ...data[id],
        }));
        setBlogs(blogsArray);
        console.log(blogsArray);
      });
  }, []); //当标签变化时重新过滤

  return (
    <>
      <CatalogePage catalogeName="中文文章">
        <Grid container spacing={2} columns={12}>
          <Grid size={12}>
            <Stack
              direction="row" // 横向排列
              flexWrap="wrap" // 自动换行
              spacing={1} // 间距
            >
              {blogs.map((item, i) => (
                <Link key={i} href={`/blog/${item.id}`}>
                  <p className="text-sm m-0">
                    {i + 1}: {item.title}
                  </p>
                </Link>
              ))}
            </Stack>
          </Grid>
        </Grid>
      </CatalogePage>
    </>
  );
}
