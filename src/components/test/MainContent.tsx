"use client";

import {
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  Chip,
  FormControl,
  Grid,
  IconButton,
  InputAdornment,
  Link,
  OutlinedInput,
  styled,
  Typography,
} from "@mui/material";
import RssFeedRoundedIcon from "@mui/icons-material/RssFeedRounded";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import React, { useEffect, useState } from "react";
import MainContentCard, { CardItem } from "./MainContentCard";
import Hero from "../homepage/Hero";
import { chips, getRandomIntBetween } from "@/lib/util";
import { useRouter } from "next/navigation";
import Adsense from "../Adsense";

function Search() {
  const router = useRouter();
  const [message, setMessage] = useState("");

  const handleSearch = () => {
    if (message.trim()) {
      router.push(`/search?message=${encodeURIComponent(message)}`);
    }
  };
  return (
    <>
      <FormControl
        sx={{
          width: { xs: "100%", md: "25ch" },
          display: "flex",
          flexDirection: "row",
          gap: 1,
        }}
        variant="outlined"
      >
        <OutlinedInput
          size="small"
          id="search"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="尋找..."
          sx={{ flexGrow: 1 }}
          startAdornment={
            <InputAdornment position="start" sx={{ color: "text.primary" }}>
              <SearchRoundedIcon fontSize="small" />
            </InputAdornment>
          }
          inputProps={{
            "aria-label": "search",
          }}
          onKeyDown={(e)=>{
            if(e.key == "Enter"){
              handleSearch();
            }
          }}
        />
      </FormControl>
      <Button variant="contained" color="primary" onClick={handleSearch}>
        搜尋
      </Button>
    </>
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
        {chips.map((label, index) => (
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
        <Link href="/search">
          <IconButton size="small" aria-label="RSS feed">
            <RssFeedRoundedIcon />
          </IconButton>
        </Link>
      </Box>
    </Box>
  );
}

// let startIndex = getRandomIntBetween(20, 30);

function MainContent() {
  const [blogs, setBlogs] = useState<CardItem[]>([]);
  const [message, setMessage] = useState(chips[0]);

  useEffect(() => {
    fetch("/blogs.json")
      .then((res) => res.json())
      .then((data) => {
        //过滤条件
        const filtered = data.filter(
          (item: CardItem) => item.tag && (item.tag.includes(message))
        );
        setBlogs(filtered);
      });
  }, [message]); //当标签变化时重新过滤

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
      <MainContentChips onSend={(text) => setMessage(text)}></MainContentChips>

      <Grid container spacing={2} columns={12}>
        <MainContentCard
          data={blogs.slice(0, 2)}
          md={6}
          message={message}
        ></MainContentCard>
        <MainContentCard data={blogs.slice(2, 3)} md={4}></MainContentCard>

        <Grid size={{ xs: 12, md: 4 }}>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: 2,
              height: "100%",
            }}
          >
            {/* <Box>
              <Adsense adClient="ca-pub-6634656437365032" adSlot="7741256542" />
            </Box> */}
            <MainContentCard
              data={blogs.slice(3, 4)}
              md={4}
              isHaveImage={false}
            ></MainContentCard>
            <MainContentCard
              data={blogs.slice(4, 5)}
              md={4}
              isHaveImage={false}
            ></MainContentCard>
          </Box>
        </Grid>
        <MainContentCard data={blogs.slice(5, 6)} md={4}></MainContentCard>
      </Grid>
    </Box>
  );
}

export default MainContent;
