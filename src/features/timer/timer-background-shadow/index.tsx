import { Colors } from "@app/shared/styles/colorsPalete";
import { useEffect, useMemo } from "react";
import { StyleSheet, ViewStyle } from "react-native";
import Animated, { cancelAnimation, Easing, interpolate, useAnimatedStyle, useSharedValue, withRepeat, withTiming } from "react-native-reanimated";

interface TimerBackgroundShadowProps{
  width: number,
  height: number,
}

const TimerBackgroundShadow: React.FC<TimerBackgroundShadowProps> = (props) => {
  const {
    width,
    height,
  } = props;
  const animation = useSharedValue(0);
  useEffect(() => {
    animation.value = withRepeat(
      withTiming(1, {
        duration: 3000,
        easing: Easing.bezier(0.25, 0.1, 0.25, 1),
      }),
      -1,
      true
    );
    return () => {
      cancelAnimation(animation);
    };
  }, [animation]);


  const animatedStyles = useAnimatedStyle(() => {
    const shadowOpacity = interpolate(
      animation.value,
      [0, 1],
      [1, 1],
    );
    const shadowRadius = interpolate(
      animation.value,
      [0, 1],
      [30, 50],
    );
    const elevation = interpolate(
      animation.value,
      [0, 1],
      [20, 50],
    );
    const marginTop = interpolate(
      animation.value,
      [0, 1],
      [-5, -25],
    );

      return {
        shadowColor: Colors.primary,
        shadowOpacity,
        shadowRadius,
        shadowOffset: { width: 0, height: 50 },
        marginTop: `${marginTop}%`,
        elevation,
      };
  });
  const layoutStyle: Pick<ViewStyle, 'width' | 'height'> = useMemo(() => {
    return {
      width: width,
      height: height,
    };
  }, [width, height]);
  return(
      <Animated.View style={[styles.container, layoutStyle, animatedStyles]}/>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: '100%',
    position: 'absolute',
    zIndex: 5,
  },
});

export default TimerBackgroundShadow;
