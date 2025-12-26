"use client";
import {
  Avatar,
  AvatarGroup,
  Box,
  Grid,
  Link,
  Pagination,
  styled,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import NavigateNextRoundedIcon from "@mui/icons-material/NavigateNextRounded";
import { CardItem } from "./MainContentCard";

const StyledTypography = styled(Typography)({
  display: "-webkit-box",
  WebkitBoxOrient: "vertical",
  WebkitLineClamp: 2,
  overflow: "hidden",
  textOverflow: "ellipsis",
});

const TitleTypography = styled(Typography)(({ theme }) => ({
  position: "relative",
  textDecoration: "none",
  "&:hover": { cursor: "pointer" },
  "& .arrow": {
    visibility: "hidden",
    position: "absolute",
    right: 0,
    top: "50%",
    transform: "translateY(-50%)",
  },
  "&:hover .arrow": {
    visibility: "visible",
    opacity: 0.7,
  },
  "&:focus-visible": {
    outline: "3px solid",
    outlineColor: "hsla(210, 98%, 48%, 0.5)",
    outlineOffset: "3px",
    borderRadius: "8px",
  },
  "&::before": {
    content: '""',
    position: "absolute",
    width: 0,
    height: "1px",
    bottom: 0,
    left: 0,
    backgroundColor: (theme.vars || theme).palette.text.primary,
    opacity: 0.3,
    transition: "width 0.3s ease, opacity 0.3s ease",
  },
  "&:hover::before": {
    width: "100%",
  },
}));

function Author({
  authors,
  time = "2025年11月12日",
}: {
  authors: { name: string; avatar: string }[];
  time?: string;
}) {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "row",
        gap: 2,
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          gap: 1,
          alignItems: "center",
        }}
      >
        <AvatarGroup max={3}>
          {authors.map((author, index) => (
            <Avatar
              key={index}
              alt={author.name}
              src={author.avatar}
              sx={{ width: 24, height: 24 }}
            />
          ))}
        </AvatarGroup>
        <Typography variant="caption">
          {authors.map((author) => author.name).join(", ")}
        </Typography>
      </Box>
      <Typography variant="caption">{time}</Typography>
    </Box>
  );
}

// export const slugify = (title: string) =>
//   title
//     .trim()
//     .toLowerCase()
//     .replace(/\s+/g, "-") // 空格换 -
//     .replace(/[^\w\-一-龥]+/g, ""); // 保留中文、字母、数字、连字符

//每页显示数
const pageLimit = 7;

export default function Latest() {
  const [focusedCardIndex, setFocusedCardIndex] = React.useState<number | null>(
    null
  );
  const [blogs, setBlogs] = React.useState<CardItem[]>([]);

  const [pageCount, setpageCount] = useState(0);
  const [page, setPage] = useState(1); // 当前页

  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
    console.log("当前页是：", value);
  };

  const handleFocus = (index: number) => {
    setFocusedCardIndex(index);
  };

  const handleBlur = () => {
    setFocusedCardIndex(null);
  };

  useEffect(() => {
    fetch("/blogs.json")
      .then((res) => res.json())
      .then((data) => {
        //过滤条件
        const filtered = data.filter(
          (item: CardItem) => item.tag && item.tag.includes("最新")
        );

        let pageCount = Math.ceil(filtered.length / pageLimit);
        setpageCount(pageCount);

        setBlogs(filtered);
      });
  }, []);

  return (
    <div>
      <Typography variant="h2" gutterBottom>
        最新的情書
      </Typography>
      <Grid container spacing={8} columns={12} sx={{ my: 4 }}>
        {blogs
          .slice((page - 1) * pageLimit, pageLimit * page)
          .map((blog, index) => (
            <Grid key={index} size={{ xs: 12, sm: 6 }}>
              <Link
                href={`/blog/${blog.id ? blog.id : blog.slug}`}
                style={{ textDecoration: "none" }}
              >
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                    gap: 1,
                    height: "100%",
                  }}
                >
                  <Typography gutterBottom variant="caption" component="div">
                    {blog.tag}
                  </Typography>
                  <TitleTypography
                    gutterBottom
                    variant="h6"
                    onFocus={() => handleFocus(index)}
                    onBlur={handleBlur}
                    tabIndex={0}
                    className={focusedCardIndex === index ? "Mui-focused" : ""}
                  >
                    {blog.title}
                    <NavigateNextRoundedIcon
                      className="arrow"
                      sx={{ fontSize: "1rem" }}
                    />
                  </TitleTypography>
                  <StyledTypography
                    variant="body2"
                    color="text.secondary"
                    gutterBottom
                  >
                    {blog.description}
                  </StyledTypography>

                  <Author authors={blog.authors} />
                </Box>
              </Link>
            </Grid>
          ))}
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
