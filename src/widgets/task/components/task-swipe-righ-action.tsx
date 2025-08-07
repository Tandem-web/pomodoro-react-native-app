import { SharedValue, useAnimatedStyle } from "react-native-reanimated";

const RightAction = (prog: SharedValue<number>, drag: SharedValue<number>) => {
    const styleAnimation = useAnimatedStyle(() => {
        console.log('showRightProgress:', prog.value);
        console.log('appliedTranslation:', drag.value);
        return {
            transform: [{ translateX: drag.value + 110 }],
        };
    });

    return (
        <>
            <Reanimated.View style={[styleAnimation, {flexDirection: 'row', width: 100, gap: 10}]}>
                <TouchableOpacity>
                    <View style={styles.rightAction}>
                        <Ionicons size={22} color={Colors.white} name='trash'/>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity>
                    <View style={styles.rightAction}>
                        <Ionicons size={22} color={Colors.white} name='checkmark'/>
                    </View>
                </TouchableOpacity>
            </Reanimated.View>
        </>

    );
};

export default RightAction;
