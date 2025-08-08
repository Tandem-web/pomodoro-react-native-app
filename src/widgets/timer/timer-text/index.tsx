import { View, Text, StyleSheet } from 'react-native';
import { FONT_FAMILY } from '../../../shared/config/customFont';
import { Colors } from '../../../shared/styles/colorsPalete';

// TODO TimerTextProps interface

const TimerText: React.FC = () =>{
    return (
        <View style={styles.timerTextWrapper}>
            <Text style={styles.timerText}>25:00</Text>
        </View>
    );
};
const styles = StyleSheet.create({
    timerTextWrapper: {
        position: 'absolute',
    },

    timerText: {
        fontFamily: FONT_FAMILY.AvenirNext_REGULAR,
        fontSize: 37,
        color: Colors.white,
    },
});
export default TimerText;
