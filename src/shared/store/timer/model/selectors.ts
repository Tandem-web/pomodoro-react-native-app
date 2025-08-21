
import { TimerFormatTime } from '../utils/TimerFormatTime';
import useTimerStore from './store';

export const useGetRemaingTime = (format: boolean = false) => {
    const remainingTime = useTimerStore(state => state.remainingTime);

    if(!remainingTime){
        return null;
    }

    if(format){
        const formatTime = TimerFormatTime(remainingTime);
        return formatTime;
    }

    return remainingTime;
};

export const useGetStartPauseTimerState = () => {
    const timerState = useTimerStore(state => state.isRunning);

    return timerState;
};

export const useTimerActions = () => {
    const startTimer =  useTimerStore(state => state.startTimer);
    const stopTimer =  useTimerStore(state => state.stopTimer);

    return {startTimer, stopTimer};
};
