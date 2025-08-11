import { View, Text, StyleSheet } from 'react-native';
import { FONT_FAMILY } from '@app/shared/config/customFont';
import { Colors } from '@app/shared/styles/colorsPalete';

// TODO TaskInfoProps interface

const TaskCardInfo: React.FC = () => {

    const taskText = 'Бла-бла-бла',
          intervalText = '1/4',
          workTimeText = '0 minutes',
          intervalTimeText = '25 min';

    return (
        <>
            <View style={styles.taskInfoContainer}>
                <View style={styles.taskInfoRow}>
                    <Text
                        style={[styles.textFull, styles.defText]}
                        numberOfLines={1}
                        ellipsizeMode="tail"
                    >{taskText}</Text>
                    <Text style={[styles.defText]}>{intervalText}</Text>
                </View>
                <View style={styles.taskInfoRow}>
                    <Text
                        style={[styles.textFull, styles.mutedText]}
                        numberOfLines={1}
                        ellipsizeMode="tail"
                    >{workTimeText}</Text>
                    <Text style={[styles.mutedText]}>{intervalTimeText}</Text>
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
