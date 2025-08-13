import { TaskPriorityType, TaskStatusType } from '@app/shared/types/task';

export const intervalType = {
    WORK: 'work',
    SHORT_BREAK: 'shortBreak',
    LONG_BREAK: 'longBreak',
    DONE: 'done',
} as const;

export type IntervalTypes = (typeof intervalType)[keyof typeof intervalType];

interface TaskStateInfo{
    currentIntervalType: IntervalTypes,
    currentWorkInterval: number,
    currentIntervalTime: number,
    totalTime: number,
}

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
    task_state: TaskStateInfo,
    createAt: string,
    completeAt: string | null,

}

export type TasksStore = Record<Task['id'], Task>;
export type Tasks = Task[];
