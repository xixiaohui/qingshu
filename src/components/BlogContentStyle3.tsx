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
  Paper,
} from "@mui/material";
import { useEffect, useRef, useState } from "react";
import { Author, CardItem } from "./test/MainContentCard";
import { formatDateSmart, splitByLineLength, splitBySpecial } from "@/lib/util";
import LongTextPagination from "./LongTextPagination";
import PDFButton from "./PDFButton";
import LongTextPaginationTwo from "./LongTextPaginationTwo";

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

function BlogContentMain({ identifier }: { identifier: string }) {
  const [blogData, setblogData] = useState<CardItem>();

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
      }
    }
    load();
  }, [identifier]);

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
            gap: 1,
            minHeight: "100vh",
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: { xs: "column", md: "row" },
              gap: 1,
              justifyContent: "flex-start",
              alignItems: "flex-end",
              mt: 1,
              mx: 1,
            }}
          >
            <Grid size={{ xs: 12, md: 6 }}>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "row",
                }}
              >
                <Typography
                  variant="h2"
                  sx={{
                    fontWeight: 700,
                    color: "#373737",
                  }}
                >
                  {blogData?.title}
                </Typography>
              </Box>
            </Grid>

            <Grid size={{ xs: 12, md: 3 }}>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  gap: 1,
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
              gap: 1,
              mx: 1,
            }}
          >
            <Grid
              size={{ xs: 12, md: 1 }}
              sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "center",
                }}
              >
                <Card
                  sx={{
                    width: "50%",
                  }}
                >
                  <CardMedia
                    component="img"
                    alt={blogData?.title}
                    image={blogData?.img}
                    sx={{
                      aspectRatio: "9 / 16",
                      borderBottom: "1px solid",
                      borderColor: "divider",
                    }}
                  />
                </Card>
              </Box>
            </Grid>
            <Grid size={{ xs: 12, md: 10 }} sx={{ minHeight: "30px" }}>
              <Box>
                <LongTextPaginationTwo content={blogData?.content || ""} />
              </Box>
            </Grid>

            <Grid
              size={{ xs: 12, md: 1 }}
              sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "flex-end",
              }}
            >
              <Box
                sx={{
                  bgcolor: "transparent",
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "flex-end",
                }}
              >
                {blogData && <PDFButton blog={blogData}></PDFButton>}
              </Box>
            </Grid>
          </Box>
        </Box>
      </Grid>
    </>
  );
}

export default function BlogContentStyle3({
  identifier,
}: {
  identifier: string;
}) {
  return (
    <>
      <Grid container spacing={2} columns={12} sx={{ my: 12 }}>
        <BlogContentMain identifier={identifier}></BlogContentMain>
      </Grid>
    </>
  );
}
