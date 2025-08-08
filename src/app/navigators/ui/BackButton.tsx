import Ionicons from '@react-native-vector-icons/ionicons';
import { useNavigation } from '@react-navigation/native';
import React, { useCallback } from 'react';
import { TouchableOpacity, StyleSheet } from 'react-native';
import { YourTaskScreenNavigationProp } from '../Navigator';

export const NavigationBackButton = React.memo(() => {
  const navigation = useNavigation<YourTaskScreenNavigationProp>();

  const handlePress = useCallback(() => {
    navigation.goBack();
  }, [navigation]);

  return (
    <TouchableOpacity onPress={handlePress} style={styles.button}>
      <Ionicons name="chevron-back" size={24} color="white" />
    </TouchableOpacity>
  );
});

const styles = StyleSheet.create({
  button: {
    marginLeft: 15,
  },
});
