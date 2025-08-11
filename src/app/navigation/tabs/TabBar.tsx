import React, { PropsWithChildren } from 'react';
import { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import { TouchableOpacity, View, StyleSheet} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { FontAwesome } from '@react-native-vector-icons/fontawesome';
import Ionicons from '@react-native-vector-icons/ionicons';
import { Colors } from '@app/shared/styles/colorsPalete';
import { Screens } from '@app/shared/consts';


type BottomTabsBarProps = PropsWithChildren<BottomTabBarProps>

const TabBar: React.FC<BottomTabsBarProps> = (props) => {
    const { state, descriptors, navigation } = props;

    return (
        <SafeAreaView edges={['bottom']} style={styles.safeArea}>
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

                    let icon;

                    switch (route.name) {
                        case Screens.TASK_MANAGER:
                            icon = (<FontAwesome name="th-list" size={22} color={isFocused ? Colors.primary : Colors.white} />);
                            break;

                        case Screens.TIMER:
                            icon = (<Ionicons name="timer" size={28} color={isFocused ? Colors.primary : Colors.white} />);
                            break;
                        case Screens.SETTINGS:
                            icon = (<FontAwesome name="user" size={26} color={isFocused ? Colors.primary : Colors.white} />);
                            break;
                        default:
                            icon = null;
                            break;
                    }
                    return (
                    <TouchableOpacity
                        key={route.key}
                        accessibilityRole="button"
                        accessibilityState={isFocused ? { selected: true } : {}}
                        accessibilityLabel={options.tabBarAccessibilityLabel}
                        onPress={onPress}
                        style={styles.tabButton}
                    >
                        {icon}
                    </TouchableOpacity>
                    );
                })}
            </View>
        </SafeAreaView>
    );

};

const styles = StyleSheet.create({
    safeArea: {
        backgroundColor: Colors.background,
    },
    tabContainer: {
        flexDirection: 'row',
        height: 85,
        backgroundColor: Colors.background,
        paddingHorizontal: 15,
    },
    tabButton: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default TabBar;
