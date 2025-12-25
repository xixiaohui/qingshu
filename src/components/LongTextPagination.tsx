"use client";

import { useState, useMemo } from "react";
import { Box, Grid, Pagination, Typography } from "@mui/material";
import BlogContentMarkdown from "./BlogContentMarkdown";
import BlogContentMarkdownWithAnnotation from "./BlogContentAnnotation";
import { paginateByLinesWithOffset } from "./LongTextPaginationTwo";
import { CardItem } from "./test/MainContentCard";
import Adsense from "./Adsense";
import PDFButton from "./PDFButton";

function splitTextToPages(text: string, size: number = 1000) {
  const pages = [];
  for (let i = 0; i < text.length; i += size) {
    pages.push(text.slice(i, i + size));
  }
  return pages;
}

export function paginateByLines(text: string, linesPerPage: number = 20) {
  // 先按换行符拆分成行
  const lines = text.split(/\r?\n/);

  const pages: string[] = [];

  for (let i = 0; i < lines.length; i += linesPerPage) {
    const chunk = lines.slice(i, i + linesPerPage).join("\n");
    pages.push(chunk);
  }

  return pages;
}

export default function LongTextPagination({ content ,blog}: { content: string,blog?:CardItem }) {
  const [page, setPage] = useState(1);

  const pages = useMemo(() => paginateByLinesWithOffset(content, 14), [content]);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        maxWidth: "100%",
        justifyContent: "space-between",
      }}
    >
      <Box sx={{ minHeight: "75vh" }}>
        <Grid container columns={12}>
          <Grid
            size={{ xs: 12, md: 12 }}
            sx={{
              p: 2,
              backgroundColor: "rgba(206, 236, 236, 0.1)",
              borderRadius: 7,
            }}
          >
            <Box sx={{ display: "flex", justifyContent: "center" }}>
              <BlogContentMarkdown
                content={pages[page - 1].text}
                blog={blog}
              ></BlogContentMarkdown>
            </Box>
          </Grid>
        </Grid>
      </Box>

      {/* 分页控件 */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Pagination
          count={pages.length}
          page={page}
          onChange={(e, value) => setPage(value)}
          shape="rounded"
          color="primary"
          sx={{
            "& .MuiPaginationItem-root": {
              color: "#373737", // 普通页码颜色
            },
            "& .MuiPaginationItem-root.Mui-selected": {
              color: "#0019fd", // 选中页码颜色
            },
          }}
        />
      </Box>
      <Box
        sx={{
          my: 7,
        }}
      >
        {/* 情书内嵌广告 */}
        <Adsense adClient="ca-pub-6634656437365032" adSlot="9440694485" />
      </Box>
      <Box
        sx={{
          bgcolor: "transparent",
          display: "flex",
          justifyContent: "center",
          mb: 7,
        }}
      >
        {blog && <PDFButton blog={blog}></PDFButton>}
      </Box>
    </Box>
  );
}
