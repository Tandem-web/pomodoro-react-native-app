import { StyleSheet } from 'react-native';
import Reanimated, { SharedValue, useAnimatedStyle } from 'react-native-reanimated';
import { SwipeableMethods } from 'react-native-gesture-handler/lib/typescript/components/ReanimatedSwipeable';
import { RefObject } from 'react';
import { TaskCardRightButton } from '@app/shared/types/task';
import TaskSwipeButton from './ui-task-swipe-button';

interface RightActionProps{
    prog: SharedValue<number>,
    drag: SharedValue<number>,
    buttons: TaskCardRightButton[],
    swipeRef: RefObject<SwipeableMethods | null>,
    prefix: string,
    id: string,
}

const RightAction: React.FC<RightActionProps> = (props) => {
    const {
        drag,
        buttons,
        swipeRef,
        prefix,
        id = '',
    } = props;

    const measure = (40 * buttons.length) + (10 * buttons.length);

    const styleAnimation = useAnimatedStyle(() => {
        return {
            transform: [{ translateX: drag.value + measure }],
        };
    });

    if (buttons.length === 0){
        return null;
    }

    return (
        <>
            <Reanimated.View style={[styleAnimation, styles.reanimatedContainer, {width: measure}]}>
                {
                    buttons.map((item, index) => (
                        <TaskSwipeButton key={`${prefix}-right-block-button-${index}`} type={item.type} onPress={() => item.onPress(id!)} swipeRef={swipeRef}/>
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
