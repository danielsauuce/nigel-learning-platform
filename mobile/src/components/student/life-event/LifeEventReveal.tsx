import React from 'react';
import { Platform, Text, View } from 'react-native';
import { MotiView } from 'moti';
import { Lightbulb } from 'lucide-react-native';
import { MascotSad, MascotWaving } from '@/svg/illustrations';

const PRIMARY_PURPLE = '#B9A7F8';

export type EventType = 'expense' | 'windfall';

export interface LifeEvent {
  key: string;
  icon: React.ReactNode;
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
      {/* Mascot reaction */}
      <MotiView
        from={{ opacity: 0, translateY: 20 }}
        animate={{ opacity: 1, translateY: 0 }}
        transition={{ type: 'spring', damping: 12, stiffness: 100, delay: 200 }}
        style={{ alignItems: 'center', marginBottom: 12 }}
      >
        {isExpense ? <MascotSad size={80} /> : <MascotWaving size={80} />}
      </MotiView>

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
              shadowRadius: 16,
            },
            android: { elevation: 4 },
          })}
        >
          <View className="mb-3 items-center">{event.icon}</View>
          <Text className="mb-2 text-center font-fredoka text-xl text-foreground">
            {event.title}
          </Text>
          <Text className="mb-4 text-center font-poppins-regular text-sm leading-5 text-muted-foreground">
            {event.description}
          </Text>

          {/* Amount badge */}
          <View className="items-center">
            <View
              className={`rounded-full px-5 py-2 ${
                isExpense ? 'bg-destructive/10' : 'bg-success/10'
              }`}
            >
              <Text
                className={`font-poppins-bold text-lg ${
                  isExpense ? 'text-destructive' : 'text-success'
                }`}
              >
                {isExpense ? '-' : '+'}£{event.amount}
              </Text>
            </View>
          </View>
        </View>
      </MotiView>

      {/* Tip */}
      <MotiView
        from={{ opacity: 0, translateY: 12 }}
        animate={{ opacity: 1, translateY: 0 }}
        transition={{ type: 'spring', damping: 16, stiffness: 120, delay: 800 }}
      >
        <View className="mx-1 mt-4 flex-row gap-3 rounded-2xl border border-primary/20 bg-primary/5 p-4">
          <Lightbulb size={16} color={PRIMARY_PURPLE} strokeWidth={2} />
          <Text className="flex-1 font-poppins-regular text-xs leading-5 text-muted-foreground">
            {event.tip}
          </Text>
        </View>
      </MotiView>
    </View>
  );
}
