"use client";

import * as React from "react";
import Container from "@mui/material/Container";
import Latest from "@/components/test/Latest";
import MainContent from "@/components/test/MainContent";
import AppTheme from "@/shared-theme/AppTheme";
import { CssBaseline } from "@mui/material";
import AppAppBar from "@/components/homepage/AppAppBar";
import Footer from "@/components/homepage/Footer";


export default function Home() {
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
        <Footer />
      </Container>
    </AppTheme>
  );
}
