// feature/text-poster/PosterModalContent.tsx
import { Box, Button, IconButton, Stack, Typography } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import DownloadIcon from "@mui/icons-material/Download";
import { useEffect, useRef } from "react";
import { renderPoster } from "./renderPoster";
import { SHARE_IAMGE_HEIGHT, SHARE_IAMGE_WIDTH } from "@/lib/util";

export function PosterModalContent({
  text,
  onClose,
}: {
  text: string;
  onClose: () => void;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const ctx = canvasRef.current?.getContext("2d");
    if (!ctx) return;
    renderPoster(ctx, text);
  }, [text]);

  const handleDownload = async () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    canvas.toBlob((blob) => {
      if (!blob) return;
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "qinshu-poster.png";
      a.click();
      URL.revokeObjectURL(url);
    });
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
          color: "#fff",
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
        }}
      >
        <canvas
          ref={canvasRef}
          width={SHARE_IAMGE_WIDTH}
          height={SHARE_IAMGE_HEIGHT}
          style={{
            width: "100%",
            height: "auto",
            display: "block",
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
