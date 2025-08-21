import { create } from 'zustand';
import 'react-native-get-random-values';
import { createJSONStorage, persist } from 'zustand/middleware';
import { zustandMMKVStorage } from '@app/shared/storage/mmkv';
import useTaskStore from '@app/entities/task/model/store';
import BackgroundTimer from 'react-native-background-timer';
import { AppState } from 'react-native';

interface TimerState{
    remainingTime: number | null,
    isActivated: boolean,
    isRunning: boolean,
    foregroundIntervalId: NodeJS.Timeout | null,
    startTimer: () => void;
    startForegroundTimer: () => void;
    startBackgroundTimer: () => void;
    stopTimer: () => void;
    stopForegroundTimer: () => void;
    stopBackgroundTimer: () => void;
    updateRemainingTime: () => void;
    // pauseTimer: () => void;
    // resetTimer: () => void;
    // updateRemainingTime: (time: number) => void;
}

const useTimerStore = create<TimerState>()(
    persist(
        ( set, get ) => ({
            remainingTime: null,
            isActivated: false,
            isRunning: false,
            foregroundIntervalId: null,

            startTimer: () => {
                const activeTaskId = useTaskStore.getState().activeTaskId;
                if(activeTaskId){
                    const activeTask = useTaskStore.getState().tasks[activeTaskId];
                    const activeTaskRemainingTime = activeTask.task_state.remainingTime;
                    if(!get().remainingTime){
                        set({remainingTime: activeTaskRemainingTime});
                    }
                    if(get().remainingTime){
                        get().startForegroundTimer();
                        get().startBackgroundTimer();
                        set({ isRunning: true });
                    }

                }
            },
            startForegroundTimer: () => {
                const foregroundIntervalId = setInterval(() => {
                    get().updateRemainingTime();
                }, 200);

                set({ foregroundIntervalId: foregroundIntervalId});
            },
            startBackgroundTimer: () => {
                get().stopBackgroundTimer();
                BackgroundTimer.runBackgroundTimer(() => {
                    if(AppState.currentState === 'background'){
                        get().updateRemainingTime();
                    }
                }, 200);
            },
            stopTimer: () => {
                get().stopForegroundTimer();
                get().stopBackgroundTimer();
                set({ isRunning: false });
                useTaskStore.getState().completeInterval();
            },
            stopForegroundTimer: () => {
                const foregroundIntervalId = get().foregroundIntervalId;
                if (foregroundIntervalId) {
                    clearInterval(foregroundIntervalId);
                    set({ foregroundIntervalId: null});
                }
            },
            stopBackgroundTimer: () => {
                BackgroundTimer.stopBackgroundTimer();
            },
            updateRemainingTime: () => {
                const remainingTime = get().remainingTime;
                if(remainingTime != null){
                    set({remainingTime: remainingTime - 1});
                    if(remainingTime === 0){
                        set({remainingTime: null});
                        get().stopTimer();
                    }
                }
            },
        }),
        {
            name: 'timer-storage',
            partialize: (state) => ({
                remaingTime: state.remainingTime,
                isActivated: state.isActivated,
                isRunning: state.isRunning,
                foregroundIntervalId: state.foregroundIntervalId,
            }),
            storage: createJSONStorage(() => zustandMMKVStorage),
        }
    )
);

export default useTimerStore;
