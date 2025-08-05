import { View, StyleSheet } from "react-native"
import ControllButton, { ControllButtonType } from "./controll-button";
import Ionicons from "@react-native-vector-icons/ionicons";

const TimerControls = () => {
    const isPlay = true;
    const stopPlayIcon = (isPlay ? <Ionicons size={40}color="#fff" name="pause"/> : <Ionicons size={40}color="#fff" name="play"/>);

    return (
        <View style={styles.controllContainer}>
            <ControllButton type={ControllButtonType.SideButton} key="pomodoro-controll-1" icon={(<Ionicons size={30} color='#5e5bfcff' name="reload"/>)}/>
            <ControllButton type={ControllButtonType.MainButton} key="pomodoro-controll-2" icon={stopPlayIcon}/>
            <ControllButton type={ControllButtonType.SideButton} key="pomodoro-controll-3" icon={<Ionicons size={30} color='#5e5bfcff' name="stop"/>}/>
        </View>
    );
};

const styles = StyleSheet.create({
    controllContainer: {
        justifyContent: 'center',
        flexDirection: 'row',
        alignItems: 'center',
        gap: 20,
        marginTop: 10,
    },
});

export default TimerControls;
