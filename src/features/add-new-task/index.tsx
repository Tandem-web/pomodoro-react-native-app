import { ScrollView } from "react-native-gesture-handler";
import Section from "../../widgets/section";

const AddNewTaskForm: React.FC = () => {
    return (
        <ScrollView showsVerticalScrollIndicator={false}>
            <Section>
                <Section>
                    <FormTextInput label={'Title'} inputPlaceholder={'Task title'}/>
                </Section>
            </Section>

        </ScrollView>
    );
};

export default AddNewTaskForm;
