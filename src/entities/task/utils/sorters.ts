import { Tasks } from '../model/store';

export type TaskSortParams = {
    sortBy: 'createAt' | 'completeAt';
    orderBy: 'asc' | 'desc';
};

export const SortTask = (tasks: Tasks, sortParams?: TaskSortParams) => {
    if(sortParams){
        if(tasks.length === 0){
            return tasks;
        }

        const {sortBy, orderBy} = sortParams;
        const direction = orderBy === 'asc' ? 1 : -1;

        return [...tasks].sort((a, b) => {
            if (sortBy === 'createAt') {
                return direction * (new Date(a.createAt).getTime() - new Date(b.createAt).getTime());
            }

            if (sortBy === 'completeAt') {
                const aTime = a.completeAt ? new Date(a.completeAt).getTime() : Infinity;
                const bTime = b.completeAt ? new Date(b.completeAt).getTime() : Infinity;
                return direction * (aTime - bTime);
            }
            return 0;
        });
    }else{
        return tasks;
    }
};
