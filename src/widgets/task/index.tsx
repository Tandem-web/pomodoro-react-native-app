/* eslint-disable react/no-unstable-nested-components */
import { View, StyleSheet, Text, TouchableOpacity} from 'react-native';
import TaskCardStatus from './ui/ui-task-status';
import TaskCardInfo from './ui/ui-task-info';
import TaskCardControll from './ui/ui-task-controll';
import { Colors } from '../../shared/styles/colorsPalete';
import { FONT_FAMILY } from '../../shared/config/customFont';
import { TaskButton, TaskPriority, TaskStatus } from '../../@types/task';
import ReanimatedSwipeable from 'react-native-gesture-handler/ReanimatedSwipeable';

import { useRef } from 'react';
import { TaskSwipeButtonProps } from './ui/ui-task-swipe-button';
import RightAction from './components/task-swipe-righ-action';

interface TaskCardProps {
    task?: Object;
    text?: string,
    rightActionBlock: {
        enabled: boolean,
        buttons: TaskSwipeButtonProps[]
    }
}



export const TaskCard:React.FC<TaskCardProps> = (props) => {
    const {
        task = null,
        text = 'A text was supposed to be here',
        rightActionBlock,
    } = props;

    return (
        <>
            <ReanimatedSwipeable
                // enabled={false}
                containerStyle={styles.swipeable}
                friction={2}
                enableTrackpadTwoFingerGesture
                rightThreshold={70}
                renderRightActions={RightAction(rightActionBlock.buttons)}
            >
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
