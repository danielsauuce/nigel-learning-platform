import React from 'react';
import { Platform, Text, View } from 'react-native';
import { MotiView } from 'moti';

export type EventType = 'expense' | 'windfall';

export interface LifeEvent {
  key: string;
  emoji: string;
  title: string;
  description: string;
  amount: number;
  type: EventType;
  tip: string;
}

interface LifeEventRevealProps {
  event: LifeEvent;
}

export function LifeEventReveal({ event }: LifeEventRevealProps) {
  const isExpense = event.type === 'expense';

  return (
    <View className="px-6">
      {/* Event card */}
      <MotiView
        from={{ opacity: 0, scale: 0.8, rotateZ: '-4deg' }}
        animate={{ opacity: 1, scale: 1, rotateZ: '0deg' }}
        transition={{ type: 'spring', damping: 12, stiffness: 100, delay: 400 }}
      >
        <View
          className={`rounded-3xl border-2 p-6 ${
            isExpense ? 'border-destructive/20 bg-destructive/5' : 'border-success/20 bg-success/5'
          }`}
          style={Platform.select({
            ios: {
              shadowColor: isExpense ? 'rgb(239, 68, 68)' : 'rgb(34, 197, 94)',
              shadowOffset: { width: 0, height: 8 },
              shadowOpacity: 0.15,
              shadowRadius: 20,
            },
            android: { elevation: 8 },
          })}
        >
          {/* Emoji */}
          <MotiView
            from={{ scale: 0, rotateZ: '-20deg' }}
            animate={{ scale: 1, rotateZ: '0deg' }}
            transition={{ type: 'spring', damping: 10, stiffness: 120, delay: 600 }}
            className="mb-4 items-center"
          >
            <View
              className={`h-20 w-20 items-center justify-center rounded-full ${
                isExpense ? 'bg-destructive/10' : 'bg-success/10'
              }`}
            >
              <Text className="text-4xl">{event.emoji}</Text>
            </View>
          </MotiView>

          {/* Type badge */}
          <MotiView
            from={{ opacity: 0, translateY: 8 }}
            animate={{ opacity: 1, translateY: 0 }}
            transition={{ type: 'spring', damping: 16, stiffness: 130, delay: 700 }}
            className="mb-3 items-center"
          >
            <View
              className={`rounded-full px-3.5 py-1 ${
                isExpense ? 'bg-destructive/15' : 'bg-success/15'
              }`}
            >
              <Text
                className={`font-poppins-bold text-xs uppercase tracking-wider ${
                  isExpense ? 'text-destructive' : 'text-success'
                }`}
              >
                {isExpense ? '⚡ Unexpected Expense' : '🍀 Lucky Windfall'}
              </Text>
            </View>
          </MotiView>

          {/* Title */}
          <MotiView
            from={{ opacity: 0, translateY: 10 }}
            animate={{ opacity: 1, translateY: 0 }}
            transition={{ type: 'spring', damping: 16, stiffness: 120, delay: 800 }}
          >
            <Text className="mb-2 text-center font-fredoka text-2xl text-foreground">
              {event.title}
            </Text>
            <Text className="mb-5 text-center font-poppins-regular text-sm leading-5 text-muted-foreground">
              {event.description}
            </Text>
          </MotiView>

          {/* Impact amount */}
          <MotiView
            from={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ type: 'spring', damping: 12, stiffness: 110, delay: 950 }}
          >
            <View
              className={`items-center rounded-2xl py-4 ${
                isExpense ? 'bg-destructive/10' : 'bg-success/10'
              }`}
            >
              <Text className="mb-1 font-poppins-medium text-xs text-muted-foreground">
                Financial Impact
              </Text>
              <Text
                className={`font-fredoka text-3xl ${
                  isExpense ? 'text-destructive' : 'text-success'
                }`}
              >
                {isExpense ? '−' : '+'}£{event.amount}
              </Text>
            </View>
          </MotiView>
        </View>
      </MotiView>

      {/* Tip */}
      <MotiView
        from={{ opacity: 0, translateY: 10 }}
        animate={{ opacity: 1, translateY: 0 }}
        transition={{ type: 'spring', damping: 16, stiffness: 120, delay: 1100 }}
        className="mt-4"
      >
        <View className="bg-warning/8 flex-row gap-2.5 rounded-xl border border-warning/20 p-3.5">
          <Text className="text-base">💡</Text>
          <Text className="flex-1 font-poppins-regular text-xs leading-4 text-muted-foreground">
            {event.tip}
          </Text>
        </View>
      </MotiView>
    </View>
  );
}
