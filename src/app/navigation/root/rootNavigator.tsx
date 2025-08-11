import { useCallback } from 'react';
import { NavigationBackButton } from '../components/BackButton';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StackParamList } from '@app/shared/types/navigation';
import { FONT_FAMILY } from '@app/shared/config/customFont';
import { Screens } from '@app/shared/consts';
import AllTasksScreen from '@app/screens/all-tasks';
import AddNewTaskScreen from '@app/screens/add-new-task';
import AllCompletedTaskScreen from '@app/screens/all-completed-task';
import { PomodoroBottomTabs } from '../tabs/TabNavigator';
import { Colors } from '@app/shared/styles/colorsPalete';

const Stack = createNativeStackNavigator<StackParamList>();

export const PomodoroNavigation = () => {

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
          fontSize: 20,
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