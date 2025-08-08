import React from 'react';
import {
  StatusBar,
} from 'react-native';
import { sceenStyle } from '../../shared/styles/screens';
import PomodoroTimer from '../../features/pomodoro-timer';
import { SafeAreaView } from 'react-native-safe-area-context';


function TimerScreen(): React.JSX.Element {
  return (
    <SafeAreaView edges={['left', 'right']} style={[sceenStyle.main]}>
      <StatusBar barStyle="light-content"/>
      <PomodoroTimer/>
    </SafeAreaView>
  );
}

export default TimerScreen;
