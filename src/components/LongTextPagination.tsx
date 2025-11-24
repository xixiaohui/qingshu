"use client";

import { useState, useMemo } from "react";
import { Box, Pagination, Typography } from "@mui/material";
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
    <Box sx={{ maxWidth: 800, margin: "1 auto" }}>
      {/* 内容部分 */}
      {/* <Typography
        sx={{
          whiteSpace: "pre-wrap",
          lineHeight: 1.8,
          fontSize: "17px",
          mb: 3,
          wordBreak: "break-word",
        }}
      >
        {pages[page - 1]}
      </Typography> */}

      <BlogContentMarkdown content={pages[page - 1]}></BlogContentMarkdown>

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
          m: 4,
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
