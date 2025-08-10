import { TouchableOpacity, View, Text, StyleSheet, ListRenderItem, FlatList } from 'react-native';
import { FONT_FAMILY } from '../../shared/config/customFont';
import { Colors } from '../../shared/styles/colorsPalete';
import { TaskCard, TaskPlug } from '../task';
import { useCallback, useMemo } from 'react';
import { noop } from '../../shared/utilities/noop';

interface FlatListItem {
    task: Object | null,
    key: string,
    isPlug: boolean,
    isFirst: boolean,
}
interface TasksListProps {
    title?: string,
    prefix: string,
    tasks?: {}[],
    limit?: number | null,
    linkOption?: {
        isShow: boolean,
        text: string,
        onPress?: () => void;
    },
    paddBottom?: number,
    sectionStyles?: Object,
    plugText?: string,
}

const FlatListKeyExtractor = (item:FlatListItem) => item.key;

const TasksListSection: React.FC<TasksListProps> = (props) => {
    const {
        title = null,
        prefix,
        tasks = [],
        limit = 1,
        linkOption = {
            isShow: false,
            text: '',
            onPress: noop,
        },
        paddBottom = 0,
        plugText = 'A text was supposed to be here',
    } = props;


    const listData = useMemo<FlatListItem[]>(() => {
        if(tasks.length === 0) {
            return Number(limit) > 0
                ?   Array.from(new Array(limit).fill(null), (_, i) => ({
                        task: null,
                        key: `${prefix}__${i}`,
                        isPlug: true,
                        isFirst: i === 0,
                    })
                )
                :   [];
        }

        const slicedTasks = limit === null ? tasks
                                            : tasks.slice(-Math.abs(limit));

        return slicedTasks.map((task, index) => ({
            task: task,
            key: `${prefix}__${index}`,
            isPlug: false,
            isFirst: false,
        }));

    }, [tasks, limit, prefix]);


    const renderItem = useCallback<ListRenderItem<FlatListItem>>(({ item }) => {
        if (item.isPlug) {
            return item.isFirst
                ? <TaskCard prefix={item.key} text={plugText} />
                : <TaskPlug />;
        }
        return <TaskCard prefix={item.key} task={item} />;
    }, [plugText]);

    return (
        <View style={styles.section}>
            <View style={styles.sectionHeader}>
                {
                    Boolean(title) && (
                        <Text style={styles.sectionName}>
                            {title}
                        </Text>
                    )
                }

                {
                    linkOption.isShow && tasks.length !== 0 && (
                        <TouchableOpacity onPress={linkOption.onPress}>
                            <Text style={styles.urlToNested}>
                                {linkOption.text}
                            </Text>
                        </TouchableOpacity>
                    )
                }
            </View>
            <FlatList
                data={listData}
                renderItem={renderItem}
                keyExtractor={FlatListKeyExtractor}
                contentContainerStyle={[
                    {paddingBottom: paddBottom},
                    styles.flatListContainerStyle,
                ]}
                showsVerticalScrollIndicator={false}
            />
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
        fontSize: 16,
        color: Colors.white,
    },
    sectionBody: {
        flexGrow: 1,
    },
    urlToNested: {
        fontFamily: FONT_FAMILY.AvenirNext_MEDIUM,
        fontSize: 14,
        color: Colors.primary,
    },

    flatListContainerStyle: {
        gap: 15,
    },

});

export default TasksListSection;
