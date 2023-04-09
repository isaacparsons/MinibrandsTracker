import { createTheme } from '@mui/material/styles';

declare module '@mui/material/styles' {
  interface Palette {
    neutral: Palette['primary'];
  }

  interface PaletteOptions {
    neutral: PaletteOptions['primary'];
  }
}

const theme = createTheme({
  palette: {
    primary: {
      main: '#335984'
    },
    secondary: {
      main: '#e8e8e8',
      dark: '#949494'
    },
    neutral: {
      main: '#d6d6d6'
    }
  },
  typography: {
    fontFamily: 'Roboto, Helvetica, Segoe UI, Arial, sans-serif'
  }
});

export default theme;
