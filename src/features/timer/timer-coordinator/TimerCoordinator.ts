import React, { useEffect } from 'react';
import useTimerStore from '@app/shared/store/timer/model/store';
import useTaskStore from '@app/entities/task/model/store';

const TimerCoordinator: React.FC = () => {
    const { activeTaskId, tasks, completeInterval } = useTaskStore();
    const { setOnTimerComplete, startTimer, remainingTime } = useTimerStore();

    useEffect(() => {
        setOnTimerComplete(() => {
            const result = completeInterval();

            if (result.hasMoreIntervals) {
                console.log(result);
                startTimer(result.nextIntervalTime);
            }
        });
    }, [setOnTimerComplete, completeInterval, startTimer]);


    useEffect(() => {
        if (activeTaskId && tasks[activeTaskId]) {
            const taskRemainingTime = tasks[activeTaskId].task_state.remainingTime;
            if (remainingTime === null && taskRemainingTime > 0) {
                startTimer(taskRemainingTime);
            }
        }
    }, [activeTaskId, tasks, remainingTime, startTimer]);

    return null;
};

export default TimerCoordinator;
