import { TouchableOpacity, View, Text, StyleSheet } from 'react-native';
import FontAwesome, { FontAwesomeIconName } from '@react-native-vector-icons/fontawesome';
import { noop } from '@app/shared/utilities/noop';
import { Colors } from '@app/shared/styles/colorsPalete';
import { FONT_FAMILY } from '@app/shared/config/customFont';

interface ButtonWithIconProps {
    onPress?: () => void
    text: string,
    icon?: {
        name: FontAwesomeIconName,
        size: number,
    }
}

const DefaultButton: React.FC<ButtonWithIconProps> = (props) => {
    const {
        onPress = noop,
        text,
        icon = null,
    } = props;
    return (
        <>
            <TouchableOpacity onPress={onPress}>
                <View style={styles.DefaultButton}>
                    {
                        icon != null && (
                            <FontAwesome size={icon.size} name={icon.name} color={Colors.white}/>
                        )
                    }
                    <Text ellipsizeMode={'tail'} numberOfLines={1} style={styles.DefaultButtonText}>{text}</Text>
                </View>
            </TouchableOpacity>
        </>
    );
};

const styles = StyleSheet.create({
    DefaultButton: {
        height: 60,
        borderRadius: 10,
        paddingHorizontal: 15,
        paddingVertical: 10,
        width: '100%',
        backgroundColor: Colors.primary,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        gap: 10,
    },
    DefaultButtonText: {
        fontFamily: FONT_FAMILY.AvenirNext_BOLD,
        fontSize: 15,
        textAlign: 'center',
        color: Colors.white,
    },
});

export default DefaultButton;
