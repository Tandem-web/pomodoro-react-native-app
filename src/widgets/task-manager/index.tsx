import { LayoutChangeEvent, View, StyleSheet } from 'react-native';
import Section from '../../features/section';
import TasksListSection from '../../features/task-list';
import { useNavigation } from '@react-navigation/native';
import { useCallback, useState } from 'react';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { StackParamList } from '../../shared/types/navigation';
import { DefaultStyle } from '../../shared/styles/defaultStyles';
import DefaultButton from '../../shared/ui-kit/button/DeafultButton';

type TaskManagerScreenNavigationProp = NativeStackNavigationProp<StackParamList, 'Tabs'>;

const TaskManager: React.FC = () => {
    const navigation = useNavigation<TaskManagerScreenNavigationProp>();
    const [sectionSize, setSectionSize] = useState({ width: 0, height: 0 });

    const handleLayout = useCallback((event: LayoutChangeEvent) => {
        const { width, height } = event.nativeEvent.layout;
        setSectionSize({ width, height });
    }, []);

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
                  isShow: false,
                  text: 'See All',
                  onPress: () => navigation.navigate('AllTasks'),
                }}
              >
                <TasksListSection
                  prefix="sub-task"
                  limit={Math.floor(sectionSize.height / 75)}
                  plugText="All tasks are completed"
                />
              </Section>
            </View>

            <Section
              key={'section-2'}
              title="Completed"
              linkOption={{
                isShow: true,
                text: 'See All',
                onPress: () => navigation.navigate('AllCompleted'),
              }}
            >
              <TasksListSection
                prefix="sub-completed-task"
                limit={1}
                plugText="Completed tasks will be here"
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
