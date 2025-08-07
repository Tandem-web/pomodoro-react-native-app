import {
  StyleSheet,
} from 'react-native';
import { Colors } from './colorsPalete';

export const sceenStyle = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: Colors.background,
    paddingHorizontal: 15,
    boxSizing: 'border-box',
  },
});
