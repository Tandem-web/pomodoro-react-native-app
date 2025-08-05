import React from 'react';
import {
  StyleSheet,
  View,
  Text
} from 'react-native';


function TaskManagerScreen(): React.JSX.Element {
  return (
    <View style={styles.main}>
        <Text>Экран тасков</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: '#fff',
  },

});

export default TaskManagerScreen;
