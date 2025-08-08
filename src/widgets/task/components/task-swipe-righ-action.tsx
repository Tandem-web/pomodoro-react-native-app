import { StyleSheet } from 'react-native';
import Reanimated, { SharedValue, useAnimatedStyle } from 'react-native-reanimated';
import TaskSwipeButton from '../ui/ui-task-swipe-button';
import { SwipeableMethods } from 'react-native-gesture-handler/lib/typescript/components/ReanimatedSwipeable';
import { RefObject } from 'react';
import { TaskCardRightButton } from '../../../@types/task';

interface RightActionProps{
    prog: SharedValue<number>,
    drag: SharedValue<number>,
    buttons?: TaskCardRightButton[],
    swipeRef: RefObject<SwipeableMethods | null>,
}

const RightAction: React.FC<RightActionProps> = (props) => {
    const {
        drag,
        buttons = [],
        swipeRef,
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
                    buttons.map((item) => (
                        <TaskSwipeButton type={item.type} onPress={item.onPress} swipeRef={swipeRef}/>
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
