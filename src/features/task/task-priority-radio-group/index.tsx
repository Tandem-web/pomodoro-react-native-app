import { StyleSheet, View } from 'react-native';
import { Colors } from '@app/shared/styles/colorsPalete';
import { TaskPriorityType } from '@app/shared/types/task';
import { useState } from 'react';
import RadioInput from './components/radio-input';
import { noop } from '@app/shared/utilities/noop';

interface GroupRadioInputsProps {
    prefix: string;
    values: TaskPriorityType[];
    selectRadio?: TaskPriorityType | null;
    onSelect?: (item: TaskPriorityType) => void;
}

const GroupRadioInputs: React.FC<GroupRadioInputsProps> = (props) => {
    
    const {
        prefix,
        values,
        selectRadio = null,
        onSelect = noop,
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
                            onPress={() => onSelect(item)}
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
