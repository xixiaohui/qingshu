import React from "react";
import { Container } from "@mui/material";
import AppAppBar from "./homepage/AppAppBar";
import Footer from "./homepage/Footer";

interface FramePageProps {
  children: React.ReactNode;
}

export default function FramePage({ children }: FramePageProps) {
  return (
    <>
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
        {children}
      </Container>
      <Footer />
    </>
  );
}
