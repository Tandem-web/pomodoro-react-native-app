import { DefaultStyle } from '@app/shared/styles/defaultStyles';
import TaskManager from '@app/widgets/task-manager';
import {
  StatusBar,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';


function TaskManagerScreen(): React.JSX.Element {
  return (
    <SafeAreaView edges={['left', 'right']} style={DefaultStyle.screen}>
          <StatusBar barStyle="light-content"/>
          <TaskManager/>
    </SafeAreaView>
  );
}

export default TaskManagerScreen;
