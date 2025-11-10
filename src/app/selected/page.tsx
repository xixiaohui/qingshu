"use client";

import AppAppBar from "@/components/homepage/AppAppBar";
import Footer from "@/components/homepage/Footer";
import { cardData } from "@/components/test/CardData";
import MainContentCard from "@/components/test/MainContentCard";
import AppTheme from "@/shared-theme/AppTheme";
import { Box, Container, CssBaseline, Grid, Pagination, Typography } from "@mui/material";


function SelectTitle() {
  return (
    <div>
      <Typography variant="h2" gutterBottom>
        精选
      </Typography>
    </div>
  );
}

function SelectMain(){
  return(
    <div>
      <Grid container spacing={2} columns={12}>
        <MainContentCard data={cardData} md={4}></MainContentCard>
      </Grid>

      <Box sx={{ display: "flex", flexDirection: "row", pt: 4 }}>
        <Pagination
          hidePrevButton
          hideNextButton
          count={5}
          boundaryCount={5}
        />
      </Box>
    </div>
  );
}

export default function SelectedPage() {
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
        <SelectTitle></SelectTitle>
        <SelectMain></SelectMain>
        <Footer />
      </Container>
    </AppTheme>
  );
}