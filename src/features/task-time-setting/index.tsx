import { StyleSheet, View, Text} from 'react-native';
import { FONT_FAMILY } from '@app/shared/config/customFont';
import { Colors } from '@app/shared/styles/colorsPalete';
import SettingSlider from './components/setting-slider';

interface TaskTimeSettingProps {
    title: string,
    unit: string
}

const TaskTimeSetting: React.FC<TaskTimeSettingProps> = (props) => {
    const {
        title,
        unit,
    } = props;

    return (
        <>
            <View style={styles.timeSettingWrap}>
                <View style={styles.timeSettingHeader}>
                    <Text style={styles.timeSettingTitle}>{title}</Text>
                    <Text style={styles.timeSettingsUnit}>{unit}</Text>
                </View>
                <View>
                    <SettingSlider min={1} max={20}/>
                </View>
            </View>
        </>
    );
};

const styles = StyleSheet.create({
    timeSettingWrap: {
        minHeight: 60,
        backgroundColor: Colors.surface,
        borderRadius: 10,
        paddingHorizontal: 15,
        paddingVertical: 15,
        gap: 10,
    },

    timeSettingHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-end',
    },

    timeSettingTitle: {
        fontFamily: FONT_FAMILY.AvenirNext_MEDIUM,
        fontSize: 14,
        color: Colors.white,
    },
    timeSettingsUnit: {
        fontFamily: FONT_FAMILY.AvenirNext_MEDIUM,
        fontSize: 13,
        color: Colors.mutedWhite,
    },
});

export default TaskTimeSetting;
