import React from 'react';
import { Platform, Text, TouchableOpacity, View } from 'react-native';
import { MotiView } from 'moti';
import { Check } from 'lucide-react-native';
import { colors } from '@/constants/colors';
import { useTheme } from '@/context';

interface JobRoleCardProps {
  title: string;
  icon: React.ReactNode;
  salary: string;
  description: string;
  bg: string;
  isSelected: boolean;
  onPress: () => void;
}

export function JobRoleCard({
  title,
  icon,
  salary,
  description,
  bg,
  isSelected,
  onPress,
}: JobRoleCardProps) {
  const { theme } = useTheme();
  const c = colors[theme];

  return (
    <TouchableOpacity activeOpacity={0.8} onPress={onPress} style={{ marginBottom: 12 }}>
      <MotiView
        animate={{
          borderColor: isSelected ? '#B9A7F8' : 'transparent',
          scale: isSelected ? 1 : 0.98,
        }}
        transition={{ type: 'spring', damping: 18, stiffness: 200 }}
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          gap: 14,
          borderWidth: 2.5,
          borderRadius: 20,
          backgroundColor: theme === 'dark' ? c.card : bg,
          padding: 16,
          ...Platform.select({
            ios: {
              shadowColor: isSelected ? '#B9A7F8' : '#000',
              shadowOffset: { width: 0, height: isSelected ? 4 : 2 },
              shadowOpacity: isSelected ? 0.15 : 0.04,
              shadowRadius: isSelected ? 12 : 4,
            },
            android: { elevation: isSelected ? 6 : 2 },
          }),
        }}
      >
        <View
          style={{
            width: 50,
            height: 50,
            borderRadius: 16,
            backgroundColor: `${c.primary}15`,
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          {icon}
        </View>
        <View style={{ flex: 1 }}>
          <Text style={{ fontFamily: 'Poppins_700Bold', fontSize: 16, color: c.foreground }}>
            {title}
          </Text>
          <Text
            style={{
              fontFamily: 'Poppins_400Regular',
              fontSize: 12,
              color: c.mutedForeground,
              marginTop: 2,
            }}
          >
            {description}
          </Text>
        </View>
        <View style={{ alignItems: 'flex-end' }}>
          <Text style={{ fontFamily: 'Poppins_700Bold', fontSize: 15, color: '#B9A7F8' }}>
            {salary}
          </Text>
          <Text
            style={{ fontFamily: 'Poppins_400Regular', fontSize: 10, color: c.mutedForeground }}
          >
            /year
          </Text>
        </View>
        {isSelected && (
          <MotiView
            from={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', damping: 12, stiffness: 160 }}
            style={{
              position: 'absolute',
              top: 12,
              right: 12,
              width: 22,
              height: 22,
              borderRadius: 11,
              backgroundColor: '#B9A7F8',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Check size={13} color="#fff" strokeWidth={3} />
          </MotiView>
        )}
      </MotiView>
    </TouchableOpacity>
  );
}
