// feature/text-poster/PosterModalContent.tsx
import { Box, Button, IconButton, Stack, Typography } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import DownloadIcon from "@mui/icons-material/Download";
import { useEffect, useRef } from "react";
import { renderPoster } from "./renderPoster";
import { SHARE_IAMGE_HEIGHT, SHARE_IAMGE_WIDTH } from "@/lib/util";
import { prepareHiDPICanvas } from "./drawMultilineText";

export function PosterModalContent({
  text,
  onClose,
}: {
  text: string;
  onClose: () => void;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;

    if (!canvas) return;
    const width = SHARE_IAMGE_WIDTH;
    const height = SHARE_IAMGE_HEIGHT;
    const ctx = prepareHiDPICanvas(canvas, width, height);

    if (!ctx) return;

    renderPoster(ctx, text);
  }, [text]);

  const handleDownload = async () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    canvas.toBlob(
      (blob) => {
        if (!blob) return;
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        const title = text
          .split("/7/7/7/7")[0]
          .replace("《", "")
          .replace("》", "");
        a.download = `${title}-poster.png`;
        a.click();
        URL.revokeObjectURL(url);
      },
      "image/png",
      1
    );
  };

  return (
    <Box
      onClick={(e) => e.stopPropagation()}
      sx={{
        position: "relative",
        bgcolor: "#111",
        borderRadius: 3,
        p: 2,
        boxShadow: 24,
        width: "fit-content",
      }}
    >
      {/* 右上角关闭 */}
      <IconButton
        onClick={onClose}
        sx={{
          position: "absolute",
          top: 8,
          right: 8,
          color: "#000",
          zIndex: 2,
        }}
      >
        <CloseIcon />
      </IconButton>

      {/* 海报预览 */}
      <Box
        sx={{
          width: 360,
          borderRadius: 2,
          overflow: "hidden",
          mb: 2,
          backgroundColor: "#000", // 可选，便于对比
          aspectRatio: `${SHARE_IAMGE_WIDTH} / ${SHARE_IAMGE_HEIGHT}`,
        }}
      >
        <canvas
          ref={canvasRef}
          style={{
            width: "100%",
            height:"100%",
            display:"block",
          }}
        />
      </Box>

      {/* 操作区 */}
      <Stack direction="row" spacing={2} justifyContent="center">
        <Button
          variant="contained"
          startIcon={<DownloadIcon />}
          onClick={handleDownload}
          sx={{
            bgcolor: "#fff",
            color: "#000",
            fontWeight: 500,
            "&:hover": {
              bgcolor: "#f3f3f3",
            },
          }}
        >
          下载海报
        </Button>
      </Stack>
    </Box>
  );
}
