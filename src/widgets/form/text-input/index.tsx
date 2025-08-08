import { StyleSheet, Text, View } from "react-native";
import { FONT_FAMILY } from "../../../shared/config/customFont";
import { Colors } from "../../../shared/styles/colorsPalete";

interface TextInputProps {
    label?: string,
    inputPlaceholder?: string,
}

const TextInput: React.FC<TextInputProps> = (props) => {
    const {
        label = null,
        inputPlaceholder = null,
    } = props;

    return (
        <>
            <View style={styles.inputWrap}>
                {
                    label === null && (
                        <Text style={styles.inputLabel}>{label}</Text>
                    )
                }
            </View>
        </>
    );
};

const styles = StyleSheet.create({
    inputWrap: {
        gap: 10,
    },
    inputLabel: {
        fontFamily: FONT_FAMILY.AvenirNext_REGULAR,
        color: Colors.white,
        fontSize: 14,
    }
})

export default TextInput;