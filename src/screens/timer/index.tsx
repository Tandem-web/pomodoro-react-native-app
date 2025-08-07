import React from 'react';
import {
  StatusBar,
} from 'react-native';
import { sceenStyle } from '../../shared/styles/screens';
import PomodoroTimer from '../../features/pomodoro-timer';
import { SafeAreaView } from 'react-native-safe-area-context';
import { GestureHandlerRootView } from 'react-native-gesture-handler';


function TimerScreen(): React.JSX.Element {
  return (
      <SafeAreaView edges={['left', 'right']} style={[sceenStyle.main]}>
        <GestureHandlerRootView style={{flex: 1}}>
          <StatusBar barStyle="light-content"/>
          <PomodoroTimer/>
        </GestureHandlerRootView>
      </SafeAreaView>
  );
}

export default TimerScreen;
