
import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import {
  StyleSheet,
} from 'react-native';
import PomodoroBottomTabs from './navigators/Navigator';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { colorPallete } from '../shared/styles/colorsPalete';

function App(): React.JSX.Element {
  return (
    <SafeAreaProvider style={styles.main}>
        <NavigationContainer>
          <PomodoroBottomTabs/>
        </NavigationContainer>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: colorPallete.AppBGColor,
  },

});

export default App;
