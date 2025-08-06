import { StyleSheet, View } from 'react-native';
import { Colors } from '../../../shared/styles/colorsPalete';
import FontAwesome from '@react-native-vector-icons/fontawesome';
import { TaskPriority, TaskPriorityType, TaskStatus, TaskStatusType } from '../../../@types/task';



interface TaskCardStatusProps {
    status: TaskStatusType;
    priority: TaskPriorityType;
}

const TaskCardStatus: React.FC<TaskCardStatusProps> = (props) => {
    const {status, priority} = props;

    return (
        <>
            <View style={[
                styles.status,
                {
                    backgroundColor:
                        status === TaskStatus.COMPLETE
                            ? Colors.TaskCardStatus[TaskPriority.LOW_PRIORITY].bgColor
                            : Colors.TaskCardStatus[priority].bgColor,
                    borderColor:
                        status === TaskStatus.COMPLETE
                            ? Colors.TaskCardStatus[TaskPriority.LOW_PRIORITY].borderColor
                            : Colors.TaskCardStatus[priority].borderColor,
                },
            ]}>
                {
                    status === TaskStatus.COMPLETE && (<FontAwesome color={Colors.TaskCardStatus[TaskPriority.LOW_PRIORITY].borderColor} size={12} name="check"/>)
                }
            </View>
        </>
    );
};

const styles = StyleSheet.create({
    status: {
        width: 25,
        height: 25,
        borderRadius: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1.5,
    },
})

export default TaskCardStatus;
