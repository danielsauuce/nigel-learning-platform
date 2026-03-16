import React, { useCallback, useRef, useState } from 'react';
import { LayoutChangeEvent, PanResponder, Platform, Text, View } from 'react-native';
import { MotiView } from 'moti';

export interface BudgetCategory {
  key: string;
  label: string;
  emoji: string;
  color: string;
  min: number;
  max: number;
  step: number;
  recommended: number;
  value: number;
}

interface BudgetSliderProps {
  category: BudgetCategory;
  onChange: (key: string, value: number) => void;
  index: number;
  takeHome: number;
}

export function BudgetSlider({ category, onChange, index, takeHome }: BudgetSliderProps) {
  const percentage = takeHome > 0 ? Math.round((category.value / takeHome) * 100) : 0;
  const isOverRecommended = category.value > category.recommended * 1.2;
  const isUnderRecommended = category.value < category.recommended * 0.5 && category.value > 0;

  const trackWidth = useRef(0);
  const [isDragging, setIsDragging] = useState(false);

  const valueToPosition = (val: number) => {
    const range = category.max - category.min;
    return range > 0 ? ((val - category.min) / range) * trackWidth.current : 0;
  };

  const positionToValue = (pos: number) => {
    const range = category.max - category.min;
    const raw = (pos / trackWidth.current) * range + category.min;
    const clamped = Math.max(category.min, Math.min(category.max, raw));
    return Math.round(clamped / category.step) * category.step;
  };

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: () => true,
      onPanResponderGrant: () => setIsDragging(true),
      onPanResponderMove: (_, gestureState) => {
        const currentPos = valueToPosition(category.value) + gestureState.dx;
        const newVal = positionToValue(currentPos);
        if (newVal !== category.value) {
          onChange(category.key, newVal);
        }
      },
      onPanResponderRelease: () => setIsDragging(false),
      onPanResponderTerminate: () => setIsDragging(false),
    }),
  ).current;

  const handleTrackLayout = (e: LayoutChangeEvent) => {
    trackWidth.current = e.nativeEvent.layout.width;
  };

  const handleTrackPress = (e: any) => {
    const x = e.nativeEvent.locationX;
    const newVal = positionToValue(x);
    onChange(category.key, newVal);
  };

  const fillPercent =
    category.max - category.min > 0
      ? ((category.value - category.min) / (category.max - category.min)) * 100
      : 0;

  return (
    <MotiView
      from={{ opacity: 0, translateX: -16 }}
      animate={{ opacity: 1, translateX: 0 }}
      transition={{ type: 'spring', damping: 16, stiffness: 130, delay: 200 + index * 80 }}
    >
      <View
        className="mb-3 rounded-2xl border border-border bg-card p-4"
        style={Platform.select({
          ios: {
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 1 },
            shadowOpacity: 0.04,
            shadowRadius: 4,
          },
          android: { elevation: 1 },
        })}
      >
        {/* Top row: emoji + label + amount */}
        <View className="mb-3.5 flex-row items-center justify-between">
          <View className="flex-row items-center gap-2.5">
            <View
              className="h-10 w-10 items-center justify-center rounded-xl"
              style={{ backgroundColor: `${category.color}18` }}
            >
              <Text className="text-lg">{category.emoji}</Text>
            </View>
            <View>
              <Text className="font-poppins-semibold text-sm text-foreground">
                {category.label}
              </Text>
              <Text className="font-poppins-regular text-[10px] text-muted-foreground">
                Suggested: £{category.recommended}
              </Text>
            </View>
          </View>

          <View className="items-end">
            <MotiView
              animate={{ scale: isDragging ? 1.1 : 1 }}
              transition={{ type: 'spring', damping: 14, stiffness: 200 }}
            >
              <Text className="font-poppins-bold text-lg text-foreground">£{category.value}</Text>
            </MotiView>
            <Text className="font-poppins-medium text-[10px] text-muted-foreground">
              {percentage}%
            </Text>
          </View>
        </View>

        {/* Custom slider track */}
        <View
          className="h-7 justify-center"
          onLayout={handleTrackLayout}
          onStartShouldSetResponder={() => true}
          onResponderRelease={handleTrackPress}
        >
          {/* Track background */}
          <View className="h-2 overflow-hidden rounded-full bg-border/60">
            <View
              className="h-full rounded-full"
              style={{
                width: `${fillPercent}%`,
                backgroundColor: category.color,
              }}
            />
          </View>

          {/* Thumb */}
          <View
            {...panResponder.panHandlers}
            style={{
              position: 'absolute',
              left: `${fillPercent}%`,
              marginLeft: -12,
            }}
          >
            <MotiView
              animate={{
                scale: isDragging ? 1.25 : 1,
              }}
              transition={{ type: 'spring', damping: 14, stiffness: 200 }}
              className="h-6 w-6 items-center justify-center rounded-full border-[3px] bg-card"
              style={{
                borderColor: category.color,
                ...Platform.select({
                  ios: {
                    shadowColor: category.color,
                    shadowOffset: { width: 0, height: 2 },
                    shadowOpacity: 0.3,
                    shadowRadius: 4,
                  },
                  android: { elevation: 4 },
                }),
              }}
            />
          </View>
        </View>

        {/* Feedback */}
        {(isOverRecommended || isUnderRecommended) && (
          <MotiView
            from={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ type: 'spring', damping: 14, stiffness: 140 }}
          >
            <View
              className={`mt-1.5 flex-row items-center gap-1.5 rounded-lg px-3 py-1.5 ${
                isOverRecommended ? 'bg-warning/10' : 'bg-info/10'
              }`}
            >
              <Text className="text-xs">{isOverRecommended ? '⚠️' : '💡'}</Text>
              <Text
                className={`flex-1 font-poppins-medium text-[11px] ${
                  isOverRecommended ? 'text-warning' : 'text-info'
                }`}
              >
                {isOverRecommended
                  ? `That's a lot for ${category.label.toLowerCase()}! Try reducing it.`
                  : `Consider adding more for ${category.label.toLowerCase()}.`}
              </Text>
            </View>
          </MotiView>
        )}
      </View>
    </MotiView>
  );
}
