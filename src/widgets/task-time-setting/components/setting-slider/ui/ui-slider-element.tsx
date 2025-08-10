import { StyleSheet } from "react-native";
import { FONT_FAMILY } from "../../../../../shared/config/customFont";
import { Colors } from "../../../../../shared/styles/colorsPalete";
import Animated, {interpolate, SharedValue, useAnimatedStyle, useDerivedValue, withSpring, withTiming} from "react-native-reanimated";

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

    const position = useDerivedValue(() => {
        return Math.abs(centerIndex.value - index);
    });

    const SliderViewStyle = useAnimatedStyle(() => {
        const scale = interpolate(
            Math.abs(position.value),
            [0, 1, 2, 3],
            [1, 0.9, 0.8, 0.7],
        );

        const opacity = interpolate(
            Math.abs(position.value),
            [0, 1, 2, 3],
            [1, 0.8, 0.7, 0.6],
        );


        return {
            opacity: withSpring(opacity, {
                stiffness: 430,
                damping: 80,
            }),
            transform: [
                {
                    scale: withSpring(scale, {
                        stiffness: 430,
                        damping: 80,
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
