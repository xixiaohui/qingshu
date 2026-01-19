"use client"

import AppAppBar from "@/components/homepage/AppAppBar";
import Footer from "@/components/homepage/Footer";
import Latest from "@/components/test/Latest";
import MainContent from "@/components/test/MainContent";
import AppTheme from "@/shared-theme/AppTheme";
import { Box, CircularProgress, Container, CssBaseline, Link, Skeleton, Typography } from "@mui/material";
import { useEffect,useState } from "react";
import { Pagination, Stack } from "@mui/material";
import { blogPostgresRepo, BlogRepository, blogSupabaseRepo } from "@/lib/getBlog";

type PostgresqlBlog = {
  id: string;
  title: string;
  description: string;
  created_at: string;
  authors: string;
  slug?: string;
  index?: number;
};



function PostgreSQLContent(){
  const [blogs, setBlogs] = useState<PostgresqlBlog[]>([])
  const [loading, setLoading] = useState(true)

  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);

  const pageSize = 10;

  useEffect(() => {
    setLoading(true);


    fetch(`/api/blogs?page=${page}&pageSize=${pageSize}`)
      .then((res) => res.json())
      .then((res) => {
        setBlogs(res.data);
        setTotal(res.total);
        // console.log(data)
      })
      .catch((err) => {
        console.error(err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [page]);

  if (loading) {
    return (
      <>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            minHeight: 300,
          }}
        >
          <CircularProgress />
        </Box>
        <Box>
          <Skeleton variant="text" height={80} />
          <Skeleton variant="rectangular" height={120} />
          <Skeleton variant="rectangular" height={120} />
        </Box>
      </>
    );
  }



  return (
    <Box>
      {blogs.map((b) => (
        <Link key={b.id} href={`/blog/${b.index ? b.index : b.slug}`}>
          <Box  sx={{ mb: 3 }}>
            <Typography variant="h2">{b.title}</Typography>
            <Typography variant="subtitle1" color="text.secondary">
              {b.authors}
            </Typography>
            <Typography variant="body1" color="text.secondary">
              {b.description}
            </Typography>
            <Typography variant="body1" color="text.secondary">
              {new Date(b.created_at).toLocaleString()}
            </Typography>
          </Box>
        </Link>

      ))}

       {/* 分页 */}
      <Stack alignItems="center" sx={{ mt: 4 }}>
        <Pagination
          count={Math.ceil(total / pageSize)}
          page={page}
          onChange={(_, value) => setPage(value)}
          color="primary"
          shape="rounded"
          showFirstButton
          showLastButton
        />
      </Stack>
    </Box>
  );
}

function TestPage() {
  return (
    <AppTheme>
      <CssBaseline enableColorScheme />
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
        <PostgreSQLContent></PostgreSQLContent>
        <Footer />
      </Container>
    </AppTheme>
  );
}

export default TestPage;
