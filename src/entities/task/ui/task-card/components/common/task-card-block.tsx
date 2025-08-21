import { Task } from '@app/entities/task/model/types';
import { FONT_FAMILY } from '@app/shared/font/avenir';
import { Colors } from '@app/shared/styles/colorsPalete';
import { TaskNameButton } from '@app/shared/types/task';
import { ReactNode, useCallback } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import TaskCardStatus from './ui-task-status';
import TaskCardInfo from './ui-task-info';
import TaskCardControll from './ui-task-controll';
import { useTaskActions } from '@app/entities/task/intex';
import { noop } from '@app/shared/utilities/noop';
import { TaskCardContext, useTaskCardContext } from '../../context/task-card-context';



export const TaskCardBlock: React.FC = () => {
    const { task, text, controllButton } = useTaskCardContext();
    let content: ReactNode;

    if(!task){
        content = ( <TaskPlugText text={text}/> );
    }else{
        content = ( <TaskCardContent task={task} controllButton={controllButton}/>);
    }

    return (
        <>
            <View style={styles.cardWrap}>
                { content }
            </View>
        </>
    );
};

const TaskPlugText: React.FC<Pick<TaskCardContext, 'text'>> = ({ text }) => {
    return (
        <View style={styles.nullTaskWrap}>
            <Text style={styles.nullTaskText}>{text}</Text>
        </View>
    );
};

interface TaskCardContentProps{
    task: Task;
    controllButton: Exclude<TaskNameButton, 'complete'>,
}
const TaskCardContent: React.FC<TaskCardContentProps> = (props) => {
    const {
        task,
        controllButton,
    } = props;

    const { setCurrentTaskId, deleteTask } = useTaskActions();

    const controllHandler = useCallback((type: TaskCardContext['controllButton']) => {
        if (!task){
            return null;
        }
        switch (type) {
            case TaskNameButton.CLOSE:
                setCurrentTaskId(null);
                break;
            case TaskNameButton.PLAY:
                setCurrentTaskId(task.id);
                break;
            case TaskNameButton.DELETE:
                deleteTask(task.id);
                break;
            default:
                noop();
                break;
        }
    }, [task, deleteTask, setCurrentTaskId]);

    return (
        <View style={styles.cardInfo}>
            <TaskCardStatus status={task.status} priority={task.priority}/>
            <TaskCardInfo
                title={task.title}
                workDuration={task.settings.timeSettings.duration.work}
                totalWorkIntervals={task.settings.workIntervals}
                currentWorkInterval={task.task_state.countWorkIntervals}
                totalTime={task.task_state.totalTime}
            />
            <TaskCardControll type={controllButton} onPress={() => controllHandler(controllButton)}/>
        </View>
    );
};

const styles = StyleSheet.create({
    cardWrap: {
        height: 60,
        borderRadius: 10,
        paddingHorizontal: 15,
        paddingVertical: 10,
        backgroundColor: Colors.surface,
        flexDirection: 'row',
    },
    cardInfo: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        gap: 15,
    },
    nullTaskWrap: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    nullTaskText: {
        fontFamily: FONT_FAMILY.AvenirNext_MEDIUM,
        fontSize: 15,
        textAlign: 'center',
        color: Colors.white,
    },
});
