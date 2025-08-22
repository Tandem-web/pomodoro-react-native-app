import { Colors } from '@app/shared/styles/colorsPalete';
import React, { useCallback, useMemo, useState } from 'react';
import {LayoutChangeEvent, StyleSheet, View } from 'react-native';
import Animated, { useAnimatedProps, useSharedValue, withTiming } from 'react-native-reanimated';
import Svg, { Circle } from 'react-native-svg';
import TimerBackgroundShadow from '../timer-background-shadow';

type ProgressRingProps = {
    strokeColors: [string, string],
    strokeWidth?: [number, number],
}

const AnimatedCircle = Animated.createAnimatedComponent(Circle);

const ProgressRing: React.FC<ProgressRingProps> = (props) =>{
    const {
        strokeColors,
        strokeWidth = [30, 30],
    } = props;
    const progress = useSharedValue(0);

    const [parentWidth, setParentWidth] = useState(0);

    const R = useMemo(() => {
        return ((parentWidth - strokeWidth[0]) / 2) * 0.8;
    }, [parentWidth, strokeWidth]);

    const CIRCLE_LENGTH = useMemo(() => {
        return 2 * Math.PI * R;
    }, [R]);

    const cXcY = useMemo(() => {
        return parentWidth / 2;
    }, [parentWidth]);

    const onLayoutHandler = useCallback((event: LayoutChangeEvent) => {
        const { width } = event.nativeEvent.layout;
        setParentWidth(width);
    }, []);


    const onPressHandler = useCallback(() => {
        progress.value = withTiming(progress.value > 0 ? 0 : 1, { duration: 10000 });
    }, [progress]);

    const animatedProps = useAnimatedProps(() => ({
        strokeDashoffset: CIRCLE_LENGTH * (1 - progress.value),
    }));
    return (
        <View
            style={styles.svgWrapper}
            onLayout={onLayoutHandler}
            onTouchStart={onPressHandler}
        >
            <Svg
                width={Number(parentWidth)}
                height={Number(parentWidth)}
                style={{zIndex: 10}}
            >
                <Circle
                    cx={cXcY}
                    cy={cXcY}
                    r={R}
                    stroke={strokeColors[0]}
                    strokeWidth={strokeWidth[0]}
                />

                <AnimatedCircle
                    transform={`rotate(-90, ${cXcY}, ${cXcY})`}
                    cx={cXcY}
                    cy={cXcY}
                    r={R}
                    stroke={strokeColors[1]}
                    strokeWidth={strokeWidth[1]}
                    fill={Colors.background}
                    strokeDasharray={CIRCLE_LENGTH}
                    animatedProps={animatedProps}
                    strokeLinecap={'round'}
                />
            </Svg>
             <TimerBackgroundShadow
                width={Number(parentWidth) * 0.8}
                height={Number(parentWidth) * 0.8}
             />
        </View>
    );
};

const styles = StyleSheet.create({
    svgWrapper: {
        width: '100%',
        zIndex: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default ProgressRing;
