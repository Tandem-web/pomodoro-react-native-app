import { DefaultStyle } from '@app/shared/styles/defaultStyles';
import PomodoroTimer from '@app/widgets/pomodoro-timer';
import {
  StatusBar,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';


function TimerScreen(): React.JSX.Element {
  return (
    <SafeAreaView edges={['left', 'right']} style={DefaultStyle.screen}>
        <StatusBar barStyle="light-content"/>
        <PomodoroTimer/>
    </SafeAreaView>
  );
}

export default TimerScreen;
