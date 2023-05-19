import { createTheme } from '@mui/material/styles';

declare module '@mui/material/styles' {
  interface Palette {
    neutral: Palette['primary'];
  }

  interface PaletteOptions {
    neutral: PaletteOptions['primary'];
  }
}
// #FFA6F9 - pink
// #335984 - blue
// #8CE0ED - aqua blue
// #02ADEB - darker blue
// #9002B8 - purple / magenta
// #02B87b - green
// #5d2f94 - purple dark
const theme = createTheme({
  palette: {
    primary: {
      main: '#5d2f94',
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
