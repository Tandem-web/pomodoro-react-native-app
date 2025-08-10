import {
  Text,
  StatusBar,
  SafeAreaView,
} from 'react-native';
import { DefaultStyle } from '../../shared/styles/defaultStyles';


function AddNewTaskScreen(): React.JSX.Element {
  return (
    <SafeAreaView  style={[DefaultStyle.screen]}>
        <StatusBar barStyle="light-content"/>
        <Text>Экран создания новой задачи</Text>
    </SafeAreaView>
  );
}

export default AddNewTaskScreen;
