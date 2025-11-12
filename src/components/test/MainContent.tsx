"use client";

import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Chip,
  FormControl,
  Grid,
  IconButton,
  InputAdornment,
  OutlinedInput,
  styled,
  Typography,
} from "@mui/material";
import RssFeedRoundedIcon from "@mui/icons-material/RssFeedRounded";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import React, { useEffect, useState } from "react";
import MainContentCard, { CardItem } from "./MainContentCard";
import Hero from "../homepage/Hero";
import { getRandomIntBetween } from "@/lib/util";



function Search() {
  return (
    <FormControl sx={{ width: { xs: "100%", md: "25ch" } }} variant="outlined">
      <OutlinedInput
        size="small"
        id="search"
        placeholder="查找..."
        sx={{ flexGrow: 1 }}
        startAdornment={
          <InputAdornment position="start" sx={{ color: "text.primary" }}>
            <SearchRoundedIcon fontSize="small" />
          </InputAdornment>
        }
        inputProps={{
          "aria-label": "search",
        }}
      />
    </FormControl>
  );
}

function MainContentSearch() {
  return (
    <Box
      sx={{
        display: { xs: "flex", sm: "none" },
        flexDirection: "row",
        gap: 1,
        width: { xs: "100%", md: "fit-content" },
        overflow: "auto",
      }}
    >
      <Search></Search>
      <IconButton size="small" aria-label="RSS feed">
        <RssFeedRoundedIcon />
      </IconButton>
    </Box>
  );
}
const handleClick = () => {
  console.info("You clicked the filter chip.");
};

function MainContentChips() {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: { xs: "column-reverse", md: "row" },
        width: "100%",
        justifyContent: "space-between",
        alignItems: { xs: "start", md: "center" },
        gap: 4,
        overflow: "auto",
      }}
    >
      <Box
        sx={{
          display: "inline-flex",
          flexDirection: "row",
          gap: 3,
          overflow: "auto",
        }}
      >
        <Chip onClick={handleClick} size="medium" label="所有分类"></Chip>
        <Chip
          onClick={handleClick}
          size="medium"
          label="表白专栏"
          sx={{
            backgroundColor: "transparent",
            border: "none",
          }}
        />
        <Chip
          onClick={handleClick}
          size="medium"
          label="散场信箱"
          sx={{
            backgroundColor: "transparent",
            border: "none",
          }}
        />
        <Chip
          onClick={handleClick}
          size="medium"
          label="暧昧集"
          sx={{
            backgroundColor: "transparent",
            border: "none",
          }}
        />
        <Chip
          onClick={handleClick}
          size="medium"
          label="心绪日记"
          sx={{
            backgroundColor: "transparent",
            border: "none",
          }}
        />
        <Chip
          onClick={handleClick}
          size="medium"
          label="情书博物馆"
          sx={{
            backgroundColor: "transparent",
            border: "none",
          }}
        />
      </Box>
      <Box
        sx={{
          display: { xs: "none", sm: "flex" },
          flexDirection: "row",
          gap: 1,
          width: { xs: "100%", md: "fit-content" },
          overflow: "auto",
        }}
      >
        <Search />
        <IconButton size="small" aria-label="RSS feed">
          <RssFeedRoundedIcon />
        </IconButton>
      </Box>
    </Box>
  );
}

const startIndex = getRandomIntBetween(20, 30);

function MainContent() {
  const [blogs, setBlogs] = useState<CardItem[]>([]);

  useEffect(() => {
    fetch("/blogs.json")
      .then((res) => res.json())
      .then((data) => setBlogs(data));
  }, []);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 4,
      }}
    >
      <Hero />
      <MainContentSearch></MainContentSearch>
      <MainContentChips></MainContentChips>

      <Grid container spacing={2} columns={12}>
        <MainContentCard
          data={blogs.slice(startIndex, startIndex + 2)}
          md={6}
        ></MainContentCard>
        <MainContentCard
          data={blogs.slice(startIndex + 2, startIndex + 3)}
          md={4}
        ></MainContentCard>
        <Grid size={{ xs: 12, md: 4 }}>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: 2,
              height: "100%",
            }}
          >
            <MainContentCard
              data={blogs.slice(3, 5)}
              md={4}
              isHaveImage={false}
            ></MainContentCard>
          </Box>
        </Grid>
        <MainContentCard
          data={blogs.slice(startIndex + 5, startIndex + 6)}
          md={4}
        ></MainContentCard>
      </Grid>
    </Box>
  );
}

export default MainContent;
