import {
  StatusBar,
} from 'react-native';
import TasksListSection from '../../widgets/task-list';
import { SafeAreaView } from 'react-native-safe-area-context';
import { DefaultStyle } from '../../shared/styles/defaultStyles';

const testTasks = new Array(20).fill(1);

function AllTasksScreen(): React.JSX.Element {
  return (
    <SafeAreaView edges={['left', 'right']} style={[DefaultStyle.screen]}>
        <StatusBar barStyle="light-content"/>
        <TasksListSection
          key={'all-task-section-1'}
          prefix="all-task"
          limit={null}
          tasks={testTasks}
          paddBottom={30}
        />
    </SafeAreaView>
  );
}

export default AllTasksScreen;
