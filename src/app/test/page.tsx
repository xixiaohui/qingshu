"use client"
import AppAppBar from "@/components/homepage/AppAppBar";
import Latest from "@/components/test/Latest";
import MainContent from "@/components/test/MainContent";
import AppTheme from "@/shared-theme/AppTheme";
import { Container, CssBaseline } from "@mui/material";

function TestPage() {
  return (
    <AppTheme>
      <CssBaseline enableColorScheme />
      <AppAppBar />
      <Container
        maxWidth="lg"
        component="main"
        sx={{
          display: "flex",
          flexDirection: "column",
          my: 16,
          gap: 4,
        }}
      >
        <MainContent></MainContent>
        <Latest></Latest>
      </Container>
    </AppTheme>
  );
}

export default TestPage;
