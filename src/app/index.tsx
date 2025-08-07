import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import {
  StyleSheet,
  View,
} from 'react-native';
import { Colors } from '../shared/styles/colorsPalete';
import PomodoroNavigation from './navigators/Navigator';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

function App(): React.JSX.Element {
  return (
    <View style={styles.main}>
      <GestureHandlerRootView style={{flex: 1}}>
        <NavigationContainer>
          <PomodoroNavigation/>
        </NavigationContainer>
      </GestureHandlerRootView>
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
