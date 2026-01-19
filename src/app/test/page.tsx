"use client"

import AppAppBar from "@/components/homepage/AppAppBar";
import Footer from "@/components/homepage/Footer";
import Latest from "@/components/test/Latest";
import MainContent from "@/components/test/MainContent";
import AppTheme from "@/shared-theme/AppTheme";
import { Box, CircularProgress, Container, CssBaseline, Skeleton, Typography } from "@mui/material";
import { useEffect,useState } from "react";

type PostgresqlBlog={
  id:string
  title:string
  description:string
  created_at:string
  authors:string
}

function PostgreSQLContent(){
  const [blogs, setBlogs] = useState<PostgresqlBlog[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(()=>{
    fetch('/api/blogs')
    .then(res => res.json())
    .then(data => {
        setBlogs(data)
        // console.log(data)
      })
      .catch(err => {
        console.error(err)
      })
      .finally(() => {
        setLoading(false)
      })
  },[])

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
      <Typography variant="h1">Blog List</Typography>
      {blogs.map((b) => (
        <Box key={b.id} sx={{ mb: 3 }}>
          <Typography variant="h2">{b.title}</Typography>
          <Typography variant="body2" color="text.secondary">
            {b.authors}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {b.description}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {new Date(b.created_at).toLocaleString()}
          </Typography>
        </Box>
      ))}
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
