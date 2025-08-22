import React, { useEffect } from 'react';
import useTimerStore from '@app/shared/store/timer/model/store';
import useTaskStore from '@app/entities/task/model/store';

const TimerCoordinator: React.FC = () => {
    const { activeTaskId, tasks, completeInterval, completeTask } = useTaskStore();
    const { setOnTimerComplete, startTimer, reset, setRemainingTime} = useTimerStore();

    useEffect(() => {
        setOnTimerComplete(() => {
            const result = completeInterval();
            if (result.hasMoreIntervals) {
                setRemainingTime(result.nextIntervalTime);
                startTimer();
            }else{
                if(activeTaskId){
                    completeTask(activeTaskId);
                    reset();
                }
            }
        });
    }, [setOnTimerComplete, completeInterval, startTimer, completeTask, activeTaskId, reset, setRemainingTime]);

    useEffect(() => {
        if (activeTaskId && tasks[activeTaskId]) {
            const taskRemainingTime = tasks[activeTaskId].task_state.remainingTime;
            setRemainingTime(taskRemainingTime);
        }
    }, [activeTaskId, tasks, setRemainingTime]);

    return null;
};

export default TimerCoordinator;
