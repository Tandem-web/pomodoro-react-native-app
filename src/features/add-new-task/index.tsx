import { ScrollView } from "react-native-gesture-handler";
import Section from "../../widgets/section";
import FormTextInput from "../../widgets/form/text-input";
import GroupRadioInputs from "../../widgets/form/group-radio-input";
import { TaskPriority } from "../../@types/task";

const priority = Object.values(TaskPriority);

const AddNewTaskForm: React.FC = () => {
    return (
        <ScrollView showsVerticalScrollIndicator={false}>
            <Section>
                <Section>
                    <FormTextInput label={'Title'} inputPlaceholder={'Task title'}/>
                </Section>
                <Section title="Task priority">
                    <GroupRadioInputs prefix="task-priority" values={priority}/>
                </Section>
            </Section>

        </ScrollView>
    );
};

export default AddNewTaskForm;
