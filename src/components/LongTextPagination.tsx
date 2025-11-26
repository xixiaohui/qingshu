"use client";

import { useState, useMemo } from "react";
import { Box, Grid, Pagination, Typography } from "@mui/material";
import BlogContentMarkdown from "./BlogContentMarkdown";

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

export default function LongTextPagination({ content }: { content: string }) {
  const [page, setPage] = useState(1);

  const pages = useMemo(() => paginateByLines(content, 14), [content]);

  return (
    <Box sx={{ display: "flex", flexDirection: "column", maxWidth: "100%" }}>
      <Grid container columns={12}>
        <Grid size={{ xs: 12, md: 5 }} sx={{ mx: 1 }}>
          <Box
            sx={{
              maxWidth: "100%",
              overflow: "hidden",
             
              display: "flex",
              justifyContent: "flex-end",
            }}
          >
            <Box sx={{ width: "100%" }}>
              <BlogContentMarkdown
                content={pages[page - 1]}
              ></BlogContentMarkdown>
            </Box>
          </Box>
        </Grid>
        <Grid size={{ xs: 12, md: 5 }} sx={{ mx: 1 }}>
          <Box
            sx={{
              maxWidth: "100%",
              overflow: "hidden",
              
            }}
          >
            <BlogContentMarkdown content={pages[page]}></BlogContentMarkdown>
          </Box>
        </Grid>
      </Grid>

      {/* 分页控件 */}
      <Pagination
        count={pages.length}
        page={page}
        onChange={(e, value) => setPage(value)}
        shape="rounded"
        color="primary"
        sx={{
          display: "flex",
          justifyContent: "flex-start",
          m: 5,
          "& .MuiPaginationItem-root": {
            color: "#373737", // 普通页码颜色
          },
          "& .MuiPaginationItem-root.Mui-selected": {
            color: "#373737", // 选中页码颜色
          },
        }}
      />
    </Box>
  );
}
