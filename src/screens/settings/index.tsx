import { DefaultStyle } from '@app/shared/styles/defaultStyles';
import {
  Text,
  StatusBar,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';


function Settings(): React.JSX.Element {
  return (
    <SafeAreaView edges={['left', 'right']} style={DefaultStyle.screen}>
      <StatusBar barStyle="light-content"/>
      <Text>Экран тасков</Text>
    </SafeAreaView>
  );
}

export default Settings;
