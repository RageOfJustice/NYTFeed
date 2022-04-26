const palette = {
  purplePrimary: '#615aff',
  cyanDark: '#74c0e3',
  cyanPrimary: '#75d0e3',
  grey: '#6a6b6b',
  white: '#ffffff',
  black: '#333333',
};

export const theme = {
  colors: {
    background: palette.white,
    text: palette.grey,
    buttonSelected: palette.purplePrimary,
    headerBackground: palette.purplePrimary,
    headerText: palette.white,
    titleText: palette.black,
    cardBackground: palette.white,
    articlesBackground: palette.cyanPrimary,
    filtersBackground: palette.cyanDark,
    buttonBackground: palette.white,
    modalButtonBackgroundPrimary: palette.purplePrimary,
    modalButtonText: palette.white,
    modalButtonBackgroundDefault: palette.grey,
  },
};

export type Theme = typeof theme;
