"use client";

import AppTheme from "@/shared-theme/AppTheme";
import * as React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import AppAppBar from "../../components/homepage/AppAppBar";
import Hero from "../../components/homepage/Hero";
import LogoCollection from "../../components/homepage/LogoCollection";
import Highlights from "../../components/homepage/Highlights";
import Pricing from "../../components/homepage/Pricing";
import Features from "../../components/homepage/Features";
import Testimonials from "../../components/homepage/Testimonials";
import FAQ from "../../components/homepage/FAQ";
import Footer from "../../components/homepage/Footer";

export default function HomePage(props: { disableCustomTheme?: boolean }) {
  return (
    <AppTheme {...props}>
      <CssBaseline enableColorScheme />
      <AppAppBar />
      <Hero />
      <div>
        <LogoCollection />
        <Features />
        <Divider />
        <Testimonials />
        <Divider />
        <Highlights />
        <Divider />
        <Pricing />
        <Divider />
        <FAQ />
        <Divider />
        <Footer />
      </div>
    </AppTheme>
  );
}
