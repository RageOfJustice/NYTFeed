import React from 'react';
import { ThemeProvider } from '@emotion/react';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import { theme } from 'theme';
import { MainScreen } from 'screens';

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <SafeAreaProvider>
        <MainScreen />
      </SafeAreaProvider>
    </ThemeProvider>
  );
};

export default App;
