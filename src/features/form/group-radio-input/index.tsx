import { StyleSheet, View } from 'react-native';
import { Colors } from '@app/shared/styles/colorsPalete';
import { TaskPriorityType } from '@app/shared/types/task';
import { useState } from 'react';
import RadioInput from './components/radio-input';

interface GroupRadioInputsProps {
    prefix: string;
    values: TaskPriorityType[];
}

const GroupRadioInputs: React.FC<GroupRadioInputsProps> = (props) => {
    const [selectRadio, setSelectRadio] = useState<TaskPriorityType | null>(null)
    ;
    const {
        prefix,
        values,
    } = props;

    const onPressHandler = (item: TaskPriorityType) => {
        setSelectRadio(item);
    };

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
                            onPress={() => onPressHandler(item)}
                            isSelected={selectRadio === item}
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
        paddingHorizontal: 10,
        paddingVertical: 10,
        gap: 15,
        flexDirection: 'row',
    },
});

export default GroupRadioInputs;
