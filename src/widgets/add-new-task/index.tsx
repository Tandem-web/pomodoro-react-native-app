import { ScrollView } from 'react-native-gesture-handler';
import { StyleSheet } from 'react-native';
import Section from '@app/shared/ui-kit/section';
import { TaskPriority, TaskPriorityType, TaskStatus } from '@app/shared/types/task';
import FormTextInput from '@app/shared/ui-kit/form/text-input';
import GroupRadioInputs from '@app/features/task/task-priority-radio-group';
import TaskTimeSetting from '@app/features/task/task-time-setting';
import DefaultButton from '@app/shared/ui-kit/button/DeafultButton';
import { useTaskActions } from '@app/entities/task/model/selectors';
import { useCallback, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { YourTaskScreenNavigationProp } from '@app/shared/types/navigation';

interface TimeSettings {
  workIntervals: number;
  workDuration: number;
  shortDuration: number;
  longDuration: number;
  intervalsToLong: number;
}

const priorities = Object.values(TaskPriority);

const AddNewTaskForm: React.FC = () => {
    const navigation = useNavigation<YourTaskScreenNavigationProp>();

    const { addNewTask } = useTaskActions();
    const [title, setTitle] = useState<string>('');
    const [priority, setPriority] = useState<TaskPriorityType | null>(null);
    const [timeSettings, setTimeSettings] = useState<TimeSettings>({
        workIntervals: 1,
        workDuration: 1,
        shortDuration: 1,
        longDuration: 1,
        intervalsToLong: 1,
    });

    const handleTimeSettingChange = useCallback((key: keyof TimeSettings, value: number) => {
        setTimeSettings(prev => ({
            ...prev,
            [key]: value
        }));
    }, []);


    const onChangeTitle = useCallback((text: string) => {
        setTitle(text);
    }, []);

    const onSelectPriority = useCallback((item: TaskPriorityType) => {
        setPriority(item);
    }, []);

    const resetForm = useCallback(() => {
        setTitle('');
        setPriority(null);
        setTimeSettings({
            workIntervals: 1,
            workDuration: 1,
            shortDuration: 1,
            longDuration: 1,
            intervalsToLong: 1,
        });
    }, []);

    const onPressHandler = useCallback(() => {
        if(priority != null){
            const newTask = {
                title: title,
                status: TaskStatus.UNCOMPLETE,
                priority: priority,
                settings: {
                    workIntervals: timeSettings.workIntervals,
                    timeSettings: {
                        workDuration: timeSettings.workDuration,
                        shortDuration: timeSettings.shortDuration,
                        longDuration: timeSettings.longDuration,
                        intervalsToLong: timeSettings.intervalsToLong,
                    },
                },
            };

            addNewTask(newTask);
            resetForm();
            navigation.goBack();
        }
    }, [title, priority, timeSettings, addNewTask, resetForm, navigation]);

    return (
        <ScrollView
            showsVerticalScrollIndicator={false}
            style={styles.addNewTaskContainer}
            overScrollMode={'auto'}
            scrollEventThrottle={16}
        >
            <Section>
                <Section>
                    <FormTextInput label={'Title'} inputPlaceholder={'Task title'} onChangeText={onChangeTitle} value={title}/>
                </Section>
                <Section title="Task priority">
                    <GroupRadioInputs prefix="task-priority" values={priorities} selectRadio={priority} onSelect={onSelectPriority}/>
                </Section>
                <Section title="Time settings">
                     <TaskTimeSetting
                        title="Tasks"
                        unit="Intervals"
                        onChange={(value) => handleTimeSettingChange('workIntervals', value)}
                    />
                    <TaskTimeSetting
                        title="Work Interval"
                        unit="Minutes"
                        max={60}
                        onChange={(value) => handleTimeSettingChange('workDuration', value)}
                    />
                    <TaskTimeSetting
                        title="Short Break"
                        unit="Minutes"
                        onChange={(value) => handleTimeSettingChange('shortDuration', value)}
                    />
                    <TaskTimeSetting
                        title="Long Break"
                        unit="Minutes"
                        max={60}
                        onChange={(value) => handleTimeSettingChange('longDuration', value)}
                    />
                    <TaskTimeSetting
                        title="Long interval after"
                        unit="Intervals"
                        onChange={(value) => handleTimeSettingChange('intervalsToLong', value)}
                    />
                </Section>
                <Section style={{paddingBottom: 40}}>
                    <DefaultButton
                        text="Create New Task"
                        icon={{name: 'plus', size: 16}}
                        onPress={onPressHandler}
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
