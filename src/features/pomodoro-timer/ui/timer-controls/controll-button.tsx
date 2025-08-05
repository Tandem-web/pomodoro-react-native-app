import { Pressable, View, StyleSheet } from "react-native";
import { colorPallete } from "../../../../shared/styles/colorsPalete";

export const ControllButtonType = {
    SideButton: 'side-button',
    MainButton: 'main-button',
} as const;

export type ControllButtonType = (typeof ControllButtonType)[keyof typeof ControllButtonType];

type ControllButtonProps = {
    onPress?: () => void;
    icon: React.JSX.Element;
    type: ControllButtonType
}

const ControllButton: React.FC<ControllButtonProps> = (props) => {
    const {onPress = null, type, icon} = props;

    switch (type) {
        case ControllButtonType.MainButton:
            return(
                <>
                    <Pressable onPress={onPress}>
                        <View style={[styles.mainButton, styles.controlButton]}>
                            {icon}
                        </View>
                    </Pressable>
                </>
            );

        case ControllButtonType.SideButton:
            return(
                <>
                    <Pressable onPress={onPress}>
                        <View style={[styles.sideButton, styles.controlButton]}>
                            {icon}
                        </View>
                    </Pressable>
                </>
            );
    }
};


const styles = StyleSheet.create({
    controlButton: {
        borderRadius: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    mainButton: {
        height: 85,
        width: 85,
        backgroundColor: '#4E4BEC',
    },
    sideButton: {
        height: 65,
        width: 65,
        backgroundColor: 'rgba(78, 75, 236, 0.45)',
    },
});


export default ControllButton;
