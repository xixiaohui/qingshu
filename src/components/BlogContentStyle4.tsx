"use client";
import { supabase } from "@/lib/supabaseClient";
import {
  Box,
  Typography,
  Container,
  Grid,
  Card,
  CardMedia,
  Link,
  Backdrop,
} from "@mui/material";
import { useEffect, useRef, useState } from "react";
import { Author, CardItem } from "./test/MainContentCard";
import {
  BlogMark,
  formatDateSmart,
  isPointInRect,
} from "@/lib/util";
import PDFButton from "./PDFButton";
import LongTextPaginationTwo from "./LongTextPaginationTwo";

import { TextSelectionToolbar } from "./feature/text-poster/TextSelectionToolbar";
import { PosterModalContent } from "./feature/text-poster/PosterModalContent";
import { EditorModalContent } from "./feature/text-poster/EditorModalContent";
import { useTextSelectionInfo } from "./feature/text-poster/useTextSelection";
import { BlogMarksLayer } from "./BlogMarksLayer";
import Adsense from "./Adsense";
import LongTextPagination from "./LongTextPagination";
import { normalizeAuthors } from "@/lib/utils/normalizeAuthors";

const USE_SUPABASE = process.env.USE_SUPABASE === "true"

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

function BlogContentMain({ identifier ,post}: { identifier: string ,post:CardItem}) {
  const [blogData, setblogData] = useState<CardItem>();

  const [marks, setMarks] = useState<BlogMark[]>();
  const contentRef = useRef<HTMLDivElement>(null);

  const isId = /^\d+$/.test(identifier);
  identifier = decodeURIComponent(identifier);

  useEffect(() => {
    async function load() {
      setblogData(post);
      
      console.log("----post----");
      console.log(post);

      
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

  if(selection){
    console.log("重新绘制");
    console.log(selection);
  }
  
  

  let newRect = null;
  if (selection != null) {
    newRect = new DOMRect(
      selection.rect.left,
      selection.rect.top - 40,
      150,
      40
    );
  }

  useEffect(() => {
    if (selection) {
      lockPageScroll();
    } else {
      unlockPageScroll();
    }

    return unlockPageScroll;
  }, [selection]);


  useEffect(() => {
    if (!blogData?.id) return; // ⬅️ 关键保护

    async function loadMarks() {
      const { data, error } = await supabase
        .from("blog_marks")
        .select("*")
        .eq("blog_id", blogData?.id)
        .order("created_at", { ascending: false });

      if (error) {
        console.error("loadMasks error:", error);
        return;
      }

      setMarks(data ?? []);
    }

    loadMarks();
  }, [blogData?.id]); // ⬅️ 关键依赖

  // console.log(marks);
  // console.log("----------------------marks----------------");

  const authors = normalizeAuthors(blogData?.authors)
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
            {/* <SelectionRectOverlay rect={newRect!}></SelectionRectOverlay> */}

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
                selection={selection}
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
                  variant="h1"
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

                {authors.map((a) => (
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
                  {USE_SUPABASE?formatDateSmart(blogData?.created_at || ""):blogData?.created_at?.toString() || ""}
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
              <Box ref={contentRef}>
                <LongTextPagination
                  content={blogData?.content || ""}
                  blog={blogData!}
                />
              </Box>
              {marks && 
                <BlogMarksLayer rootRef={contentRef} marks={marks} />
              }
            </Grid>

            <Grid
              size={{ xs: 12, md: 1 }}
              sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "flex-end",
              }}
            >
              
            </Grid>
          </Box>
        </Box>
      </Grid>
    </>
  );
}

export default function BlogContentStyle4({
  identifier,
  post
}: {
  identifier: string;
  post:CardItem
}) {
  return (
    <>
      <Grid container spacing={2} columns={12} sx={{ my: 12 }}>
        <BlogContentMain identifier={identifier} post={post}></BlogContentMain>
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
          rgba(253, 140, 11, 0.28),
          rgba(4, 0, 255, 0.35),
          rgba(255, 11, 23, 0.32)
        ) border-box
      `
      }}
    />
  );
}

function expandRect(rect: DOMRect, padding: number) {
  if(!rect) return new DOMRect;
   return new DOMRect(
    rect.left - padding,
    rect.top - padding,
    rect.width + padding * 2,
    rect.height + padding * 2
  );
}

function lockPageScroll() {
  const scrollbarWidth =
    window.innerWidth - document.documentElement.clientWidth;

  document.body.style.overflow = "hidden";
  document.body.style.paddingRight = `${scrollbarWidth}px`;
}

function unlockPageScroll() {
  document.body.style.overflow = "";
  document.body.style.paddingRight = "";
}