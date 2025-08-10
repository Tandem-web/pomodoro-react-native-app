import React from 'react';
import {
  StatusBar,
} from 'react-native';
import { sceenStyle } from '../../shared/styles/screens';
import TasksListSection from '../../widgets/task-list';
import { SafeAreaView } from 'react-native-safe-area-context';

const testTasks = new Array(20).fill(1);

function AllTasksScreen(): React.JSX.Element {
  return (
    <SafeAreaView edges={['left', 'right', 'bottom']} style={[sceenStyle.main]}>
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
