export const TaskButton = {
    CLOSE: 'close',
    PLAY: 'play',
    DELETE: 'delete',
} as const;

export type TaskButtonTypes = (typeof TaskButton)[keyof typeof TaskButton];



export const TaskStatus = {
    COMPLETE: 'complete',
    UNCOMPLETE: 'uncomplete',
} as const;

export type TaskStatusType = (typeof TaskStatus)[keyof typeof TaskStatus];

export const TaskPriority = {
    LOW_PRIORITY: 'low-priority',
    MEDIUM_PRIORITY: 'medium-priority',
    HiGH_PRIORITY: 'high-priority',
} as const;

export type TaskPriorityType = (typeof TaskPriority)[keyof typeof TaskPriority];
