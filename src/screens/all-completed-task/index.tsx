import Section from '@app/shared/ui-kit/section';
import { DefaultStyle } from '@app/shared/styles/defaultStyles';
import {
  StatusBar,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import TasksListSection from '@app/features/task/task-list';
import { useTaskActions } from '@app/entities/task/intex';
import { TaskNameButton } from '@app/shared/types/task';

const testTasks = new Array(5).fill(1);

function AllCompletedTaskScreen(): React.JSX.Element {
  const { deleteTask } = useTaskActions();

  return (
    <SafeAreaView  edges={['left', 'right', 'bottom']} style={DefaultStyle.screen}>
        <StatusBar barStyle="light-content"/>
        <Section
          key={'section-nested-all-complete'}
          style={{ paddingBottom: 30 }}
        >
          <TasksListSection
            key={'completed-task-section-1'}
            prefix="completed-task"
            controllButton={TaskNameButton.DELETE}
            limit={null}
            tasks={testTasks}
            rightActionBlock={{
              enabled: false,
              buttons: [{
                type: 'delete',
                onPress: (taskId) => deleteTask(taskId),
              }],
            }}
          />
        </Section>

    </SafeAreaView>
  );
}

export default AllCompletedTaskScreen;
