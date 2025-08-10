import { useCallback, useState } from 'react';
import {
  View,
  StatusBar,
  StyleSheet,
  LayoutChangeEvent,
} from 'react-native';
import TasksListSection from '../../features/task-list';
import DefaultButton from '../../shared/ui-kit/button/DeafultButton';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { StackParamList } from '../../shared/types/navigators';
import { SafeAreaView } from 'react-native-safe-area-context';
import { DefaultStyle } from '../../shared/styles/defaultStyles';
import Section from '../../features/section';



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
      <SafeAreaView edges={['left', 'right']} style={[DefaultStyle.screen]}>
            <StatusBar barStyle="light-content"/>
            <View style={styles.innerContainer}>

              <View
                style={DefaultStyle.fullSpace}
                onLayout={handleLayout}
              >
                <Section
                  key={'section-1'}
                  title="All Task"
                  linkOption={{
                    isShow: false,
                    text: 'See All',
                    onPress: () => navigation.navigate('AllTasks'),
                  }}
                >
                  <TasksListSection
                    prefix="sub-task"
                    limit={Math.floor(sectionSize.height / 75)}
                    plugText="All tasks are completed"
                  />
                </Section>
              </View>

              <Section
                key={'section-2'}
                title="Completed"
                linkOption={{
                  isShow: false,
                  text: 'See All',
                  onPress: () => navigation.navigate('AllCompleted'),
                }}
              >
                <TasksListSection
                  prefix="sub-completed-task"
                  limit={1}
                  plugText="Completed tasks will be here"
                />
              </Section>
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
