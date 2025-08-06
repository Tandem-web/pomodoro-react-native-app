import React from 'react';
import {
  View,
  Text,
  StatusBar,
  SafeAreaView
} from 'react-native';
import { sceenStyle } from '../../shared/styles/screens';


function SessionScreen(): React.JSX.Element {
  return (
    <SafeAreaView  style={[sceenStyle.main]}>
        <StatusBar barStyle="light-content"/>
        <Text>Экран сессий</Text>
    </SafeAreaView>
  );
}

export default SessionScreen;
