import Section from '@app/shared/ui-kit/section';
import { DefaultStyle } from '@app/shared/styles/defaultStyles';
import {
  StatusBar,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import TasksListSection from '@app/features/task/task-list';
import { useTaskActions, useTaskList } from '@app/entities/task/intex';
import { TaskNameButton, TaskStatus } from '@app/shared/types/task';


function AllCompletedTaskScreen(): React.JSX.Element {
  const { deleteTask } = useTaskActions();
  const completedTask = useTaskList({status: TaskStatus.COMPLETE}, {sortBy: 'completeAt', orderBy: 'asc'});
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
            tasks={completedTask}
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
