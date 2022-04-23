import React, { FC, ReactElement } from 'react';
import { render, RenderOptions } from '@testing-library/react-native';
import { ThemeProvider } from '@emotion/react';
import { theme } from 'theme';

const AllTheProviders: FC = ({ children }) => {
  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
};

const customRender = (
  ui: ReactElement,
  options?: Omit<RenderOptions, 'wrapper'>
) => render(ui, { wrapper: AllTheProviders, ...options });

export * from '@testing-library/react-native';
export { customRender as render };
