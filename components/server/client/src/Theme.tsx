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
      main: '#335984',
      light: '#88a1bf'
    },
    secondary: {
      main: '#e8e8e8',
      dark: '#949494'
    },
    neutral: {
      main: '#d6d6d6',
      light: '#f0eded'
    }
  },
  typography: {
    allVariants: {
      fontFamily: 'Roboto',
      fontWeight: 300,
      color: '#585858'
    }
  }
});

export default theme;
