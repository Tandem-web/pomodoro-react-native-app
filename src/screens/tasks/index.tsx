import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  StatusBar
} from 'react-native';
import { sceenStyle } from '../../shared/styles/screens';


function TaskManagerScreen(): React.JSX.Element {
  return (
    <View style={sceenStyle.main}>
        <StatusBar barStyle="light-content"/>
        <Text>Экран тасков</Text>
    </View>
  );
}

const styles = StyleSheet.create({

});

export default TaskManagerScreen;
