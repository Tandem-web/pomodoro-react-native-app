import { ReactNode, useCallback, useRef } from 'react';
import ReanimatedSwipeable, { SwipeableMethods} from 'react-native-gesture-handler/ReanimatedSwipeable';
import { SharedValue } from 'react-native-reanimated';
import { StyleSheet } from 'react-native';
import RightAction from './task-card-swipe-block';
import { useTaskCardContext } from '../../context/task-card-context';

interface TaskSwipeableWrapperProps {
    children: ReactNode,
}

const TaskSwipeableWrapper: React.FC<TaskSwipeableWrapperProps> = (props) => {
    const {
        children,
    } = props;

    const { rightActionBlock } = useTaskCardContext();

    const swipeableRef = useRef<SwipeableMethods>(null);

    const renderRightActions = useCallback((progress: SharedValue<number>, dragX: SharedValue<number>) => {
        return (
            <RightAction
                swipeRef={swipeableRef}
                prog={progress}
                drag={dragX}
            />
        );
    }, []);

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
