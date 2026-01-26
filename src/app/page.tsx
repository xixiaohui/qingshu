"use client";

import * as React from "react";
import Container from "@mui/material/Container";
import Latest from "@/components/test/Latest";
import MainContent from "@/components/test/MainContent";
import { Box, CssBaseline } from "@mui/material";
import AppAppBar from "@/components/homepage/AppAppBar";
import Footer from "@/components/homepage/Footer";
import Adsense from "@/components/Adsense";

// 情书多重广告
function Adsbygoogle(){
  return (
    <Box
      sx={{
        display: { xs: "none", md: "block" }, // 仅大屏显示
        position: "absolute",
        top: "max(120px, 20vh)", // 距离顶部
        left: "calc(50% + 600px + 24px)", // 600 = lg container 一半
        width: 300,
        zIndex: 10,
      }}
    >
      <Adsense
        adClient="ca-pub-6634656437365032"
        adSlot="7741256542"
        style={{ display: "block", width: 300, height: 250 }}
      />
    </Box>
  );
}

export default function Home() {

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
        <MainContent></MainContent>
        <Latest></Latest>
        <Footer />
      </Container>
      {/* <Adsbygoogle></Adsbygoogle> */}
    </>
  );
}
