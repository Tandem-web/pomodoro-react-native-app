import { View, Text, StyleSheet } from 'react-native';
import { FONT_FAMILY } from '../../../shared/config/customFont';

interface TaskInfoProps {

}

const TaskCardInfo: React.FC<TaskInfoProps> = () => {
    return (
        <>
            <View style={styles.taskInfoContainer}>
                <View style={styles.taskInfoRow}>
                    <Text 
                        style={[styles.textFull, styles.defText]}
                        numberOfLines={1}
                        ellipsizeMode="tail"
                    >Бла-бла-бла</Text>
                    <Text style={[styles.defText]}>1/4</Text>
                </View>
                <View style={styles.taskInfoRow}>
                    <Text 
                        style={[styles.textFull, styles.mutedText]}
                        numberOfLines={1}
                        ellipsizeMode="tail"
                    >0 minutes</Text>
                    <Text style={[styles.mutedText]}>25 min</Text>
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
        color: '#F2F2F2',
    },
    mutedText: {
        fontFamily: FONT_FAMILY.AvenirNext_REGULAR,
        fontSize: 12,
        color: '#B4B4B4',
    }

})

export default TaskCardInfo;
