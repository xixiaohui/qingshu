import { Box, Button } from "@mui/material";

export function TextSelectionToolbar({
  selection,
  onGenerate,
}: {
  selection: { rect: DOMRect };
  onGenerate: () => void;
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
          bgcolor: "#111",
          color: "#fff",
          textTransform: "none",
          borderRadius: 1,
          px: 1.5,
          py: 0.5,
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
        生成海报
      </Button>
    </Box>
  );
}
