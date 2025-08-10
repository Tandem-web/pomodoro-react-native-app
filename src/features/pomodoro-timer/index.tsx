import React from 'react';
import {
  StyleSheet,
  View,
} from 'react-native';
import ProgressRing from '../../widgets/timer/progress-ring';
import { useSafeAreaFrame } from 'react-native-safe-area-context';
import TimerText from '../../widgets/timer/timer-text';
import TimerControls from './ui/timer-controls';
import TaskCard from '../../widgets/task';
import { Colors } from '../../shared/styles/colorsPalete';


function PomodoroTimer(): React.JSX.Element {
  const safeFrame = useSafeAreaFrame();
  return (
    <View style={styles.pomodoroContainer}>
        <TaskCard task={{}}/>
        <View style={styles.timerContainer}>
            <ProgressRing
                dimension={safeFrame}
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
    },
    timerContainer: {
        // flex: 1,
        width: '100%',
        position: 'relative',
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default PomodoroTimer;
