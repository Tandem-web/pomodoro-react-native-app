import { View, StyleSheet, Text} from 'react-native';
import TaskCardStatus from './ui/card/ui-task-status';
import TaskCardInfo from './ui/card/ui-task-info';
import TaskCardControll from './ui/card/ui-task-controll';
import { Colors } from '@app/shared/styles/colorsPalete';
import { FONT_FAMILY } from '@app/shared/font/avenir';
import { TaskNameButton, TaskRightActionBlock } from '@app/shared/types/task';
import ReanimatedSwipeable, { SwipeableMethods} from 'react-native-gesture-handler/ReanimatedSwipeable';
import { useCallback, useRef } from 'react';
import RightAction from './ui/swipe-buttons/ui-task-swipe-block';
import { SharedValue } from 'react-native-reanimated';
import { Task } from '@app/entities/task/model/types';
import { noop } from '@app/shared/utilities/noop';
import { useTaskActions } from '@app/entities/task/model/selectors';


interface TaskCardProps {
    task?: Task;
    text?: string,
    controllButton: Exclude<TaskNameButton, 'complete'>,
    rightActionBlock?: TaskRightActionBlock,
    prefix: string,
}

export const TaskCard:React.FC<TaskCardProps> = (props) => {
    const {
        task = null,
        text = 'A text was supposed to be here',
        rightActionBlock = {
            enabled: false,
            buttons: [],
        },
        prefix,
        controllButton,
    } = props;
    const { setCurrentTaskId, deleteTask } = useTaskActions();
    const swipeableRef = useRef<SwipeableMethods>(null);

    const renderRightActions = useCallback((progress: SharedValue<number>, dragX: SharedValue<number>) => {
        if (!task || rightActionBlock.enabled === false || rightActionBlock.buttons.length === 0) {
            return null;
        }
        const buttons = rightActionBlock.buttons.map((item) => {
            if(!item.onPress){
                item.onPress = () => noop;
            }
            return item;
        });
        return (
            <RightAction
                id={task.id}
                swipeRef={swipeableRef}
                buttons={buttons}
                prog={progress}
                drag={dragX}
                prefix={prefix}
            />
        );
    }, [rightActionBlock.buttons, rightActionBlock.enabled, prefix, task]);

    const controllHandler = useCallback((type: TaskCardProps['controllButton']) => {
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
        <>
            <ReanimatedSwipeable
                ref={swipeableRef}
                enabled={rightActionBlock.enabled}
                containerStyle={styles.swipeable}
                friction={2}
                enableTrackpadTwoFingerGesture
                rightThreshold={70}
                renderRightActions={renderRightActions}
            >
                <View style={styles.cardWrap}>
                    {
                        task === null ? (
                            <View style={styles.nullTaskWrap}>
                                <Text style={styles.nullTaskText}>{text}</Text>
                            </View>
                        ) : (
                            <View style={styles.cardInfo}>
                                <TaskCardStatus status={task.status} priority={task.priority}/>
                                <TaskCardInfo
                                    title={task.title}
                                    workDuration={task.settings.timeSettings.workDuration}
                                    totalWorkIntervals={task.settings.workIntervals}
                                    currentWorkInterval={task.task_state.currentWorkInterval}
                                    totalTime={task.task_state.totalTime}
                                />
                                <TaskCardControll type={controllButton} onPress={() => controllHandler(controllButton)}/>
                            </View>
                        )
                    }
                </View>
            </ReanimatedSwipeable>
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

    rightAction: {
        width: 40,
        height: 60,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: Colors.success,
        borderRadius: 5,
    },
    swipeable: {
        overflow: 'visible',
    },
});
