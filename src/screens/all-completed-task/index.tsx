import {
  StatusBar,
  SafeAreaView,
} from 'react-native';
import TasksListSection from '../../widgets/task-list';
import { DefaultStyle } from '../../shared/styles/defaultStyles';

const testTasks = new Array(5).fill(1);

function AllCompletedTaskScreen(): React.JSX.Element {

  return (
    <SafeAreaView  style={[DefaultStyle.screen]}>
        <StatusBar barStyle="light-content"/>
        <TasksListSection
          key={'completed-task-section-1'}
          prefix="completed-task"
          limit={null}
          tasks={testTasks}
          paddBottom={30}
        />
    </SafeAreaView>
  );
}

export default AllCompletedTaskScreen;
