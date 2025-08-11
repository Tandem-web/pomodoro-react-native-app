import {
  StatusBar,
} from 'react-native';
import TasksListSection from '../../features/task-list';
import { SafeAreaView } from 'react-native-safe-area-context';
import { DefaultStyle } from '../../shared/styles/defaultStyles';
import Section from '../../features/section';

const testTasks = new Array(20).fill(1);

function AllTasksScreen(): React.JSX.Element {
  return (
    <SafeAreaView edges={['left', 'right', 'bottom']} style={[DefaultStyle.screen]}>
        <StatusBar barStyle="light-content"/>
        <TasksListSection
          key={'all-task-section-1'}
          prefix="all-task"
          limit={null}
          tasks={testTasks}
          paddBottom={30}
        />
        <Section
          key={'section-nested-all-task'}
          style={{ paddingBottom: 30 }}
        >
          <TasksListSection
            key={'all-task-section-1'}
            prefix="completed-task"
            limit={null}
            tasks={testTasks}
            rightActionBlock={{
              enabled: true,
              buttons: [
                {
                  type: 'delete',
                },
                {
                  type: 'complete',
                },
              ],
            }}
          />
        </Section>
    </SafeAreaView>
  );
}

export default AllTasksScreen;
