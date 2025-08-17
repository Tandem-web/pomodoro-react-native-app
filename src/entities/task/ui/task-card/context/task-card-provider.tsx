import {ReactNode } from 'react';
import { TaskCardContext } from './task-card-context';

interface TaskCardProviderProps extends TaskCardContext{
    children: ReactNode
}

const TaskCardProvider: React.FC<TaskCardProviderProps> = (props) => {
    const {
        children,
        task,
        text,
        controllButton,
        prefix,
        rightActionBlock,
    } = props;

    const value = {
        task,
        text,
        controllButton,
        prefix,
        rightActionBlock,
    };

    return(
        <TaskCardContext.Provider value={value}>
            {children}
        </TaskCardContext.Provider>
    );
};

export default TaskCardProvider;
