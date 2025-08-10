import { useCallback, useMemo, useRef, useState } from 'react';
import { LayoutChangeEvent, ListRenderItem, StyleSheet, View } from 'react-native';
import Animated, { useAnimatedScrollHandler, useSharedValue } from 'react-native-reanimated';
import SettingSliderElement from './ui/ui-slider-element';
import { Colors } from '../../../../shared/styles/colorsPalete';

interface SettingSliderProps {
    min: number;
    max: number;
    visible_items?: number;
    initialIndex?: number;
}
interface FlatListItem{
    value: number,
    index: number,
    key: string,
}

const generateInterval = (min: number, max: number):number[] => {
    return  Array.from({ length: max - min + 1 }, (_, i) => min + i);
};

const FlatListKeyExtractor = (item:FlatListItem) => item.key;

const SettingSlider: React.FC<SettingSliderProps> = (props) => {
    const {
        min,
        max,
        visible_items = 7,
        initialIndex = Math.floor(max - min),
    } = props;

    const [sectionSize, setSectionSize] = useState({ width: 0, height: 0 });
    const flatListRef = useRef(null);

    /* -------------------------------------------------------------------------- */
    /*                      Получаем размер внутреннего блока                     */
    /* -------------------------------------------------------------------------- */
    const handleLayout = useCallback((event: LayoutChangeEvent) => {
        const { width, height } = event.nativeEvent.layout;
        setSectionSize({ width, height });
    }, []);

    const ITEM_SIZE = useMemo<number>(() => {
        return Math.floor(sectionSize.width / visible_items);
    }, [sectionSize, visible_items]);

    /* -------------------------------------------------------------------------- */
    /*                            Значения для анимации                           */
    /* -------------------------------------------------------------------------- */
    const currentIndex = useSharedValue(initialIndex);

    const scrollHandler = useAnimatedScrollHandler({
        onScroll: (event) => {
            const newIndex = Math.round(event.contentOffset.x / ITEM_SIZE);
            currentIndex.value = newIndex;
        },
    });

    /* -------------------------------------------------------------------------- */
    /*                         Создаем данные для FlatList                        */
    /* -------------------------------------------------------------------------- */
    const numbers = useMemo<FlatListItem[]>(() => {
        return generateInterval(min, max).map((item, index) => {
            return {
                value: item,
                index: index,
                key: `settings-item-${index}`,
            };
        });
    }, [min, max]);

    /* -------------------------------------------------------------------------- */
    /*                          Функция рендера элементов                         */
    /* -------------------------------------------------------------------------- */
    const renderItem = useCallback<ListRenderItem<FlatListItem>>(({ item, index }) => {
        return (
            <SettingSliderElement
                text={String(item.value)}
                width={ITEM_SIZE}
                index={index}
                centerIndex={currentIndex}
            />
        );
    }, [ITEM_SIZE, currentIndex]);

    return (
        <>
            <View
                style={styles.sliderContainer}
                onLayout={handleLayout}
            >
                <Animated.FlatList
                    ref={flatListRef}
                    data={numbers}
                    renderItem={renderItem}
                    keyExtractor={FlatListKeyExtractor}
                    horizontal
                    decelerationRate="fast"
                    snapToInterval={ITEM_SIZE}
                    scrollEventThrottle={16}
                    onScroll={scrollHandler}
                    style={[styles.sliderFlatList, {paddingHorizontal: sectionSize.width / 2 - ITEM_SIZE / 2}]}
                    showsHorizontalScrollIndicator={false}
                />
                <View style={[styles.centerCursor, {width: ITEM_SIZE}]}/>
            </View>
        </>
    );
};

const styles = StyleSheet.create({
    sliderContainer: {
        flex: 1,
        position: 'relative',
        justifyContent: 'center',
        alignItems: 'center',
    },
    sliderFlatList: {
        width: '100%',
        zIndex: 10,
    },
    centerCursor: {
        position: 'absolute',
        height: '100%',
        backgroundColor: Colors.primary,
        zIndex: 5,
        borderRadius: 10,
    }
});

export default SettingSlider;
