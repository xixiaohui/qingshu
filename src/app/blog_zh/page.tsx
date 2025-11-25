"use client";

import CatalogePage from "@/components/test/CatalogePage";
import { CardItem } from "@/components/test/MainContentCard";
import { Box, Grid, Link } from "@mui/material";
import { useEffect, useState } from "react";

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
          <Grid size={{ xs: 12, md: 3 }}>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                mr: 1,
              }}
            >
              {blogs.map((item, i) => (
                <Link key={i} href={`/blog/${item.id}`}>
                  {item.title}
                </Link>
              ))}
            </Box>
          </Grid>
        </Grid>
      </CatalogePage>
    </>
  );
}
