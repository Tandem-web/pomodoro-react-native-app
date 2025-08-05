import React from "react";
import {StyleSheet, View } from "react-native";
import Svg, { Circle,  } from "react-native-svg";
import { colorPallete } from "../../../shared/styles/colorsPalete";
import { Rect } from "react-native-safe-area-context";

type ProgressRingProps = {
    dimension: Rect,
    strokeColors: [string, string],
    strokeWidth?: [number, number],
}



const ProgressRing: React.FC<ProgressRingProps> = (props) =>{

    const {
        dimension: {width},
        strokeColors,
        strokeWidth = [30, 30]
    } = props;


    const R = ((width-strokeWidth[0]) / 2)*0.78;
    const CIRCLE_LENGTH = 2*Math.PI * R;
    return (
        <View style={styles.svgWrapper}>
            <Svg
                width={Number(width)}
                height={Number(width)}
            >
                <Circle 
                    cx={width/2}
                    cy={width/2}
                    r={R}
                    stroke={strokeColors[0]}
                    strokeWidth={strokeWidth[0]}
                />
                <Circle
                    cx={width/2}
                    cy={width/2}
                    r={R}
                    stroke={strokeColors[1]}
                    strokeWidth={strokeWidth[1]}
                    fill={colorPallete.AppBGColor}
                    strokeDasharray={CIRCLE_LENGTH}
                    strokeDashoffset={CIRCLE_LENGTH*0.5}
                />
            </Svg>
        </View>
    );
};

const styles = StyleSheet.create({
    svgWrapper: {
        width: '100%',
        // position: 'absolute',
        // top: "50%",
        // left: 0,
    }
});
export default ProgressRing;
