import React, { PropsWithChildren } from 'react';
import { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import { TouchableOpacity, View, StyleSheet} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { FontAwesome } from "@react-native-vector-icons/fontawesome";
import Ionicons from '@react-native-vector-icons/ionicons';
import { colorPallete } from '../../../shared/styles/colorsPalete';

type BottomTabsBarProps = PropsWithChildren<BottomTabBarProps>

const BottomTabsBar: React.FC<BottomTabsBarProps> = (props) => {
    const { state, descriptors, navigation } = props;

    console.log(props);

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
                    if(route.name === 'Session'){
                        icon = (<FontAwesome name="th-list" size={22} color={isFocused ? '#674CFF' : '#fff'} />);
                    }

                    if(route.name === 'Timer'){
                        icon = (<Ionicons name="timer" size={28} color={isFocused ? '#674CFF' : '#fff'} />);
                    }

                    if(route.name === 'Settings'){
                        icon = (<FontAwesome name="user" size={26} color={isFocused ? '#674CFF' : '#fff'} />);
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
        backgroundColor: colorPallete.AppBGColor,
    },
    tabContainer: {
        flexDirection: 'row',
        height: 85,
        backgroundColor: colorPallete.AppBGColor,
        paddingHorizontal: 15
    },
    tabButton: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default BottomTabsBar;
