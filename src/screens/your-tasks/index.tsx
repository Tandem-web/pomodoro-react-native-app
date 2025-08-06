import React, { useState } from 'react';
import {
  View,
  StatusBar,
  StyleSheet,
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

  return (
    <>
      <SafeAreaView edges={['top', 'bottom']} style={[sceenStyle.main]}>
          <StatusBar barStyle="light-content"/>
          <View style={styles.innerContainer}>

            <View
              style={{flex: 1}}
              onLayout={(event) => {
                const {width, height } = event.nativeEvent.layout;
                setSectionSize({ width, height });
              }}
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
              />
            </View>
            <TasksListSection
              key={'section-2'}
              title="Completed"
              prefix="sub-completed-task"
              tasks={[1, 2, 5, 6, 3]}
              limit={1}
              linkOption={{
                isShow: true,
                text: 'See All',
                onPress: () => navigation.navigate('AllCompleted'),
              }}
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
    gap: 30
  },
});

export default SessionScreen;
