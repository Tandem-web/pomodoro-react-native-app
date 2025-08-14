import Section from '@app/shared/ui-kit/section';
import { DefaultStyle } from '@app/shared/styles/defaultStyles';
import {
  StatusBar,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import TasksListSection from '@app/features/task/task-list';
import { useTaskActions } from '@app/entities/task/intex';
import { TaskNameButton } from '@app/shared/types/task';

const testTasks = new Array(20).fill(1);

function AllTasksScreen(): React.JSX.Element {
  const {completeTask , deleteTask } = useTaskActions();
  return (
    <SafeAreaView edges={['left', 'right', 'bottom']} style={DefaultStyle.screen}>
        <StatusBar barStyle="light-content"/>
        <Section
          key={'section-nested-all-task'}
          style={{ paddingBottom: 30 }}
        >
          <TasksListSection
            key={'all-task-section-1'}
            prefix="completed-task"
            limit={null}
            tasks={testTasks}
            controllButton={TaskNameButton.PLAY}
            rightActionBlock={{
              enabled: true,
              buttons: [
                {
                  type: 'delete',
                  onPress: (taskId) => deleteTask(taskId),
                },
                {
                  type: 'complete',
                  onPress: (taskId) => completeTask(taskId),
                },
              ],
            }}
          />
        </Section>
    </SafeAreaView>
  );
}

export default AllTasksScreen;
