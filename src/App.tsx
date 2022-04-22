import React from 'react';
import { ThemeProvider } from '@shopify/restyle';

import { Box, Text } from 'components';
import { theme } from './theme';

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <Box m="m">
        <Text>Test</Text>
      </Box>
    </ThemeProvider>
  );
};

export default App;
