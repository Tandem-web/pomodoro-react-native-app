import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { DefaultStyle } from "../../../../shared/styles/defaultStyles";

type colorsPalleteType = {
    idle: {
        bgColor: string,
        textColor: string,
        borderColor: string,
    },
    selected: {
        bgColor: string,
        textColor: string,
        borderColor: string,
    }
};

interface RadioInputProps {
    text: string,
    value: string,
    colorsPallete: colorsPalleteType,
    onPress?: () => void,
};
 
const MyRadioInput: React.FC<RadioInputProps> = (props) => {
    const {
        text,
        value,
        colorsPallete,
        onPress = () => {},
    } = props;

    return (
        <TouchableOpacity onPress={onPress} style={DefaultStyle.fullSpace}>
            <View style={styles.radioButton}>
                <Text>{text}</Text>
            </View>
        </TouchableOpacity>
        
    );
};

const styles = StyleSheet.create({
    radioButton: {
        justifyContent: 'center',
        alignItems: 'center',
        padding: 5,
        borderRadius: 5,
        flex: 1,
        width: '100%',
        height: 40,
    },
});

export default MyRadioInput;
