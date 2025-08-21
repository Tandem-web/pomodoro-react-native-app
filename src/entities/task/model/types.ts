import { TaskPriorityType, TaskStatusType } from '@app/shared/types/task';

export const intervalType = {
    WORK: 'work',
    SHORT_BREAK: 'shortBreak',
    LONG_BREAK: 'longBreak',
    NONE: 'none',
} as const;

export type IntervalTypes = (typeof intervalType)[keyof typeof intervalType];

interface TaskStateInfo{
    queueIntervals: IntervalTypes[],
    remainingTime: number,
    countWorkIntervals: number,
    totalTime: number,
}
type IntervalsDuration = Record<IntervalTypes, number>
export interface TaskTimeSettings{
    workIntervals: number,
    timeSettings: {
        duration: IntervalsDuration, 
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
export type NewTask = Pick<Task, 'title' | 'status' | 'priority' | 'settings'>;