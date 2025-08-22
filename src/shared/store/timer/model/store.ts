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

    setOnTimerComplete: (callback: () => void) => void;
    setRemainingTime: (time: number) => void;

    startTimer: (initialTime?: number) => void;
    pauseTimer: () => void;
    startForegroundTimer: () => void;
    startBackgroundTimer: () => void;
    stopTimer: () => void;
    stopForegroundTimer: () => void;
    stopBackgroundTimer: () => void;
    onTimerComplete: () => void;
    intervalTick: () => void;

    clearAllInterval: () => void;
    reset: () => void;
}

const intervalTime = __DEV__ ? 200 : 1000;

const useTimerStore = create<TimerState>()(
    persist(
        ( set, get ) => ({
            remainingTime: null,
            isRunning: false,
            foregroundIntervalId: null,
            onTimerComplete: noop,

            /* -------------------------------------------------------------------------- */
            /*                      Set callback on interval complete                     */
            /* -------------------------------------------------------------------------- */
            setOnTimerComplete: (callback) => {
                set({ onTimerComplete: callback });
            },

            /* -------------------------------------------------------------------------- */
            /*                             set remaining time                             */
            /* -------------------------------------------------------------------------- */
            setRemainingTime: (time: number) => {
                set({ remainingTime: time });
            },

            /* -------------------------------------------------------------------------- */
            /*                                  run timer                                 */
            /* -------------------------------------------------------------------------- */
            startTimer: () => {
                const isRunning = get().isRunning,
                      remainingTime = get().remainingTime,
                      onTimerComplete = get().onTimerComplete,
                      clearAllInterval = get().clearAllInterval,
                      startForegroundTimer = get().startForegroundTimer,
                      startBackgroundTimer = get().startBackgroundTimer;

                if (isRunning) return;

                if (remainingTime === 0) {
                    onTimerComplete();
                    return;
                }
                clearAllInterval();

                startForegroundTimer();
                startBackgroundTimer();
                set({ isRunning: true });
            },
            /* -------------------------------------------------------------------------- */
            /*                    Pause timer when interval is complete                   */
            /* -------------------------------------------------------------------------- */
            stopTimer: () => {
                const remainingTime = get().remainingTime,
                      onTimerComplete = get().onTimerComplete,
                      pauseTimer = get().pauseTimer;

                pauseTimer();
                if (remainingTime === 0) {
                    onTimerComplete();
                }
            },
            /* -------------------------------------------------------------------------- */
            /*                            Pause pomodoro timer                            */
            /* -------------------------------------------------------------------------- */
            pauseTimer: () => {
                const isRunning = get().isRunning,
                      clearAllInterval = get().clearAllInterval;

                if (!isRunning) return;

                clearAllInterval();

                set({ isRunning: false });
            },

            /* -------------------------------------------------------------------------- */
            /*                              Init setInterval                              */
            /* -------------------------------------------------------------------------- */
            startForegroundTimer: () => {
                const intervalTick = get().intervalTick;

                const foregroundIntervalId = setInterval(() => {
                    intervalTick();
                }, intervalTime);

                set({ foregroundIntervalId });
            },
            startBackgroundTimer: () => {
                const intervalTick = get().intervalTick;
                get().stopBackgroundTimer();
                BackgroundTimer.runBackgroundTimer(() => {
                    if(AppState.currentState === 'background'){
                        intervalTick();
                    }
                }, intervalTime);
            },
            /* -------------------------------------------------------------------------- */
            /*                              Kill setInterval                              */
            /* -------------------------------------------------------------------------- */
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

            /* -------------------------------------------------------------------------- */
            /*                         Functional on interval tick                        */
            /* -------------------------------------------------------------------------- */
            intervalTick: () => {
                const remainingTime = get().remainingTime;
                if (remainingTime !== null && remainingTime > 0) {
                    get().setRemainingTime(remainingTime - 1);
                }
                if (remainingTime === 0) {
                    get().stopTimer();
                }
            },
            /* -------------------------------------------------------------------------- */
            /*                  Clear Background and foreground Intervals                 */
            /* -------------------------------------------------------------------------- */
            clearAllInterval: () => {
                const stopForegroundTimer = get().stopForegroundTimer,
                      stopBackgroundTimer = get().stopBackgroundTimer;
                
                stopForegroundTimer();
                stopBackgroundTimer();
            },

            /* -------------------------------------------------------------------------- */
            /*                              Reset Timer Store                             */
            /* -------------------------------------------------------------------------- */
            reset: () => {
                const clearAllInterval = get().clearAllInterval;

                set(useTimerStore.getInitialState())
                clearAllInterval()
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
