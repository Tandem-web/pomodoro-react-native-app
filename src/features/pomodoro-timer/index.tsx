import React from 'react';
import {
  StyleSheet,
  View
} from 'react-native';
import ProgressRing from '../../widgets/timer/progress-ring';
import { useSafeAreaFrame } from 'react-native-safe-area-context';
import TimerText from '../../widgets/timer/timer-text';


function PomodoroTimer(): React.JSX.Element {
  const safeFrame = useSafeAreaFrame();
  return (
    <>
        <View style={styles.timerContainer}>
            <ProgressRing
                dimension={safeFrame}
                strokeColors={['#313152', '#4E4BEC']}
                strokeWidth={[70, 10]}
            />
            <TimerText/>
        </View>
    </>

  );
}

const styles = StyleSheet.create({
  timerContainer: {
    flex: 1,
    width: '100%',
    position: 'relative',
    justifyContent: 'center',
    alignItems: 'center',
  }

});

export default PomodoroTimer;
