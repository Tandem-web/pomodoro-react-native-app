import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import BottomTabsBar from './ui/BottomTab';
import SessionScreen from '../../screens/sessions';
import TimerScreen from '../../screens/timer';
import TaskManagerScreen from '../../screens/tasks';
import { TabParamList } from '../../@types/navigators';
import { FONT_FAMILY } from '../../shared/config/customFont';
import { Colors } from '../../shared/styles/colorsPalete';


const Tab = createBottomTabNavigator<TabParamList>();


function PomodoroBottomTabs() {

  return (
    <Tab.Navigator
        initialRouteName='Timer'
        tabBar={(props) => <BottomTabsBar {...props} />}
        screenOptions={{
          headerTitleAlign: 'center',
          headerShadowVisible: false,
          headerStyle: {
            backgroundColor: Colors.background,
          },
          headerTintColor: Colors.white,
          headerTitleStyle: {
            fontFamily: FONT_FAMILY.AvenirNext_BOLD,
            fontSize: 18,
          },
        }}
    >
        <Tab.Screen 
          name="Session" 
          component={SessionScreen}
          options={{
            title: 'Your Tasks',
            // headerLeft: () => (
            //   <TouchableOpacity onPress={() => navigation.goBack()} style={{ marginLeft: 15 }}>
            //     <Ionicons name="chevron-back" size={24} color="white" />
            //   </TouchableOpacity>
            // ),
          }}

        />
        <Tab.Screen 
          name="Timer"
          component={TimerScreen}
          options={{
            title: 'Pomodoro timer',
          }}
        />
        <Tab.Screen 
          name="Settings"
          component={TaskManagerScreen}
          options={{
            title: 'Settings',
            // headerLeft: () => (
            //   <TouchableOpacity onPress={() => navigation.goBack()} style={{ marginLeft: 15 }}>
            //     <Ionicons name="chevron-back" size={24} color="white" />
            //   </TouchableOpacity>
            // ),
          }}
        />
    </Tab.Navigator>
  );
}

export default PomodoroBottomTabs;
