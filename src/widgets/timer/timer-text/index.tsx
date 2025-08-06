import { View, Text, StyleSheet } from 'react-native';
import { FONT_FAMILY } from '../../../shared/config/customFont';
import { Colors } from '../../../shared/styles/colorsPalete';

type TimerTextProps = {

}

const TimerText: React.FC<TimerTextProps> = (props) =>{

    const {} = props;

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
