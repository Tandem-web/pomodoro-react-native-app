import { TaskPriorityType, TaskStatus, TaskStatusType } from "@app/shared/types/task";
import { create } from "zustand";
import { v4 as uuidv4 } from 'uuid';

interface TaskTimeSettings{
    workIntervals: number,
    timeSettings: {
        workDuration: number,
        shortDuration: number,
        longDuration: number,
        intervalsToLong: number,
    },
}

export interface Task {
    id: string,
    title: string,
    status: TaskStatusType,
    priority: TaskPriorityType,
    settings: TaskTimeSettings,
    createAt: string,
    completeAt: string | null,
}

type newTask = Pick<Task, 'title' | 'status' | 'priority' | 'settings'>;

export type Tasks = Task[];

interface TasksState{
    tasks: Tasks,
    addNewTask: (task: newTask) => void;
    completeTask: (taskId: Task['id']) => void;
    deleteTask: (taskId: Task['id']) => void;
}

const useTaskStore = create<TasksState>(( set, get ) => ({
    tasks: [],

    addNewTask: (task) => {
        const tasks = get().tasks;
        const newTask = {
            id: uuidv4(),
            ...task,
            createAt: new Date().toISOString(),
            completeAt: null,
        };

        console.log(newTask);

        set({
            tasks: [ newTask, ...tasks ],
        });
    },

    completeTask: (taskId) => {
        const tasks = get().tasks;

        set({
            tasks: tasks.map(task => (
                task.id === taskId 
                    ? {
                        ...task,
                        status: TaskStatus.COMPLETE,
                        completeAt: new Date().toISOString(),
                      }
                    : task
            )),
        });
    },

    deleteTask: (taskId) => {
        const tasks = get().tasks;

        set({
            tasks: tasks.filter(task => task.id !== taskId),
        });
    },
}));

export default useTaskStore;
