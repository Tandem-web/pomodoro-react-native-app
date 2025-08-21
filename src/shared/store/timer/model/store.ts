import { create } from 'zustand';
import 'react-native-get-random-values';
import { createJSONStorage, persist } from 'zustand/middleware';
import { zustandMMKVStorage } from '@app/shared/storage/mmkv';
import BackgroundTimer from 'react-native-background-timer';
import { AppState } from 'react-native';
import { noop } from '@app/shared/utilities/noop';

interface TimerState{
    remainingTime: number | null,
    isRunning: boolean,
    foregroundIntervalId: NodeJS.Timeout | null,
    startTimer: (initialTime?: number) => void;
    startForegroundTimer: () => void;
    startBackgroundTimer: () => void;
    stopTimer: () => void;
    stopForegroundTimer: () => void;
    stopBackgroundTimer: () => void;
    onTimerComplete: () => void;
    setOnTimerComplete: (callback: () => void) => void;
    updateRemainingTime: () => void;
    // pauseTimer: () => void;
    // resetTimer: () => void;
    // updateRemainingTime: (time: number) => void;
}

const useTimerStore = create<TimerState>()(
    persist(
        ( set, get ) => ({
            remainingTime: null,
            isRunning: false,
            foregroundIntervalId: null,
            onTimerComplete: noop,

            setOnTimerComplete: (callback) => {
                set({ onTimerComplete: callback });
            },

            startTimer: (initialTime?: number) => {
                if (initialTime !== undefined && get().remainingTime == null) {
                    set({ remainingTime: initialTime });
                }

                if (get().remainingTime !== null) {
                    get().startForegroundTimer();
                    get().startBackgroundTimer();
                    set({ isRunning: true });
                }
            },

            startForegroundTimer: () => {
                const foregroundIntervalId = setInterval(() => {
                    get().updateRemainingTime();
                }, 200);

                set({ foregroundIntervalId });
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
                get().onTimerComplete();
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
                if (remainingTime !== null && remainingTime > 0) {
                    set({ remainingTime: remainingTime - 1 });
                }
                if (remainingTime === 0) {
                    get().stopTimer();
                }
            },
        }),
        {
            name: 'timer-storage',
            partialize: (state) => ({
                remaingTime: state.remainingTime,
                isRunning: state.isRunning,
                foregroundIntervalId: state.foregroundIntervalId,
            }),
            storage: createJSONStorage(() => zustandMMKVStorage),
        }
    )
);

export default useTimerStore;
