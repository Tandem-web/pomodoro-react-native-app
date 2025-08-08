import {
  StyleSheet,
} from 'react-native';
import { Colors } from './colorsPalete';

export const DefaultStyle = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: Colors.background,
    paddingHorizontal: 15,
    boxSizing: 'border-box',
  },
  fullSpace: {
    flex: 1,
  },
});
