import { FONT_FAMILY } from '@app/shared/font/avenir';
import { Colors } from '@app/shared/styles/colorsPalete';
import { View, Text, StyleSheet } from 'react-native';


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
