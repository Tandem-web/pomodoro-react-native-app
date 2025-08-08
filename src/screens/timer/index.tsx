import React from 'react';
import {
  StatusBar,
  SafeAreaView,
} from 'react-native';
import { sceenStyle } from '../../shared/styles/screens';
import PomodoroTimer from '../../features/pomodoro-timer';


function TimerScreen(): React.JSX.Element {
  return (
    <SafeAreaView  style={[sceenStyle.main]}>
      <StatusBar barStyle="light-content"/>
      <PomodoroTimer/>
    </SafeAreaView>
  );
}

export default TimerScreen;
