import { View, Text, Platform } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

interface Props {
  value: string;
  label: string;
  icon: React.ReactNode;
  gradient?: [string, string]; // optional
}

export function StatCard({ value, label, icon, gradient }: Props) {
  const colors = gradient ?? ['#6366F1', '#8B5CF6']; // fallback gradient

  return (
    <LinearGradient
      colors={colors}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={{
        borderRadius: 18,
        padding: 16,
        ...Platform.select({
          ios: {
            shadowOffset: { width: 0, height: 4 },
            shadowOpacity: 0.2,
            shadowRadius: 10,
          },
          android: { elevation: 4 },
        }),
      }}
    >
      <View className="mb-3">{icon}</View>

      <Text className="mb-1 font-fredoka text-3xl text-white">{value}</Text>

      <Text className="font-poppins-semibold text-[10px] uppercase tracking-wider text-white/70">
        {label}
      </Text>
    </LinearGradient>
  );
}
