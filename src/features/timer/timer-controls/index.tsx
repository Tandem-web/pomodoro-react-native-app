import { View, StyleSheet } from 'react-native';
import ControllButton from './controll-button';
import { TimerControllButtonType, TimerControllIconType } from '@app/shared/types/timer-controlls';
import { useGetStartPauseTimerState, useTimerActions } from '@app/shared/store/timer/model/selectors';


const TimerControls = () => {
    const isPlay = useGetStartPauseTimerState();
    const { startTimer } = useTimerActions();
    return (
        <View style={styles.controllContainer}>
            <ControllButton type={TimerControllButtonType.SideButton} key="pomodoro-controll-1" icon={TimerControllIconType.RELOAD}/>
            <ControllButton type={TimerControllButtonType.MainButton} key="pomodoro-controll-2" onPress={isPlay ? undefined : startTimer} icon={isPlay ? TimerControllIconType.PAUSE : TimerControllIconType.START}/>
            <ControllButton type={TimerControllButtonType.SideButton} key="pomodoro-controll-3" icon={TimerControllIconType.STOP}/>
        </View>
    );
};

const styles = StyleSheet.create({
    controllContainer: {
        justifyContent: 'center',
        flexDirection: 'row',
        alignItems: 'center',
        gap: 20,
        marginTop: 10,
    },
});

export default TimerControls;
