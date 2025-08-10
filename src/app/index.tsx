import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import PomodoroNavigation from './navigators/Navigator';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { DefaultStyle } from '../shared/styles/defaultStyles';

function App(): React.JSX.Element {
  return (
    <SafeAreaProvider>
      <GestureHandlerRootView>
        <SafeAreaView edges={['bottom']} style={DefaultStyle.fullSpace}>
          <NavigationContainer>
            <PomodoroNavigation/>
          </NavigationContainer>
        </SafeAreaView>
      </GestureHandlerRootView>
    </SafeAreaProvider>
  );
}

export default App;
