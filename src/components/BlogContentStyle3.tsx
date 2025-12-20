"use client";
import { supabase } from "@/lib/supabaseClient";
import {
  Box,
  Typography,
  Container,
  Grid,
  Card,
  CardMedia,
  Button,
  Paper,
  Link,
  Backdrop,
} from "@mui/material";
import { useEffect, useRef, useState } from "react";
import { Author, CardItem } from "./test/MainContentCard";
import {
  formatDateSmart,
  isPointInRect,
  splitByLineLength,
  splitBySpecial,
} from "@/lib/util";
import LongTextPagination from "./LongTextPagination";
import PDFButton from "./PDFButton";
import LongTextPaginationTwo from "./LongTextPaginationTwo";

import { useTextSelectionPoster } from "./feature/text-poster/useSelectionEditor";
import { TextSelectionToolbar } from "./feature/text-poster/TextSelectionToolbar";
import { PosterModalContent } from "./feature/text-poster/PosterModalContent";
import { EditorModalContent } from "./feature/text-poster/EditorModalContent";
import { useTextSelectionInfo } from "./feature/text-poster/useTextSelection";

const cardData = [
  {
    img: "https://picsum.photos/800/450?random=1",
    tag: "Love",
    title: "How Do I Love Thee?",
    description: "How Do I Love Thee? — Elizabeth Barrett Browning",
    authors: [
      {
        name: "Elizabeth Barrett Browning",
        avatar: "/static/images/avatar/1.jpg",
      },
    ],
    content: "## QS",
  },
];

