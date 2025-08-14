import { act, cleanup} from '@testing-library/react';
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
        cleanup();
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
        jest.spyOn(global, 'Date').mockImplementation(() => mockDate);

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
    });

    test('change status task to complete', () => {
        const state = useTaskStore.getState();
        const mockId = 'test-task-id';

        (uuidv4 as jest.Mock).mockReturnValue(mockId);

        const mockDate = new Date('2024-01-01T00:00:00Z');
        jest.spyOn(global, 'Date').mockImplementation(() => mockDate);
        jest.spyOn(global, 'Date').mockImplementation(() => mockDate);
        
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

        console.log(tasks);

        act(() => {
            state.completeTask(mockId);
        });

        expect(tasks[mockId].status).toBe(TaskStatus.COMPLETE);
        expect(tasks[mockId].completeAt).toBe(mockDate.toISOString());
    });
});
