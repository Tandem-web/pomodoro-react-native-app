import React, { PropsWithChildren } from 'react';
import { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import { TouchableOpacity, View, Text,  StyleSheet} from 'react-native';

type BottomTabsBarProps = PropsWithChildren<BottomTabBarProps>

const BottomTabsBar: React.FC<BottomTabsBarProps> = (props) => {
    const { state, descriptors, navigation } = props;

    return (
        <View style={styles.tabContainer}>
        {state.routes.map((route: any, index: number) => {
            const { options } = descriptors[route.key];
            const isFocused = state.index === index;

            const onPress = () => {
            const event = navigation.emit({
                type: 'tabPress',
                target: route.key,
                canPreventDefault: true,
            });

            if (!isFocused && !event.defaultPrevented) {
                navigation.navigate(route.name);
            }
            };

            return (
            <TouchableOpacity
                key={route.key}
                accessibilityRole="button"
                accessibilityState={isFocused ? { selected: true } : {}}
                accessibilityLabel={options.tabBarAccessibilityLabel}
                onPress={onPress}
                style={styles.tabButton}
            >
                <Text style={{ color: isFocused ? '#673ab7' : '#222' }}>
                    {route.name}
                </Text>
            </TouchableOpacity>
            );
        })}
        </View>
    );

};

const styles = StyleSheet.create({
    tabContainer: {
    flexDirection: 'row',
    height: 60,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#eee',
  },
  tabButton: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default BottomTabsBar;
