import { NativeStackNavigationProp } from "@react-navigation/native-stack";

export type TabParamList = {
  TaskManager: undefined;
  Timer: undefined;
  Settings: undefined;
};

export type StackParamList = {
  Tabs: undefined;
  AllTasks: undefined;
  AddTask: undefined;
  AllCompleted: undefined;
};


export type YourTaskScreenNavigationProp = NativeStackNavigationProp<StackParamList, 'Tabs'>;
