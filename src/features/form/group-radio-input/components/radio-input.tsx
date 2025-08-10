import { StyleSheet, TouchableOpacity } from 'react-native';
import { DefaultStyle } from '../../../../shared/styles/defaultStyles';
import { noop } from '../../../../shared/utilities/noop';
import Animated, { Easing, interpolateColor, useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';
import { FONT_FAMILY } from '../../../../shared/config/customFont';
import { useEffect } from 'react';

type colorsPalleteType = {
    idle: {
        bgColor: string,
        textColor: string,
        borderColor: string,
    },
    selected: {
        bgColor: string,
        textColor: string,
        borderColor: string,
    }
};

interface RadioInputProps {
    text: string,
    value: string,
    colorsPallete: colorsPalleteType,
    onPress?: () => void,
    isSelected: boolean,
}

const RadioInput: React.FC<RadioInputProps> = (props) => {
    const {
        text,
        colorsPallete,
        onPress = noop,
        isSelected,
    } = props;

    const valueAnim = useSharedValue(isSelected ? 1 : 0);

    useEffect(() => {
        valueAnim.value = withTiming(isSelected ? 1 : 0, {
            duration: 250,
            easing: Easing.inOut(Easing.linear),
        });
    }, [isSelected, valueAnim]);

    const ButtonAnimatedStyle = useAnimatedStyle(() => {
        return {
            borderColor: interpolateColor(
                valueAnim.value,
                [0, 1],
                [colorsPallete.idle.borderColor, colorsPallete.selected.borderColor]
            ),
            backgroundColor: interpolateColor(
                valueAnim.value,
                [0, 1],
                [colorsPallete.idle.bgColor, colorsPallete.selected.bgColor]
            ),
        };
    });

    const TextAnimatedStyle = useAnimatedStyle(() => {
        return {
            color: interpolateColor(
                valueAnim.value,
                [0, 1],
                [colorsPallete.idle.textColor, colorsPallete.selected.textColor]
            ),
        };
    });

    return (
        <TouchableOpacity onPress={onPress} style={DefaultStyle.fullSpace}>
            <Animated.View style={[styles.radioButton, ButtonAnimatedStyle]}>
                <Animated.Text style={[styles.radioButtonText, TextAnimatedStyle]}>
                    {text}
                </Animated.Text>
            </Animated.View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    radioButton: {
        justifyContent: 'center',
        alignItems: 'center',
        padding: 5,
        borderRadius: 10,
        borderWidth: 1.5,
        flex: 1,
        width: '100%',
        height: 40,
    },
    radioButtonText: {
        fontFamily: FONT_FAMILY.AvenirNext_MEDIUM,
        fontSize: 14,
    },
});

export default RadioInput;
