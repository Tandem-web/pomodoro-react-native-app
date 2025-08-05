
import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
// import type {PropsWithChildren} from 'react';
import {
  StyleSheet,
  View,
} from 'react-native';


// type SectionProps = PropsWithChildren<{
//   title: string;
// }>;
// function Section({children, title}: SectionProps): React.JSX.Element {
//   const isDarkMode = useColorScheme() === 'dark';
//   return (
//     <View style={styles.sectionContainer}>
//       <Text
//         style={[
//           styles.sectionTitle,
//           {
//             color: isDarkMode ? Colors.white : Colors.black,
//           },
//         ]}>
//         {title}
//       </Text>
//       <Text
//         style={[
//           styles.sectionDescription,
//           {
//             color: isDarkMode ? Colors.light : Colors.dark,
//           },
//         ]}>
//         {children}
//       </Text>
//     </View>
//   );
// }

function App(): React.JSX.Element {
  return (
    <View style={styles.main}>
      <>
        <NavigationContainer>
          
        </NavigationContainer>
      </>
    </View>
  );
}

const styles = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: '#1E1E1E',
  },

});

export default App;
