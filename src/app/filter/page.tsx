"use client";
import AppAppBar from "@/components/homepage/AppAppBar";
import Footer from "@/components/homepage/Footer";
import BlogList from "@/components/test/BlogList";
import {
  Author,
  StyledCardContent,
  StyledTypography,
} from "@/components/test/MainContentCard";
import { supabase } from "@/lib/supabaseClient";
import { mainKeyWords } from "@/lib/util";
import { Masonry } from "@mui/lab";
import {
  Box,
  Button,
  Card,
  CardMedia,
  Chip,
  CircularProgress,
  Container,
  Grid,
  Link,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";

function MainContentChips({ onSend }: { onSend: (text: string) => void }) {
  const [selectedIndex, setSelectedIndex] = useState(0); // 默认选中第一个

  const handleClick = (label: string, index: number) => {
    setSelectedIndex(index);
    onSend(label); // 把选中的 label 传给父组件
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: { xs: "column-reverse", md: "column" },
        width: "100%",
        justifyContent: "start",
        alignItems: { xs: "start", md: "center" },
        gap: 4,
        overflow: "auto",
      }}
    >
      <Box
        sx={{
          display: "inline-flex",
          flexDirection: "column",
          gap: 2,
          overflow: "auto",
        }}
      >
        {mainKeyWords.map((label, index) => (
          <Chip
            key={index}
            size="medium"
            label={label}
            onClick={() => handleClick(label, index)}
            sx={{
              backgroundColor:
                selectedIndex === index ? "primary.second" : "transparent",
              border: "none",
              "&:hover": {
                backgroundColor:
                  selectedIndex === index ? "primary.second" : "action.hover",
              },
            }}
          />
        ))}
      </Box>
    </Box>
  );
}

function BlogListButton({ message }: { message: string }) {
  const [blogs, setBlogs] = useState<any[]>([]);
  const [page, setPage] = useState(0);
  const [loading, setLoading] = useState(false);

  const LIMIT = 7;

  const fetchBlogs = async () => {
    setLoading(true);

    // 1. 记录加载前 scrollHeight
    const prevScrollHeight = document.documentElement.scrollHeight;

    const start = page * LIMIT;
    const end = start + LIMIT - 1;

    let { data, error } = await supabase
      .from("blogs")
      .select("*")
      .ilike("tag", `%${message}%`)
      .range(start, end)
      .order("id", { ascending: true });

    if (!error && (!data || data.length === 0)) {
      const fields = ["title", "content"];

      for (const field of fields) {
        const res = await supabase
          .from("blogs")
          .select("*")
          .ilike(field, `%${message}%`)
          .range(start, end)
          .order("id", { ascending: false });

        if (res.data && res.data.length > 0) {
          data = res.data;
          break;
        }
      }
    }

    if (error) {
      console.error(error);
      setLoading(false);
      return;
    }

    // 添加新数据
    setBlogs((prev) => [...prev, ...(data ?? [])]);

    // 3. 等待 DOM 渲染后恢复滚动位置
    requestAnimationFrame(() => {
      const newScrollHeight = document.documentElement.scrollHeight;
      const diff = newScrollHeight - prevScrollHeight;
      window.scrollTo(0, window.scrollY + diff);
    });

    setLoading(false);
  };

  // 初次加载
  useEffect(() => {
    if (page < 0) return;
    console.log("初次加载");
    fetchBlogs();
  }, [page]);

  useEffect(() => {
    setBlogs([]);
    setPage(-1);
    setTimeout(() => {
      setPage(0);
    });

  }, [message]);

  const handleLoadMore = () => {
    setPage((p) => p + 1);
  };

  return (
    <>
      <Box sx={{ px: 2, pt: 4 }}>
        {loading ? (
          <CircularProgress size={22} sx={{ color: "primary" }} />
        ) : (
          <></>
        )}
        <Masonry columns={{ xs: 1, sm: 2, md: 2 }} spacing={2}>
          {blogs.map((data, index) => (
            <Card key={index} variant="outlined" tabIndex={0}>
              <Link
                href={`/blog/${data.slug}`}
                style={{ textDecoration: "none" }}
              >
                <CardMedia
                  component="img"
                  image={data.img || "/placeholder.jpg"}
                  alt={data.title}
                  sx={{
                    width: "100%",
                    height: "auto",
                    display: "block",
                  }}
                />
              </Link>
              <StyledCardContent>
                <Typography gutterBottom variant="caption" component="div">
                  {data.tag}
                </Typography>
                <Typography gutterBottom variant="h6" component="div">
                  {data.title}
                </Typography>
                <StyledTypography
                  variant="body2"
                  color="text.secondary"
                  gutterBottom
                >
                  {data.description}
                </StyledTypography>
              </StyledCardContent>
              <Author authors={data.authors} time={data.created_at} />
            </Card>
          ))}
        </Masonry>

        <Box sx={{ textAlign: "center", mt: 3 }}>
          <Button
            variant="contained"
            onClick={handleLoadMore}
            disabled={loading}
          >
            {loading ? (
              <CircularProgress size={22} sx={{ color: "primary" }} />
            ) : (
              "加载更多"
            )}
          </Button>
        </Box>
      </Box>
    </>
  );
}

function FilterMainContent() {
  const [message, setMessage] = useState(mainKeyWords[0]);

  return (
    <Grid container columns={12}>
      <Grid size={{ xs: 12, md: 3 }}>
        <MainContentChips
          onSend={(text) => setMessage(text)}
        ></MainContentChips>
      </Grid>
      <Grid size={{ xs: 12, md: 6 }}>
        <BlogListButton message={message}></BlogListButton>
      </Grid>
      <Grid size={{ xs: 12, md: 3 }}>
        <Typography gutterBottom variant="body2" color="primary">
          {message}
        </Typography>
      </Grid>
    </Grid>
  );
}

export default function FilterPage() {
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
          gap: 1,
        }}
      >
        <Box sx={{ display: "flex", flexDirection: "column" }}>
          <FilterMainContent></FilterMainContent>
        </Box>
      </Container>

      <Footer />
    </>
  );
}
