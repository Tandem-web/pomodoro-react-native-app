import { StyleSheet, ListRenderItem, FlatList } from 'react-native';
import { TaskCard, TaskPlug } from '../task';
import { useCallback, useMemo } from 'react';

interface FlatListItem {
    task: Object | null,
    key: string,
    isPlug: boolean,
    isFirst: boolean,
}
interface TasksListProps {
    prefix: string,
    tasks?: {}[],
    limit?: number,
    paddBottom?: number,
    sectionStyles?: Object,
    plugText?: string,
}

const TasksListSection: React.FC<TasksListProps> = (props) => {
    const {
        prefix,
        tasks = [],
        limit = 1,
        paddBottom = 0,
        plugText = 'A text was supposed to be here',
    } = props;

    // Подготовка данных для Flatlist
      const listData = useMemo<FlatListItem[]>(() => {
        if (tasks.length === 0) {
            // Создаем массив заглушек
            Array.from;
            return limit > 0
                ?   Array.from({ length: limit }, (_, i) => ({
                        task: null,
                        key: `${prefix}__${i}`,
                        isPlug: true,
                        isFirst: i === 0,
                    })
                )
                :   [];
        }

        // Берем нужное количество задач
        const slicedTasks = limit === -1 ? tasks
                                         : tasks.slice(-Math.abs(limit));

        return slicedTasks.map((task, index) => ({
            task: task,
            key: `${prefix}__${index}`,
            isPlug: false,
            isFirst: false,
        }));

    }, [tasks, limit, prefix]);

    // Функция рендера элементов в FlatList
    const renderItem = useCallback<ListRenderItem<FlatListItem>>(({ item }) => {
        if (item.isPlug) {
            return item.isFirst
                ? <TaskCard text={plugText} />
                : <TaskPlug />;
        }
        return <TaskCard task={item} />;
    }, [plugText]);

    return (
        <FlatList
            data={listData}
            renderItem={renderItem}
            keyExtractor={(item:FlatListItem) => item.key}
            contentContainerStyle={[
                {paddingBottom: paddBottom},
                styles.flatListContainerStyle,
            ]}
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
