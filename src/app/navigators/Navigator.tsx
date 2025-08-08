import React, { useCallback } from 'react';
import { BottomTabBarProps, createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import BottomTabsBar from './ui/BottomTab';
import SessionScreen from '../../screens/your-tasks';
import TimerScreen from '../../screens/timer';
import TaskManagerScreen from '../../screens/settings';
import { StackParamList, TabParamList } from '../../@types/navigators';
import { FONT_FAMILY } from '../../shared/config/customFont';
import { Colors } from '../../shared/styles/colorsPalete';
import { createNativeStackNavigator, NativeStackNavigationProp } from '@react-navigation/native-stack';
import AllTasksScreen from '../../screens/all-tasks';
import AddNewTaskScreen from '../../screens/add-new-task';
import AllCompletedTaskScreen from '../../screens/all-completed-task';
import { NavigationBackButton } from './ui/BackButton';


const Stack = createNativeStackNavigator<StackParamList>();
const Tab = createBottomTabNavigator<TabParamList>();

export const Screens = {
  // Bottom Tabs Screens
  TABS: 'Tabs',
  SESSION: 'Session',
  TIMER: 'Timer',
  SETTINGS: 'Settings',

  // Stack Screens
  ALL_TASKS: 'AllTasks',
  ADD_TASK: 'AddTask',
  ALL_COMPLETED: 'AllCompleted',
} as const;

function PomodoroBottomTabs() {
  const renderTabBar = useCallback((props: BottomTabBarProps) => <BottomTabsBar {...props} />, []);

  return (
    <Tab.Navigator
        initialRouteName={Screens.TIMER}
        tabBar={renderTabBar}
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
          name={Screens.SESSION}
          component={SessionScreen}
          options={{
            title: 'Your Tasks',
          }}

        />
        <Tab.Screen
          name={Screens.TIMER}
          component={TimerScreen}
          options={{
            title: 'Pomodoro timer',
          }}
        />
        <Tab.Screen
          name={Screens.SETTINGS}
          component={TaskManagerScreen}
          options={{
            title: 'Settings',
          }}
        />
    </Tab.Navigator>
  );
}

export type YourTaskScreenNavigationProp = NativeStackNavigationProp<StackParamList, 'Tabs'>;

export default function PomodoroNavigation() {

  const renderBackButton = useCallback(() => {
    return (<NavigationBackButton />);
  }, []);

  return (
    <Stack.Navigator
      screenOptions={{
        animation: 'fade',
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
      <Stack.Screen name={Screens.TABS} component={PomodoroBottomTabs}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name={Screens.ALL_TASKS}
        component={AllTasksScreen}
        options={{
          title: 'All Task',
          headerLeft: renderBackButton,
        }}/>
      <Stack.Screen
        name={Screens.ADD_TASK}
        component={AddNewTaskScreen}
        options={{
          title: 'Add new Task',
          headerLeft: renderBackButton,
        }}/>
        <Stack.Screen
          name={Screens.ALL_COMPLETED}
          component={AllCompletedTaskScreen}
          options={{
            title: 'All completed task',
            headerLeft: renderBackButton,
        }}/>
    </Stack.Navigator>
  );
}

