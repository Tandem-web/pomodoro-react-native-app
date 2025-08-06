import React from 'react';
import {
  View,
  Text,
  StatusBar,
  SafeAreaView,
  Button
} from 'react-native';
import { sceenStyle } from '../../shared/styles/screens';
import { StackParamList } from '../../@types/navigators';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';



type SessionScreenNavigationProp = NativeStackNavigationProp<StackParamList, 'Tabs'>;

function SessionScreen(): React.JSX.Element {
  const navigation = useNavigation<SessionScreenNavigationProp>();

  
  return (
    <SafeAreaView  style={[sceenStyle.main]}>
        <StatusBar barStyle="light-content"/>
        <Text>Экран сессий</Text>

        <Button
          title="All Tasks"
          onPress={() => navigation.navigate('AllTasks')}
        />

        <Button
          title="Add New Task"
          onPress={() => navigation.navigate('AddTask')}
        />
    </SafeAreaView>
  );
}

export default SessionScreen;
