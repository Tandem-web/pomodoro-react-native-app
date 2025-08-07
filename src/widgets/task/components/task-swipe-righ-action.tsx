import { StyleSheet } from 'react-native';
import Reanimated, { SharedValue, useAnimatedStyle } from 'react-native-reanimated';
import TaskSwipeButton, { TaskSwipeButtonProps } from '../ui/ui-task-swipe-button';

interface RightActionProps{
    prog: SharedValue<number>,
    drag: SharedValue<number>,
    buttons: TaskSwipeButtonProps[]
}

const RightAction: React.FC<RightActionProps> = (props) => {
    const {
        prog,
        drag,
        buttons,
    } = props;

    const measure = (40 * buttons.length) + (10 * buttons.length);

    const styleAnimation = useAnimatedStyle(() => {
        console.log('showRightProgress:', prog.value);
        console.log('appliedTranslation:', drag.value);
        return {
            transform: [{ translateX: drag.value + measure }],
        };
    });

    return (
        <>
            <Reanimated.View style={[styleAnimation, styles.reanimatedContainer, {width: measure}]}>
                {
                    buttons.map((item) => (
                        <TaskSwipeButton type={item.type} onPress={item.onPress}/>
                    ))
                }
            </Reanimated.View>
        </>

    );
};

const styles = StyleSheet.create({
    reanimatedContainer: {
        flexDirection: 'row',
        gap: 10,
    }
})

export default RightAction;
