import { useCallback, useMemo, useState } from 'react';
import { Dimensions, LayoutChangeEvent, ListRenderItem, StyleSheet, Vibration, View } from 'react-native';
import Animated, { useAnimatedReaction, useAnimatedScrollHandler, useSharedValue } from 'react-native-reanimated';
import SettingSliderElement from './ui/ui-slider-element';
import { Colors } from '@app/shared/styles/colorsPalete';
import { runOnJS } from 'react-native-worklets';
import { noop } from '@app/shared/utilities/noop';

interface SettingSliderProps {
    min: number;
    max: number;
    visible_items?: number;
    initialIndex?: number;
    onChange?: (value: number) => void;
}
interface FlatListItem{
    value: number,
    index: number,
    key: string,
}

const generateInterval = (min: number, max: number):number[] => {
    return Array.from({ length: max - min + 1 }, (_, i) => min + i);
};

const FlatListKeyExtractor = (item:FlatListItem) => item.key;

const SettingSlider: React.FC<SettingSliderProps> = (props) => {
    const {
        min,
        max,
        visible_items = 7,
        initialIndex = 0,
        onChange = noop,
    } = props;

    const [sectionWidth, setSectionWidth] = useState(Dimensions.get('window').width);
    const currentIndex = useSharedValue(initialIndex);
    /* -------------------------------------------------------------------------- */
    /*                      Получаем размер внутреннего блока                     */
    /* -------------------------------------------------------------------------- */
    const handleLayout = useCallback((event: LayoutChangeEvent) => {
        const { width } = event.nativeEvent.layout;
        setSectionWidth(width);
    }, []);

    const ITEM_SIZE = useMemo<number>(() => {
        return Math.floor(sectionWidth / visible_items);
    }, [sectionWidth, visible_items]);

    const centeredPadding = useMemo<{paddingHorizontal: number}>(() => {
        return { paddingHorizontal: sectionWidth / 2 - ITEM_SIZE / 2 };
    }, [sectionWidth, ITEM_SIZE]);

    const MaxToRenderPerBatch = useMemo<number>(() => {
        return visible_items * 2;
    }, [visible_items]);

    /* -------------------------------------------------------------------------- */
    /*                            Значения для анимации                           */
    /* -------------------------------------------------------------------------- */

    const scrollHandler = useAnimatedScrollHandler({
        onScroll: (event) => {
            const newIndex = Math.round(event.contentOffset.x / ITEM_SIZE);
            currentIndex.value = newIndex;
        },
    });
    useAnimatedReaction(
        () => {
            return currentIndex.value;
        },(currentValue, previousValue) => {
            if (currentValue !== previousValue) {
                runOnJS(onChange)(currentValue);
                runOnJS(Vibration.vibrate)(10);
            }
        }
    );
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


    const FastListItemLayout = useCallback((data:ArrayLike<FlatListItem> | null | undefined, index: number) => {
        return {
            length: ITEM_SIZE,
            offset: ITEM_SIZE * index,
            index,
        };
    }, [ITEM_SIZE]);
    return (
        <>
            <View
                style={styles.sliderContainer}
                onLayout={handleLayout}
            >
                <Animated.FlatList
                    data={numbers}
                    renderItem={renderItem}
                    keyExtractor={FlatListKeyExtractor}
                    horizontal
                    decelerationRate={'fast'}
                    snapToInterval={ITEM_SIZE}
                    initialScrollIndex={initialIndex}
                    scrollEventThrottle={32}
                    onScroll={scrollHandler}
                    style={styles.sliderFlatList}
                    contentContainerStyle={centeredPadding}
                    showsHorizontalScrollIndicator={false}
                    getItemLayout={FastListItemLayout}
                    removeClippedSubviews={true}
                    maxToRenderPerBatch={MaxToRenderPerBatch}
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
    },
});

export default SettingSlider;
