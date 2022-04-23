import React from 'react';
import { ThemeProvider } from '@emotion/react';
import {
  SafeAreaProvider,
  initialWindowMetrics,
} from 'react-native-safe-area-context';

import { theme } from 'theme';
import { MainScreen } from 'screens';

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <SafeAreaProvider initialMetrics={initialWindowMetrics}>
        <MainScreen />
      </SafeAreaProvider>
    </ThemeProvider>
  );
};

export default App;
