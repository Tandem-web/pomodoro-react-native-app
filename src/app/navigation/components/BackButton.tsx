import Ionicons from '@react-native-vector-icons/ionicons';
import { useNavigation } from '@react-navigation/native';
import React, { useCallback } from 'react';
import { TouchableOpacity, StyleSheet } from 'react-native';
import { YourTaskScreenNavigationProp } from '@app/shared/types/navigation';
import { Colors } from '@app/shared/styles/colorsPalete';


export const NavigationBackButton = React.memo(() => {
  const navigation = useNavigation<YourTaskScreenNavigationProp>();

  const handlePress = useCallback(() => {
    console.log(1);
    navigation.goBack();
  }, [navigation]);

  return (
    <TouchableOpacity onPress={handlePress} style={styles.button}>
      <Ionicons name="chevron-back" size={24} color={Colors.white} />
    </TouchableOpacity>
  );
});

const styles = StyleSheet.create({
  button: {
    marginLeft: 15,
  },
});
