import Ionicons from '@react-native-vector-icons/ionicons';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { Colors } from '@app/shared/styles/colorsPalete';
import { TaskNameButton } from '@app/shared/types/task';
import { noop } from '@app/shared/utilities/noop';


const buttonIcons = {
    'close': (<Ionicons size={16} color={Colors.TaskCardControll[TaskNameButton.CLOSE].iconColor} name="close"/>),
    'play': (<Ionicons style={{ marginLeft: 2 }} size={12} color={Colors.TaskCardControll[TaskNameButton.PLAY].iconColor} name="play"/>),
    'delete': (<Ionicons size={12} color={Colors.TaskCardControll[TaskNameButton.DELETE].iconColor} name="trash"/>),
} as const;

interface TaskCardControllProps {
    type:  Exclude<TaskNameButton, 'complete'>;
    onPress?: () => void;
}

const TaskCardControll: React.FC<TaskCardControllProps> = (props) => {
    const {
        onPress = noop,
        type,
    } = props;

    return (
        <>
            <TouchableOpacity onPress={onPress}>
                <View style={[styles.controllButton,
                    {
                        borderColor: Colors.TaskCardControll[type].borderColor,
                    },
                ]}>
                    {buttonIcons[type]}
                </View>
            </TouchableOpacity>
        </>
    );
};

const styles = StyleSheet.create({
    controllButton: {
        width: 25,
        height: 25,
        borderRadius: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 2,
    },
});

export default TaskCardControll;
