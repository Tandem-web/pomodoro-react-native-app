export const StorageKeys = {
    TASKS: 'tasks',
} as const;

export type StorageKeys = (typeof StorageKeys)[keyof typeof StorageKeys];
