import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Clock, FileText, Target, Trophy } from 'lucide-react-native';
import { MotiView } from 'moti';
import { useTheme } from '@/context';
import { colors } from '@/constants/colors';
import { RECENT_ACTIVITY } from './data/activity';

const ACTIVITY_ICON_MAP: Record<string, React.ReactNode> = {
  'file-text': <FileText size={16} color="#B9A7F8" strokeWidth={2} />,
  target: <Target size={16} color="#60A5FA" strokeWidth={2} />,
  trophy: <Trophy size={16} color="#F59E0B" strokeWidth={2} />,
};

export function RecentActivity() {
  const { theme } = useTheme();
  const c = colors[theme];

  return (
    <View className="mb-5 px-6">
      <View className="rounded-2xl border border-border bg-card p-4">
        {/* Header */}
        <View className="mb-3 flex-row items-center justify-between">
          <View className="flex-row items-center gap-2">
            <Clock size={16} color={c.primary} strokeWidth={2} />

            <Text className="font-poppins-bold text-sm text-foreground">Recent Activity</Text>
          </View>

          <TouchableOpacity activeOpacity={0.7}>
            <Text className="font-poppins-semibold text-xs text-primary">View All</Text>
          </TouchableOpacity>
        </View>

        {/* Activity list */}
        {RECENT_ACTIVITY.map((item, index) => (
          <MotiView
            key={index}
            from={{ opacity: 0, translateX: -8 }}
            animate={{ opacity: 1, translateX: 0 }}
            transition={{
              type: 'spring',
              damping: 16,
              stiffness: 130,
              delay: index * 50,
            }}
          >
            <View
              className={`flex-row items-start gap-3 py-3 ${
                index < RECENT_ACTIVITY.length - 1 ? 'border-b border-border' : ''
              }`}
            >
              {/* Icon */}
              <View className="mt-0.5 h-8 w-8 items-center justify-center rounded-full bg-muted/50">
                {ACTIVITY_ICON_MAP[item.icon]}
              </View>

              {/* Content */}
              <View className="flex-1">
                <View className="mb-0.5 flex-row items-center gap-2">
                  <Text className="font-poppins-semibold text-sm text-foreground">{item.name}</Text>

                  <View className="flex-row items-center gap-1">
                    <Clock size={10} color={c.mutedForeground} strokeWidth={2} />

                    <Text className="font-poppins-regular text-[10px] text-muted-foreground">
                      {item.time}
                    </Text>
                  </View>
                </View>

                <Text className="font-poppins-regular text-xs leading-4 text-muted-foreground">
                  {item.action}
                </Text>
              </View>
            </View>
          </MotiView>
        ))}
      </View>
    </View>
  );
}
