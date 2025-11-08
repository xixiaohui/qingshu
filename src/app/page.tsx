"use client"

import * as React from 'react';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import NextLink from 'next/link';
import ProTip from '@/components/ProTip';
import Copyright from '@/components/Copyright';
import Latest from '@/components/test/Latest';
import MainContent from '@/components/test/MainContent';
import AppTheme from '@/shared-theme/AppTheme';
import { CssBaseline } from '@mui/material';
import AppAppBar from '@/components/homepage/AppAppBar';


export default function Home(){
  return(
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


function Home2() {
  return (
    <Container maxWidth="lg">
      <Box
        sx={{
          my: 4,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Typography variant="h4" component="h1" sx={{ mb: 2 }}>
          QingShu
        </Typography>
        <Link href="/about" color="secondary" component={NextLink}>
         关于QingShu
        </Link>
        <ProTip />
        <Copyright />
      </Box>
    </Container>
  );
}
