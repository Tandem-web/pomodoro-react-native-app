import { View, StyleSheet } from 'react-native'
import ControllButton from './controll-button';
import { TimerControllButtonType, TimerControllIconType } from '../../../../@types/timer-controlls';


const TimerControls = () => {
    const isPlay = true;

    return (
        <View style={styles.controllContainer}>
            <ControllButton type={TimerControllButtonType.SideButton} key="pomodoro-controll-1" icon={TimerControllIconType.RELOAD}/>
            <ControllButton type={TimerControllButtonType.MainButton} key="pomodoro-controll-2" icon={isPlay ? TimerControllIconType.PAUSE : TimerControllIconType.START}/>
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
