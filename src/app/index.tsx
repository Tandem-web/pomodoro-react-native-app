import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import {
  StyleSheet,
  View,
} from 'react-native';
import { Colors } from '../shared/styles/colorsPalete';
import PomodoroNavigation from './navigators/Navigator';

function App(): React.JSX.Element {
  return (
    <View style={styles.main}>
      <>
        <NavigationContainer>
          <PomodoroNavigation/>
        </NavigationContainer>
      </>
    </View>
  );
}

const styles = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: Colors.background,
  },

});

export default App;
