import { TaskStatus} from '@app/shared/types/task';
import { create } from 'zustand';
import 'react-native-get-random-values';
import { v4 as uuidv4 } from 'uuid';
import { createJSONStorage, persist } from 'zustand/middleware';
import { zustandMMKVStorage } from '@app/shared/storage/mmkv';
import useTaskStore from '@app/entities/task/model/store';


interface TimerState{
    remaingTime: number | null,
    // startTimer: (duration: number) => void;
    // pauseTimer: () => void;
    // resetTimer: () => void;
    // updateRemainingTime: (time: number) => void;
}

const useTimerStore = create<TimerState>()(
    persist(
        ( set, get ) => ({
            remaingTime: null,
        }),
        {
            name: 'timer-storage',
            partialize: (state) => ({
                remaingTime: state.remaingTime,
            }),
            storage: createJSONStorage(() => zustandMMKVStorage),
        }
    )
);

export default useTimerStore;
