
"use client";

import AppAppBar from "@/components/homepage/AppAppBar";
import Footer from "@/components/homepage/Footer";
import { cardData } from "@/components/test/CardData";
import MainContentCard from "@/components/test/MainContentCard";
import AppTheme from "@/shared-theme/AppTheme";
import { Box, Container, CssBaseline, Grid, Pagination, Typography } from "@mui/material";


function EndTitle() {
  return (
    <div>
      <Typography variant="h2" gutterBottom>
        散场信箱
      </Typography>
    </div>
  );
}

function EndMain(){
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

export default function EndPage() {
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
        <EndTitle></EndTitle>
        <EndMain></EndMain>
        <Footer />
      </Container>
    </>
  );
}
