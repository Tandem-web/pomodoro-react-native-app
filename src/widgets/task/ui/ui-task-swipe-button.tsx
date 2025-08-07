import Ionicons from '@react-native-vector-icons/ionicons';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { TaskButton, TaskButtonTypes } from '../../../@types/task';
import { Colors } from '../../../shared/styles/colorsPalete';

const buttonIcons = {
    'complete': (<Ionicons size={22} color={Colors.TaskCardControll[TaskButton.COMPLETE].iconColor} name="checkmark"/>),
    'delete': (<Ionicons size={22} color={Colors.TaskCardControll[TaskButton.DELETE].iconColor} name="trash"/>),
} as const;


interface TaskSwipeButtonProps {
    type:  Exclude<TaskButtonTypes, 'close' | 'play'>;
    onPress?: () => void;
}

const TaskSwipeButton: React.FC<TaskSwipeButtonProps> = (props) => {
    const {
        type,
        onPress = undefined,
    } = props;

    return (
        <TouchableOpacity onPress={onPress}>
            <View style={[styles.rightAction, {
                backgroundColor: Colors.TaskCardControll[type].borderColor
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
    },
});

export default TaskSwipeButton;
