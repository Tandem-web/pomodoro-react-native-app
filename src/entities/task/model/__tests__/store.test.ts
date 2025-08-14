import { act } from '@testing-library/react';
import useTaskStore from '../store';
import { TaskPriority, TaskStatus } from '@app/shared/types/task';
import { v4 as uuidv4 } from 'uuid';
import { intervalType } from '../types';

// Мокаем uuid для предсказуемых ID
jest.mock('uuid', () => ({
  v4: jest.fn(),
}));

// Мокаем MMKV хранилище
jest.mock('@app/shared/storage/mmkv', () => ({
  zustandMMKVStorage: {
    setItem: jest.fn(),
    getItem: jest.fn(),
    removeItem: jest.fn(),
  },
}));

describe("useTaskStore", () => {
    beforeEach(() => {
        useTaskStore.getState().tasks = {};
        useTaskStore.getState().activeTaskId = null;

        jest.clearAllMocks();
    });

    afterEach(() => {
        jest.resetAllMocks();
    });

    test('Store initial state', () => {
        const state = useTaskStore.getState();

        expect(state.tasks).toEqual({});
        expect(state.activeTaskId).toBeNull();
    });

    test('add new task with structure', () => {
        const state = useTaskStore.getState();

        const mockId = 'test-task-id';
        (uuidv4 as jest.Mock).mockReturnValue(mockId);

        const mockDate = new Date('2024-01-01T00:00:00Z');
        const dateSpy = jest.spyOn(global, 'Date').mockImplementation(() => mockDate);

        act(() => {
            state.addNewTask({
                title: 'Задача Test',
                status: TaskStatus.UNCOMPLETE,
                priority: TaskPriority.MEDIUM_PRIORITY,
                settings: {
                    workIntervals: 10,
                    timeSettings: {
                        workDuration: 1 * 60,
                        shortDuration: 1 * 60,
                        longDuration: 1 * 60,
                        intervalsToLong: 5,
                    },
                },
            });
        });
        const { tasks } = useTaskStore.getState();

        expect(tasks[mockId]).toEqual({
            id: uuidv4(),
            title: 'Задача Test',
            status: TaskStatus.UNCOMPLETE,
            priority: TaskPriority.MEDIUM_PRIORITY,
            settings: {
                workIntervals: 10,
                timeSettings: {
                    workDuration: 1 * 60,
                    shortDuration: 1 * 60,
                    longDuration: 1 * 60,
                    intervalsToLong: 5,
                },
            },
            createAt: mockDate.toISOString(),
            completeAt: null,
            task_state: {
                currentIntervalType: intervalType.WORK,
                currentWorkInterval: 1,
                currentIntervalTime: 1 * 60,
                totalTime: 0,
            },
        });

        dateSpy.mockRestore();
    });

    test('change status task to complete (invalid and valid: taskId)', () => {
        const state = useTaskStore.getState();
        const mockId = 'test-task-id';
        (uuidv4 as jest.Mock).mockReturnValue(mockId);

        const mockDate = new Date('2024-01-01T00:00:00Z');
        const dateSpy = jest.spyOn(global, 'Date').mockImplementation(() => mockDate);

        act(() => {
            state.addNewTask({
                title: 'Задача Test',
                status: TaskStatus.UNCOMPLETE,
                priority: TaskPriority.MEDIUM_PRIORITY,
                settings: {
                    workIntervals: 10,
                    timeSettings: {
                        workDuration: 1 * 60,
                        shortDuration: 1 * 60,
                        longDuration: 1 * 60,
                        intervalsToLong: 5,
                    },
                },
            });
        });

        act(() => {
            state.completeTask('invalid-task-id');
        });

        const { tasks: tasksAfterCompleteInvalid  } = useTaskStore.getState();

        expect(tasksAfterCompleteInvalid[mockId].status).toBe(TaskStatus.UNCOMPLETE);
        expect(tasksAfterCompleteInvalid[mockId].completeAt).toBe(null);

        act(() => {
            state.completeTask(mockId);
        });

        const { tasks: tasksAfterComplete } = useTaskStore.getState();

        expect(tasksAfterComplete[mockId].status).toBe(TaskStatus.COMPLETE);
        expect(tasksAfterComplete[mockId].completeAt).toBe(mockDate.toISOString());

        dateSpy.mockRestore();
    });

    test('change status task to complete, that included in activeTaskID', () => {
        const state = useTaskStore.getState();
        const mockId = 'test-task-id';
        (uuidv4 as jest.Mock).mockReturnValue(mockId);

        const mockDate = new Date('2024-01-01T00:00:00Z');
        const dateSpy = jest.spyOn(global, 'Date').mockImplementation(() => mockDate);

        act(() => {
            state.addNewTask({
                title: 'Задача Test',
                status: TaskStatus.UNCOMPLETE,
                priority: TaskPriority.MEDIUM_PRIORITY,
                settings: {
                    workIntervals: 10,
                    timeSettings: {
                        workDuration: 1 * 60,
                        shortDuration: 1 * 60,
                        longDuration: 1 * 60,
                        intervalsToLong: 5,
                    },
                },
            });

            state.setCurrentTaskId(mockId);
        });

        act(() => {
            state.completeTask(mockId);
        });

        const { tasks: tasksAfterComplete, activeTaskId } = useTaskStore.getState();

        expect(tasksAfterComplete[mockId].status).toBe(TaskStatus.COMPLETE);
        expect(tasksAfterComplete[mockId].completeAt).toBe(mockDate.toISOString());
        expect(activeTaskId).toBe(null);

        dateSpy.mockRestore();
    });

    test('Set current TaskId (Test nullable, invalid, valid taskID)', () => {
        const state = useTaskStore.getState();
        const mockId = 'test-task-id';
        (uuidv4 as jest.Mock).mockReturnValue(mockId);

        const mockDate = new Date('2024-01-01T00:00:00Z');
        const dateSpy = jest.spyOn(global, 'Date').mockImplementation(() => mockDate);

        act(() => {
            state.addNewTask({
                title: 'Задача Test',
                status: TaskStatus.UNCOMPLETE,
                priority: TaskPriority.MEDIUM_PRIORITY,
                settings: {
                    workIntervals: 10,
                    timeSettings: {
                        workDuration: 1 * 60,
                        shortDuration: 1 * 60,
                        longDuration: 1 * 60,
                        intervalsToLong: 5,
                    },
                },
            });
        });

        // 1. TaskId === null
        act(() => {
            state.setCurrentTaskId(null);
        });
        const { activeTaskId: taskIdAfterNull  } = useTaskStore.getState();
        expect(taskIdAfterNull).toBe(null);

        // 2. Invalid TaskId
        act(() => {
            state.setCurrentTaskId('invalid-task-id');
        });

        const { activeTaskId: taskIdAfterInvalid  } = useTaskStore.getState();
        expect(taskIdAfterInvalid).toBe(null);

        // 3. Valid TaskId
        act(() => {
            state.setCurrentTaskId(mockId);
        });

        const { activeTaskId: taskIdAfterValid  } = useTaskStore.getState();
        expect(taskIdAfterValid).toBe(mockId);

        dateSpy.mockRestore();
    });

    test('Delete task by taskID (Without change activeTaskID)', () => {
        const state = useTaskStore.getState();

        const mockId1 = 'test-task-id-1';
        const mockId2 = 'test-task-id-2';
        (uuidv4 as jest.Mock).mockReturnValueOnce(mockId1).mockReturnValueOnce(mockId2);

        const mockDate = new Date('2024-01-01T00:00:00Z');
        const dateSpy = jest.spyOn(global, 'Date').mockImplementation(() => mockDate);

        act(() => {
            state.addNewTask({
                title: 'Задача 1',
                status: TaskStatus.UNCOMPLETE,
                priority: TaskPriority.MEDIUM_PRIORITY,
                settings: {
                    workIntervals: 10,
                    timeSettings: {
                        workDuration: 1 * 60,
                        shortDuration: 1 * 60,
                        longDuration: 1 * 60,
                        intervalsToLong: 5,
                    },
                },
            });
            state.addNewTask({
                title: 'Задача 2',
                status: TaskStatus.UNCOMPLETE,
                priority: TaskPriority.MEDIUM_PRIORITY,
                settings: {
                    workIntervals: 10,
                    timeSettings: {
                        workDuration: 1 * 60,
                        shortDuration: 1 * 60,
                        longDuration: 1 * 60,
                        intervalsToLong: 5,
                    },
                },
            });

            state.setCurrentTaskId(mockId2);
        });

        act(() => {
            state.deleteTask(mockId1);
        });


        const { tasks, activeTaskId } = useTaskStore.getState();
        expect(tasks[mockId1]).toBeUndefined();
        expect(tasks[mockId2]).toBeDefined();
        expect(activeTaskId).toBe(mockId2);

        dateSpy.mockRestore();
    });

    test('Delete task by taskID (With change activeTaskID)', () => {
        const state = useTaskStore.getState();

        const mockId1 = 'test-task-id-1';
        const mockId2 = 'test-task-id-2';
        (uuidv4 as jest.Mock).mockReturnValueOnce(mockId1).mockReturnValueOnce(mockId2);

        const mockDate = new Date('2024-01-01T00:00:00Z');
        const dateSpy = jest.spyOn(global, 'Date').mockImplementation(() => mockDate);

        act(() => {
            state.addNewTask({
                title: 'Задача 1',
                status: TaskStatus.UNCOMPLETE,
                priority: TaskPriority.MEDIUM_PRIORITY,
                settings: {
                    workIntervals: 10,
                    timeSettings: {
                        workDuration: 1 * 60,
                        shortDuration: 1 * 60,
                        longDuration: 1 * 60,
                        intervalsToLong: 5,
                    },
                },
            });
            state.addNewTask({
                title: 'Задача 2',
                status: TaskStatus.UNCOMPLETE,
                priority: TaskPriority.MEDIUM_PRIORITY,
                settings: {
                    workIntervals: 10,
                    timeSettings: {
                        workDuration: 1 * 60,
                        shortDuration: 1 * 60,
                        longDuration: 1 * 60,
                        intervalsToLong: 5,
                    },
                },
            });

            state.setCurrentTaskId(mockId2);
        });

        act(() => {
            state.deleteTask(mockId2);
        });


        const { tasks, activeTaskId } = useTaskStore.getState();
        expect(tasks[mockId1]).toBeDefined();
        expect(tasks[mockId2]).toBeUndefined();
        expect(activeTaskId).toBe(null);

        dateSpy.mockRestore();
    });
});
