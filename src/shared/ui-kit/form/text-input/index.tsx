import { StyleSheet, Text, View, TextInput } from 'react-native';
import { FONT_FAMILY } from '@app/shared/font/avenir';
import { Colors } from '@app/shared/styles/colorsPalete';
import { useCallback } from 'react';
import Animated, { Easing, interpolateColor, useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';
import { noop } from '@app/shared/utilities/noop';

interface FormTextInputProps {
    label?: string,
    inputPlaceholder?: string,
    value?: string,
    onChangeText?: (text: string) => void,
}

const AnimatedTextInput = Animated.createAnimatedComponent(TextInput);

const FormTextInput: React.FC<FormTextInputProps> = (props) => {
    
    const focusAnim = useSharedValue(0);

    const {
        label = null,
        inputPlaceholder = '',
        value = undefined,
        onChangeText = noop,
    } = props;




    const onFocus = useCallback(() => {
        focusAnim.value = withTiming(1, {
            duration: 400,
            easing: Easing.inOut(Easing.quad),
        });
    }, [focusAnim]);

    const onBlur = useCallback(() => {
        focusAnim.value = withTiming(0, {
            duration: 400,
            easing: Easing.inOut(Easing.quad),
        });
    }, [focusAnim]);


    /* -------------------------------------------------------------------------- */
    /*                                  Анимация                                  */
    /* -------------------------------------------------------------------------- */
    const inputAnimatedStyle = useAnimatedStyle(() => {
        return {
            borderColor: interpolateColor(
                focusAnim.value,
                [0, 1],
                [Colors.transparent, Colors.primary]
            ),
            backgroundColor: interpolateColor(
                focusAnim.value,
                [0, 1],
                [Colors.surface, Colors.primary50]
            ),
        };
    });

    return (
        <>
            <View style={styles.inputWrap}>
                {
                    label !== null && (
                        <Text style={styles.inputLabel}>{label}</Text>
                    )
                }
                <AnimatedTextInput
                    style={[styles.textInput, inputAnimatedStyle]}
                    placeholder ={inputPlaceholder}
                    multiline={false}
                    value={value}
                    onChangeText={onChangeText}
                    onFocus={onFocus}
                    onBlur={onBlur}
                    placeholderTextColor={Colors.gray400}
                />
            </View>
        </>
    );
};

const styles = StyleSheet.create({
    inputWrap: {
        gap: 10,
        width: '100%',
    },
    inputLabel: {
        fontFamily: FONT_FAMILY.AvenirNext_BOLD,
        color: Colors.white,
        fontSize: 16,
    },
    textInput: {
        color: Colors.white,
        fontSize: 16,
        height: 60,
        borderRadius: 10,
        paddingHorizontal: 15,
        paddingVertical: 10,
        borderWidth: 2,
        borderColor: Colors.transparent,
    },


});

export default FormTextInput;
