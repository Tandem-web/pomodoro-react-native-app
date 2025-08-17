import Section from '@app/shared/ui-kit/section';
import { DefaultStyle } from '@app/shared/styles/defaultStyles';
import {
  StatusBar,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import TasksListSection from '@app/features/task/task-list';
import { useTaskList } from '@app/entities/task/intex';
import { TaskNameButton, TaskStatus } from '@app/shared/types/task';


function AllTasksScreen(): React.JSX.Element {
  const uncompletedTask = useTaskList({status: TaskStatus.UNCOMPLETE}, {sortBy: 'completeAt', orderBy: 'asc'});
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
            tasks={uncompletedTask}
            controllButton={TaskNameButton.PLAY}
            rightActionBlock={{
              enabled: true,
              buttons: [TaskNameButton.COMPLETE, TaskNameButton.DELETE],
            }}
          />
        </Section>
    </SafeAreaView>
  );
}

export default AllTasksScreen;
