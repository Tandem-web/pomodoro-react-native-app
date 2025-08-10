import Ionicons from '@react-native-vector-icons/ionicons';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { TaskButton, TaskButtonTypes } from '../../../shared/types/task';
import { Colors } from '../../../shared/styles/colorsPalete';
import { RefObject, useCallback } from 'react';
import { SwipeableMethods } from 'react-native-gesture-handler/lib/typescript/components/ReanimatedSwipeable';

const buttonIcons = {
    'complete': (<Ionicons size={22} color={Colors.TaskCardRightAction[TaskButton.COMPLETE].iconColor} name="checkmark"/>),
    'delete': (<Ionicons size={22} color={Colors.TaskCardRightAction[TaskButton.DELETE].iconColor} name="trash"/>),
} as const;


export interface TaskSwipeButtonProps {
    type:  Exclude<TaskButtonTypes, 'close' | 'play'>;
    onPress?: () => void;
    swipeRef: RefObject<SwipeableMethods | null>;
}

const TaskSwipeButton: React.FC<TaskSwipeButtonProps> = (props) => {
    const {
        type,
        onPress = () => {},
        swipeRef,
    } = props;

    const handleAction = useCallback(() => {
        swipeRef.current?.close();
        onPress();
  }, [onPress, swipeRef]);

    return (
        <TouchableOpacity onPress={handleAction}>
            <View style={[styles.rightAction, {
                backgroundColor: Colors.TaskCardRightAction[type].bgColor,
                borderColor: Colors.TaskCardRightAction[type].borderColor,
            }]}>
                {buttonIcons[type]}
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    rightAction: {
        width: 40,
        height: 60,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 5,
        borderWidth: 1.5,
    },
});

export default TaskSwipeButton;
