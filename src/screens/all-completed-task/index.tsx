import React from 'react';
import {
  StatusBar,
  SafeAreaView,
} from 'react-native';
import { sceenStyle } from '../../shared/styles/screens';
import TasksListSection from '../../widgets/task-list';


function AllCompletedTaskScreen(): React.JSX.Element {
  const testTask = new Array(5).fill(1);

  return (
    <SafeAreaView  style={[sceenStyle.main]}>
        <StatusBar barStyle="light-content"/>
        <TasksListSection
          key={'completed-task-section-1'}
          prefix="completed-task"
          tasks={testTask}
          limit={-1}
          paddBottom={30}
        />
    </SafeAreaView>
  );
}

export default AllCompletedTaskScreen;
