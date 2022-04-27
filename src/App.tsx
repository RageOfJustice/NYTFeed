import React, { useEffect } from 'react';
import { ThemeProvider } from '@emotion/react';
import SplashScreen from 'react-native-splash-screen';
import {
  SafeAreaProvider,
  initialWindowMetrics,
} from 'react-native-safe-area-context';

import { theme } from 'theme';
import { MainScreen } from 'screens';

const App = () => {
  useEffect(() => {
    SplashScreen.hide();
  }, []);
  return (
    <ThemeProvider theme={theme}>
      <SafeAreaProvider initialMetrics={initialWindowMetrics}>
        <MainScreen />
      </SafeAreaProvider>
    </ThemeProvider>
  );
};

export default App;
