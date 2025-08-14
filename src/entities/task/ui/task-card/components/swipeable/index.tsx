import { Task } from '@app/entities/task/model/types';
import { TaskRightActionBlock } from '@app/shared/types/task';
import { noop } from '@app/shared/utilities/noop';
import { ReactNode, useCallback, useRef } from 'react';
import ReanimatedSwipeable, { SwipeableMethods} from 'react-native-gesture-handler/ReanimatedSwipeable';
import { SharedValue } from 'react-native-reanimated';
import { StyleSheet } from 'react-native';
import RightAction from './components/task-card-swipe-block';

interface TaskSwipeableWrapperProps {
    children: ReactNode,
    task: Task,
    prefix: string,
    rightActionBlock: TaskRightActionBlock,
}

const TaskSwipeableWrapper: React.FC<TaskSwipeableWrapperProps> = (props) => {
    const {
        task,
        rightActionBlock,
        prefix,
        children,
    } = props;

    const swipeableRef = useRef<SwipeableMethods>(null);

    const renderRightActions = useCallback((progress: SharedValue<number>, dragX: SharedValue<number>) => {
        const buttons = rightActionBlock.buttons.map((item) => {
            if(!item.onPress){
                item.onPress = () => noop;
            }
            return item;
        });
        return (
            <RightAction
                id={task.id}
                swipeRef={swipeableRef}
                buttons={buttons}
                prog={progress}
                drag={dragX}
                prefix={prefix}
            />
        );
    }, [rightActionBlock.buttons, prefix, task]);

    return (
            <ReanimatedSwipeable
                ref={swipeableRef}
                enabled={rightActionBlock.enabled}
                containerStyle={styles.swipeable}
                friction={2}
                enableTrackpadTwoFingerGesture
                rightThreshold={70}
                renderRightActions={renderRightActions}
            >
                {children}
            </ReanimatedSwipeable>
    );
};

export default TaskSwipeableWrapper;

const styles = StyleSheet.create({
    swipeable: {
        overflow: 'visible',
    },
});
