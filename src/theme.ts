'use client';
import { createTheme } from '@mui/material/styles';
import { Roboto } from 'next/font/google';

const roboto = Roboto({
  weight: ['300', '400', '500', '700'],
  subsets: ['latin'],
  display: 'swap',
});

const borderStyle = {
  border: "1px solid red",
};

const theme = createTheme({
  colorSchemes: { light: true, dark: true },
  cssVariables: {
    colorSchemeSelector: 'class',
  },
  typography: {
    fontFamily: roboto.style.fontFamily,
  },
  components: {
    MuiAlert: {
      styleOverrides: {
        root: {
          variants: [
            {
              props: { severity: 'info' },
              style: {
                backgroundColor: '#60a5fa',
              },
            },
          ],
        },
      },
    },
    // MuiPaper: { styleOverrides: { root: borderStyle } },
    // MuiCard: { styleOverrides: { root: borderStyle } },
    // MuiContainer: { styleOverrides: { root: borderStyle } },
    // MuiGrid: { styleOverrides: { root: borderStyle } },
  },
});

export default theme;
