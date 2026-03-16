import React from 'react';
import { View, Text, Platform } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { TrendingUp } from 'lucide-react-native';
import { useTheme } from '@/context';
import { colors } from '@/constants/colors';

interface StatCardProps {
  value: string;
  label: string;
  icon: React.ReactNode;
  trend?: string | null;
  gradient?: [string, string];
}

export function StatCard({ value, label, icon, trend, gradient }: StatCardProps) {
  const { theme } = useTheme();
  const c = colors[theme];

  // Gradient variant (purple cards)
  if (gradient) {
    return (
      <LinearGradient
        colors={gradient}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={{
          flex: 1,
          borderRadius: 18,
          padding: 16,
          ...Platform.select({
            ios: {
              shadowColor: gradient[0],
              shadowOffset: { width: 0, height: 4 },
              shadowOpacity: 0.2,
              shadowRadius: 10,
            },
            android: { elevation: 4 },
          }),
        }}
      >
        <View className="mb-3 flex-row items-center justify-between">
          {icon}
          {trend && (
            <View className="flex-row items-center gap-0.5">
              <TrendingUp size={12} color="rgba(255,255,255,0.7)" strokeWidth={2} />
              <Text className="font-poppins-semibold text-[10px] text-white/70">{trend}</Text>
            </View>
          )}
        </View>
        <Text className="mb-0.5 font-fredoka text-3xl text-white">{value}</Text>
        <Text className="font-poppins-semibold text-[10px] uppercase tracking-wider text-white/70">
          {label}
        </Text>
      </LinearGradient>
    );
  }

  return (
    <View
      className="flex-1 rounded-2xl border border-border bg-card p-4"
      style={Platform.select({
        ios: {
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.04,
          shadowRadius: 6,
        },
        android: { elevation: 1 },
      })}
    >
      <View className="mb-2 flex-row items-center justify-between">
        {icon}
        {trend && (
          <View className="flex-row items-center gap-0.5">
            <TrendingUp size={11} color={c.success} strokeWidth={2} />
            <Text className="font-poppins-semibold text-[10px]" style={{ color: c.success }}>
              {trend}
            </Text>
          </View>
        )}
      </View>
      <Text className="mb-0.5 font-fredoka text-2xl text-foreground">{value}</Text>
      <Text className="font-poppins-semibold text-[9px] uppercase tracking-wider text-muted-foreground">
        {label}
      </Text>
    </View>
  );
}
