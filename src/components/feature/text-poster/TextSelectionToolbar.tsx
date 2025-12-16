import { Box, Button, Typography } from "@mui/material";
import { getDesignTokens } from "../../../shared-theme/themePrimitives";

export function TextSelectionToolbar({
  selection,
  onGenerate,
  onEditor,
}: {
  selection: { rect: DOMRect };
  onGenerate: () => void;
  onEditor: () => void;
}) {
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
      <Button
        size="small"
        variant="contained"
        color="inherit"
        sx={{
          bgcolor: "primary",
          color: "#fff",
          textTransform: "none",
          borderRadius: 1,
          px: 1.5,
          py: 0.5,
          mr:1,
          fontSize: 13,
          boxShadow: 3,
          "&:hover": {
            bgcolor: "#000",
          },
        }}
        onClick={() => {
          console.log("点击生成海报");
          onGenerate();
        }}
      >
        <Typography variant="subtitle1">生成海报</Typography>
      </Button>
      <Button
        size="small"
        variant="contained"
        color="inherit"
        sx={{
          bgcolor: "primary",
          color: "#fff",
          textTransform: "none",
          borderRadius: 1,
          px: 1.5,
          py: 0.5,
          mr:1,
          fontSize: 13,
          boxShadow: 3,
          "&:hover": {
            bgcolor: "#000",
          },
        }}
        onClick={() => {
          console.log("点击编辑摘要");
          onEditor();
        }}
      >
        <Typography variant="subtitle1">✍ 做摘要</Typography>
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
