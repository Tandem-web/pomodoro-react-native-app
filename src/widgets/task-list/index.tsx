import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { TouchableOpacity, View, Text, StyleSheet } from "react-native";
import { StackParamList } from "../../@types/navigators";
import { FONT_FAMILY } from "../../shared/config/customFont";
import { Colors } from "../../shared/styles/colorsPalete";
import { TaskCard, TaskPlug } from "../task";

interface TasksListProps {
    title: string,
    prefix: string,
    tasks?: number[],
    limit?: number,
    linkOption?: {
        isShow: boolean,
        text: string,
        onPress?: () => void;
    },
    sectionStyles?: Object,
};

type SessionScreenNavigationProp = NativeStackNavigationProp<StackParamList, 'Tabs'>;

const TasksListSection: React.FC<TasksListProps> = (props) => {
    const {
        title,
        prefix,
        tasks = [],
        limit = 1,
        linkOption = {
            isShow: false,
            text: '',
            onPress: undefined,
        },
    } = props;


    return (
        <View style={styles.section}>
            <View style={styles.sectionHeader}>
                <Text style={styles.sectionName}>
                    {title}
                </Text>
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
            <View style={styles.sectionBody}>
                {
                    tasks.length === 0 ? (
                        new Array(limit).fill(null).map((_, index) => (
                            index === 0 ? (
                                <TaskCard key={`${prefix}__${index}`} text="Your tasks will be displayed here"/>
                            ) : (
                                <TaskPlug key={`${prefix}__plug__${index}`}/>
                            )
                        ))
                    ) : (
                        tasks.slice(-Math.abs(limit)).map((_, index) => (
                            <TaskCard key={`${prefix}__${index}`} task={{}}/>
                        ))
                    )
                }
            </View>
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
        gap: 15,
    },
    urlToNested: {
        fontFamily: FONT_FAMILY.AvenirNext_MEDIUM,
        fontSize: 14,
        color: Colors.primary,
    }

})

export default TasksListSection;
