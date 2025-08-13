import { Task } from "@app/entities/task/model/types";

export const TaskNameButton = {
    CLOSE: 'close',
    PLAY: 'play',
    DELETE: 'delete',
    COMPLETE: 'complete',
} as const;

export type TaskNameButton = (typeof TaskNameButton)[keyof typeof TaskNameButton];


export const TaskStatus = {
    COMPLETE: 'complete',
    UNCOMPLETE: 'uncomplete',
} as const;

export type TaskStatusType = (typeof TaskStatus)[keyof typeof TaskStatus];


export const TaskPriority = {
    LOW_PRIORITY: 'Low',
    MEDIUM_PRIORITY: 'Medium',
    HiGH_PRIORITY: 'High',
} as const;

export type TaskPriorityType = (typeof TaskPriority)[keyof typeof TaskPriority];


export type TaskCardRightButton = {
    type:  Exclude<TaskNameButton, 'close' | 'play'>;
    onPress?: ((taskId: Task["id"]) => void);
}

export interface TaskRightActionBlock{
    enabled: boolean,
    buttons: TaskCardRightButton[],
}
