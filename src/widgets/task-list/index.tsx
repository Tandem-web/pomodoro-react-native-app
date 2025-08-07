import { TouchableOpacity, View, Text, StyleSheet, ScrollView } from 'react-native';
import { FONT_FAMILY } from '../../shared/config/customFont';
import { Colors } from '../../shared/styles/colorsPalete';
import { TaskCard, TaskPlug } from '../task';

interface TasksListProps {
    title?: string,
    prefix: string,
    tasks?: number[],
    limit?: number,
    linkOption?: {
        isShow: boolean,
        text: string,
        onPress?: () => void;
    },
    paddBottom?: number,
    sectionStyles?: Object,
    plugText?: string,
};

const TasksListSection: React.FC<TasksListProps> = (props) => {
    const {
        title = null,
        prefix,
        tasks = [],
        limit = 1,
        linkOption = {
            isShow: false,
            text: '',
            onPress: undefined,
        },
        paddBottom = 0,
        plugText = 'A text was supposed to be here',
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
                    linkOption.isShow === true && tasks.length !== 0 ? (
                    <TouchableOpacity onPress={linkOption.onPress}>
                        <Text style={styles.urlToNested}>
                            {linkOption.text}
                        </Text>
                    </TouchableOpacity>
                    ) : (
                        <></>
                    )
                }
            </View>
            <ScrollView contentContainerStyle={{paddingBottom: paddBottom, gap: 15}} showsVerticalScrollIndicator={false} style={styles.sectionBody}>
                {
                    tasks.length === 0 ? (
                        new Array(limit).fill(null).map((_, index) => (
                            index === 0 ? (
                                <TaskCard key={`${prefix}__${index}`} text={plugText}/>
                            ) : (
                                <TaskPlug key={`${prefix}__plug__${index}`}/>
                            )
                        ))
                    ) : (
                        limit === -1 ? (
                            tasks.map((_, index) => (
                                <TaskCard key={`${prefix}__${index}`} task={{}}/>
                            ))
                        ) : (
                            tasks.slice(-Math.abs(limit)).map((_, index) => (
                                <TaskCard key={`${prefix}__${index}`} task={{}}/>
                            ))
                        )
                    )
                }
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    section: {
        height: 'auto',
        // flex: 1,
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
        fontSize: 16,
        color: Colors.white,
    },
    sectionBody: {
        flexGrow: 1,
        // gap: 15,
    },
    urlToNested: {
        fontFamily: FONT_FAMILY.AvenirNext_MEDIUM,
        fontSize: 14,
        color: Colors.primary,
    },

})

export default TasksListSection;
