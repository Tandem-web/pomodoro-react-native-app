import { TaskCard } from '@app/features/task/task-card';
import ProgressRing from '@app/features/timer/progress-ring';
import TimerText from '@app/features/timer/timer-text';
import { Colors } from '@app/shared/styles/colorsPalete';
import React from 'react';
import {
  StyleSheet,
  View,
} from 'react-native';
import TimerControls from './ui/timer-controls';
import { TaskButton } from '@app/shared/types/task';



function PomodoroTimer(): React.JSX.Element {

  return (
    <View style={styles.pomodoroContainer}>
        <TaskCard
          text="No task selected to work"
          controllButton={TaskButton.CLOSE}
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
