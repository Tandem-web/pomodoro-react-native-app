import ProgressRing from '@app/features/timer/progress-ring';
import TimerText from '@app/features/timer/timer-text';
import { Colors } from '@app/shared/styles/colorsPalete';
import React from 'react';
import {
  StyleSheet,
  View,
} from 'react-native';
import TimerControls from './ui/timer-controls';
import { TaskNameButton } from '@app/shared/types/task';
import { noop } from '@app/shared/utilities/noop';
import { useGetActiveTask, useTaskActions } from '@app/entities/task/intex';
import { TaskCard } from '@app/entities/task/ui/task-card';



function PomodoroTimer(): React.JSX.Element {
  const activeTask = useGetActiveTask();
  const { completeTask, deleteTask } = useTaskActions();

  return (
    <View style={styles.pomodoroContainer}>
        <TaskCard
          task={activeTask}
          text="No task selected to work"
          controllButton={TaskNameButton.CLOSE}
          rightActionBlock={{
            enabled: true,
            buttons: [
              {
                type:  'complete',
                onPress: () => activeTask != null ? completeTask(activeTask.id) : noop(),
              },
              {
                type: 'delete',
                onPress: () => activeTask != null ? deleteTask(activeTask.id) : noop(),
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
