import { BottomTabBarProps, createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { TabParamList } from '../../../shared/types/navigation';
import { useCallback } from 'react';
import TabBar from './TabBar';
import { Screens } from '../../../shared/consts';
import { Colors } from '../../../shared/styles/colorsPalete';
import { FONT_FAMILY } from '../../../shared/config/customFont';
import TaskManagerScreen from '../../../screens/task-manager';
import TimerScreen from '../../../screens/timer';
import Settings from '../../../screens/settings';

const Tab = createBottomTabNavigator<TabParamList>();

export const PomodoroBottomTabs = () => {
  const renderTabBar = useCallback((props: BottomTabBarProps) => <TabBar {...props} />, []);

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
            fontSize: 20,
          },
        }}
    >
        <Tab.Screen
          name={Screens.TASK_MANAGER}
          component={TaskManagerScreen}
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
          component={Settings}
          options={{
            title: 'Settings',
          }}
        />
    </Tab.Navigator>
  );
};
