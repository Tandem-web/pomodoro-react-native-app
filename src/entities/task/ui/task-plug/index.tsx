import { View, StyleSheet } from 'react-native';

export const TaskPlug = () => {
    return(
        <View style={styles.taskPlug}/>
    );
};

const styles = StyleSheet.create({
    taskPlug: {
        height: 60,
        borderRadius: 10,
        paddingHorizontal: 15,
        paddingVertical: 10,
        width: '100%',
    },
});
