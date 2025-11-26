"use client";

import CatalogePage from "@/components/test/CatalogePage";
import { CardItem } from "@/components/test/MainContentCard";
import { Box, Card, CardContent, Grid, Link, Typography } from "@mui/material";
import { useEffect, useState } from "react";

import { Stack } from "@mui/material";
import React from "react";

export type BlogZhItem = {
  id:number;
  title: string;
  author: string;
  subjects: string;
}

function CardItemCard({ item }: { item: BlogZhItem }) {
  return (
    <React.Fragment>
      <CardContent>
        <Typography gutterBottom sx={{ color: "text.secondary", fontSize: 14 }}>
          {item.author}
        </Typography>
        <Link href={`/blog/${item.id}`}>
          <Typography variant="h5" component="div">
            {item.title}
          </Typography>
        </Link>
        <Typography variant="body2" component="div">
          {item.subjects}
        </Typography>
      </CardContent>
    </React.Fragment>
  );
}

export default function BlogZhPage() {
  const [blogs, setBlogs] = useState<BlogZhItem[]>([]);

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
              spacing={2} // 间距
            >
              {blogs.map((item, i) => (
                <Card key={i} variant="outlined">
                  <CardItemCard item={item}></CardItemCard>
                </Card>
              ))}
            </Stack>
          </Grid>
        </Grid>
      </CatalogePage>
    </>
  );
}
