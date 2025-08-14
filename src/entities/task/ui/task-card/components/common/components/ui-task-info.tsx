import { View, Text, StyleSheet } from 'react-native';
import { FONT_FAMILY } from '@app/shared/font/avenir';
import { Colors } from '@app/shared/styles/colorsPalete';
import { Task } from '@app/entities/task/model/types';
import { useMemo } from 'react';
import { formatTime } from '@app/shared/utilities/format-time';


interface TaskCardInfoProps {
    title: Task['title'],
    workDuration: Task['settings']['timeSettings']['workDuration'],
    totalWorkIntervals: Task['settings']['workIntervals'],
    currentWorkInterval: Task['task_state']['currentWorkInterval'],
    totalTime: Task['task_state']['totalTime'],
}

const TaskCardInfo: React.FC<TaskCardInfoProps> = (props) => {
    const {
        title = null,
        workDuration = 0,
        totalWorkIntervals = 0,
        currentWorkInterval = 0,
        totalTime = 0,
    } = props;

    const taskText = title;
    const intervalText = `${currentWorkInterval}/${totalWorkIntervals}`;

    const workTimeText  =   useMemo(() => (
                                formatTime(totalTime)
                            ), [totalTime]);

    const intervalTimeText  =   useMemo(() => (
                                    formatTime(workDuration)
                                ), [workDuration]);

    return (
        <>
            <View style={styles.taskInfoContainer}>
                <View style={styles.taskInfoRow}>
                    <Text
                        style={[styles.textFull, styles.defText]}
                        numberOfLines={1}
                        ellipsizeMode="tail"
                    >{taskText}</Text>
                    <Text style={styles.defText}>{intervalText}</Text>
                </View>
                <View style={styles.taskInfoRow}>
                    <Text
                        style={[styles.textFull, styles.mutedText]}
                        numberOfLines={1}
                        ellipsizeMode="tail"
                    >{workTimeText}</Text>
                    <Text style={styles.mutedText}>{intervalTimeText}</Text>
                </View>
            </View>
        </>
    );
};

const styles = StyleSheet.create({
    taskInfoContainer: {
        gap: 5,
        flex: 1,
    },

    taskInfoRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        gap: 10,
    },

    textFull: {
        flex: 1,
    },
    defText: {
        fontFamily: FONT_FAMILY.AvenirNext_REGULAR,
        fontSize: 14,
        color: Colors.white,
    },
    mutedText: {
        fontFamily: FONT_FAMILY.AvenirNext_REGULAR,
        fontSize: 12,
        color: Colors.mutedWhite,
    },

});

export default TaskCardInfo;
