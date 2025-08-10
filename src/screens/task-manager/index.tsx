import {
  StatusBar,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { DefaultStyle } from '../../shared/styles/defaultStyles';
import TaskManager from '../../widgets/task-manager';


function TaskManagerScreen(): React.JSX.Element {
  return (
    <SafeAreaView edges={['left', 'right']} style={[DefaultStyle.screen]}>
          <StatusBar barStyle="light-content"/>
          <TaskManager/>
    </SafeAreaView>
  );
}

export default TaskManagerScreen;
