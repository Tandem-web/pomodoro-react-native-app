import { DefaultStyle } from '@app/shared/styles/defaultStyles';
import AddNewTaskForm from '@app/widgets/add-new-task';
import { SafeAreaView } from 'react-native-safe-area-context';



function AddNewTaskScreen(): React.JSX.Element {
  return (
    <SafeAreaView edges={['left', 'right', 'bottom']} style={DefaultStyle.screen}>
        <AddNewTaskForm/>
    </SafeAreaView>
  );
}

export default AddNewTaskScreen;
