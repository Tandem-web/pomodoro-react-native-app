import { FONT_FAMILY } from '@app/shared/font/avenir';
import { useGetRemaingTime } from '@app/shared/store/timer/model/selectors';
import { Colors } from '@app/shared/styles/colorsPalete';
import { View, Text, StyleSheet } from 'react-native';


// TODO TimerTextProps interface

const TimerText: React.FC = () =>{
    const remainingTime = useGetRemaingTime(true);

    return (
        <View style={styles.timerTextWrapper}>
            {
                remainingTime && <Text style={styles.timerText}>{remainingTime}</Text>
            }
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
