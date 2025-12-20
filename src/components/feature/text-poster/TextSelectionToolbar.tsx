import { Box, Button, Typography } from "@mui/material";
import { getDesignTokens } from "../../../shared-theme/themePrimitives";
import { useEffect } from "react";

function clearBrowserSelection() {
  const sel = window.getSelection();
  if (!sel) return;
  sel.removeAllRanges();
}

export function TextSelectionToolbar({
  selection,
  onGenerate,
  onAddHighlight,
}: {
  selection: TextSelection;
  onGenerate: () => void;
  onAddHighlight: () => void;
}) {

  if (!selection) return null;

  return (
    <Box
      sx={{
        position: "fixed",
        top: selection.rect.top - 40,
        left: selection.rect.left,
        zIndex: (theme) => theme.zIndex.modal + 5,
        pointerEvents: "auto",
      }}
      onClick={(e) => e.stopPropagation()}
    >
      {/* 添加摘要 */}
      <Button
        size="small"
        variant="contained"
        color="inherit"
        sx={{
          bgcolor: "#1976d2",
          color: "#fff",
          textTransform: "none",
          borderRadius: 1,
          px: 1.5,
          py: 0.5,
          fontSize: 13,
          boxShadow: 3,
          "&:hover": {
            bgcolor: "#115293",
          },
        }}
        onClick={() => {
          console.log("点击添加摘要");
          onAddHighlight();
        }}
      >
        <Typography variant="subtitle1">摘要</Typography>
      </Button>

      <Button
        size="small"
        variant="contained"
        color="inherit"
        sx={{
          bgcolor: "#1976d2",
          color: "#fff",
          textTransform: "none",
          borderRadius: 1,
          px: 1.5,
          py: 0.5,
          ml:1,
          fontSize: 13,
          boxShadow: 3,
          "&:hover": {
            bgcolor: "#115293",
          },
        }}
        onClick={() => {
          console.log("点击生成海报");
          onGenerate();
        }}
      >
        <Typography variant="subtitle1">海报</Typography>
      </Button>

    </Box>
  );
}



type TextSelection = {
  text: string;
  rect: DOMRect;
};

export function getTextSelection(): TextSelection | null {
  const selection = window.getSelection();
  if (!selection || selection.isCollapsed) return null;

  const text = selection.toString().trim();
  if (!text) return null;

  const range = selection.getRangeAt(0);
  const rect = range.getBoundingClientRect();

  return { text, rect };
}
