import React from 'react';
import {
  StatusBar,
} from 'react-native';
import { sceenStyle } from '../../shared/styles/screens';
import TasksListSection from '../../widgets/task-list';
import { SafeAreaView } from 'react-native-safe-area-context';

function AllTasksScreen(): React.JSX.Element {
  return (
    <SafeAreaView edges={['left', 'right', 'bottom']} style={[sceenStyle.main]}>
        <StatusBar barStyle="light-content"/>
        <TasksListSection
          key={'all-task-section-1'}
          prefix="all-task"
          tasks={new Array(20).fill(1)}
          limit={-1}
          paddBottom={30}
        />
    </SafeAreaView>
  );
}

export default AllTasksScreen;
