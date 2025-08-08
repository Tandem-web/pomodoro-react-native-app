import {
  StatusBar,
} from 'react-native';
import PomodoroTimer from '../../features/pomodoro-timer';
import { SafeAreaView } from 'react-native-safe-area-context';
import { DefaultStyle } from '../../shared/styles/defaultStyles';


function TimerScreen(): React.JSX.Element {
  return (
      <SafeAreaView edges={['left', 'right']} style={[DefaultStyle.screen]}>
          <StatusBar barStyle="light-content"/>
          <PomodoroTimer/>
      </SafeAreaView>
  );
}

export default TimerScreen;
