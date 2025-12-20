// feature/text-poster/PosterModalContent.tsx
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import DownloadIcon from "@mui/icons-material/Download";
import { useEffect, useState } from "react";

import { BlogMark, SHARE_IAMGE_HEIGHT, SHARE_IAMGE_WIDTH } from "@/lib/util";
import { TextSelection } from "./useSelectionEditor";

import { LoadingButton } from "@mui/lab";

export function EditorModalContent({
  selection,
  blogId,
  onClose,
}: {
  selection: TextSelection;
  blogId: number;
  onClose: () => void;
}) {
  const [summary, setSummary] = useState("");

  const [newMark, setNewMark] = useState<BlogMark>();

  const [saving, setSaving] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const [answer, setAnswer] = useState("");
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!selection) return;

    const newMarkUse: BlogMark = {
      id: crypto.randomUUID(),
      blog_id: blogId,
      start: selection.start!,
      end: selection.end!,
      bg_color: "#ffd666",
      style: "highlight",
      excerpt: selection.text,
      created_at: new Date().toISOString(),
    };
    setNewMark(newMarkUse);

    console.log("selection",selection);
    console.log("-----------------EditorModalContent----------------------");
  }, [blogId]);

  const saveHighlight = async (mark: BlogMark) => {
    try {
      setSaving(true);

      const res = await fetch("/api/blogMark", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(mark),
      });

      if (!res.ok) throw new Error("保存失败");

      // ✅ 成功
      onClose(); // 清空选区
    } catch (err) {
      console.error("保存高亮失败", err);
      alert("保存失败，请重试");
    } finally {
      setSaving(false);
    }
  };

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
        {selection && <Typography variant="body1">{selection.text}</Typography>}

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
        <LoadingButton
          variant="contained"
          size="small"
          loading={saving}
          sx={{
            bgcolor: "#1976d2",
            color: "#fff",
            textTransform: "none",
            borderRadius: 1,
            px: 1.5,
            py: 0.5,
            fontSize: 13,
          }}
          onClick={() => {
            setOpenDialog(true);
            // saveHighlight(newMark!);
          }}
        >
          提交摘要
        </LoadingButton>
      </Stack>
      <Dialog
        open={openDialog}
        onClose={() => {
          !saving && setOpenDialog(false);
          setError(null);
          setAnswer("");
          onClose();
        }}
        maxWidth="sm"
        fullWidth
        sx={{
          zIndex: (theme) => theme.zIndex.modal + 11,
        }}
      >
        <DialogTitle>提交前请回答</DialogTitle>

        <DialogContent>
          <Typography sx={{ mb: 1 }}>
            请回答问题后才能提交摘要：
          </Typography>

          <Typography sx={{ mb: 1 }}>
            为什么选择这段话~~
          </Typography>

          <TextField
            fullWidth
            autoFocus
            value={answer}
            onChange={(e) => {
              setAnswer(e.target.value);
              setError(null);
            }}
            error={!!error}
            helperText={error}
            placeholder="请输入你的回答"
          />

        </DialogContent>

        <DialogActions>
          <Button onClick={() => setOpenDialog(false)} disabled={saving}>
            取消
          </Button>

          <LoadingButton
            variant="contained"
            loading={saving}
            // disabled={!answer.trim()}
            onClick={async () => {

              if (!validateAnswer(answer)) {
                setError("回答不符合要求");
                return;
              }

              try {
                setSaving(true);

                saveHighlight(newMark!);

                setOpenDialog(false);
                setAnswer("");
              } catch (e) {
                console.error(e);
              } finally {
                setSaving(false);
              }
            }}
          >
            确认提交
          </LoadingButton>
        </DialogActions>
      </Dialog>
    </Box>
  );
}


function validateAnswer(input: string) {
  if (input.length < 3) return false;
  if (!input.includes("x")) return false;
  return true;
}