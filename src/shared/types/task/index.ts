export const TaskButton = {
    CLOSE: 'close',
    PLAY: 'play',
    DELETE: 'delete',
    COMPLETE: 'complete',
} as const;

export type TaskButtonTypes = (typeof TaskButton)[keyof typeof TaskButton];


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
    type:  Exclude<TaskButtonTypes, 'close' | 'play'>;
    onPress?: () => void;
}

export interface TaskRightActionBlock{
    enabled: boolean,
    buttons: TaskCardRightButton[],
}
