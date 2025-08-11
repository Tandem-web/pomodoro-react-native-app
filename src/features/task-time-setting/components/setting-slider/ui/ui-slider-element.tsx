import { StyleSheet } from 'react-native';
import { FONT_FAMILY } from '../../../../../shared/config/customFont';
import { Colors } from '../../../../../shared/styles/colorsPalete';
import Animated, {interpolate, SharedValue, useAnimatedStyle, useDerivedValue, withSpring} from 'react-native-reanimated';

interface SettingSliderElementProps {
    text: string;
    width: number,
    index: number,
    centerIndex: SharedValue<number>,
}

const SettingSliderElement: React.FC<SettingSliderElementProps> = (props) => {
    const {
        text,
        width,
        index,
        centerIndex,
    } = props;

    const position = useDerivedValue(() => Math.abs(centerIndex.value - index));

    const SliderViewStyle = useAnimatedStyle(() => {
        const pos = position.value;

        if (pos > 4 ) {return {};}

        const scale = interpolate(pos, [0, 1, 2, 3], [1, 0.9, 0.8, 0.7]);
        const opacity = interpolate(pos, [0, 1, 2, 3], [1, 0.8, 0.7, 0.6]);

        return {
            opacity: withSpring(opacity, {
                stiffness: 300,
                damping: 50,
            }),
            transform: [
                {
                    scale: withSpring(scale, {
                        stiffness: 300,
                        damping: 50,
                    }),
                },
            ],

        };
    });
    return (
         <Animated.View style={[styles.itemContainer, {width: width}, SliderViewStyle]}>
            <Animated.Text style={styles.itemText}>{text}</Animated.Text>
         </Animated.View>
    );
};

const styles = StyleSheet.create({
    itemContainer: {
        height: 30,
        justifyContent: 'center',
        alignItems: 'center',
    },
    itemText: {
        fontFamily: FONT_FAMILY.AvenirNext_MEDIUM,
        color: Colors.white,
        fontSize: 18,
        textAlign: 'center',
    },
});

export default SettingSliderElement;
