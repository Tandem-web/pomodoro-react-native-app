import React from 'react';
import {
  View,
  Text,
  StatusBar
} from 'react-native';
import { sceenStyle } from '../../shared/styles/screens';


function SessionScreen(): React.JSX.Element {
  return (
    <View style={sceenStyle.main}>
        <StatusBar barStyle="light-content"/>
        <Text>Экран сессий</Text>
    </View>
  );
}

export default SessionScreen;
