"use client";

import { useState, useMemo, useRef } from "react";
import { Backdrop, Box, Grid, Pagination } from "@mui/material";
import BlogContentMarkdown from "./BlogContentMarkdown";
import { CardItem } from "./test/MainContentCard";
import { useTextSelectionInfo } from "./feature/text-poster/useTextSelection";
import { PosterModalContent } from "./feature/text-poster/PosterModalContent";
import { EditorModalContent } from "./feature/text-poster/EditorModalContent";
import { TextSelectionToolbar } from "./feature/text-poster/TextSelectionToolbar";

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

export default function LongTextPaginationTwo({
  content,
  blog,
}: {
  content: string;
  blog?: CardItem;
}) {
  const [group, setGroup] = useState(1); // ← 当前“组”

  // const content_next = content.replace(/(?<!\n)\n\n(?!\n)/g, "");
  const pages = useMemo(
    () => paginateByLinesWithOffset(content, 14),
    [content]
  );

  const totalGroups = Math.ceil(pages.length / 2); // ← 总组数

  const leftIndex = (group - 1) * 2; // 左页
  const rightIndex = leftIndex + 1; // 右页

  // const containerRef = useRef<HTMLDivElement | null>(null);

  // const {
  //   selection,
  //   mode,
  //   openPoster,
  //   openHighlight,
  //   closeEditor,
  //   clearSelection,
  // } = useTextSelectionInfo(containerRef, { text: content || "" });

  // console.log("重新绘制");

  return (
    <>
      <Box
        // ref={containerRef}
        sx={{
          display: "flex",
          flexDirection: "column",
          maxWidth: "100%",
          justifyContent: "space-between",
        }}
        // onMouseDown={e => {
        //   // 只在点容器自身（不是选区/工具栏）
        //   console.log('删除selection 111');
        //   // if (e.target === e.currentTarget) {
        //     clearSelection();
        //     console.log('selection', selection);
        //     console.log('删除selection 222');
        //   // }
        // }}
      >
        <Box sx={{ minHeight: "75vh" }}>
          <Grid container columns={12}>
            {/* 左页 */}
            <Grid size={{ xs: 12, md: 6 }} sx={{ p: 2 }}>
              <BlogContentMarkdown
                content={pages[leftIndex]?.text}
                blog={blog}
              />
            </Grid>

            {/* 右页 */}
            <Grid size={{ xs: 12, md: 6 }} sx={{ p: 2 }}>
              <BlogContentMarkdown
                content={pages[rightIndex]?.text}
                blog={blog}
              />
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

      {/* <Box>
  
        <Backdrop
          sx={{
            zIndex: (theme) => theme.zIndex.modal + 10,
            color: "#fff",
            backdropFilter: "blur(4px)",
          }}
          open={mode == "poster"}
          onClick={(e) => {
            e.stopPropagation();
            closeEditor();
            // clearSelection();
          }}
        >
          <PosterModalContent
            text={`《${blog?.title ?? ""}》/7/7/7/7${
              selection?.text ?? ""
            }`}
            onClose={closeEditor}
          />
        </Backdrop>

        <Backdrop
          sx={{
            zIndex: (theme) => theme.zIndex.modal + 10,
            color: "#fff",
            backdropFilter: "blur(4px)",
          }}
          open={mode == "highlight"}
          onClick={(e) => {
            e.stopPropagation();
            closeEditor();
            // clearSelection();
          }}
        >
          <EditorModalContent
            selection={selection!}
            blogId={blog?.id!}
            onClose={closeEditor}
          />
        </Backdrop>

        {selection && (
          <TextSelectionToolbar
            selection={selection!}
            onGenerate={openPoster}
            onAddHighlight={openHighlight}
          />
        )}
      </Box> */}
    </>
  );
}
