import { Colors } from '@app/shared/styles/colorsPalete';
import React, { useState } from 'react';
import {StyleSheet, View } from 'react-native';
import Svg, { Circle } from 'react-native-svg';

type ProgressRingProps = {
    strokeColors: [string, string],
    strokeWidth?: [number, number],
}

const ProgressRing: React.FC<ProgressRingProps> = (props) =>{
    const {
        strokeColors,
        strokeWidth = [30, 30],
    } = props;

    const [parentSize, setParentSize] = useState({ width: 0, height: 0 });
    const parentWidth = parentSize.width;

    const R = ((parentWidth - strokeWidth[0]) / 2) * 0.8;
    const CIRCLE_LENGTH = 2 * Math.PI * R;
    return (
        <View
            style={styles.svgWrapper}
            onLayout={(event) => {
                const {width, height } = event.nativeEvent.layout;
                setParentSize({ width, height });
            }}>
            <Svg
                width={Number(parentWidth)}
                height={Number(parentWidth)}
            >
                <Circle
                    cx={parentWidth / 2}
                    cy={parentWidth / 2}
                    r={R}
                    stroke={strokeColors[0]}
                    strokeWidth={strokeWidth[0]}
                />

                <Circle
                    transform={`rotate(-90, ${parentWidth / 2}, ${parentWidth / 2})`}
                    cx={parentWidth / 2}
                    cy={parentWidth / 2}
                    r={R}
                    stroke={strokeColors[1]}
                    strokeWidth={strokeWidth[1]}
                    fill={Colors.background}
                    strokeDasharray={CIRCLE_LENGTH}
                    strokeDashoffset={CIRCLE_LENGTH * 0.5}
                />
            </Svg>
        </View>
    );
};

const styles = StyleSheet.create({
    svgWrapper: {
        width: '100%',
    },
});

export default ProgressRing;
