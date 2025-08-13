import { taskApplyFilters, TaskFilterParams } from '../utils/filters';
import { SortTask, TaskSortParams } from '../utils/sorters';
import useTaskStore from './store';


export const useGetActiveTask = () => {
    const tasks = useTaskStore(state => state.tasks);
    const activeId = useTaskStore(state => state.activeTaskId);

    if(activeId === null || !tasks[activeId]){
        return null;
    }else{
        return tasks[activeId];
    }
};

export const useTaskList = (filters?: TaskFilterParams, sorters?: TaskSortParams) => {
    const tasks = Object.values(useTaskStore(state => state.tasks));
    if (!filters){
        return tasks;
    }
    const filteredTasks = taskApplyFilters(tasks, filters);

    if(!sorters){
        return filteredTasks;
    }

    const sortedTasks = SortTask(filteredTasks, sorters);

    return sortedTasks;
};

export const useTaskActions = () => {
    const addNewTask = useTaskStore(state => state.addNewTask);
    const completeTask = useTaskStore(state => state.completeTask);
    const deleteTask = useTaskStore(state => state.deleteTask);

    return { addNewTask, completeTask, deleteTask };
};
