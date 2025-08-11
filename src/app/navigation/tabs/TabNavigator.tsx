import { BottomTabBarProps, createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useCallback } from 'react';
import TabBar from './TabBar';
import { Screens } from '@app/shared/consts';
import { Colors } from '@app/shared/styles/colorsPalete';
import { FONT_FAMILY } from '@app/shared/config/customFont';
import TaskManagerScreen from '@app/screens/task-manager';
import TimerScreen from '@app/screens/timer';
import Settings from '@app/screens/settings';
import { TabParamList } from '@app/shared/types/navigation';

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
