import { extendTheme } from '@chakra-ui/react';

const fonts = { mono: `'Menlo', monospace` };

const breakpoints = {
  sm: '40em',
  md: '52em',
  lg: '64em',
  xl: '80em'
};

const theme = extendTheme({
  semanticTokens: {
    colors: {
      text: {
        default: '#16161D',
        _dark: '#ade3b8'
      },
      heroGradientStart: {
        default: '#7928CA',
        _dark: '#e3a7f9'
      },
      heroGradientEnd: {
        default: '#9900ff',
        _dark: '#0097de'
      }
    },
    radii: {
      button: '12px'
    }
  },
  colors: {
    black: '#16161D'
  },
  fonts,
  breakpoints
});

export default theme;
