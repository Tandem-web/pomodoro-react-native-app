import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Colors } from "../../shared/styles/colorsPalete";
import { FONT_FAMILY } from "../../shared/config/customFont";

interface SectionProps {
    title?: string;
    children: React.ReactNode;
    linkOption?: {
        isShow: boolean,
        text: string,
        onPress?: () => void;
    },
}

const Section: React.FC<SectionProps> = (props) => {
    const {
        title = null,
        children,
        linkOption = {
            isShow: false,
            text: '',
            onPress: () => {},
        },
    } = props;

    return (
        <View style={styles.section}>
            <View style={styles.sectionHeader}>
                {
                    title !== null && (
                        <Text style={styles.sectionName}>
                            {title}
                        </Text>
                    )
                }
                {
                    linkOption.isShow === true && (
                    <TouchableOpacity onPress={linkOption.onPress}>
                        <Text style={styles.urlToNested}>
                            {linkOption.text}
                        </Text>
                    </TouchableOpacity>
                    )
                }
            </View>
            {children}
        </View>
    );
};

const styles = StyleSheet.create({
    section: {
        height: 'auto',
        gap: 15,
    },
    sectionHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        gap: 10,
    },
    sectionName: {
        fontFamily: FONT_FAMILY.AvenirNext_BOLD,
        fontSize: 18,
        color: Colors.white,
    },
    urlToNested: {
        fontFamily: FONT_FAMILY.AvenirNext_MEDIUM,
        fontSize: 14,
        color: Colors.primary,
    },

});

export default Section;
