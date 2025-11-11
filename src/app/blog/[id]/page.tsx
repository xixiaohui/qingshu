"use client";
import AppAppBar from "@/components/homepage/AppAppBar";
import Footer from "@/components/homepage/Footer";
import { cardData } from "@/components/test/CardData";
import { Author, CardItem } from "@/components/test/MainContentCard";
import { supabase } from "@/lib/supabaseClient";
import AppTheme from "@/shared-theme/AppTheme";
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  CardMedia,
  Container,
  CssBaseline,
  Divider,
  Grid,
  Typography,
} from "@mui/material";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";

function BlogContent({ id }: { id: string }) {
  const [blogData, setblogData] = useState<CardItem>();

  useEffect(() => {
    async function load() {
      const { data, error } = await supabase
        .from("blogs")
        .select("*")
        .eq("id", id)
        .single();
      if (error) {
        console.error(error);
        const errorData = cardData[0];
        setblogData(errorData);
      }
      else {
        setblogData(data);
      }
    }
    load();
  }, []);

  return (
    <>
      <Grid container columns={12}>
        <Grid size={{ xs: 12, md: 6 }} offset={{md:3}} >
          <Card>
            <CardMedia
              component="img"
              alt={blogData?.title}
              image={blogData?.img}
              sx={{
                aspectRatio: "16 / 9",
                borderBottom: "1px solid",
                borderColor: "divider",
              }}
            />
            <CardContent>
              <Typography gutterBottom variant="caption" component="div">
                {blogData?.tag}
              </Typography>
              <Typography gutterBottom variant="h6" component="div">
                {blogData?.title}
              </Typography>
              <Box display='flex' flexDirection='row' gap={1}>
                {blogData?.authors.map((author,index)=>(
                  <Typography gutterBottom variant="caption" component="div" key={index}>
                  {author.name}
                </Typography>
                ))}
              </Box>
              <Typography variant="body2">{blogData?.content}</Typography>
            </CardContent>
            <CardActions>
              <Button size="small">收藏</Button>
              <Button size="small">分享</Button>
            </CardActions>
          </Card>
        </Grid>
      </Grid>
    </>
  );
}

export default function BlogPage() {
  const params = useParams(); // 👈 获取到博客ID
  const id = params?.id ?? "unknown"; // 防止 undefined
  // const { id } = await params;

  return (
    <>
      <AppAppBar />
      <Container
        maxWidth="lg"
        component="main"
        sx={{
          display: "flex",
          flexDirection: "column",
          my: 16,
          gap: 4,
        }}
      >
        <BlogContent id={id as string} />

        <Footer />
      </Container>
    </>
  );
}
