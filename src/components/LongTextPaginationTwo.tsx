"use client";

import { useState, useMemo } from "react";
import { Box, Grid, Pagination } from "@mui/material";
import BlogContentMarkdown from "./BlogContentMarkdown";

export interface MyPage {
  text: string;
  start: number; // 在全文中的起始 index
  end: number;
}

export function paginateByLinesWithOffset(
  text: string,
  linesPerPage = 20
): MyPage[] {
  const lines = text.split(/\r?\n/);
  const pages: MyPage[] = [];

  let cursor = 0;

  for (let i = 0; i < lines.length; i += linesPerPage) {
    const slice = lines.slice(i, i + linesPerPage);
    const pageText = slice.join("\n");

    const start = cursor;
    const end = start + pageText.length;

    pages.push({ text: pageText, start, end });

    // ⚠️ +1 是因为 split 去掉了 \n，要补回来
    cursor = end + 1;
  }

  return pages;
}

function paginateByLines(text: string, linesPerPage: number = 20) {
  const lines = text.split(/\r?\n/);
  const pages: string[] = [];

  for (let i = 0; i < lines.length; i += linesPerPage) {
    pages.push(lines.slice(i, i + linesPerPage).join("\n"));
  }
  return pages;
}

export default function  LongTextPaginationTwo({ content , blogId}: { content: string,blogId: number}) {
  const [group, setGroup] = useState(1); // ← 当前“组”

  // const content_next = content.replace(/(?<!\n)\n\n(?!\n)/g, "");
  const pages = useMemo(() => paginateByLinesWithOffset(content, 14), [content]);

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
            <BlogContentMarkdown content={pages[leftIndex]} blogId={blogId}/>
          </Grid>

          {/* 右页 */}
          <Grid size={{ xs: 12, md: 6 }} sx={{ p: 2 }}>
            <BlogContentMarkdown content={pages[rightIndex]} blogId={blogId}/>
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
