import React from 'react';
import {
  StyleSheet,
  View,
} from 'react-native';
import ProgressRing from '../../widgets/timer/progress-ring';
import TimerText from '../../widgets/timer/timer-text';
import TimerControls from './ui/timer-controls';
import { Colors } from '../../shared/styles/colorsPalete';
import { TaskCard } from '../../widgets/task';


function PomodoroTimer(): React.JSX.Element {
  
  return (
    <View style={styles.pomodoroContainer}>
        <TaskCard task={{}}/>
        <View style={styles.timerContainer}>
            <ProgressRing
                strokeColors={[Colors.surface, Colors.primary]}
                strokeWidth={[70, 10]}
            />
            <TimerText/>
        </View>
        <TimerControls/>
    </View>

  );
}

const styles = StyleSheet.create({
    pomodoroContainer: {
        flex: 1,
        justifyContent: 'center',
        boxSizing: 'border-box',
    },
    timerContainer: {
        flex: 1,
        width: '100%',
        position: 'relative',
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default PomodoroTimer;
