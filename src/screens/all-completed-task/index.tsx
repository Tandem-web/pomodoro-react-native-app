import {
  StatusBar,
} from 'react-native';

import { SafeAreaView } from 'react-native-safe-area-context';
import TasksListSection from '../../features/task-list';
import { DefaultStyle } from '../../shared/styles/defaultStyles';
import Section from '../../features/section';

const testTasks = new Array(5).fill(1);

function AllCompletedTaskScreen(): React.JSX.Element {

  return (
    <SafeAreaView  edges={['left', 'right', 'bottom']} style={[DefaultStyle.screen]}>
        <StatusBar barStyle="light-content"/>
        <Section
          key={'section-nested-all-complete'}
          style={{ paddingBottom: 30 }}
        >
          <TasksListSection
            key={'completed-task-section-1'}
            prefix="completed-task"
            limit={null}
            tasks={testTasks}
            rightActionBlock={{
              enabled: true,
              buttons: [{
                type: 'delete',
              }],
            }}
          />
        </Section>

    </SafeAreaView>
  );
}

export default AllCompletedTaskScreen;
