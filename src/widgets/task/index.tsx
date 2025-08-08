import { View, StyleSheet, Text} from 'react-native';
import TaskCardStatus from './ui/ui-task-status';
import TaskCardInfo from './ui/ui-task-info';
import TaskCardControll from './ui/ui-task-controll';
import { Colors } from '../../shared/styles/colorsPalete';
import { FONT_FAMILY } from '../../shared/config/customFont';
import { TaskButton, TaskPriority, TaskStatus } from '../../@types/task';

interface TaskCardProps {
    task?: Object;
    text?: string,
}

export const TaskCard:React.FC<TaskCardProps> = (props) => {
    const {
        task = null,
        text = 'A text was supposed to be here',
    } = props;

    return (
        <>
            <View style={styles.cardWrap}>
                {
                   task === null ? (
                    <View style={styles.nullTaskWrap}>
                        <Text style={styles.nullTaskText}>{text}</Text>
                    </View>
                   ) : (
                    <View style={styles.cardInfo}>
                        <TaskCardStatus status={TaskStatus.UNCOMPLETE} priority={TaskPriority.MEDIUM_PRIORITY}/>
                        <TaskCardInfo/>
                        <TaskCardControll type={TaskButton.DELETE}/>
                    </View>
                   )
                }
            </View>
        </>
    );
};

export const TaskPlug = () => {
    return(
        <View style={styles.TaskPlug}/>
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
    TaskPlug: {
        height: 60,
        borderRadius: 10,
        paddingHorizontal: 15,
        paddingVertical: 10,
        width: '100%',
    },
});
