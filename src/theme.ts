const palette = {
  purplePrimary: '#615aff',
  cyanDark: '#74c0e3',
  cyanPrimary: '#75d0e3',
  grey: '#6a6b6b',
  white: '#ffffff',
};

export const theme = {
  colors: {
    background: palette.white,
    text: palette.grey,
    buttonSelected: palette.purplePrimary,
    headerBackground: palette.purplePrimary,
    headerText: palette.white,
  },
};

export type Theme = typeof theme;
