import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import {
  StyleSheet,
  View,
} from 'react-native';
import PomodoroBottomTabs from './navigators/Navigator';
import { Colors } from '../shared/styles/colorsPalete';

function App(): React.JSX.Element {
  return (
    <View style={styles.main}>
      <>
        <NavigationContainer>
          <PomodoroBottomTabs/>
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
