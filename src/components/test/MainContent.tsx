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
import React from "react";
import MainContentCard from "./MainContentCard";

const cardData = [
  {
    img: "https://picsum.photos/800/450?random=1?grayscale",
    tag: "Engineering",
    title: "Revolutionizing software development with cutting-edge tools",
    description:
      "Our latest engineering tools are designed to streamline workflows and boost productivity. Discover how these innovations are transforming the software development landscape.",
    authors: [
      { name: "Remy Sharp", avatar: "images/avatar/1.jpg" },
      { name: "Travis Howard", avatar: "images/avatar/2.jpg" },
    ],
  },
  {
    img: "https://picsum.photos/800/450?random=2",
    tag: "Product",
    title: "Innovative product features that drive success",
    description:
      "Explore the key features of our latest product release that are helping businesses achieve their goals. From user-friendly interfaces to robust functionality, learn why our product stands out.",
    authors: [{ name: "Erica Johns", avatar: "images/avatar/6.jpg" }],
  },
  {
    img: "https://picsum.photos/800/450?random=3",
    tag: "Design",
    title: "Designing for the future: trends and insights",
    description:
      "Stay ahead of the curve with the latest design trends and insights. Our design team shares their expertise on creating intuitive and visually stunning user experiences.",
    authors: [{ name: "Kate Morrison", avatar: "images/avatar/7.jpg" }],
  },
  {
    img: "https://picsum.photos/800/450?random=4",
    tag: "Company",
    title: "Our company's journey: milestones and achievements",
    description:
      "Take a look at our company's journey and the milestones we've achieved along the way. From humble beginnings to industry leader, discover our story of growth and success.",
    authors: [{ name: "Cindy Baker", avatar: "images/avatar/3.jpg" }],
  },
  {
    img: "https://picsum.photos/800/450?random=45",
    tag: "Engineering",
    title: "Pioneering sustainable engineering solutions",
    description:
      "Learn about our commitment to sustainability and the innovative engineering solutions we're implementing to create a greener future. Discover the impact of our eco-friendly initiatives.",
    authors: [
      { name: "Agnes Walker", avatar: "images/avatar/4.jpg" },
      { name: "Trevor Henderson", avatar: "images/avatar/5.jpg" },
    ],
  },
  {
    img: "https://picsum.photos/800/450?random=6",
    tag: "Product",
    title: "Maximizing efficiency with our latest product updates",
    description:
      "Our recent product updates are designed to help you maximize efficiency and achieve more. Get a detailed overview of the new features and improvements that can elevate your workflow.",
    authors: [{ name: "Travis Howard", avatar: "images/avatar/2.jpg" }],
  },
];

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

function MainContentTitle() {
  return (
    <div>
      <Typography variant="h1" gutterBottom>
        qingshu
      </Typography>
      <Typography>
        "让人重新相信文字里的爱。" —— 一个专注于表达与理解爱的社交平台。
      </Typography>
    </div>
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




function MainContent() {
  const index = 0
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 4,
      }}
    >
      {/* <MainContentTitle /> */}
      <MainContentSearch></MainContentSearch>
      <MainContentChips></MainContentChips>
      <MainContentCard data={cardData.slice(0,2)} md={6}></MainContentCard>
      <MainContentCard data={cardData.slice(2,3)} md={4}></MainContentCard>
    </Box>
  );
}

export default MainContent;
