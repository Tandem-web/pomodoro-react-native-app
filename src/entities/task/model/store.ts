import { TaskStatus} from '@app/shared/types/task';
import { create } from 'zustand';
import 'react-native-get-random-values';
import { v4 as uuidv4 } from 'uuid';
import { intervalType, Task, TasksStore } from './types';
import { createJSONStorage, persist } from 'zustand/middleware';
import { zustandMMKVStorage } from '@app/shared/storage/mmkv';


type newTask = Pick<Task, 'title' | 'status' | 'priority' | 'settings'>;



interface TasksState{
    tasks: TasksStore,
    currentTaskId: Task['id'] | null,
    addNewTask: (task: newTask) => void;
    completeTask: (taskId: Task['id']) => void;
    deleteTask: (taskId: Task['id']) => void;
}

const useTaskStore = create<TasksState>()(
    persist(
        ( set, get ) => ({
            tasks: {},
            currentTaskId: null,
            addNewTask: (task) => {
                const tasks = get().tasks;
                const newTask = {
                    id: uuidv4(),
                    ...task,
                    createAt: new Date().toISOString(),
                    completeAt: null,
                    task_state: {
                        currentIntervalType: intervalType.WORK,
                        currentWorkInterval: 1,
                        currentIntervalTime: task.settings.timeSettings.workDuration,
                        totalTime: 0,
                    },
                };

                set({
                    tasks: {[newTask.id]: newTask, ...tasks },
                });
            },

            completeTask: (taskId) => {
                const tasks = get().tasks;
                const task = tasks[taskId];
                if (task){
                    set({
                        tasks: {
                            ...tasks,
                            [taskId]: {
                                ...task,
                                status: TaskStatus.COMPLETE,
                                completeAt: new Date().toISOString(),
                            },
                        },
                    });
                }
            },

            deleteTask: (taskId) => {
                const tasks = {...get().tasks};
                delete tasks[taskId];

                set({
                    tasks: tasks,
                });
            },
        }),
        {
            name: 'task-storage',
            partialize: (state) => ({
                tasks: state.tasks,
                currentTaskId: state.currentTaskId,
            }),
            storage: createJSONStorage(() => zustandMMKVStorage),
        }
    )
);

export default useTaskStore;
