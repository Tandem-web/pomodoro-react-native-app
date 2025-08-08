import React, { useCallback, useState } from 'react';
import {
  View,
  StatusBar,
  StyleSheet,
  LayoutChangeEvent,
} from 'react-native';
import { sceenStyle } from '../../shared/styles/screens';
import TasksListSection from '../../widgets/task-list';
import DefaultButton from '../../widgets/button/DeafultButton';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { StackParamList } from '../../@types/navigators';
import { SafeAreaView } from 'react-native-safe-area-context';



type SessionScreenNavigationProp = NativeStackNavigationProp<StackParamList, 'Tabs'>;

function SessionScreen(): React.JSX.Element {
  const navigation = useNavigation<SessionScreenNavigationProp>();
  const [sectionSize, setSectionSize] = useState({ width: 0, height: 0 });

  const handleLayout = useCallback((event: LayoutChangeEvent) => {
    const { width, height } = event.nativeEvent.layout;
    setSectionSize({ width, height });
  }, []);
  return (
    <>
      <SafeAreaView edges={['left', 'right']} style={[sceenStyle.main]}>
          <StatusBar barStyle="light-content"/>
          <View style={styles.innerContainer}>

            <View
              style={{flex: 1}}
              onLayout={handleLayout}
            >
              <TasksListSection
                key={'section-1'}
                title="All Task"
                prefix="sub-task"
                limit={Math.floor(sectionSize.height / 75)}
                linkOption={{
                  isShow: true,
                  text: 'See All',
                  onPress: () => navigation.navigate('AllTasks'),
                }}
                plugText="All tasks are completed"
              />
            </View>
            <TasksListSection
              key={'section-2'}
              title="Completed"
              prefix="sub-completed-task"
              limit={1}
              linkOption={{
                isShow: true,
                text: 'See All',
                onPress: () => navigation.navigate('AllCompleted'),
              }}
              plugText="Completed tasks will be here"
            />
            <DefaultButton
              text="Add new task"
              icon={{name: 'plus', size: 16}}
              onPress={() => navigation.navigate('AddTask')}
            />
          </View>
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  innerContainer: {
    flex: 1,
    gap: 25,
  },
});

export default SessionScreen;
