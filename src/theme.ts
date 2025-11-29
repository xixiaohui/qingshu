'use client';
import { createTheme } from '@mui/material/styles';


const borderStyle = {
  border: "1px solid red",
};

const theme = createTheme({
  colorSchemes: { light: true, dark: true },
  cssVariables: {
    colorSchemeSelector: 'class',
  },
  typography: {
    // fontFamily: roboto.style.fontFamily,
    fontFamily:"var(--font-noto-serif-tc), var(--font-fira-code),sans-serif",
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
