import { SafeAreaView } from 'react-native-safe-area-context';
import { DefaultStyle } from '../../shared/styles/defaultStyles';
import AddNewTaskForm from '../../widgets/add-new-task';



function AddNewTaskScreen(): React.JSX.Element {
  return (
    <SafeAreaView edges={['left', 'right', 'bottom']} style={[DefaultStyle.screen]}>
        <AddNewTaskForm/>
    </SafeAreaView>
  );
}

export default AddNewTaskScreen;
