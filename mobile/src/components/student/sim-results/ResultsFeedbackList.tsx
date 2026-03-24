import React from 'react';
import { Text, View } from 'react-native';
import { MotiView } from 'moti';
import { CheckCircle, AlertTriangle, XCircle } from 'lucide-react-native';

export interface FeedbackItem {
  key: string;
  icon: React.ReactNode;
  category: string;
  message: string;
  type: 'good' | 'warning' | 'bad';
}

interface ResultsFeedbackListProps {
  items: FeedbackItem[];
}

export function ResultsFeedbackList({ items }: ResultsFeedbackListProps) {
  return (
    <View className="mt-6 px-6">
      <Text className="mb-3 font-poppins-bold text-base text-foreground">Budget Feedback</Text>

      <View className="gap-2.5">
        {items.map((item, index) => {
          const bgClass =
            item.type === 'good'
              ? 'bg-success/6 border-success/15'
              : item.type === 'warning'
                ? 'bg-warning/6 border-warning/15'
                : 'bg-destructive/6 border-destructive/15';

          const StatusIcon =
            item.type === 'good' ? CheckCircle : item.type === 'warning' ? AlertTriangle : XCircle;
          const statusColor =
            item.type === 'good' ? '#22C55E' : item.type === 'warning' ? '#F59E0B' : '#EF4444';

          return (
            <MotiView
              key={item.key}
              from={{ opacity: 0, translateX: -12 }}
              animate={{ opacity: 1, translateX: 0 }}
              transition={{ type: 'spring', damping: 16, stiffness: 130, delay: 800 + index * 70 }}
            >
              <View className={`flex-row gap-3 rounded-xl border p-3.5 ${bgClass}`}>
                <View className="mt-0.5">{item.icon}</View>
                <View className="flex-1">
                  <View className="mb-0.5 flex-row items-center gap-1.5">
                    <Text className="font-poppins-semibold text-sm text-foreground">
                      {item.category}
                    </Text>
                    <StatusIcon size={12} color={statusColor} strokeWidth={2.5} />
                  </View>
                  <Text className="font-poppins-regular text-xs leading-4 text-muted-foreground">
                    {item.message}
                  </Text>
                </View>
              </View>
            </MotiView>
          );
        })}
      </View>
    </View>
  );
}
