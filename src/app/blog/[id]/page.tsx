"use client";
import AppAppBar from "@/components/homepage/AppAppBar";
import Footer from "@/components/homepage/Footer";
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
import { AnimatePresence, motion } from "framer-motion";

const MotionCardMedia = motion(CardMedia as any);

const cardData = [
  {
    img: "https://picsum.photos/800/450?random=1",
    tag: "Love",
    title: "How Do I Love Thee?",
    description: "How Do I Love Thee? — Elizabeth Barrett Browning",
    authors: [
      {
        name: "Elizabeth Barrett Browning",
        avatar: "/static/images/avatar/1.jpg",
      },
    ],
    content:
      "## Original (English)\nHow do I love thee? Let me count the ways.\nI love thee to the depth and breadth and height\nMy soul can reach, when feeling out of sight\nFor the ends of being and ideal grace.\n\n## 中文译文\n我怎样爱你？让我细数方式。\n我爱你如灵魂可达的深与广，\n当我摸索无形的彼岸，\n只为存在的意义与完美的恩典。\n\n## 赏析\n这首诗出自《十四行诗集》，诗人用层层推进的修辞，展现出爱超越生死的永恒力量。",
  },
];

function BlogContent({ identifier }: { identifier: string }) {
  const [blogData, setblogData] = useState<CardItem>();
  const [currentImage, setCurrentImage] = useState<string>();

  const isId = /^\d+$/.test(identifier);
  identifier = decodeURIComponent(identifier);

  useEffect(() => {
    async function load() {
      const { data, error } = await supabase
        .from("blogs")
        .select("*")
        .eq(isId ? "id" : "slug", identifier)
        .maybeSingle();
      if (error) {
        console.error(error);
        const errorData = cardData[0];
        setblogData(errorData);
      } else {
        setblogData(data);
        setCurrentImage(data?.img);
      }
    }
    console.log("identifier is " + identifier);
    load();
  }, []);

  const handleImageClick = () => {
    const randomSeed = Math.floor(Math.random() * 10000); // 生成随机种子
    const newImageUrl = `https://picsum.photos/seed/${randomSeed}/800/450`;
    setCurrentImage(newImageUrl);
  };

  return (
    <>
      <Grid container columns={12}>
        <Grid size={{ xs: 12, md: 6 }} offset={{ md: 3 }}>
          <Card>
            <AnimatePresence mode="wait">
              <MotionCardMedia
                key={currentImage} // 👈 每次图片变化都会触发重新动画
                component="img"
                alt={blogData?.title}
                image={currentImage}
                sx={{
                  aspectRatio: "16 / 9",
                  borderBottom: "1px solid",
                  borderColor: "divider",
                  cursor: "pointer",
                  transition: "0.3s",
                  "&:hover": { opacity: 0.85 },
                }}
                onClick={handleImageClick}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.4 }}
              />
            </AnimatePresence>

            <CardContent>
              <Typography gutterBottom variant="caption" component="div">
                {blogData?.tag}
              </Typography>
              <Typography gutterBottom variant="h6" component="div">
                {blogData?.title}
              </Typography>
              <Author authors={blogData?.authors ?? []} time={blogData?.created_at} />
              <Typography variant="body2">{blogData?.content}</Typography>
            </CardContent>
            <CardActions>
              {/* <Button size="small">收藏</Button> */}
              <Button size="small">下载</Button>
            </CardActions>
          </Card>
        </Grid>
      </Grid>
    </>
  );
}

export default function BlogPage() {
  const params = useParams(); // 👈 获取到博客ID
  const identifier = params?.id ?? "unknown"; // 防止 undefined

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
        <BlogContent identifier={identifier as string} />

        <Footer />
      </Container>
    </>
  );
}
