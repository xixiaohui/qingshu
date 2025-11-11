"use client";

import AppAppBar from "@/components/homepage/AppAppBar";
import Footer from "@/components/homepage/Footer";
import MainContentCard from "@/components/test/MainContentCard";
import AppTheme from "@/shared-theme/AppTheme";
import {
  Box,
  Container,
  CssBaseline,
  Grid,
  Pagination,
  Typography,
} from "@mui/material";

import { supabase } from "@/lib/supabaseClient";
import { useEffect, useState } from "react";

function SelectTitle() {
  return (
    <div>
      <Typography variant="h2" gutterBottom>
        精选
      </Typography>
    </div>
  );
}

//每页显示数
const pageLimit = 7;

function SelectMain() {
  const [blogData, setblogData] = useState<any[]>([]);
  const [pageCount, setpageCount] = useState(0);

  const [page, setPage] = useState(1); // 当前页

  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
    console.log("当前页是：", value);
  };

  useEffect(() => {
    async function load() {
      const { data, error } = await supabase.from("blogs").select("*");
      if (error) console.error(error);
      else {
        setblogData(data);
        let pageCount = Math.ceil(data.length / pageLimit);
        setpageCount(pageCount);
      }
    }
    load();
  }, []);

  return (
    <div>
      <Grid container spacing={2} columns={12}>
        <MainContentCard
          data={blogData.slice((page - 1) * pageLimit, pageLimit * page)}
          md={4}
        ></MainContentCard>
      </Grid>

      <Box sx={{ display: "flex", flexDirection: "row", pt: 4 }}>
        <Pagination
          hidePrevButton
          hideNextButton
          count={pageCount}
          page={page}
          onChange={handleChange}
        />
      </Box>
    </div>
  );
}

export default function SelectedPage() {
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
        <SelectTitle></SelectTitle>
        <SelectMain></SelectMain>
        <Footer />
      </Container>
    </>
  );
}
