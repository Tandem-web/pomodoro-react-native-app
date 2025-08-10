import { useCallback } from 'react';
import { NavigationBackButton } from '../components/BackButton';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StackParamList } from '../../../shared/types/navigation';
import { FONT_FAMILY } from '../../../shared/config/customFont';
import { Screens } from '../../../shared/consts';
import AllTasksScreen from '../../../screens/all-tasks';
import AddNewTaskScreen from '../../../screens/add-new-task';
import AllCompletedTaskScreen from '../../../screens/all-completed-task';
import { PomodoroBottomTabs } from '../tabs/TabNavigator';
import { Colors } from '../../../shared/styles/colorsPalete';

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