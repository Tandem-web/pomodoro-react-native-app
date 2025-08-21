import { TaskStatus} from '@app/shared/types/task';
import { create } from 'zustand';
import 'react-native-get-random-values';
import { v4 as uuidv4 } from 'uuid';
import { intervalType, NewTask, Task, TasksStore } from './types';
import { createJSONStorage, persist } from 'zustand/middleware';
import { zustandMMKVStorage } from '@app/shared/storage/mmkv';
import { createQueue } from '../utils/createQueue';



interface TasksState{
    tasks: TasksStore,
    activeTaskId: Task['id'] | null,
    addNewTask: (task: NewTask) => void;
    completeTask: (taskId: Task['id']) => void;
    deleteTask: (taskId: Task['id']) => void;
    setCurrentTaskId: (taskId: Task['id'] | null) => void;
    completeInterval: () => { hasMoreIntervals: boolean, nextIntervalTime: number };
}

const useTaskStore = create<TasksState>()(
    persist(
        ( set, get ) => ({
            tasks: {},
            activeTaskId: null,
            addNewTask: (task) => {
                const tasks = get().tasks;
                const newTask = {
                    id: uuidv4(),
                    ...task,
                    createAt: new Date().toISOString(),
                    completeAt: null,
                    task_state: {
                        queueIntervals: createQueue(task.settings),
                        remainingTime: task.settings.timeSettings.duration.work,
                        countWorkIntervals: 0,
                        totalTime: 0,
                    },
                };
                console.log(createQueue(task.settings));
                set({
                    tasks: {[newTask.id]: newTask, ...tasks },
                });
            },

            completeTask: (taskId) => {
                const tasks = get().tasks;
                const task = tasks[taskId];

                if(get().activeTaskId === taskId){
                    set({
                        activeTaskId: null,
                    });
                }

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

                if(get().activeTaskId === taskId){
                    set({
                        activeTaskId: null,
                    });
                }

                set({
                    tasks: tasks,
                });
            },

            setCurrentTaskId: (taskId) => {
                const tasks = {...get().tasks};

                if(taskId === null || !tasks[taskId]) {
                    set({activeTaskId: null});
                }else{
                    set({activeTaskId: taskId});
                }
            },
            completeInterval: () => {
                const tasks = get().tasks;
                const activeTaskId = get().activeTaskId;

                if (activeTaskId && tasks[activeTaskId]) {
                    const activeTask = tasks[activeTaskId];
                    const task_state = { ...activeTask.task_state };
                    const queueIntervals = [...task_state.queueIntervals];

                    let countWorkIntervals = task_state.countWorkIntervals;
                    if (queueIntervals.length > 0 && queueIntervals[queueIntervals.length - 1] === intervalType.WORK) {
                        countWorkIntervals += 1;
                    }

                    queueIntervals.pop();

                    const updatedTask = {
                        ...activeTask,
                        task_state: {
                            ...task_state,
                            countWorkIntervals,
                            queueIntervals,
                            remainingTime: queueIntervals.length > 0
                                ? activeTask.settings.timeSettings.duration[queueIntervals[queueIntervals.length - 1]]
                                : 0,
                        },
                    };

                    set({
                        tasks: {
                            ...tasks,
                            [activeTaskId]: updatedTask,
                        },
                    });

                    return {
                        hasMoreIntervals: queueIntervals.length > 0,
                        nextIntervalTime: queueIntervals.length > 0
                            ? activeTask.settings.timeSettings.duration[queueIntervals[queueIntervals.length - 1]]
                            : 0,
                    };
                }
                if(activeTaskId){
                    get().completeTask(activeTaskId);
                }
                return { hasMoreIntervals: false, nextIntervalTime: 0 };
            },
        }),
        {
            name: 'task-storage',
            partialize: (state) => ({
                tasks: state.tasks,
                currentTaskId: state.activeTaskId,
            }),
            storage: createJSONStorage(() => zustandMMKVStorage),
        }
    )
);

export default useTaskStore;
