import { View, StyleSheet } from 'react-native';
import ControllButton from './controll-button';
import { TimerControllButtonType, TimerControllIconType } from '@app/shared/types/timer-controlls';
import { useGetStartPauseTimerState } from '@app/shared/store/timer/model/selectors';
import useTaskStore from '@app/entities/task/model/store';
import useTimerStore from '@app/shared/store/timer/model/store';
import { useCallback } from 'react';


const TimerControls = () => {
    const isPlay = useGetStartPauseTimerState();
    const { activeTaskId , tasks } = useTaskStore();
    const { startTimer, pauseTimer, setRemainingTime, remainingTime, onTimerComplete} = useTimerStore();

    const onStartHandler = useCallback(() => {
        if (activeTaskId && tasks[activeTaskId]) {
            const taskRemainingTime = tasks[activeTaskId].task_state.remainingTime;
            if(remainingTime === null || remainingTime === 0){
                setRemainingTime(taskRemainingTime);
            }
            if (taskRemainingTime > 0) {
                startTimer();
            }
        }
    }, [activeTaskId, tasks, setRemainingTime, startTimer, remainingTime]);

    const onResetHandler = useCallback(() => {
        if (activeTaskId && tasks[activeTaskId]) {
            const taskRemainingTime = tasks[activeTaskId].task_state.remainingTime;
            setRemainingTime(taskRemainingTime);
            pauseTimer();
        }
    }, [activeTaskId, tasks, setRemainingTime, pauseTimer]);

    const onSkipHandler = useCallback(() => {
        pauseTimer();
        onTimerComplete();
    }, [pauseTimer, onTimerComplete]);

    return (
        <View style={styles.controllContainer}>
            <ControllButton type={TimerControllButtonType.SideButton} key="pomodoro-controll-1" onPress={onResetHandler} icon={TimerControllIconType.RELOAD}/>
            <ControllButton type={TimerControllButtonType.MainButton} key="pomodoro-controll-2" onPress={isPlay ? pauseTimer : onStartHandler} icon={isPlay ? TimerControllIconType.PAUSE : TimerControllIconType.START}/>
            <ControllButton type={TimerControllButtonType.SideButton} key="pomodoro-controll-3" onPress={onSkipHandler} icon={TimerControllIconType.STOP}/>
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
