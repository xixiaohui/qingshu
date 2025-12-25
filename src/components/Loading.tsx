import { Box, CircularProgress, Typography } from "@mui/material";

export default function LoadingFrame(){


    return (
      <>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            height: "60vh",
            gap: 2,
          }}
        >
          <CircularProgress color="primary" />
          <Typography variant="body1" color="text.secondary">
            正在載入數據，請稍候...
          </Typography>
        </Box>
      </>
    );
}