import { createTheme } from '@shopify/restyle';

const palette = {
  purplePrimary: '#615aff',
  cyanDark: '#74c0e3',
  cyanPrimary: '#75d0e3',
  grey: '#6a6b6b',
  white: '#ffffff',
};

export const theme = createTheme({
  colors: {
    mainBackground: palette.white,
    cardPrimaryBackground: palette.purplePrimary,
    text: palette.grey,
  },
  spacing: {
    s: 8,
    m: 16,
    l: 24,
    xl: 40,
  },
  breakpoints: {
    phone: 0,
    tablet: 768,
  },
  textVariants: {
    defaults: {
      fontSize: 16,
      lineHeight: 24,
      color: 'text',
    },
  },
});

export type Theme = typeof theme;
