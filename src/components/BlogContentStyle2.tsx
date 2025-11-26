"use client";
import { supabase } from "@/lib/supabaseClient";
import {
  Box,
  Typography,
  Container,
  Grid,
  Card,
  CardMedia,
  Button,
} from "@mui/material";
import { useEffect, useRef, useState } from "react";
import { Author, CardItem } from "./test/MainContentCard";
import BlogContentMarkdown from "./BlogContentMarkdown";
import { formatDateSmart, splitByLineLength, splitBySpecial } from "@/lib/util";
import { blue } from "@mui/material/colors";
import LongTextPagination from "./LongTextPagination";

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
    content: "## QS",
  },
];

function BlogCotentMain({ identifier }: { identifier: string }) {
  const [blogData, setblogData] = useState<CardItem>();
  const [currentImage, setCurrentImage] = useState<string>("");
  const cardRef = useRef<HTMLDivElement>(null);
  const [result, setResult] = useState("");

  const isId = /^\d+$/.test(identifier);
  identifier = decodeURIComponent(identifier);

  useEffect(() => {
    async function load() {
      const { data, error } = await supabase
        .from("blogs")
        .select("*")
        .order("created_at", { ascending: false }) // false = 倒序
        .eq(isId ? "id" : "slug", identifier)
        .maybeSingle();
      if (error) {
        console.error(error);
        const errorData = cardData[0];
        setblogData(errorData);
      } else {
        setblogData(data);

        // ✅ 如果数据库有图片，就用数据库的
        if (data?.img) {
          setCurrentImage(data.img);
        } else {
          // ✅ 首次加载时生成固定随机图片
          const fixedSeed = Math.floor(Math.random() * 10000);
          setCurrentImage(`https://picsum.photos/seed/${fixedSeed}/800/450`);
        }
      }
    }
    load();
  }, [identifier]);

  const handleTranslate = async (textToTranslate: string) => {
    try {
      const res = await fetch("/api/translate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          text: textToTranslate,
        }),
      });

      if (!res.ok) {
        throw new Error(`翻译请求失败: ${res.status}`);
      }

      const data: { result: string } = await res.json();
      setResult(data.result);
    } catch (error) {
      console.error("翻译出错:", error);
      setResult("翻译失败，请重试");
    }
  };

  return (
    <>
      <Grid
        size={{ xs: 12 }}
        sx={{
          backgroundColor: "#F3F0E6",
          color: "#373737",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 7,
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: { xs: "column", md: "row" },
              gap: 2,
              justifyContent: "flex-start", // 横向靠右
              alignItems: "flex-end", // 纵向靠下
              mt: 3,
            }}
          >
            <Grid size={{ xs: 12, md: 6 }}>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "flex-start",
                  alignItems: "flex-start",
                  m: 2,
                }}
              >
                <p className="text-8xl tracking-tighter text-balance text-[#373737]">
                  {blogData?.title}
                </p>
              </Box>
            </Grid>

            <Grid size={{ xs: 12, md: 3 }}>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "flex-start",
                }}
              >
                <Typography variant="body2" gutterBottom>
                  {blogData?.description}
                </Typography>

                <Typography gutterBottom variant="body2" component="div">
                  {blogData?.authors[0].name}
                </Typography>
              </Box>
            </Grid>

            <Grid size={{ xs: 12, md: 3 }}>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "flex-start",
                  alignItems: "flex-start",
                  gap: 1,
                }}
              >
                <Typography gutterBottom variant="caption" component="div">
                  {blogData?.tag}
                </Typography>
                <Typography gutterBottom variant="caption" component="div">
                  {formatDateSmart(blogData?.created_at || "")}
                </Typography>
              </Box>
            </Grid>
          </Box>

          <Box
            sx={{
              display: "flex",
              flexDirection: { xs: "column", md: "row" },
              gap: 2,
            }}
          >
            <Grid
              size={{ xs: 12, md: 5 }}
              sx={{
                m:2,
                display: "flex",
                justifyContent: "center", // 水平居中
                alignItems: "center", // 垂直居中（可选）
                flexDirection: "column", // 内容上下排列
              }}
            >
              <LongTextPagination content={blogData?.content || ""} />
            </Grid>

            <Grid
              size={{ xs: 12, md: 5 }}
              sx={{
                m:2,
                display: {xs:"none",md:'flex'},
                justifyContent: "center", // 水平居中
                alignItems: "center", // 垂直居中（可选）
                flexDirection: "column", // 内容上下排列
              }}
            >
              <LongTextPagination content={blogData?.content || ""} />
            </Grid>

            <Grid
              size={{ xs: 12, md: 2 }}
              sx={{
                mr:2,
                display: "flex",
                justifyContent: "flex-start", // 水平居中
                alignItems: "flex-start", // 垂直居中（可选）
                flexDirection: "column", // 内容上下排列
              }}
            >
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
              </Card>
            </Grid>
          </Box>
        </Box>
      </Grid>
    </>
  );
}

export default function BlogContentStyle2({
  identifier,
}: {
  identifier: string;
}) {
  return (
    <>
      <Grid container spacing={2} columns={12} sx={{ my: 12 }}>
        <BlogCotentMain identifier={identifier}></BlogCotentMain>
      </Grid>
    </>
  );
}
