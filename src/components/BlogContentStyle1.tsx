"use client";
import { Author, CardItem } from "@/components/test/MainContentCard";
import { supabase } from "@/lib/supabaseClient";
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  CardMedia,
  CircularProgress,
  Container,
  CssBaseline,
  Divider,
  Grid,
  Typography,
} from "@mui/material";
import { useParams } from "next/navigation";
import React, { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import html2canvas from "html2canvas";
import {
  Download,
  DownloadDoneSharp,
  DownloadingRounded,
} from "@mui/icons-material";
import BlogContentCard from "@/components/BlogContentCard";
import ReactMarkdown from "react-markdown";
import remarkBreaks from "remark-breaks";
import Loading from "@/components/Loading";
import BlogContentMarkdown from "@/components/BlogContentMarkdown";
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

function BlogContent({ identifier }: { identifier: string }) {
  const [blogData, setblogData] = useState<CardItem>();
  const [currentImage, setCurrentImage] = useState<string>("");
  const [isDownloading, setIsDownloading] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const cardRef = useRef<HTMLDivElement>(null);

  const isId = /^\d+$/.test(identifier);
  identifier = decodeURIComponent(identifier);

  useEffect(() => {
    async function load() {
      setIsLoading(true);
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

        // ✅ 如果数据库有图片，就用数据库的
        if (data?.img) {
          setCurrentImage(data.img);
        } else {
          // ✅ 首次加载时生成固定随机图片
          const fixedSeed = Math.floor(Math.random() * 10000);
          setCurrentImage(`https://picsum.photos/seed/${fixedSeed}/800/450`);
        }
        setIsLoading(false);
      }
    }
    console.log("identifier is " + identifier);
    load();
  }, [identifier]);

  const handleImageClick = () => {
    const randomSeed = Math.floor(Math.random() * 10000); // 生成随机种子
    const newImageUrl = `https://picsum.photos/seed/${randomSeed}/800/450`;
    setCurrentImage(newImageUrl);
  };

  const handleDownload = async () => {
    if (!cardRef.current) return;
    setIsDownloading(true);

    try {
      //用 html2canvas 渲染 DOM
      const canvas = await html2canvas(cardRef.current, {
        scale: 3, //高清输出
        useCORS: true, //支持跨域输出
        allowTaint: true,
      });

      // 转换成 Blob
      canvas.toBlob(
        (blob) => {
          if (!blob) return;
          const url = URL.createObjectURL(blob);

          // 创建下载链接
          const link = document.createElement("a");
          link.href = url;
          link.download = `${blogData?.title || "blog"}.jpg`;
          link.click();

          URL.revokeObjectURL(url);
        },
        "image/jpeg",
        1
      ); // 质量 1 为最高
    } catch (error) {
      console.error("下载失败：", error);
    } finally {
      setIsDownloading(false);
    }
  };

  if (isLoading) {
    return (
      <>
        <Loading></Loading>
      </>
    );
  }

  return (
    <>
      <Grid
        container
        columns={12}
    
      >
        <Grid size={{ xs: 12, md: 6 }} offset={{ md: 3 }}>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
            }}
          >
            <Card
              sx={{
                boxShadow: "0 10px 30px rgba(255, 255, 255, 0.7)",
                border: "1px solid rgba(0, 0, 255, 0.3)",
                borderRadius: 3,
                overflow: "hidden",
                width: "100%",
                mx: "auto",
                backgroundColor: "#F3F0E6",
        
              }}
              ref={cardRef}
              elevation={0}
            >
              {currentImage && (
                <Box
                  // MUI 的 sx 需要这样写
                  sx={{
                    aspectRatio: "16 / 9",
                    borderBottom: "1px solid",
                    borderColor: "divider",
                    transition: "0.3s",
                    "&:hover": { opacity: 0.85 },
                    display: { xs: "flex", sm: "flex" },
                  }}
                >
                  <motion.img
                    key={currentImage} // 👈 图片切换触发重新播放动画
                    alt={blogData?.title}
                    src={currentImage}
                    onClick={handleImageClick}
                    style={{ width: "100%", cursor: "pointer" }}
                    className="MuiCardMedia-root"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                  />
                </Box>
              )}

              <CardContent sx={{
                color:"#373737"
              }}>
                <Typography gutterBottom variant="caption" component="div">
                  {blogData?.tag}
                </Typography>
                {/* <Typography gutterBottom variant="h6" component="div">
                  {blogData?.title}
                </Typography> */}
                <p className="text-5xl tracking-tighter text-balance text-[#373737]">
                  {blogData?.title}
                </p>
                <Author
                  authors={blogData?.authors ?? []}
                  time={blogData?.created_at}
                />
                {/* <BlogContentMarkdown
                  content={blogData?.content || ""}
                ></BlogContentMarkdown> */}
                <LongTextPagination content={blogData?.content || ""} />
              </CardContent>
            </Card>
            <CardActions>
              {/* <Button size="small">收藏</Button> */}
              {isDownloading ? (
                <CircularProgress size={24} />
              ) : (
                <Button size="small" onClick={handleDownload}>
                  <Download />
                  下载
                </Button>
              )}
            </CardActions>
          </Box>
        </Grid>
      </Grid>
    </>
  );
}

export default function BlogContentStyle1({
  identifier,
}: {
  identifier: string;
}) {
  return (
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
    </Container>
  );
}
