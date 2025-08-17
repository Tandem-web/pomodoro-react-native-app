import { ScrollView } from 'react-native-gesture-handler';
import { StyleSheet } from 'react-native';
import Section from '@app/features/section';
import { TaskPriority } from '@app/shared/types/task';
import FormTextInput from '@app/features/form/text-input';
import GroupRadioInputs from '@app/features/form/group-radio-input';
import TaskTimeSetting from '@app/features/task-time-setting';
import DefaultButton from '@app/shared/ui-kit/button/DeafultButton';

const priority = Object.values(TaskPriority);

const AddNewTaskForm: React.FC = () => {

    return (
        <ScrollView
            showsVerticalScrollIndicator={false}
            style={styles.addNewTaskContainer}
            overScrollMode={'auto'}
            scrollEventThrottle={16} // Оптимальная частота событий
        >
            <Section>
                <Section>
                    <FormTextInput label={'Title'} inputPlaceholder={'Task title'}/>
                </Section>
                <Section title="Task priority">
                    <GroupRadioInputs prefix="task-priority" values={priority}/>
                </Section>
                <Section title="Time settings">
                    <TaskTimeSetting key={'time-settings-1'} title={'Tasks'} unit={'Intervals'}/>
                    <TaskTimeSetting key={'time-settings-2'} title={'Work Interval'} unit={'Minutes'}/>
                    <TaskTimeSetting key={'time-settings-3'} title={'Short Break'} unit={'Minutes'}/>
                    <TaskTimeSetting key={'time-settings-4'} title={'Long Break'} unit={'Minutes'}/>
                    <TaskTimeSetting key={'time-settings-5'} title={'Long interval after'} unit={'Intervals'}/>
                </Section>
                <Section style={{paddingBottom: 40}}>
                    <DefaultButton
                        text="Create New Task"
                        icon={{name: 'plus', size: 16}}
                    />
                </Section>
            </Section>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    addNewTaskContainer: {
        paddingBottom: 20,
    },
});

export default AddNewTaskForm;
