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
import { formatDateSmart, splitByLineLength, splitBySpecial } from "@/lib/util";
import LongTextPagination from "./LongTextPagination";
import PDFButton from "./PDFButton";
import LongTextPaginationTwo from "./LongTextPaginationTwo";

import { useTextSelectionPoster } from "./feature/text-poster/useTextSelectionPoster";
import { TextSelectionToolbar } from "./feature/text-poster/TextSelectionToolbar";
import { PosterModalContent } from "./feature/text-poster/PosterModalContent";
import { useTextSelectionEditor } from "./feature/text-poster/useTextSelectionEditor";
import { EditorModalContent } from "./feature/text-poster/EditorModalContent";

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

  const { selection:selection_p, open:open_p, openPoster, closePoster } = useTextSelectionPoster();

  const { selection:selection_e, open:open_e, openEditor, closeEditor } = useTextSelectionEditor();
  return (
    <>
      <Grid
        size={{ xs: 12 }}
        sx={{
          backgroundColor: "#F3F0E6",
          color: "#373737",
        }}
      >
        <Box>
          {/* 海报模式 Backdrop */}
          <Backdrop
            sx={{
              zIndex: (theme) => theme.zIndex.modal + 10,
              color: "#fff",
              backdropFilter: "blur(4px)",
            }}
            open={open_p}
            onClick={closePoster}
          >
              <PosterModalContent
                text={`《${blogData?.title ?? ""}》/7/7/7/7${
                  selection_p?.text ?? ""
                }`}
                onClose={closePoster}
              />
          </Backdrop>
          
          {/* 摘要模式 Backdrop */}
          <Backdrop
            sx={{
              zIndex: (theme) => theme.zIndex.modal + 10,
              color: "#fff",
              backdropFilter: "blur(4px)",
            }}
            open={open_e}
            onClick={closeEditor}
          >
              <EditorModalContent
                text={selection_e?.text ?? ""}
                onClose={closeEditor}
              />
          </Backdrop>

          {/* 选中文字后的浮动按钮 */}
          {selection_p && (!open_p ||!open_e) && (
            <TextSelectionToolbar
              selection={selection_p}
              onGenerate={openPoster}
              onEditor={openEditor}
            />
          )}
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 1,
            minHeight: "100vh",
          }}
        >
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
                <LongTextPaginationTwo content={blogData?.content || ""} />
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
