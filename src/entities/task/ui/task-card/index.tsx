import { View, StyleSheet} from 'react-native';
import { TaskNameButton, TaskRightActionBlock } from '@app/shared/types/task';
import TaskSwipeableWrapper from './components/swipeable';
import { Task } from '../../model/types';
import { TaskCardBlock } from './components/common';



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

    if(rightActionBlock.enabled && task && rightActionBlock.buttons.length !== 0){
        return (
            <>
                <TaskSwipeableWrapper
                    task={task}
                    prefix={prefix}
                    rightActionBlock={rightActionBlock}
                >
                    <TaskCardBlock
                        task={task}
                        text={text}
                        controllButton={controllButton}
                    />
                </TaskSwipeableWrapper>
            </>
        )
    }else{
        return (
            <>
                <TaskCardBlock
                    task={task}
                    text={text}
                    controllButton={controllButton}
                />
            </>
        );
    }
}

export const TaskPlug = () => {
    return(
        <View style={styles.taskPlug}/>
    );
};

const styles = StyleSheet.create({
    taskPlug: {
        height: 60,
        borderRadius: 10,
        paddingHorizontal: 15,
        paddingVertical: 10,
        width: '100%',
    },
});
