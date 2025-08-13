import { LayoutChangeEvent, View, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useCallback, useMemo, useState } from 'react';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { StackParamList } from '@app/shared/types/navigation';
import { DefaultStyle } from '@app/shared/styles/defaultStyles';
import Section from '@app/shared/ui-kit/section';
import DefaultButton from '@app/shared/ui-kit/button/DeafultButton';
import TasksListSection from '@app/features/task/task-list';
import { useTaskList } from '@app/entities/task/model/selectors';
import { TaskButton, TaskStatus } from '@app/shared/types/task';

type TaskManagerScreenNavigationProp = NativeStackNavigationProp<StackParamList, 'Tabs'>;

const TaskManager: React.FC = () => {
    const uncompleteTask = useTaskList({status: TaskStatus.UNCOMPLETE}, {sortBy: 'createAt', orderBy: 'asc'});
    const completeTask = useTaskList({status: TaskStatus.COMPLETE}, {sortBy: 'completeAt', orderBy: 'asc'});

    const navigation = useNavigation<TaskManagerScreenNavigationProp>();
    const [sectionSize, setSectionSize] = useState({ width: 0, height: 0 });

    const handleLayout = useCallback((event: LayoutChangeEvent) => {
        const { width, height } = event.nativeEvent.layout;
        setSectionSize({ width, height });
    }, []);

    const limitCalc = useMemo(() => {
      return Math.floor(sectionSize.height / 75);
    }, [sectionSize.height]);

    return (
        <View style={styles.innerContainer}>
            <View
              style={DefaultStyle.fullSpace}
              onLayout={handleLayout}
            >
              <Section
                key={'section-1'}
                title="All Task"
                linkOption={{
                  isShow: limitCalc < uncompleteTask.length,
                  text: 'See All',
                  onPress: () => navigation.navigate('AllTasks'),
                }}
              >
                <TasksListSection
                  prefix="sub-all-task"
                  limit={limitCalc}
                  plugText="All tasks are completed"
                  tasks={uncompleteTask}
                  controllButton={TaskButton.PLAY}
                  rightActionBlock={{
                    enabled: true,
                    buttons: [
                      {
                        type:  'complete',
                      },
                      {
                        type: 'delete',
                      },
                    ],
                  }}
                />
              </Section>
            </View>

            <Section
              key={'section-2'}
              title="Completed"
              linkOption={{
                isShow: completeTask.length > 1,
                text: 'See All',
                onPress: () => navigation.navigate('AllCompleted'),
              }}
            >
              <TasksListSection
                prefix="sub-completed-task"
                limit={1}
                tasks={completeTask}
                plugText="Completed tasks will be here"
                controllButton={TaskButton.DELETE}
                rightActionBlock={{
                  enabled: true,
                  buttons: [
                    {
                      type: 'delete',
                    },
                  ],
                }}
              />
            </Section>
            <DefaultButton
              text="Add new task"
              icon={{name: 'plus', size: 16}}
              onPress={() => navigation.navigate('AddTask')}
            />
        </View>
    );
};

const styles = StyleSheet.create({
  innerContainer: {
    flex: 1,
    gap: 25,
  },
});

export default TaskManager;
