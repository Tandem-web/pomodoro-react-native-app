import { ScrollView } from 'react-native-gesture-handler';
import Section from '../../widgets/section';
import FormTextInput from '../../widgets/form/text-input';
import GroupRadioInputs from '../../widgets/form/group-radio-input';
import { TaskPriority } from '../../@types/task';
import TaskTimeSetting from '../../widgets/task-time-setting';
import { StyleSheet } from 'react-native';

const priority = Object.values(TaskPriority);

const AddNewTaskForm: React.FC = () => {
    return (
        <ScrollView showsVerticalScrollIndicator={false} style={styles.addNewTaskContainer}>
            <Section>
                <Section>
                    <FormTextInput label={'Title'} inputPlaceholder={'Task title'}/>
                </Section>
                <Section title="Task priority">
                    <GroupRadioInputs prefix="task-priority" values={priority}/>
                </Section>
                <Section title="Time settings">
                    <TaskTimeSetting title={'Tasks'} unit={'Intervals'}/>
                    <TaskTimeSetting title={'Work Interval'} unit={'Minutes'}/>
                    <TaskTimeSetting title={'Short Break'} unit={'Minutes'}/>
                    <TaskTimeSetting title={'Long Break'} unit={'Minutes'}/>
                    <TaskTimeSetting title={'Long interval after'} unit={'Intervals'}/>
                </Section>
            </Section>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    addNewTaskContainer: {
        paddingBottom: 20,
    }
})

export default AddNewTaskForm;
