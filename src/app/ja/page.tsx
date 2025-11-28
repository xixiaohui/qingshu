"use client";

import CatalogePage from "@/components/test/CatalogePage";
import { CardItem } from "@/components/test/MainContentCard";
import { Box, Card, CardContent, Grid, Link, Typography } from "@mui/material";
import { useEffect, useState } from "react";

import { Stack } from "@mui/material";
import React from "react";

export type BlogItem = {
  id: number;
  title: string;
  author: string;
  subjects: string;
};

function CardItemCard({ item }: { item: BlogItem }) {
  return (
    <React.Fragment>
      <CardContent>
        <Typography gutterBottom sx={{ color: "text.secondary", fontSize: 14 }}>
          {item.author.length > 40
              ? item.author.slice(0, 40) + "..."
              : item.author}
        </Typography>
        <Link href={`/blog/${item.id}`}>
          <Typography
            variant="h5"
            component="div"
            sx={{
              display: "-webkit-box",
              WebkitBoxOrient: "vertical",
              WebkitLineClamp: 2, // 限制两行
              overflow: "hidden",
            }}
          >
            {item.title.length > 40
              ? item.title.slice(0, 40) + "..."
              : item.title}
          </Typography>
        </Link>
        <Typography variant="body2" component="div">
          {item.subjects.length > 40
            ? item.subjects.slice(0, 40) + "..."
            : item.subjects}
        </Typography>
      </CardContent>
    </React.Fragment>
  );
}

export default function BlogPage() {
  const [blogs, setBlogs] = useState<BlogItem[]>([]);

  useEffect(() => {
    fetch("/gutenberg_metadata_by_id_ja.json")
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
      <CatalogePage catalogeName="ja">

        <Grid container spacing={2} columns={12}>
          <Grid size={12}>
            <Stack
              direction="row" // 横向排列
              flexWrap="wrap" // 自动换行
              spacing={1} // 横向间距
              rowGap={1} //竖向间距
            >
              {blogs.map((item, i) => (
                <Card key={i} variant="outlined">
                  <CardItemCard item={item}></CardItemCard>
                </Card>
              ))}
            </Stack>
          </Grid>
        </Grid>

        <Grid container spacing={2} columns={12}>
          <Grid size={12}>
            <Stack
              direction="row" // 横向排列
              flexWrap="wrap" // 自动换行
              spacing={1} // 横向间距
              rowGap={1} //竖向间距
            >
              {blogs.map((item, i) => (
                <Link key={i} href={`/blog/${item.id}`}>
                  {i + 1}:{" "}
                  {item.title.length > 20
                    ? item.title.slice(0, 20) + "..."
                    : item.title}
                </Link>
              ))}
            </Stack>
          </Grid>
        </Grid>
      </CatalogePage>
    </>
  );
}
