import { Task } from '@app/entities/task/model/types';
import { TaskNameButton, TaskRightActionBlock } from '@app/shared/types/task';
import { createContext, useContext } from 'react';

export interface TaskCardContext {
    task: Task | null;
    text: string,
    controllButton: Exclude<TaskNameButton, 'complete'>,
    rightActionBlock: TaskRightActionBlock,
    prefix: string,
}

export const TaskCardContext = createContext<TaskCardContext>({} as TaskCardContext);

export const useTaskCardContext = () => useContext(TaskCardContext);
