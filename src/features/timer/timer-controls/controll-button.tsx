import { View, StyleSheet, TouchableOpacity } from 'react-native';
import Ionicons from '@react-native-vector-icons/ionicons';
import { TimerControllButtonType, TimerControllIconType } from '@app/shared/types/timer-controlls';
import { Colors } from '@app/shared/styles/colorsPalete';
import { noop } from '@app/shared/utilities/noop';

const TimerControllsIcons = {
    'start': (<Ionicons size={40}color={Colors.white} name="play"/>),
    'pause': (<Ionicons size={40}color={Colors.white} name="pause"/>),
    'stop': (<Ionicons size={30} color={Colors.gray400} name="stop"/>),
    'reload': (<Ionicons size={30} color={Colors.gray400} name="reload"/>),
} as const;

interface ControllButtonProps{
    onPress?: () => void;
    type: TimerControllButtonType;
    icon: TimerControllIconType;
}

const ControllButton: React.FC<ControllButtonProps> = (props) => {
    const {
        onPress = noop,
        type,
        icon,
    } = props;

    switch (type) {
        case TimerControllButtonType.MainButton:
            return(
                <>
                    <TouchableOpacity onPress={onPress}>
                        <View style={[styles.mainButton, styles.controlButton]}>
                            {TimerControllsIcons[icon]}
                        </View>
                    </TouchableOpacity>
                </>
            );

        case TimerControllButtonType.SideButton:
            return(
                <>
                    <TouchableOpacity onPress={onPress}>
                        <View style={[styles.sideButton, styles.controlButton]}>
                            {TimerControllsIcons[icon]}
                        </View>
                    </TouchableOpacity>
                </>
            );
    }
};


const styles = StyleSheet.create({
    controlButton: {
        borderRadius: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    mainButton: {
        height: 85,
        width: 85,
        backgroundColor: Colors.primary,
    },
    sideButton: {
        height: 65,
        width: 65,
        borderRadius: '100%',
        backgroundColor: Colors.primary50,
    },
});


export default ControllButton;
