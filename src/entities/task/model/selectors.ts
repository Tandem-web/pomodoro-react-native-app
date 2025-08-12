import { taskApplyFilters, TaskFilterParams } from '../utils/filters';
import { SortTask, TaskSortParams } from '../utils/sorters';
import useTaskStore from './store';


export const useTaskList = (filters?: TaskFilterParams, sorters?: TaskSortParams) => {
    return useTaskStore(state => {
        if (!filters){
            return state.tasks;
        }
        const filteredTasks = taskApplyFilters(state.tasks, filters);

        if(!sorters){
            return filteredTasks;
        }

        return SortTask(filteredTasks, sorters);
    });
};

export const useTaskActions = () => {
    return useTaskStore(state => ({
        addNewTask: state.addNewTask,
        completeTask: state.completeTask,
        deleteTask: state.deleteTask,
    }));
};
