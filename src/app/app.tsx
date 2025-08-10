import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { DefaultStyle } from '../shared/styles/defaultStyles';
import { View } from 'react-native';
import { Colors } from '../shared/styles/colorsPalete';
import { PomodoroNavigation } from './navigation/';

function App(): React.JSX.Element {
  return (
    <View style={[DefaultStyle.fullSpace, {backgroundColor: Colors.background}]}>
      <SafeAreaProvider>
        <GestureHandlerRootView>
          <SafeAreaView edges={['left', 'right']} style={DefaultStyle.fullSpace}>
            <NavigationContainer>
              <PomodoroNavigation />
            </NavigationContainer>
          </SafeAreaView>
        </GestureHandlerRootView>
      </SafeAreaProvider>
    </View>
  );
}

export default App;
