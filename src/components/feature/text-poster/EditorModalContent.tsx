// feature/text-poster/PosterModalContent.tsx
import {
  Box,
  Button,
  IconButton,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import DownloadIcon from "@mui/icons-material/Download";
import {  useState } from "react";

import {
  SHARE_IAMGE_HEIGHT,
  SHARE_IAMGE_WIDTH,
} from "@/lib/util";


export function EditorModalContent({
  text,
  onClose,
}: {
  text: string;
  onClose: () => void;
}) {
  const [summary, setSummary] = useState("");

  return (
    <Box
      onClick={(e) => e.stopPropagation()}
      sx={{
        position: "relative",
        bgcolor: "#373737",
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

      {/* 编辑区域 */}
      <Box
        onClick={(e) => e.stopPropagation()}
        sx={{
          width: { md: "50vw" },
          borderRadius: 2,
          overflow: "hidden",
          mb: 2,
          mt: 10,
          backgroundColor: "#373737", // 可选，便于对比
          color: "#F3F0E6",
          aspectRatio: `${SHARE_IAMGE_HEIGHT} / ${SHARE_IAMGE_WIDTH}`,
        }}
      >
        <Typography variant="body1">{text}</Typography>

        <TextField
          fullWidth
          multiline
          minRows={3}
          placeholder="用你自己的话写一句理解…"
          value={summary}
          onChange={(e) => setSummary(e.target.value)}
          onClick={(e) => e.stopPropagation()}
        />
      </Box>

      {/* 操作区 */}
      <Stack direction="row" spacing={2} justifyContent="center">
        <Button
          variant="contained"
          startIcon={<DownloadIcon />}
          onClick={() => {}}
          sx={{
            bgcolor: "#fff",
            color: "#000",
            fontWeight: 500,
            "&:hover": {
              bgcolor: "#f3f3f3",
            },
          }}
        >
          提交摘要
        </Button>
      </Stack>
    </Box>
  );
}
