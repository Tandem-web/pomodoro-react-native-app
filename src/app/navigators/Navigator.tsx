import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import BottomTabsBar from './ui/BottomTab';
<<<<<<< HEAD
import SessionScreen from '../../screens/your-tasks';
import TimerScreen from '../../screens/timer';
import TaskManagerScreen from '../../screens/settings';
import { StackParamList, TabParamList } from '../../@types/navigators';
=======
import SessionScreen from '../../screens/statistic';
import TimerScreen from '../../screens/timer';
import TaskManagerScreen from '../../screens/settings';
import { TabParamList } from '../../@types/navigators';
>>>>>>> main
import { FONT_FAMILY } from '../../shared/config/customFont';
import { Colors } from '../../shared/styles/colorsPalete';
import { createNativeStackNavigator, NativeStackNavigationProp } from '@react-navigation/native-stack';
import AllTasksScreen from '../../screens/all-tasks';
import AddNewTaskScreen from '../../screens/add-new-task';
import { TouchableOpacity } from 'react-native';
import Ionicons from '@react-native-vector-icons/ionicons';
import { useNavigation } from '@react-navigation/native';
import AllCompletedTaskScreen from '../../screens/all-completed-task';


const Stack = createNativeStackNavigator<StackParamList>();
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
          }}
        />
    </Tab.Navigator>
  );
}

export type YourTaskScreenNavigationProp = NativeStackNavigationProp<StackParamList, 'Tabs'>;

export default function PomodoroNavigation() {
  const navigation = useNavigation<YourTaskScreenNavigationProp>();

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
      <Stack.Screen name="Tabs" component={PomodoroBottomTabs} 
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen 
        name="AllTasks"
        component={AllTasksScreen} 
        options={{
          title: 'All Task',
          headerLeft: () => (
            <TouchableOpacity onPress={() => navigation.goBack()} style={{ marginLeft: 15 }}>
              <Ionicons name="chevron-back" size={24} color="white" />
            </TouchableOpacity>
          ),
        }}/>
      <Stack.Screen 
        name="AddTask"
        component={AddNewTaskScreen} 
        options={{
          title: 'Add new Task',
          headerLeft: () => (
            <TouchableOpacity onPress={() => navigation.goBack()} style={{ marginLeft: 15 }}>
              <Ionicons name="chevron-back" size={24} color="white" />
            </TouchableOpacity>
          ),
        }}/>
        <Stack.Screen 
          name="AllCompleted"
          component={AllCompletedTaskScreen} 
          options={{
            title: 'All completed task',
            headerLeft: () => (
              <TouchableOpacity onPress={() => navigation.goBack()} style={{ marginLeft: 15 }}>
                <Ionicons name="chevron-back" size={24} color="white" />
              </TouchableOpacity>
            ),
        }}/>
    </Stack.Navigator>
  );
}
