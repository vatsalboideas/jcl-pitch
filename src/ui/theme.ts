'use client';
import { createTheme } from '@mui/material/styles';
import { Afacad } from 'next/font/google';

const afcad = Afacad({
  subsets: ['latin'],
  weight: ['400'],
});

const theme = createTheme({
  typography: {
    h2: {
      fontFamily: afcad.style.fontFamily,
      fontWeight: 400,
    },
  },
});

export default theme;
