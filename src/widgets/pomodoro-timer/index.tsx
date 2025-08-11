import React from 'react';
import {
  StyleSheet,
  View,
} from 'react-native';
import ProgressRing from '../../features/timer/progress-ring';
import TimerText from '../../features/timer/timer-text';
import TimerControls from './ui/timer-controls';
import { Colors } from '../../shared/styles/colorsPalete';
import { TaskCard } from '../../features/task';


function PomodoroTimer(): React.JSX.Element {

  return (
    <View style={styles.pomodoroContainer}>
        <TaskCard
          task={{}}
          rightActionBlock={{
            enabled: true,
            buttons: [
              {
                type:  'complete',
              },
              {
                type: 'delete',
              },
            ],
          }}
          prefix={'maint-task-card'}
        />
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
