import React from 'react';
import {
  Text,
  StatusBar,
  SafeAreaView,
} from 'react-native';
import { sceenStyle } from '../../shared/styles/screens';


function AddNewTaskScreen(): React.JSX.Element {
  return (
    <SafeAreaView  style={[sceenStyle.main]}>
        <StatusBar barStyle="light-content"/>
        <Text>Экран создания новой задачи</Text>
    </SafeAreaView>
  );
}

export default AddNewTaskScreen;
