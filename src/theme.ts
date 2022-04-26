const palette = {
  purplePrimary: '#615aff',
  cyanDark: '#74c0e3',
  cyanPrimary: '#75d0e3',
  grey: '#6a6b6b',
  greyLight: '#ececec',
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
    modalButtonTextPrimary: palette.white,
    modalButtonBackgroundDefault: palette.greyLight,
    modalButtonTextDefault: palette.black,
  },
};

export type Theme = typeof theme;
