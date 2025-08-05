import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import BottomTabsBar from './ui/BottomTab';
import SessionScreen from '../../screens/sessions';
import TimerScreen from '../../screens/timer';
import TaskManagerScreen from '../../screens/tasks';
import { TabParamList } from '../../@types/navigators';
// import { NavigatorScreenParams, StaticScreenProps } from '@react-navigation/native';


const Tab = createBottomTabNavigator<TabParamList>();

// type PomodoroBottomTabsProps = StaticScreenProps<
//   NavigatorScreenParams<TabParamList>
// >;

function PomodoroBottomTabs() {
  return (
    <Tab.Navigator tabBar={(props) => <BottomTabsBar {...props} />}>
        <Tab.Screen name="Session" component={SessionScreen} />
        <Tab.Screen name="Timer" component={TimerScreen} />
        <Tab.Screen name="TaskManager" component={TaskManagerScreen} />
    </Tab.Navigator>
  );
};

export default PomodoroBottomTabs;