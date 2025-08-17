import { TaskNameButton, TaskRightActionBlock } from '@app/shared/types/task';
import TaskSwipeableWrapper from './components/swipeable/task-swipeable-wrapper';
import { Task } from '../../model/types';
import { TaskCardBlock } from './components/common/task-card-block';
import TaskCardProvider from './context/task-card-provider';



interface TaskCardProps {
    task?: Task;
    text?: string,
    controllButton: Exclude<TaskNameButton, 'complete'>,
    rightActionBlock?: TaskRightActionBlock,
    prefix: string,
}

export const TaskCard:React.FC<TaskCardProps> = (props) => {
    const {
        task = null,
        text = 'A text was supposed to be here',
        rightActionBlock = {
            enabled: false,
            buttons: [],
        },
        prefix,
        controllButton,
    } = props;

    let content;
    if(rightActionBlock.enabled && task && rightActionBlock.buttons.length !== 0){
        content = (
            <TaskSwipeableWrapper>
                <TaskCardBlock/>
            </TaskSwipeableWrapper>
        );
    }else{
        content = (
            <TaskCardBlock/>
        );
    }

    return (
        <TaskCardProvider
            task={task}
            text={text}
            controllButton={controllButton}
            prefix={prefix}
            rightActionBlock={rightActionBlock}
        >
            {content}
        </TaskCardProvider>
    );
};
