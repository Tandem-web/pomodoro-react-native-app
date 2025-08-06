import React from 'react';
import {
  Text,
  StatusBar,
  SafeAreaView,
} from 'react-native';
import { sceenStyle } from '../../shared/styles/screens';


function AllTasksScreen(): React.JSX.Element {
  return (
    <SafeAreaView  style={[sceenStyle.main]}>
        <StatusBar barStyle="light-content"/>
        <Text>Экран всех задач</Text>
    </SafeAreaView>
  );
}

export default AllTasksScreen;