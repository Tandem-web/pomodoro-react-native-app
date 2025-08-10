import {
  View,
  Text,
  StatusBar,
} from 'react-native';
import { DefaultStyle } from '../../shared/styles/defaultStyles';


function Settings(): React.JSX.Element {
  return (
    <View style={DefaultStyle.screen}>
        <StatusBar barStyle="light-content"/>
        <Text>Экран тасков</Text>
    </View>
  );
}

export default Settings;
