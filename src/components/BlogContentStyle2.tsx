import { supabase } from "@/lib/supabaseClient";
import {
  Box,
  Typography,
  Container,
  Grid,
  Card,
  CardMedia,
} from "@mui/material";
import { useEffect, useRef, useState } from "react";
import { Author, CardItem } from "./test/MainContentCard";
import BlogContentMarkdown from "./BlogContentMarkdown";
import { formatDateSmart, splitByLineLength, splitBySpecial } from "@/lib/util";
import { blue } from "@mui/material/colors";

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

  const [contentArray, setContentArray] = useState<string[]>([]);

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

        setContentArray(splitBySpecial(data?.content || ""));
      }
    }
    load();
  }, [identifier]);

  return (
    <>
      <Grid size={{ xs: 12 }}>
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
              justifyContent: "flex-end", // 横向靠右
              alignItems: "flex-end", // 纵向靠下
            }}
          >
            <Grid size={{ xs: 12, md: 3 }}>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "flex-end",
                  alignItems: "flex-end",
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

            <Grid size={{ xs: 12, md: 3 }}>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "flex-start",
                }}
              >
                <Typography
                  gutterBottom
                  variant="h2"
                  component="div"
                  color="primary"
                >
                  {blogData?.title}
                </Typography>
              </Box>
            </Grid>

            <Grid size={{ xs: 12, md: 3 }}>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "flex-end",
                }}
              >
                <Typography variant="body2" gutterBottom>
                  {blogData?.description}
                </Typography>
              </Box>
            </Grid>

            <Grid size={{ xs: 12, md: 3 }}>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "flex-start",
                }}
              >
                <Typography gutterBottom variant="body2" component="div">
                  {blogData?.authors[0].name}
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
            <Grid size={{ xs: 12, md: 3 }}>
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

            {contentArray.map((value, index) => (
              
              <Grid key={index} size={{ xs: 12, md: 3 }}>
                <BlogContentMarkdown
                  content={value || ""}
                ></BlogContentMarkdown>
              </Grid>
            ))}
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
