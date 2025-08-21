import ProgressRing from '@app/features/timer/progress-ring';
import TimerText from '@app/features/timer/timer-text';
import { Colors } from '@app/shared/styles/colorsPalete';
import React from 'react';
import {
  StyleSheet,
  View,
} from 'react-native';
import { TaskNameButton } from '@app/shared/types/task';
import { TaskCard, useGetActiveTask} from '@app/entities/task/intex';
import TimerControls from '@app/features/timer/timer-controls';



function PomodoroTimer(): React.JSX.Element {
  const activeTask = useGetActiveTask();

  return (
    <View style={styles.pomodoroContainer}>
        <TaskCard
          task={activeTask}
          text="No task selected to work"
          controllButton={TaskNameButton.CLOSE}
          rightActionBlock={{
            enabled: true,
            buttons: ['complete', 'delete'],
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
