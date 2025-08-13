import { TaskPriorityType, TaskStatusType } from '@app/shared/types/task';
import { Task, Tasks } from '../model/types';

type Status = TaskStatusType | 'all'
type Statuses = Array<TaskStatusType>;
type FilterStatus = Status | Statuses;

const filterByStatus = (task: Task, status: FilterStatus = 'all'): boolean => {
    if(status === 'all'){
        return true;
    }else{
        if(Array.isArray(status)){
            return status.includes(task.status);
        }else{
            return task.status === status;
        }
    }
};

type Priority = TaskPriorityType | 'all';
type Priorities = Array<TaskPriorityType> ;
type FilterPriority = Priorities | Priority;

const filterByPriority = (task: Task, priority: FilterPriority = 'all'): boolean => {
    if(priority === 'all'){
        return true;
    }else{
        if(Array.isArray(priority)){
            return priority.includes(task.priority);
        }else{
            return task.priority === priority;
        }
    }
};

export type TaskFilterParams = {
  status?: FilterStatus;
  priority?: FilterPriority;
};

export const taskApplyFilters = (tasks: Tasks, filters?: TaskFilterParams) => {
    if(filters){
        if(tasks.length === 0 || Object.keys(filters).length === 0){
            return tasks;
        }

        return tasks.filter(task => {
            const statusPass = filters.status === undefined ? true : filterByStatus(task, filters.status);
            const priorityPass = filters.priority === undefined ? true : filterByPriority(task, filters.priority);

            return statusPass && priorityPass;
        });
    }else{
        return tasks;
    }

};

