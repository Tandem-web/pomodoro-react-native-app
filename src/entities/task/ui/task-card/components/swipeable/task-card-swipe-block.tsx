import { StyleSheet } from 'react-native';
import Reanimated, { SharedValue, useAnimatedStyle } from 'react-native-reanimated';
import { SwipeableMethods } from 'react-native-gesture-handler/lib/typescript/components/ReanimatedSwipeable';
import { RefObject, useCallback } from 'react';
import { TaskCardRightButton } from '@app/shared/types/task';
import TaskSwipeButton from './task-card-swipe-button';
import { useTaskCardContext } from '../../context/task-card-context';
import { Task } from '@app/entities/task/model/types';
import { noop } from '@app/shared/utilities/noop';
import { useTaskActions } from '@app/entities/task/intex';

interface RightActionProps{
    prog: SharedValue<number>,
    drag: SharedValue<number>,
    swipeRef: RefObject<SwipeableMethods | null>,
}

const RightAction: React.FC<RightActionProps> = (props) => {
    const {
        drag,
        swipeRef,
    } = props;
    const { rightActionBlock, prefix, task } = useTaskCardContext();

    const { completeTask, deleteTask} = useTaskActions();

    const measure = (40 * rightActionBlock.buttons.length) + (10 * rightActionBlock.buttons.length);

    const styleAnimation = useAnimatedStyle(() => {
        return {
            transform: [{ translateX: drag.value + measure }],
        };
    });

    const onPressHandler = useCallback((type: TaskCardRightButton, taskId: Task['id']) => {
        switch (type) {
            case TaskCardRightButton.COMPLETE:
                completeTask(taskId);
                break;
            case TaskCardRightButton.DELETE:
                deleteTask(taskId);
                break;
            default:
                noop();
                break;
        }
    }, [completeTask, deleteTask]);

    if (rightActionBlock.buttons.length === 0){
        return null;
    }

    return (
        <>
            <Reanimated.View style={[styleAnimation, styles.reanimatedContainer, {width: measure}]}>
                {
                    rightActionBlock.buttons.map((item, index) => (
                        <TaskSwipeButton key={`${prefix}-right-block-button-${index}`} type={item} onPress={() => onPressHandler(item, task!.id)} swipeRef={swipeRef}/>
                    ))
                }
            </Reanimated.View>
        </>

    );
};

const styles = StyleSheet.create({
    reanimatedContainer: {
        paddingLeft: 10,
        flexDirection: 'row',
        gap: 10,
    },
});

export default RightAction;

