import { StyleSheet, View, ViewStyle } from 'react-native';
import { Colors } from '@app/shared/styles/colorsPalete';
import FontAwesome from '@react-native-vector-icons/fontawesome';
import { TaskPriority, TaskPriorityType, TaskStatus, TaskStatusType } from '@app/shared/types/task';
import { useMemo } from 'react';



interface TaskCardStatusProps {
    status: TaskStatusType;
    priority: TaskPriorityType;
}

function createTaskCardStatusStyle(status: TaskStatusType, priority:TaskPriorityType ): Pick<ViewStyle, 'backgroundColor' | 'borderColor'>{
    const isComplete = status === TaskStatus.COMPLETE;
    const targetPriority = isComplete ? TaskPriority.LOW_PRIORITY : priority;
    return {
        backgroundColor: Colors.TaskCardPriority[targetPriority].bgColor,
        borderColor: Colors.TaskCardPriority[targetPriority].borderColor,
    };
}

const TaskCardStatus: React.FC<TaskCardStatusProps> = (props) => {
    const {status, priority} = props;

    const taskCardStatusStyle = useMemo<ViewStyle>(() => {
        return createTaskCardStatusStyle(status, priority);
    }, [status, priority]);


    return (
        <>
            <View style={[
                styles.status,
                taskCardStatusStyle,
            ]}>
                {
                    status === TaskStatus.COMPLETE && (
                        <FontAwesome color={Colors.TaskCardPriority[TaskPriority.LOW_PRIORITY].borderColor} size={12} name="check"/>
                    )
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
});

export default TaskCardStatus;
