import React from 'react';
import {
  StyleSheet,
  View,
  Text
} from 'react-native';


function SessionScreen(): React.JSX.Element {
  return (
    <View style={styles.main}>
        <Text>Экран сессий</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: '#fff',
  },

});

export default SessionScreen;
