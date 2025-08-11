import { StyleSheet, ListRenderItem, FlatList } from 'react-native';
import { TaskCard, TaskPlug } from '../task';
import { useCallback, useMemo } from 'react';
import { TaskRightActionBlock } from '@app/shared/types/task';

interface FlatListItem {
    task: Object | null,
    key: string,
    isPlug: boolean,
    isFirst: boolean,
}
interface TasksListProps {
    prefix: string,
    tasks?: {}[],
    limit?: number | null,
    sectionStyles?: Object,
    plugText?: string,
    rightActionBlock?: TaskRightActionBlock,
}

const FlatListKeyExtractor = (item:FlatListItem) => item.key;

const TasksListSection: React.FC<TasksListProps> = (props) => {
    const {
        prefix,
        tasks = [],
        limit = 1,
        plugText = 'A text was supposed to be here',
        rightActionBlock = {
            enabled: false,
            buttons: [],
        },
    } = props;


    const listData = useMemo<FlatListItem[]>(() => {
        if(tasks.length === 0) {
            return Number(limit) > 0
                ?   Array.from({length: Number(limit)}, (_, i) => ({
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
                ? <TaskCard prefix={prefix} text={plugText} />
                : <TaskPlug />;
        }
        return rightActionBlock.enabled ? <TaskCard prefix={prefix} task={item} rightActionBlock={rightActionBlock}/> : <TaskCard prefix={prefix} task={item}/>;
    }, [plugText, prefix, rightActionBlock]);

    return (
        <FlatList
            data={listData}
            renderItem={renderItem}
            keyExtractor={FlatListKeyExtractor}
            contentContainerStyle={styles.flatListContainerStyle}
            decelerationRate={'normal'}
            scrollEventThrottle={32}
            showsVerticalScrollIndicator={false}
        />
    );
};

const styles = StyleSheet.create({
    flatListContainerStyle: {
        gap: 15,
    },
});

export default TasksListSection;