function BlogContentMain({ identifier }: { identifier: string }) {
  const [blogData, setblogData] = useState<CardItem>();

  const isId = /^\d+$/.test(identifier);
  identifier = decodeURIComponent(identifier);

  useEffect(() => {
    async function load() {
      const { data, error } = await supabase
        .from("blogs")
        .select("*")
        .order("created_at", { ascending: false })
        .eq(isId ? "id" : "slug", identifier)
        .maybeSingle();
      if (error) {
        console.error(error);
        const errorData = cardData[0];
        setblogData(errorData);
      } else {
        setblogData(data);
      }
    }
    load();
  }, [identifier]);

  const containerRef = useRef<HTMLDivElement | null>(null);
  const {
    selection,
    mode,
    openPoster,
    openHighlight,
    closeEditor,
    clearSelection,
  } = useTextSelectionInfo(containerRef, { text: blogData?.content || "" });

  // console.log("重新绘制");

  let newRect = null;
  if (selection != null) {
    newRect = new DOMRect(
      selection.rect.left,
      selection.rect.top - 40 ,
      200,
      40
    );
  }

  return (
    <>
      <Grid
        size={{ xs: 12 }}
        sx={{
          backgroundColor: "#F3F0E6",
          color: "#373737",
        }}
      >
        <Box
          ref={containerRef}
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 1,
            minHeight: "100vh",
          }}
          onMouseDown={(e) => {
            if (!selection?.rect) {
              console.log(selection);
              return;
            }

            const { clientX, clientY } = e;

            const inSelection = isPointInRect(clientX, clientY, newRect!);

            if (!inSelection && mode == null) {
              console.log("mode is ", mode);
              console.log("清除------------2");
              clearSelection();
            }
          }}
        >
          <Box>
            <SelectionRectOverlay rect={expandRect(selection?.rect!,2)}></SelectionRectOverlay>
            {/*<SelectionRectOverlay rect={newRect!}></SelectionRectOverlay> */}

            {/* 海报模式 Backdrop */}
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
                text={`《${blogData?.title ?? ""}》/7/7/7/7${
                  selection?.text ?? ""
                }`}
                onClose={closeEditor}
              />
            </Backdrop>

            {/* 添加摘要 Backdrop */}
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
                blogId={blogData?.id!}
                onClose={closeEditor}
              />
            </Backdrop>

            {/* 选中文字后的浮动按钮 */}
            {selection && (
              <TextSelectionToolbar
                selection={selection!}
                onGenerate={openPoster}
                onAddHighlight={openHighlight}
              />
            )}
          </Box>
          <Box
            sx={{
              display: "flex",
              flexDirection: { xs: "column", md: "row" },
              gap: 1,
              justifyContent: "flex-start",
              alignItems: "flex-end",
              mt: 1,
              mx: 1,
            }}
          >
            <Grid size={{ xs: 12, md: 6 }}>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "row",
                }}
              >
                <Typography
                  variant="h2"
                  sx={{
                    fontWeight: 700,
                    color: "#373737",
                  }}
                >
                  {blogData?.title}
                </Typography>
              </Box>
            </Grid>

            <Grid size={{ xs: 12, md: 3 }}>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  gap: 1,
                }}
              >
                <Typography variant="body2" gutterBottom>
                  {blogData?.description}
                </Typography>

                {blogData?.authors?.map((a) => (
                  <Link
                    key={a.name}
                    href={`/author/${encodeURIComponent(a.name)}`}
                  >
                    <Typography
                      gutterBottom
                      variant="body2"
                      color="primary"
                      display="inline"
                      mr={1}
                    >
                      {a.name}
                    </Typography>
                  </Link>
                ))}
              </Box>
            </Grid>

            <Grid size={{ xs: 12, md: 3 }}>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  gap: 1,
                }}
              >
                <Typography gutterBottom variant="caption" component="div">
                  {blogData?.tag}
                </Typography>
                <Typography gutterBottom variant="caption" component="div">
                  {formatDateSmart(blogData?.created_at || "")}
                </Typography>
              </Box>
            </Grid>
          </Box>

          <Box
            sx={{
              display: "flex",
              flexDirection: { xs: "column", md: "row" },
              gap: 1,
              mx: 1,
            }}
          >
            <Grid
              size={{ xs: 12, md: 1 }}
              sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "center",
                }}
              >
                <Card
                  sx={{
                    width: "50%",
                  }}
                >
                  <CardMedia
                    component="img"
                    alt={blogData?.title}
                    image={blogData?.img}
                    sx={{
                      aspectRatio: "9 / 16",
                      borderBottom: "1px solid",
                      borderColor: "divider",
                    }}
                  />
                </Card>
              </Box>
            </Grid>
            <Grid size={{ xs: 12, md: 10 }} sx={{ minHeight: "30px" }}>
              <Box>
                <LongTextPaginationTwo
                  content={blogData?.content || ""}
                  blog={blogData!}
                />
              </Box>
            </Grid>

            <Grid
              size={{ xs: 12, md: 1 }}
              sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "flex-end",
              }}
            >
              <Box
                sx={{
                  bgcolor: "transparent",
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "flex-end",
                }}
              >
                {blogData && <PDFButton blog={blogData}></PDFButton>}
              </Box>
            </Grid>
          </Box>
        </Box>
      </Grid>
    </>
  );
}

export default function BlogContentStyle3({
  identifier,
}: {
  identifier: string;
}) {
  return (
    <>
      <Grid container spacing={2} columns={12} sx={{ my: 12 }}>
        <BlogContentMain identifier={identifier}></BlogContentMain>
      </Grid>
    </>
  );
}

function SelectionRectOverlay({ rect }: { rect?: DOMRect }) {
  if (!rect) return null;

  return (
    <Box
      sx={{
        position: "fixed",
        left: rect.left,
        top: rect.top,
        width: rect.width,
        height: rect.height,

        borderRadius: 0.5,
        pointerEvents: "none",
        zIndex: 1300,
        boxSizing: "border-box",

        border: "2px solid transparent",
       background: `
        linear-gradient(
          rgba(25,118,210,0.12),
          rgba(25,118,210,0.12)
        ) padding-box,
        linear-gradient(
          135deg,
          rgba(100,181,246,0.6),
          rgba(25,118,210,0.6),
          rgba(13,71,161,0.6)
        ) border-box
      `
      }}
    />
  );
}

function expandRect(rect: DOMRect, padding: number) {
  if(!rect) return null;
   return new DOMRect(
    rect.left - padding,
    rect.top - padding,
    rect.width + padding * 2,
    rect.height + padding * 2
  );
}