import { StyleSheet, View } from "react-native";
import { Colors } from "../../../shared/styles/colorsPalete";
import { TaskPriorityType } from "../../../@types/task";
import RadioInput from "./components/radio-input";

interface GroupRadioInputsProps {
    prefix: string;
    // Вопрос
    values: TaskPriorityType[];
}

const GroupRadioInputs: React.FC<GroupRadioInputsProps> = (props) => {
    const {
        prefix,
        values,
    } = props;

    return (
        <>
            <View style={styles.radioInputsWrapper}>
                {
                    values.map((item, index) => (
                        <RadioInput
                            key={`${prefix}_${index}`}
                            text={item}
                            value={item}
                            colorsPallete={{
                                idle: Colors.TaskCardPriority.Idle,
                                selected: Colors.TaskCardPriority[item],
                            }}
                        />
                    ))
                }
            </View>
        </>
    );
};

const styles = StyleSheet.create({
    radioInputsWrapper: {
        minHeight: 60,
        backgroundColor: Colors.surface,
        borderRadius: 10,
        paddingHorizontal: 15,
        paddingVertical: 10,
        gap: 15,
        flexDirection: 'row',
    },
});

export default GroupRadioInputs;
