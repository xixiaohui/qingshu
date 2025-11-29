"use client";

import { useState, useMemo } from "react";
import { Box, Grid, Pagination } from "@mui/material";
import BlogContentMarkdown from "./BlogContentMarkdown";

function paginateByLines(text: string, linesPerPage: number = 20) {
  const lines = text.split(/\r?\n/);
  const pages: string[] = [];

  for (let i = 0; i < lines.length; i += linesPerPage) {
    pages.push(lines.slice(i, i + linesPerPage).join("\n"));
  }
  return pages;
}

export default function  LongTextPagination({ content }: { content: string }) {
  const [group, setGroup] = useState(1); // ← 当前“组”

  const pages = useMemo(() => paginateByLines(content, 14), [content]);

  const totalGroups = Math.ceil(pages.length / 2); // ← 总组数

  const leftIndex = (group - 1) * 2; // 左页
  const rightIndex = leftIndex + 1; // 右页

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
          {/* 左页 */}
          <Grid size={{ xs: 12, md: 6 }} sx={{ p: 2 }}>
            <BlogContentMarkdown content={pages[leftIndex] ?? ""} />
          </Grid>

          {/* 右页 */}
          <Grid size={{ xs: 12, md: 6 }} sx={{ p: 2 }}>
            <BlogContentMarkdown content={pages[rightIndex] ?? ""} />
          </Grid>
        </Grid>
      </Box>

      {/* 分页控件（按组翻页） */}
      <Box sx={{ display: "flex", justifyContent: "center" }}>
        <Pagination
          count={totalGroups}
          page={group}
          onChange={(e, value) => setGroup(value)}
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
    </Box>
  );
}
